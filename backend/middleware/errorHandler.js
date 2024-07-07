/*
Error Handler Function
Creates and returns a new Error object with specified status code and message.
 */
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
