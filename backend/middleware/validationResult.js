import { validationResult } from "express-validator";

/*
Validation Middleware
Checks for validation errors using express-validator.
If errors are found, sends a 400 response with error details.
Otherwise, passes control to the next middleware.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
