import express from 'express';
import { login, register, listUsers, } from '../controllers/auth.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { authenticate, authorize } from '../middlewares/auth';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, authorize(2), listUsers);
router.post('/users', authenticate, authorize(2), async (req: Request, res: Response) => {
  const { username, password, level } = req.body;
    const currentUser = req.user;
    if (!currentUser || currentUser.level !== 2) {
        return res.status(403).json({ message: 'Only level 2 admins can create users' });
        }
    const existing = await User.query().
    findOne
    ({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });
    const hashed = await bcrypt.hash(password, 10);
    await User.query().insert({ username, password: hashed, level });
    res.status(201).json({ message: 'User created successfully' });
});




export const adminRegister = async (req: Request, res: Response) => {
  const { username, password, level } = req.body;
  const currentUser = req.user;

  if (!currentUser || currentUser.level !== 2) {
    return res.status(403).json({ message: 'Only level 2 admins can create users' });
  }

  const existing = await User.query().findOne({ username });
  if (existing) return res.status(400).json({ message: 'Username already exists' });

  const hashed = await bcrypt.hash(password, 10);
  await User.query().insert({ username, password: hashed, level });
  res.status(201).json({ message: 'User created successfully' });
};


export default router;