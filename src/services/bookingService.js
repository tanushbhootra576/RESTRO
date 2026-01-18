import api from './api';

const BOOKING_BASE = '/bookings';

export const bookingService = {
    // Create booking
    createBooking: async (bookingData) => {
        try {
            const response = await api.post(BOOKING_BASE, bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get user bookings
    getUserBookings: async () => {
        try {
            const response = await api.get(BOOKING_BASE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get single booking
    getBooking: async (id) => {
        try {
            const response = await api.get(`${BOOKING_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update booking
    updateBooking: async (id, bookingData) => {
        try {
            const response = await api.put(`${BOOKING_BASE}/${id}`, bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Cancel booking
    cancelBooking: async (id) => {
        try {
            const response = await api.delete(`${BOOKING_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default bookingService;
