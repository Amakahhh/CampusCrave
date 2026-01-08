import express from 'express';
import {
  initiatePaymentController,
  paymentWebhookController,
  getPaymentController,
} from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/payments/initiate
 * Initiate payment
 */
router.post('/initiate', verifyToken, initiatePaymentController);

/**
 * GET /api/payments/:id
 * Get payment status
 */
router.get('/:id', verifyToken, getPaymentController);

/**
 * POST /api/payments/webhook
 * Paystack webhook (no auth needed)
 */
router.post('/webhook', paymentWebhookController);

export default router;
