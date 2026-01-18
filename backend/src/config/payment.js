import crypto from 'crypto';

/**
 * Custom Payment System for Restro
 * - Local payment processing
 * - Multiple payment methods support
 * - Transaction tracking and security
 */

// Payment methods
export const PAYMENT_METHODS = {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    UPI: 'upi',
    WALLET: 'wallet',
    COD: 'cod', // Cash on Delivery
    BANK_TRANSFER: 'bank_transfer',
};

// Payment status
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
};

/**
 * Generate unique transaction ID
 */
export const generateTransactionId = () => {
    return `TXN-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
};

/**
 * Encrypt sensitive payment data
 */
export const encryptPaymentData = (data) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'restro-secret-key', 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encrypted,
        iv: iv.toString('hex'),
    };
};

/**
 * Decrypt payment data
 */
export const decryptPaymentData = (encryptedData, iv) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'restro-secret-key', 'salt', 32);

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
};

/**
 * Validate card details (basic validation)
 */
export const validateCardDetails = (cardNumber, expiryDate, cvv) => {
    // Remove spaces
    cardNumber = cardNumber.replace(/\s/g, '');

    // Check length (13-19 digits for most cards)
    if (!/^\d{13,19}$/.test(cardNumber)) {
        return { valid: false, error: 'Invalid card number' };
    }

    // Luhn algorithm check
    const digits = cardNumber.split('').reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        let digit = parseInt(digits[i], 10);

        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    if (sum % 10 !== 0) {
        return { valid: false, error: 'Invalid card number' };
    }

    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return { valid: false, error: 'Invalid expiry date format (MM/YY)' };
    }

    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        return { valid: false, error: 'Card has expired' };
    }

    // Validate CVV (3-4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
        return { valid: false, error: 'Invalid CVV' };
    }

    return { valid: true };
};

/**
 * Validate UPI ID
 */
export const validateUPIId = (upiId) => {
    // UPI ID format: username@bankname
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(upiId);
};

/**
 * Process payment
 */
export const processPayment = async (paymentDetails, Payment) => {
    const { method, amount, userId, orderId, cardDetails, upiId, reference } = paymentDetails;

    try {
        // Validate payment method
        if (!Object.values(PAYMENT_METHODS).includes(method)) {
            throw new Error('Invalid payment method');
        }

        // Generate transaction ID
        const transactionId = generateTransactionId();

        // Validate amount
        if (amount <= 0) {
            throw new Error('Invalid payment amount');
        }

        // Method-specific validations
        let encryptedData = null;

        if (method === PAYMENT_METHODS.CREDIT_CARD || method === PAYMENT_METHODS.DEBIT_CARD) {
            const validation = validateCardDetails(cardDetails.cardNumber, cardDetails.expiryDate, cardDetails.cvv);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Encrypt card details
            encryptedData = encryptPaymentData({
                last4: cardDetails.cardNumber.slice(-4),
                cardNetwork: cardDetails.cardNetwork,
            });
        } else if (method === PAYMENT_METHODS.UPI) {
            if (!validateUPIId(upiId)) {
                throw new Error('Invalid UPI ID');
            }
        }

        // Create payment record
        const payment = new Payment({
            transactionId,
            userId,
            orderId,
            method,
            amount,
            currency: 'INR',
            status: PAYMENT_STATUS.PROCESSING,
            reference: reference || null,
            metadata: {
                cardLast4: encryptedData?.encrypted ? encryptedData : null,
                upiId: method === PAYMENT_METHODS.UPI ? upiId : null,
            },
            timestamp: new Date(),
        });

        // Simulate payment processing
        // In production, this would integrate with actual payment gateways
        await simulatePaymentProcessing(payment);

        // Save payment
        await payment.save();

        return {
            success: true,
            transactionId,
            status: payment.status,
            amount,
            message: 'Payment processed successfully',
        };
    } catch (error) {
        console.error('Payment processing error:', error.message);
        throw error;
    }
};

/**
 * Simulate payment processing
 */
const simulatePaymentProcessing = async (payment) => {
    return new Promise((resolve) => {
        // Simulate random success/failure (95% success rate in simulation)
        const isSuccess = Math.random() < 0.95;

        setTimeout(() => {
            if (isSuccess) {
                payment.status = PAYMENT_STATUS.COMPLETED;
                payment.completedAt = new Date();
            } else {
                payment.status = PAYMENT_STATUS.FAILED;
                payment.failureReason = 'Payment declined by bank';
            }
            resolve();
        }, 2000); // Simulate 2-second processing time
    });
};

/**
 * Refund payment
 */
export const refundPayment = async (transactionId, Payment) => {
    try {
        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            throw new Error('Payment not found');
        }

        if (payment.status !== PAYMENT_STATUS.COMPLETED) {
            throw new Error('Only completed payments can be refunded');
        }

        payment.status = PAYMENT_STATUS.REFUNDED;
        payment.refundedAt = new Date();
        payment.refundAmount = payment.amount;

        await payment.save();

        return {
            success: true,
            transactionId,
            refundAmount: payment.amount,
            message: 'Payment refunded successfully',
        };
    } catch (error) {
        console.error('Refund error:', error.message);
        throw error;
    }
};

/**
 * Get payment status
 */
export const getPaymentStatus = async (transactionId, Payment) => {
    try {
        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            throw new Error('Payment not found');
        }

        return {
            transactionId: payment.transactionId,
            status: payment.status,
            amount: payment.amount,
            method: payment.method,
            timestamp: payment.timestamp,
        };
    } catch (error) {
        console.error('Error fetching payment status:', error.message);
        throw error;
    }
};

/**
 * Generate payment receipt
 */
export const generatePaymentReceipt = (payment) => {
    return {
        transactionId: payment.transactionId,
        date: new Date(payment.timestamp).toLocaleDateString('en-IN'),
        time: new Date(payment.timestamp).toLocaleTimeString('en-IN'),
        method: payment.method,
        amount: `₹${payment.amount.toFixed(2)}`,
        status: payment.status.toUpperCase(),
        reference: payment.reference,
        lastDigits: payment.metadata?.cardLast4 ? `****${payment.metadata.cardLast4}` : null,
    };
};

export default {
    generateTransactionId,
    encryptPaymentData,
    decryptPaymentData,
    validateCardDetails,
    validateUPIId,
    processPayment,
    refundPayment,
    getPaymentStatus,
    generatePaymentReceipt,
    PAYMENT_METHODS,
    PAYMENT_STATUS,
};
