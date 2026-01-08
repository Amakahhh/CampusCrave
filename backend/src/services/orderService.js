import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a new order
 */
export const createOrder = async (userId, data) => {
  try {
    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: data.vendorId },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    // Verify menu items exist and get prices
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: data.items.map(i => i.menuItemId) },
        vendorId: data.vendorId,
      },
    });

    if (menuItems.length !== data.items.length) {
      throw new Error('Some menu items not found');
    }

    // Calculate subtotal
    let subtotal = 0;
    const items = data.items.map(item => {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      const itemPrice = parseFloat(menuItem.price) * item.quantity;
      subtotal += itemPrice;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: itemPrice,
      };
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        vendorId: data.vendorId,
        status: 'PENDING',
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee: 500,
        gatewayFee: 20,
        total: parseFloat((subtotal + 500 + 20).toFixed(2)),
        deliveryAddress: data.deliveryAddress,
        notes: data.notes,
        items: {
          create: items,
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return {
      orderId: order.id,
      amount: order.total,
      reference: `CAMPUS_${order.id.slice(0, 8).toUpperCase()}`,
    };
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

/**
 * Get user's orders
 */
export const getUserOrders = async (userId, status = null) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      include: {
        vendor: {
          select: { id: true, name: true, hall: true },
        },
        items: {
          include: { menuItem: true },
        },
        rating: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId, userId) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        vendor: {
          select: { id: true, name: true, hall: true, contact: true },
        },
        items: {
          include: { menuItem: true },
        },
        assignedWaiter: {
          select: { id: true, name: true, phone: true },
        },
        statusHistory: {
          orderBy: { createdAt: 'asc' },
        },
        rating: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Verify ownership
    if (order.userId !== userId && order.assignedWaiterId !== userId) {
      throw new Error('Unauthorized');
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get available orders for waiters (status = CONFIRMED)
 * Filter by vendor location and delivery location
 */
export const getAvailableOrders = async (filters = {}) => {
  try {
    const where = { status: 'CONFIRMED' };

    if (filters.vendorHall) {
      where.vendor = { hall: filters.vendorHall };
    }

    if (filters.deliveryHall) {
      // This assumes deliveryAddress is JSON with hostel field
      where.deliveryAddress = {
        path: ['hostel'],
        equals: filters.deliveryHall,
      };
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        vendor: {
          select: { id: true, name: true, hall: true },
        },
        user: {
          select: { id: true, name: true, phone: true },
        },
        items: {
          include: { menuItem: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch available orders: ${error.message}`);
  }
};

/**
 * Claim an order (atomic operation - prevent race condition)
 */
export const claimOrder = async (orderId, waiterId) => {
  try {
    // Check if order is still available and not claimed
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== 'CONFIRMED') {
      throw new Error('Order is no longer available');
    }

    if (order.assignedWaiterId) {
      throw new Error('Order already claimed');
    }

    // Claim the order and update status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        assignedWaiterId: waiterId,
        status: 'ASSIGNED',
      },
      include: {
        vendor: { select: { name: true, hall: true } },
        user: { select: { name: true, hostel: true, room: true } },
      },
    });

    // Record status change
    await prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: 'ASSIGNED',
      },
    });

    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, waiterId, newStatus) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.assignedWaiterId !== waiterId) {
      throw new Error('Unauthorized - you are not assigned to this order');
    }

    // Validate status progression
    const validStatuses = ['ASSIGNED', 'COLLECTED', 'ON_THE_WAY', 'DELIVERED'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Invalid status');
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        ...(newStatus === 'DELIVERED' && { deliveredAt: new Date() }),
      },
      include: {
        items: { include: { menuItem: true } },
        vendor: true,
      },
    });

    // Record status change
    await prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: newStatus,
      },
    });

    // If delivered, credit waiter earnings
    if (newStatus === 'DELIVERED') {
      const wallet = await prisma.waiterWallet.findUnique({
        where: { waiterId },
      });

      if (wallet) {
        await prisma.waiterWallet.update({
          where: { waiterId },
          data: {
            accumulatedBalance: {
              increment: order.expectedWaiterFee,
            },
            totalEarned: {
              increment: order.expectedWaiterFee,
            },
          },
        });

        // Record transaction
        await prisma.walletTransaction.create({
          data: {
            waiterId,
            amount: order.expectedWaiterFee,
            type: 'CREDIT',
            reason: `Order ${orderId.slice(0, 8).toUpperCase()} Delivered`,
            orderId,
          },
        });
      }
    }

    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get waiter's active orders
 */
export const getWaiterOrders = async (waiterId, status = null) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        assignedWaiterId: waiterId,
        ...(status && { status }),
      },
      include: {
        vendor: { select: { name: true, hall: true } },
        user: { select: { name: true, phone: true, hostel: true, room: true } },
        items: { include: { menuItem: true } },
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders;
  } catch (error) {
    throw new Error(`Failed to fetch waiter orders: ${error.message}`);
  }
};
