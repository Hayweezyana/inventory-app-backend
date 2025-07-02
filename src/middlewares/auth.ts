import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; level: number };
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; level: number };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (...levels: number[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !levels.includes(req.user.level)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permission' });
    }
    next();
  };
};
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.level !== 1) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};