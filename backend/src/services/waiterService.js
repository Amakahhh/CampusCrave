import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get waiter wallet
 */
export const getWaiterWallet = async (waiterId) => {
  try {
    const wallet = await prisma.waiterWallet.findUnique({
      where: { waiterId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20, // Last 20 transactions
        },
      },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    return wallet;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Request payout
 */
export const requestPayout = async (waiterId, amount, bankDetails) => {
  try {
    const wallet = await prisma.waiterWallet.findUnique({
      where: { waiterId },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.accumulatedBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Create payout request
    const payout = await prisma.payoutRequest.create({
      data: {
        waiterId,
        amount,
        bankDetails,
        status: 'PENDING',
      },
    });

    // Update wallet to reflect pending payout
    await prisma.waiterWallet.update({
      where: { waiterId },
      data: {
        accumulatedBalance: {
          decrement: amount,
        },
      },
    });

    // Record transaction
    await prisma.walletTransaction.create({
      data: {
        waiterId,
        amount,
        type: 'DEBIT',
        reason: `Payout Request #${payout.id.slice(0, 8).toUpperCase()}`,
      },
    });

    return payout;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get payout history
 */
export const getPayoutHistory = async (waiterId) => {
  try {
    const payouts = await prisma.payoutRequest.findMany({
      where: { waiterId },
      orderBy: { createdAt: 'desc' },
    });

    return payouts;
  } catch (error) {
    throw new Error(error.message);
  }
};
