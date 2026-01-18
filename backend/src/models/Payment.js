import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: false,
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: false,
        },
        method: {
            type: String,
            enum: ['credit_card', 'debit_card', 'upi', 'wallet', 'cod', 'bank_transfer'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: 'INR',
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
            default: 'pending',
            index: true,
        },
        reference: {
            type: String,
            sparse: true,
        },
        metadata: {
            cardLast4: String,
            upiId: String,
            bankName: String,
            walletProvider: String,
        },
        failureReason: String,
        timestamp: {
            type: Date,
            default: Date.now,
        },
        completedAt: Date,
        refundedAt: Date,
        refundAmount: Number,
        notes: String,
    },
    { timestamps: true }
);

// Index for faster queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });

// Virtual for payment age
paymentSchema.virtual('ageInHours').get(function () {
    return Math.floor((Date.now() - this.timestamp) / (1000 * 60 * 60));
});

// Method to check if payment is refundable
paymentSchema.methods.isRefundable = function () {
    return this.status === 'completed' && !this.refundedAt;
};

// Method to mask sensitive data
paymentSchema.methods.toSafeJSON = function () {
    const obj = this.toObject();
    if (obj.metadata?.cardLast4) {
        obj.metadata.cardLast4 = `****${obj.metadata.cardLast4}`;
    }
    if (obj.metadata?.upiId) {
        const [upiUsername] = obj.metadata.upiId.split('@');
        obj.metadata.upiId = `${upiUsername.substring(0, 2)}***@${obj.metadata.upiId.split('@')[1]}`;
    }
    return obj;
};

export default mongoose.model('Payment', paymentSchema);
