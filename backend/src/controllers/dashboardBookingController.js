import Booking from '../models/Booking.js';
import { successResponse, errorResponse } from '../utils/responses.js';

const normalizeRole = (role) => {
    if (!role) return role;
    const normalized = role.toString().toLowerCase();
    if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
        return 'owner';
    }
    if (normalized === 'administrator') {
        return 'admin';
    }
    return normalized;
};

const getScopedRestaurantId = (req) => {
    const role = normalizeRole(req.user?.role);

    if (role === 'admin') {
        return req.query.restaurantId || req.body.restaurantId || null;
    }

    return req.user?.restaurantId || null;
};

export const getDashboardBookings = async (req, res) => {
    try {
        const role = normalizeRole(req.user?.role);
        const restaurantId = getScopedRestaurantId(req);

        if (role !== 'admin' && !restaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required for bookings');
        }

        const filter = restaurantId ? { restaurant: restaurantId } : {};

        const bookings = await Booking.find(filter)
            .populate('restaurant', 'name')
            .populate('customer', 'firstName lastName email');

        successResponse(res, 200, 'Bookings fetched', { bookings });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch bookings', error.message);
    }
};

export const updateDashboardBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, tableNumber, bookingDate, bookingTime, numberOfGuests, specialRequests } = req.body;

        const booking = await Booking.findById(id);

        if (!booking) {
            return errorResponse(res, 404, 'Booking not found');
        }

        const role = normalizeRole(req.user?.role);
        if (role !== 'admin' && booking.restaurant?.toString() !== req.user?.restaurantId) {
            return errorResponse(res, 403, 'Not authorized to update this booking');
        }

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return errorResponse(res, 400, 'Invalid booking status');
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status, tableNumber, bookingDate, bookingTime, numberOfGuests, specialRequests },
            { new: true, runValidators: true }
        );

        successResponse(res, 200, 'Booking updated', { booking: updatedBooking });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update booking', error.message);
    }
};
