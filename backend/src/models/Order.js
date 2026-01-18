import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'MenuItem',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                },
                specialInstructions: String,
                _id: false
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        discountAmount: {
            type: Number,
            default: 0,
            min: 0
        },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coupon',
            default: null
        },
        deliveryCharge: {
            type: Number,
            default: 0,
            min: 0
        },
        tax: {
            type: Number,
            default: 0,
            min: 0
        },
        finalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: [
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'out_for_delivery',
                'delivered',
                'cancelled'
            ],
            default: 'pending'
        },
        orderType: {
            type: String,
            enum: ['delivery', 'pickup', 'dine-in'],
            required: true
        },
        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'cash', 'upi', 'wallet'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
        stripePaymentId: String,
        estimatedDeliveryTime: Date,
        actualDeliveryTime: Date,
        notes: String
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
