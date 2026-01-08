import jwt from 'jsonwebtoken';

/**
 * Verify JWT token from Authorization header
 * Usage: router.get('/protected', verifyToken, controllerFunction)
 */
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Verify user is a waiter
 * Usage: router.get('/waiter-only', verifyToken, verifyWaiter, controllerFunction)
 */
export const verifyWaiter = (req, res, next) => {
  if (!req.user?.isWaiter) {
    return res.status(403).json({ error: 'Only waiters can access this resource' });
  }
  next();
};

/**
 * Verify user is admin (future)
 */
export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
