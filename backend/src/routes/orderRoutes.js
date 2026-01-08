import express from 'express';
import {
  createOrderController,
  getUserOrdersController,
  getOrderController,
  getAvailableOrdersController,
  claimOrderController,
  updateOrderStatusController,
  getWaiterOrdersController,
} from '../controllers/orderController.js';
import { verifyToken, verifyWaiter } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/orders
 * Create new order
 */
router.post('/', verifyToken, createOrderController);

/**
 * GET /api/orders
 * Get user's orders
 */
router.get('/', verifyToken, getUserOrdersController);

/**
 * GET /api/orders/available
 * Get available orders for waiters (no auth - public)
 */
router.get('/available', getAvailableOrdersController);

/**
 * GET /api/orders/waiter/active
 * Get waiter's active orders
 */
router.get('/waiter/active', verifyToken, verifyWaiter, getWaiterOrdersController);

/**
 * POST /api/orders/:id/claim
 * Claim an order
 */
router.post('/:id/claim', verifyToken, verifyWaiter, claimOrderController);

/**
 * POST /api/orders/:id/status
 * Update order status
 */
router.post('/:id/status', verifyToken, updateOrderStatusController);

/**
 * GET /api/orders/:id
 * Get order details
 */
router.get('/:id', verifyToken, getOrderController);

export default router;
