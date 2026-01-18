import express from 'express';
import {
    createPayment,
    getPayment,
    refundPaymentController,
    getPaymentHistory,
    validateCard,
    validateUPI,
    getPaymentSummary,
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All payment routes require authentication
router.use(authenticate);

/**
 * Payment Processing
 */
// Process payment
router.post('/process', createPayment);

// Get payment status
router.get('/:transactionId', getPayment);

// Refund payment
router.post('/:transactionId/refund', refundPaymentController);

/**
 * Payment History & Summary
 */
// Get user's payment history
router.get('/', getPaymentHistory);

// Get payment summary
router.get('/summary/stats', getPaymentSummary);

/**
 * Validation
 */
// Validate card details
router.post('/validate/card', validateCard);

// Validate UPI ID
router.post('/validate/upi', validateUPI);

export default router;
