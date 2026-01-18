import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
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
            default: 0,
            min: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
