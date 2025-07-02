import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        level: number;
        [key: string]: any;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (req: Request, res: Response) => {
  const { username, password, level } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.query().insert({ username, password: hashedPassword, level });
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.query().findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, level: user.level }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, 
  user: {
    id: user.id,
    username: user.username,
    level: user.level,
  }, });
};

export const listUsers = async (req: Request, res: Response) => {
  const currentUser = req.user; // comes from middleware

  if (!currentUser || currentUser.level !== 2) {
    return res.status(403).json({ message: 'Only level 2 admins can view users' });
  }

  const users = await User.query().select('id', 'username', 'level', 'created_at');
  return res.json(users);
};