import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Initiate payment (create pending payment record)
 */
export const initiatePayment = async (orderId, amount) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId,
        reference: `CAMPUS_${Date.now()}`,
        status: 'PENDING',
      },
    });

    return {
      paymentId: payment.id,
      reference: payment.reference,
      amount,
      orderId,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Handle payment webhook from Paystack
 */
export const handlePaymentWebhook = async (paystackData) => {
  try {
    const { reference, status, customer, amount } = paystackData;

    // Find payment by reference
    const payment = await prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (status === 'success') {
      // Update payment status
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          providerPayload: paystackData,
        },
      });

      // Update order status to CONFIRMED
      const order = await prisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: 'CONFIRMED',
          paymentReference: reference,
        },
      });

      // Record status change
      await prisma.orderStatusHistory.create({
        data: {
          orderId: payment.orderId,
          status: 'CONFIRMED',
        },
      });

      return {
        success: true,
        orderId: order.id,
        message: 'Payment successful',
      };
    } else {
      // Update payment status to FAILED
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          providerPayload: paystackData,
        },
      });

      // Cancel order
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'CANCELLED' },
      });

      return {
        success: false,
        message: 'Payment failed',
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (paymentId) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
};
