import Payment from '../models/Payment.js';
import { processPayment, refundPayment, getPaymentStatus, generatePaymentReceipt, PAYMENT_METHODS } from '../config/payment.js';
import { sendOrderConfirmation } from '../config/email.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

/**
 * Create and process payment
 * POST /api/payments/process
 */
export const createPayment = async (req, res, next) => {
    try {
        const { method, amount, orderId, cardDetails, upiId, reference } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!method || !amount) {
            return res.status(400).json({ message: 'Payment method and amount are required' });
        }

        // Validate payment method
        if (!Object.values(PAYMENT_METHODS).includes(method)) {
            return res.status(400).json({ message: 'Invalid payment method' });
        }

        // Process payment
        const paymentResult = await processPayment(
            {
                method,
                amount,
                userId,
                orderId,
                cardDetails,
                upiId,
                reference,
            },
            Payment
        );

        // If payment successful, update order
        if (orderId && paymentResult.status === 'completed') {
            const order = await Order.findByIdAndUpdate(
                orderId,
                {
                    paymentStatus: 'completed',
                    paymentId: paymentResult.transactionId,
                    status: 'confirmed',
                },
                { new: true }
            );

            if (order) {
                // Send order confirmation email
                const user = await User.findById(userId);
                if (user && user.email) {
                    await sendOrderConfirmation(user.email, {
                        orderId: order._id,
                        items: order.items,
                        subtotal: order.subtotal,
                        deliveryFee: order.deliveryFee,
                        discount: order.discount || 0,
                        total: order.total,
                        deliveryAddress: order.deliveryAddress,
                        estimatedDelivery: '30-45 minutes',
                        status: 'Order Confirmed',
                    }).catch((err) => console.log('Email sending failed:', err.message));
                }
            }
        }

        res.status(201).json({
            success: true,
            data: paymentResult,
            receipt: generatePaymentReceipt({
                transactionId: paymentResult.transactionId,
                timestamp: Date.now(),
                method,
                amount,
                status: paymentResult.status,
                reference,
            }),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get payment status
 * GET /api/payments/:transactionId
 */
export const getPayment = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const userId = req.user.id;

        const payment = await Payment.findOne({ transactionId, userId });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({
            success: true,
            data: payment.toSafeJSON(),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Refund payment
 * POST /api/payments/:transactionId/refund
 */
export const refundPaymentController = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const userId = req.user.id;

        // Verify payment belongs to user
        const payment = await Payment.findOne({ transactionId, userId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Process refund
        const refundResult = await refundPayment(transactionId, Payment);

        res.json({
            success: true,
            data: refundResult,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user's payment history
 * GET /api/payments/history
 */
export const getPaymentHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { status, method, limit = 10, page = 1 } = req.query;

        // Build filter
        const filter = { userId };
        if (status) filter.status = status;
        if (method) filter.method = method;

        const payments = await Payment.find(filter)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select('-metadata');

        const total = await Payment.countDocuments(filter);

        res.json({
            success: true,
            data: {
                payments: payments.map((p) => p.toSafeJSON()),
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / parseInt(limit)),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Validate card details
 * POST /api/payments/validate-card
 */
export const validateCard = async (req, res, next) => {
    try {
        const { cardNumber, expiryDate, cvv } = req.body;

        const { validateCardDetails } = await import('../config/payment.js');
        const validation = validateCardDetails(cardNumber, expiryDate, cvv);

        if (validation.valid) {
            res.json({
                valid: true,
                message: 'Card details are valid',
            });
        } else {
            res.status(400).json({
                valid: false,
                message: validation.error,
            });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Validate UPI ID
 * POST /api/payments/validate-upi
 */
export const validateUPI = async (req, res, next) => {
    try {
        const { upiId } = req.body;

        const { validateUPIId } = await import('../config/payment.js');
        const isValid = validateUPIId(upiId);

        if (isValid) {
            res.json({
                valid: true,
                message: 'UPI ID is valid',
            });
        } else {
            res.status(400).json({
                valid: false,
                message: 'Invalid UPI ID format (use: username@bankname)',
            });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Get payment summary for user
 * GET /api/payments/summary
 */
export const getPaymentSummary = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const summary = await Payment.aggregate([
            { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);

        const totalTransactions = await Payment.countDocuments({ userId });
        const totalSpent = await Payment.aggregate([
            { $match: { userId: require('mongoose').Types.ObjectId(userId), status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        res.json({
            success: true,
            data: {
                summary,
                totalTransactions,
                totalSpent: totalSpent[0]?.total || 0,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createPayment,
    getPayment,
    refundPaymentController,
    getPaymentHistory,
    validateCard,
    validateUPI,
    getPaymentSummary,
};
