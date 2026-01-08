import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Sign up a new student (with password)
 */
export const studentSignup = async (email, name, phone, password, hostel, room) => {
  try {
    if (!email || !name || !phone || !password) {
      throw new Error('Email, name, phone, and password are required');
    }

    // Format phone number
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length === 10) {
      formattedPhone = '234' + formattedPhone.slice(-10);
    }
    if (!formattedPhone.startsWith('234')) {
      throw new Error('Invalid phone number');
    }
    formattedPhone = '+' + formattedPhone;

    // Check if email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Check if phone already exists
    existingUser = await prisma.user.findUnique({
      where: { phone: formattedPhone },
    });

    if (existingUser) {
      throw new Error('Phone number already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        phone: formattedPhone,
        name,
        password: hashedPassword,
        hostel: hostel || null,
        room: room || null,
        isWaiter: false,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isWaiter: user.isWaiter,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        hostel: user.hostel,
        room: user.room,
        isWaiter: user.isWaiter,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Sign up a new waiter (no verification)
 */
export const waiterSignup = async (name, phone, matricNumber, password, bankDetails) => {
  try {
    if (!name || !phone || !matricNumber) {
      throw new Error('Name, phone, and matric number are required');
    }

    // Format phone number
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length === 10) {
      formattedPhone = '234' + formattedPhone.slice(-10);
    }
    if (!formattedPhone.startsWith('234')) {
      throw new Error('Invalid phone number');
    }
    formattedPhone = '+' + formattedPhone;

    // Check if phone already registered
    let user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
    });

    if (user) {
      throw new Error('Phone number already registered');
    }

    // Create new waiter
    user = await prisma.user.create({
      data: {
        phone: formattedPhone,
        name,
        matricNumber,
        isWaiter: true,
        bankDetails: bankDetails || null,
      },
    });

    // Create waiter wallet
    await prisma.waiterWallet.create({
      data: {
        waiterId: user.id,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        isWaiter: true,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        matricNumber: user.matricNumber,
        isWaiter: true,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Verify OTP and create/update user (LEGACY - kept for backwards compatibility)
 */
export const verifyOTP = async (phone, otp, userData = {}) => {
  try {
    // Format phone
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length === 10) {
      formattedPhone = '234' + formattedPhone.slice(-10);
    }
    if (!formattedPhone.startsWith('234')) {
      throw new Error('Invalid phone number');
    }
    formattedPhone = '+' + formattedPhone;

    // Find OTP session
    const otpSession = await prisma.otpSession.findUnique({
      where: { phone: formattedPhone },
    });

    if (!otpSession) {
      throw new Error('OTP session not found. Please request a new OTP.');
    }

    if (otpSession.expiresAt < new Date()) {
      await prisma.otpSession.delete({ where: { phone: formattedPhone } });
      throw new Error('OTP expired. Please request a new one.');
    }

    if (otpSession.otp !== otp) {
      otpSession.attempts += 1;
      if (otpSession.attempts >= 5) {
        await prisma.otpSession.delete({ where: { phone: formattedPhone } });
        throw new Error('Too many failed attempts. Please request a new OTP.');
      }
      await prisma.otpSession.update({
        where: { phone: formattedPhone },
        data: { attempts: otpSession.attempts },
      });
      throw new Error('Invalid OTP');
    }

    // OTP verified, find or create user
    let user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          phone: formattedPhone,
          name: userData.name || null,
          hostel: userData.hostel || null,
          room: userData.room || null,
          matricNumber: userData.matricNumber || null,
          isWaiter: userData.isWaiter || false,
          bankDetails: userData.bankDetails || null,
        },
      });

      // Create waiter wallet if applicable
      if (user.isWaiter) {
        await prisma.waiterWallet.create({
          data: {
            waiterId: user.id,
          },
        });
      }
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(userData.name && { name: userData.name }),
          ...(userData.hostel && { hostel: userData.hostel }),
          ...(userData.room && { room: userData.room }),
          ...(userData.matricNumber && { matricNumber: userData.matricNumber }),
          ...(userData.isWaiter !== undefined && { isWaiter: userData.isWaiter }),
          ...(userData.bankDetails && { bankDetails: userData.bankDetails }),
        },
      });
    }

    // Delete OTP session
    await prisma.otpSession.delete({ where: { phone: formattedPhone } });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        isWaiter: user.isWaiter,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        hostel: user.hostel,
        room: user.room,
        matricNumber: user.matricNumber,
        isWaiter: user.isWaiter,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get user profile (requires token)
 */
export const getUserProfile = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        name: true,
        hostel: true,
        room: true,
        matricNumber: true,
        isWaiter: true,
        createdAt: true,
        waiterWallet: {
          select: {
            accumulatedBalance: true,
            expectedBalance: true,
            totalEarned: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Student login by phone number and password
 */
export const studentLogin = async (phone, password) => {
  try {
    if (!phone || !password) {
      throw new Error('Phone number and password are required');
    }

    // Format phone number
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.length === 10) {
      formattedPhone = '234' + formattedPhone.slice(-10);
    }
    if (!formattedPhone.startsWith('234')) {
      throw new Error('Invalid phone number');
    }
    formattedPhone = '+' + formattedPhone;

    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
    });

    if (!user) {
      throw new Error('Phone number not found. Please sign up first.');
    }

    if (user.isWaiter) {
      throw new Error('This account is a waiter account. Please use the waiter login.');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isWaiter: user.isWaiter,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        hostel: user.hostel,
        room: user.room,
        isWaiter: user.isWaiter,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, data) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.hostel && { hostel: data.hostel }),
        ...(data.room && { room: data.room }),
      },
      select: {
        id: true,
        phone: true,
        name: true,
        hostel: true,
        room: true,
        matricNumber: true,
        isWaiter: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
