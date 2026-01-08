import { studentSignup, studentLogin, waiterSignup, getUserProfile, updateUserProfile } from '../services/authService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * POST /api/auth/student/signup
 * Sign up a new student (instant, no verification)
 */
export const studentSignupController = async (req, res, next) => {
  try {
    const { email, name, phone, password, hostel, room } = req.body;

    if (!email || !name || !phone || !password) {
      throw new AppError('Email, name, phone, and password required', 400);
    }

    const result = await studentSignup(email, name, phone, password, hostel, room);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/student/login
 * Login a student by phone number and password
 */
export const studentLoginController = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      throw new AppError('Phone number and password are required', 400);
    }

    const result = await studentLogin(phone, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/waiter/signup
 * Sign up a new waiter (instant, no verification)
 */
export const waiterSignupController = async (req, res, next) => {
  try {
    const { name, phone, matricNumber, password, bankDetails } = req.body;

    if (!name || !phone || !matricNumber) {
      throw new AppError('Name, phone, and matric number required', 400);
    }

    const result = await waiterSignup(name, phone, matricNumber, password, bankDetails);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/signup/request (LEGACY)
 * @deprecated Use /student/signup instead
 */
export const requestEmailVerificationController = async (req, res, next) => {
  try {
    throw new AppError('Email verification is no longer required. Use /student/signup instead.', 400);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/signup/verify (LEGACY)
 * @deprecated Use /student/signup instead
 */
export const verifyEmailSignupController = async (req, res, next) => {
  try {
    throw new AppError('Email verification is no longer required. Use /student/signup instead.', 400);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/otp/request (LEGACY)
 */
export const requestOtpController = async (req, res, next) => {
  try {
    throw new AppError('OTP signup is no longer used. Please use /student/signup or /waiter/signup', 400);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/otp/verify (LEGACY)
 */
export const verifyOtpController = async (req, res, next) => {
  try {
    throw new AppError('OTP signup is no longer used. Please use /student/signup or /waiter/signup', 400);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/profile
 * Get logged in user's profile
 */
export const getProfileController = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/profile
 * Update user profile
 */
export const updateProfileController = async (req, res, next) => {
  try {
    const { name, hostel, room } = req.body;

    const user = await updateUserProfile(req.user.id, {
      name,
      hostel,
      room,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};
