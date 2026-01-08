import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAvailableOrders,
  claimOrder,
  updateOrderStatus,
  getWaiterOrders,
} from '../services/orderService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * POST /api/orders
 * Create a new order
 */
export const createOrderController = async (req, res, next) => {
  try {
    const { vendorId, items, deliveryAddress, notes } = req.body;

    if (!vendorId || !items || !deliveryAddress) {
      throw new AppError('Missing required fields', 400);
    }

    const result = await createOrder(req.user.id, {
      vendorId,
      items,
      deliveryAddress,
      notes,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders
 * Get user's orders
 */
export const getUserOrdersController = async (req, res, next) => {
  try {
    const { status } = req.query;
    const orders = await getUserOrders(req.user.id, status);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/:id
 * Get order details
 */
export const getOrderController = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id, req.user.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/available
 * Get available orders for waiters
 */
export const getAvailableOrdersController = async (req, res, next) => {
  try {
    const { vendorHall, deliveryHall } = req.query;
    const orders = await getAvailableOrders({ vendorHall, deliveryHall });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/orders/:id/claim
 * Claim an order
 */
export const claimOrderController = async (req, res, next) => {
  try {
    const order = await claimOrder(req.params.id, req.user.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/orders/:id/status
 * Update order status
 */
export const updateOrderStatusController = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      throw new AppError('Status required', 400);
    }

    const order = await updateOrderStatus(req.params.id, req.user.id, status);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/waiter/active
 * Get waiter's active orders
 */
export const getWaiterOrdersController = async (req, res, next) => {
  try {
    const orders = await getWaiterOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
