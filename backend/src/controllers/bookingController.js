import Booking from '../models/Booking.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createBooking = async (req, res) => {
    try {
        const { restaurant, numberOfGuests, bookingDate, bookingTime, specialRequests, phoneNumber, email } = req.body;

        if (!restaurant || !numberOfGuests || !bookingDate || !bookingTime) {
            return errorResponse(res, 400, 'Please provide all required fields');
        }

        const booking = await Booking.create({
            customer: req.user.userId,
            restaurant,
            numberOfGuests,
            bookingDate,
            bookingTime,
            specialRequests,
            phoneNumber,
            email
        });

        successResponse(res, 201, 'Booking created successfully', { booking });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create booking', error.message);
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user.userId })
            .populate('restaurant', 'name');

        successResponse(res, 200, 'Bookings fetched', { bookings });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch bookings', error.message);
    }
};

export const getBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate('restaurant')
            .populate('customer');

        if (!booking) {
            return errorResponse(res, 404, 'Booking not found');
        }

        successResponse(res, 200, 'Booking fetched', { booking });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch booking', error.message);
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { numberOfGuests, bookingDate, bookingTime, specialRequests } = req.body;

        let booking = await Booking.findById(id);

        if (!booking) {
            return errorResponse(res, 404, 'Booking not found');
        }

        booking = await Booking.findByIdAndUpdate(
            id,
            { numberOfGuests, bookingDate, bookingTime, specialRequests },
            { new: true }
        );

        successResponse(res, 200, 'Booking updated', { booking });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update booking', error.message);
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return errorResponse(res, 404, 'Booking not found');
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true }
        );

        successResponse(res, 200, 'Booking cancelled', { booking: updatedBooking });
    } catch (error) {
        errorResponse(res, 500, 'Failed to cancel booking', error.message);
    }
};
