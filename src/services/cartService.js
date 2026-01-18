import api from './api';

const CART_BASE = '/cart';

export const cartService = {
    // Get cart
    getCart: async () => {
        try {
            const response = await api.get(CART_BASE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Add to cart
    addToCart: async (cartData) => {
        try {
            const response = await api.post(`${CART_BASE}/items`, cartData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Remove from cart
    removeFromCart: async (itemId) => {
        try {
            const response = await api.delete(`${CART_BASE}/items/${itemId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Clear cart
    clearCart: async () => {
        try {
            const response = await api.delete(CART_BASE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default cartService;
