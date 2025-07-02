import express from 'express';
import { returnItem } from '../controllers/return.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();
router.use(authenticate);

router.post('/', authorize(2), returnItem); // Level 2 verifies returns

export default router;
