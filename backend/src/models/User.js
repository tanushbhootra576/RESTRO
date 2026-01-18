import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide first name'],
            trim: true,
            maxLength: [50, 'First name cannot exceed 50 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Please provide last name'],
            trim: true,
            maxLength: [50, 'Last name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email'
            ]
        },
        phone: {
            type: String,
            match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: [6, 'Password must be at least 6 characters'],
            select: false
        },
        role: {
            type: String,
            enum: ['customer', 'owner', 'admin'],
            default: 'customer'
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            default: null
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String
        },
        profilePicture: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
