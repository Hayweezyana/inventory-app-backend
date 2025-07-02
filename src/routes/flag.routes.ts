import express from 'express';
import {
  createFlag,
  getFlags,
  resolveFlag
} from '../controllers/flag.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

router.use(authenticate);
router.post('/', authorize(2), createFlag);
router.get('/', authorize(2), getFlags);
router.put('/:id/resolve', authorize(2), resolveFlag);

export default router;
