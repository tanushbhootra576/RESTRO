import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide restaurant name'],
            trim: true,
            unique: true,
            maxLength: [100, 'Name cannot exceed 100 characters']
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            maxLength: [500, 'Description cannot exceed 500 characters']
        },
        cuisine: {
            type: [String],
            default: []
        },
        logo: String,
        banner: String,
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: String,
            zipCode: String,
            country: String,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        },
        phone: {
            type: String,
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        },
        website: String,
        operatingHours: {
            monday: { open: String, close: String },
            tuesday: { open: String, close: String },
            wednesday: { open: String, close: String },
            thursday: { open: String, close: String },
            friday: { open: String, close: String },
            saturday: { open: String, close: String },
            sunday: { open: String, close: String }
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        reviewCount: {
            type: Number,
            default: 0
        },
        images: {
            type: [String],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true
        },
        subscriptionPlan: {
            type: String,
            enum: ['free', 'basic', 'premium'],
            default: 'free'
        }
    },
    { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
