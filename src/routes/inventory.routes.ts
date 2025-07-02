import express from 'express';
import {
  createCategory,
  listInventory,
  stockItem,
  bulkUploadInventory
} from '../controllers/inventory.controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Only Level 2 can stock or create category
router.post('/category', authorize(2), createCategory);
router.post('/stock', authorize(2), stockItem);
router.post('/bulk-upload', authenticate, authorize(2), bulkUploadInventory);


// Any level can view inventory
router.get('/', authorize(1, 2), listInventory);

export default router;
