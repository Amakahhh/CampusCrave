import { initiatePayment, handlePaymentWebhook, getPaymentStatus } from '../services/paymentService.js';
import { AppError } from '../middleware/errorHandler.js';
import crypto from 'crypto';

/**
 * POST /api/payments/initiate
 * Initiate payment for an order
 */
export const initiatePaymentController = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      throw new AppError('Order ID required', 400);
    }

    const result = await initiatePayment(orderId, 520); // subtotal will be added in frontend

    // Create Paystack checkout URL (would be handled by frontend)
    const paystackUrl = `https://checkout.paystack.com/${result.reference}`;

    res.json({
      ...result,
      checkoutUrl: paystackUrl,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/payments/webhook
 * Handle Paystack webhook
 */
export const paymentWebhookController = async (req, res, next) => {
  try {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      throw new AppError('Invalid signature', 401);
    }

    const result = await handlePaymentWebhook(req.body.data);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/payments/:id
 * Get payment status
 */
export const getPaymentController = async (req, res, next) => {
  try {
    const payment = await getPaymentStatus(req.params.id);
    res.json(payment);
  } catch (error) {
    next(error);
  }
};
