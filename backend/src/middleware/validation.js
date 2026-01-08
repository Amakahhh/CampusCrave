import { body, validationResult } from 'express-validator';

/**
 * Handle validation errors
 * Usage: router.post('/endpoint', validateRequest([...rules]), controllerFunction)
 */
export const validateRequest = (rules) => {
  return async (req, res, next) => {
    await Promise.all(rules.map(rule => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  };
};

// Common validation rules
export const validatePhone = () =>
  body('phone')
    .trim()
    .matches(/^\+?234\d{10}$/)
    .withMessage('Invalid phone number format. Use +234XXXXXXXXXX or 234XXXXXXXXXX');

export const validateEmail = () =>
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address');

export const validateOTP = () =>
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .matches(/^\d+$/)
    .withMessage('OTP must be 6 digits');

export const validateName = () =>
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters');

export const validateMatricNumber = () =>
  body('matricNumber')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Matric number must be at least 5 characters');

export const validateBankDetails = () => [
  body('bankDetails.accountNumber')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Invalid account number'),
  body('bankDetails.accountName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Invalid account name'),
  body('bankDetails.bankCode')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Invalid bank code'),
];
