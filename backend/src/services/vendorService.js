import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all vendors, optionally filtered by hall
 */
export const getAllVendors = async (hall = null) => {
  try {
    const vendors = await prisma.vendor.findMany({
      where: hall ? { hall } : {},
      include: {
        menuItems: {
          where: { available: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return vendors;
  } catch (error) {
    throw new Error(`Failed to fetch vendors: ${error.message}`);
  }
};

/**
 * Get vendor by ID with menu items
 */
export const getVendorById = async (vendorId) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        menuItems: {
          orderBy: { category: 'asc' },
        },
      },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    return vendor;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get vendor menu
 */
export const getVendorMenu = async (vendorId) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      include: {
        menuItems: {
          orderBy: { category: 'asc' },
        },
      },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    // Group items by category
    const categories = {};
    vendor.menuItems.forEach(item => {
      const cat = item.category || 'Other';
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push(item);
    });

    return {
      vendor: {
        id: vendor.id,
        name: vendor.name,
        hall: vendor.hall,
        contact: vendor.contact,
        imageUrl: vendor.imageUrl,
      },
      categories,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get unique list of halls (for filtering)
 */
export const getHalls = async () => {
  try {
    const halls = await prisma.vendor.findMany({
      distinct: ['hall'],
      select: { hall: true },
      orderBy: { hall: 'asc' },
    });

    return halls.map(h => h.hall);
  } catch (error) {
    throw new Error(`Failed to fetch halls: ${error.message}`);
  }
};

/**
 * Create vendor (admin only)
 */
export const createVendor = async (data) => {
  try {
    const vendor = await prisma.vendor.create({
      data: {
        name: data.name,
        hall: data.hall,
        contact: data.contact,
        imageUrl: data.imageUrl,
      },
    });

    return vendor;
  } catch (error) {
    throw new Error(`Failed to create vendor: ${error.message}`);
  }
};

/**
 * Add menu item to vendor
 */
export const addMenuItem = async (vendorId, data) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new Error('Vendor not found');
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        vendorId,
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        imageUrl: data.imageUrl,
        category: data.category,
        available: true,
      },
    });

    return menuItem;
  } catch (error) {
    throw new Error(`Failed to add menu item: ${error.message}`);
  }
};
