import express from 'express';
import {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    cancelOrder
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('customer'), createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrder);
router.put('/:id/status', authenticate, authorize('owner', 'admin'), updateOrderStatus);
router.put('/:id/cancel', authenticate, cancelOrder);

export default router;
