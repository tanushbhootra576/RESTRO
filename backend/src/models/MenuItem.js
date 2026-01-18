import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: null
        },
        name: {
            type: String,
            required: [true, 'Please provide menu item name'],
            trim: true
        },
        description: String,
        category: {
            type: String,
            enum: ['appetizer', 'main', 'dessert', 'drink', 'beverage'],
            default: 'main'
        },
        price: {
            type: Number,
            required: [true, 'Please provide price'],
            min: 0
        },
        discountPrice: {
            type: Number,
            min: 0
        },
        image: String,
        images: {
            type: [String],
            default: []
        },
        isVegetarian: {
            type: Boolean,
            default: false
        },
        isSpicy: {
            type: Boolean,
            default: false
        },
        preparationTime: {
            type: Number,
            default: 30
        },
        availability: {
            type: Boolean,
            default: true
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        tags: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
