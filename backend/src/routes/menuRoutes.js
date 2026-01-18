import express from 'express';
import {
    createMenuItem,
    getMenuItems,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('owner', 'admin'), createMenuItem);
router.get('/', getMenuItems);
router.get('/:id', getMenuItem);
router.put('/:id', authenticate, authorize('owner', 'admin'), updateMenuItem);
router.delete('/:id', authenticate, authorize('owner', 'admin'), deleteMenuItem);

export default router;
