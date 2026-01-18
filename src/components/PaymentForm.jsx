import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Card, Badge } from './ui';

const PaymentForm = ({ amount = 0, orderId = null, onSuccess = null, onCancel = null }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Card payment state
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
    });

    // UPI payment state
    const [upiId, setUpiId] = useState('');

    const paymentMethods = [
        { id: 'credit_card', label: 'Credit Card', icon: '💳' },
        { id: 'debit_card', label: 'Debit Card', icon: '🏦' },
        { id: 'upi', label: 'UPI', icon: '📱' },
        { id: 'wallet', label: 'Digital Wallet', icon: '👛' },
        { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
    ];

    const handleCardChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            // Format card number with spaces
            const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            setCardData({ ...cardData, [name]: formatted });
        } else if (name === 'expiryDate') {
            // Format as MM/YY
            const formatted = value.replace(/\D/g, '').slice(0, 4);
            if (formatted.length >= 2) {
                setCardData({ ...cardData, [name]: `${formatted.slice(0, 2)}/${formatted.slice(2)}` });
            } else {
                setCardData({ ...cardData, [name]: formatted });
            }
        } else if (name === 'cvv') {
            setCardData({ ...cardData, [name]: value.replace(/\D/g, '').slice(0, 4) });
        } else {
            setCardData({ ...cardData, [name]: value });
        }
    };

    const handleProcessPayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError(null);

        try {
            // Simulate payment processing
            const paymentData = {
                method: paymentMethod,
                amount,
                orderId,
            };

            if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
                paymentData.cardDetails = {
                    cardNumber: cardData.cardNumber.replace(/\s/g, ''),
                    expiryDate: cardData.expiryDate,
                    cvv: cardData.cvv,
                    cardNetwork: detectCardNetwork(cardData.cardNumber),
                };
            } else if (paymentMethod === 'upi') {
                paymentData.upiId = upiId;
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Mock success response
            setSuccess(true);
            if (onSuccess) {
                onSuccess({
                    transactionId: `TXN-${Date.now()}`,
                    status: 'completed',
                    amount,
                    method: paymentMethod,
                });
            }
        } catch (err) {
            setError(err.message || 'Payment processing failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const detectCardNetwork = (cardNumber) => {
        const num = cardNumber.replace(/\s/g, '');
        if (/^4/.test(num)) return 'Visa';
        if (/^5[1-5]/.test(num)) return 'Mastercard';
        if (/^3[47]/.test(num)) return 'American Express';
        return 'Unknown';
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
            >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6 }} className="text-6xl mb-4">
                    ✅
                </motion.div>
                <h3 className="text-2xl font-playfair text-luxury-dark mb-2">Payment Successful</h3>
                <p className="text-luxury-text-muted mb-6">Your order has been confirmed</p>
                <Button variant="primary" onClick={() => (window.location.href = '/')}>
                    Return to Home
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Amount Display */}
            <Card className="bg-gradient-to-r from-luxury-dark to-luxury-burgundy text-white p-6">
                <p className="text-sm text-luxury-cream mb-2">Total Amount</p>
                <p className="text-4xl font-playfair text-luxury-gold">₹{amount.toFixed(2)}</p>
            </Card>

            {/* Payment Method Selection */}
            <div>
                <h3 className="text-lg font-playfair text-luxury-dark mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                        <motion.button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === method.id ? 'border-luxury-gold bg-luxury-cream' : 'border-luxury-border'
                                }`}
                        >
                            <span className="text-2xl mr-2">{method.icon}</span>
                            <span className={paymentMethod === method.id ? 'text-luxury-dark font-semibold' : 'text-luxury-text-muted'}>
                                {method.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleProcessPayment} className="space-y-4">
                {/* Credit/Debit Card Form */}
                {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div>
                            <label className="block text-sm font-montserrat text-luxury-dark mb-2">Cardholder Name</label>
                            <Input
                                type="text"
                                name="cardholderName"
                                placeholder="John Doe"
                                value={cardData.cardholderName}
                                onChange={handleCardChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-montserrat text-luxury-dark mb-2">Card Number</label>
                            <Input
                                type="text"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardData.cardNumber}
                                onChange={handleCardChange}
                                maxLength="19"
                                required
                            />
                            {cardData.cardNumber && (
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="secondary">{detectCardNetwork(cardData.cardNumber)}</Badge>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-montserrat text-luxury-dark mb-2">Expiry Date</label>
                                <Input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={cardData.expiryDate}
                                    onChange={handleCardChange}
                                    maxLength="5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-montserrat text-luxury-dark mb-2">CVV</label>
                                <Input
                                    type="text"
                                    name="cvv"
                                    placeholder="123"
                                    value={cardData.cvv}
                                    onChange={handleCardChange}
                                    maxLength="4"
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* UPI Form */}
                {paymentMethod === 'upi' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <label className="block text-sm font-montserrat text-luxury-dark mb-2">UPI ID</label>
                        <Input
                            type="text"
                            placeholder="username@bankname"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            required
                        />
                        <p className="text-xs text-luxury-text-muted mt-2">Example: johndoe@okhdfcbank</p>
                    </motion.div>
                )}

                {/* COD Message */}
                {paymentMethod === 'cod' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-luxury-cream p-4 rounded-lg">
                        <p className="text-luxury-dark text-sm">
                            You will pay <span className="font-bold text-luxury-gold">₹{amount.toFixed(2)}</span> when your order arrives.
                        </p>
                    </motion.div>
                )}

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1"
                    >
                        {isProcessing ? (
                            <>
                                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                    ⏳
                                </motion.span>
                                {' Processing...'}
                            </>
                        ) : (
                            `Pay ₹${amount.toFixed(2)}`
                        )}
                    </Button>
                </div>
            </form>

            {/* Security Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="bg-luxury-cream p-4 rounded-lg text-center">
                    <p className="text-xs text-luxury-text-muted">
                        🔒 Your payment information is encrypted and secure. We never store your card details.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentForm;
