import express from 'express';
import {
  studentSignupController,
  studentLoginController,
  waiterSignupController,
  requestEmailVerificationController,
  verifyEmailSignupController,
  requestOtpController,
  verifyOtpController,
  getProfileController,
  updateProfileController,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateRequest, validateEmail } from '../middleware/validation.js';

const router = express.Router();

/**
 * POST /api/auth/student/signup
 * Sign up a new student (instant signup, no verification)
 */
router.post(
  '/student/signup',
  studentSignupController
);

/**
 * POST /api/auth/student/login
 * Login a student by phone number
 */
router.post(
  '/student/login',
  studentLoginController
);

/**
 * POST /api/auth/waiter/signup
 * Sign up a new waiter (instant signup, no verification)
 */
router.post(
  '/waiter/signup',
  waiterSignupController
);

/**
 * POST /api/auth/signup/request (LEGACY)
 */
router.post('/signup/request', requestEmailVerificationController);

/**
 * POST /api/auth/signup/verify (LEGACY)
 */
router.post('/signup/verify', verifyEmailSignupController);

/**
 * POST /api/auth/otp/request (LEGACY)
 */
router.post('/otp/request', requestOtpController);

/**
 * POST /api/auth/otp/verify (LEGACY)
 */
router.post('/otp/verify', verifyOtpController);

/**
 * GET /api/auth/profile
 * Get user profile (requires auth)
 */
router.get('/profile', verifyToken, getProfileController);

/**
 * PUT /api/auth/profile
 * Update user profile (requires auth)
 */
router.put(
  '/profile',
  verifyToken,
  updateProfileController
);

export default router;
