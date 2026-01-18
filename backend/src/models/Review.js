import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: 1,
            max: 5
        },
        title: {
            type: String,
            trim: true,
            maxLength: [100, 'Title cannot exceed 100 characters']
        },
        comment: {
            type: String,
            maxLength: [1000, 'Comment cannot exceed 1000 characters']
        },
        photos: {
            type: [String],
            default: []
        },
        isVerifiedPurchase: {
            type: Boolean,
            default: false
        },
        helpful: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
