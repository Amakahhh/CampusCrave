import { getWaiterWallet, requestPayout, getPayoutHistory } from '../services/waiterService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/waiters/wallet
 * Get waiter's wallet
 */
export const getWalletController = async (req, res, next) => {
  try {
    const wallet = await getWaiterWallet(req.user.id);
    res.json(wallet);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/waiters/payout/request
 * Request payout
 */
export const requestPayoutController = async (req, res, next) => {
  try {
    const { amount, bankDetails } = req.body;

    if (!amount || !bankDetails) {
      throw new AppError('Missing required fields', 400);
    }

    const payout = await requestPayout(req.user.id, parseFloat(amount), bankDetails);
    res.status(201).json(payout);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/waiters/payouts
 * Get payout history
 */
export const getPayoutHistoryController = async (req, res, next) => {
  try {
    const payouts = await getPayoutHistory(req.user.id);
    res.json(payouts);
  } catch (error) {
    next(error);
  }
};
