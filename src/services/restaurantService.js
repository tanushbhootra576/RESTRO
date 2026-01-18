import api from './api';

const RESTAURANT_BASE = '/restaurants';

export const restaurantService = {
    // Create restaurant
    createRestaurant: async (restaurantData) => {
        try {
            const response = await api.post(RESTAURANT_BASE, restaurantData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get all restaurants
    getAllRestaurants: async () => {
        try {
            const response = await api.get(RESTAURANT_BASE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get single restaurant
    getRestaurant: async (id) => {
        try {
            const response = await api.get(`${RESTAURANT_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update restaurant
    updateRestaurant: async (id, restaurantData) => {
        try {
            const response = await api.put(`${RESTAURANT_BASE}/${id}`, restaurantData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete restaurant
    deleteRestaurant: async (id) => {
        try {
            const response = await api.delete(`${RESTAURANT_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default restaurantService;
