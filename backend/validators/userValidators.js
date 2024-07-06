import { body } from 'express-validator';

export const registerValidationRules = [
  // Validate username
  body('username')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters'),

  // Validate email
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Validate password
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character'),
];
