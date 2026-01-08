import express from 'express';
import {
  getWalletController,
  requestPayoutController,
  getPayoutHistoryController,
} from '../controllers/waiterController.js';
import { verifyToken, verifyWaiter } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/waiters/wallet
 * Get waiter's wallet
 */
router.get('/wallet', verifyToken, verifyWaiter, getWalletController);

/**
 * POST /api/waiters/payout/request
 * Request payout
 */
router.post('/payout/request', verifyToken, verifyWaiter, requestPayoutController);

/**
 * GET /api/waiters/payouts
 * Get payout history
 */
router.get('/payouts', verifyToken, verifyWaiter, getPayoutHistoryController);

export default router;
