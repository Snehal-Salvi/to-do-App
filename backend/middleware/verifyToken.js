import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";

/*
Token Verification Middleware
Verifies the JWT token from the request headers.
Sets decoded user information in req.user if token is valid.
Sends 401 Unauthorized error if token is missing or invalid.
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    req.user = decoded;

    next();
  });
};
