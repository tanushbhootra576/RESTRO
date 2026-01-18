import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
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
        numberOfGuests: {
            type: Number,
            required: [true, 'Please provide number of guests'],
            min: 1
        },
        bookingDate: {
            type: Date,
            required: [true, 'Please provide booking date']
        },
        bookingTime: {
            type: String,
            required: [true, 'Please provide booking time']
        },
        specialRequests: String,
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending'
        },
        tableNumber: Number,
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
