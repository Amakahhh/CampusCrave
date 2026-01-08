/**
 * Global error handling middleware
 * Pass errors to this middleware using next(error)
 */
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] Error:`, {
    status,
    message,
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { details: err.details }),
  });
};

/**
 * Create a custom error
 * Usage: throw new AppError('User not found', 404);
 */
export class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
