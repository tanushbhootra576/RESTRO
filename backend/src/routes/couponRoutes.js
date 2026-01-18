import express from 'express';
import {
    createCoupon,
    getCoupons,
    validateCoupon
} from '../controllers/couponController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('owner', 'admin'), createCoupon);
router.get('/', getCoupons);
router.post('/validate', validateCoupon);

export default router;
