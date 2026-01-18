import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        code: {
            type: String,
            required: [true, 'Please provide coupon code'],
            unique: true,
            uppercase: true,
            trim: true
        },
        description: String,
        discountType: {
            type: String,
            enum: ['percentage', 'fixed'],
            required: true
        },
        discountValue: {
            type: Number,
            required: [true, 'Please provide discount value'],
            min: 0
        },
        maxDiscount: {
            type: Number,
            min: 0
        },
        minOrderAmount: {
            type: Number,
            default: 0,
            min: 0
        },
        maxUses: {
            type: Number,
            default: null
        },
        currentUses: {
            type: Number,
            default: 0
        },
        usedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
