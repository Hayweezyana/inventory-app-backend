import express from 'express';
import {
  createRequest,
  approveRequest,
  returnRequest,
  getRequests
} from '../controllers/request.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(1), createRequest);
router.get('/request', authenticate, getRequests);
router.get('/', authorize(2), getRequests);
router.put('/:id/approve', authorize(2), approveRequest);
router.put('/:id/return', authorize(2), returnRequest);

export default router;
