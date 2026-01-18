import api from './api';

const ORDER_BASE = '/orders';

export const orderService = {
    // Create order
    createOrder: async (orderData) => {
        try {
            const response = await api.post(ORDER_BASE, orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get user orders
    getUserOrders: async () => {
        try {
            const response = await api.get(ORDER_BASE);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get single order
    getOrder: async (id) => {
        try {
            const response = await api.get(`${ORDER_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update order status
    updateOrderStatus: async (id, status) => {
        try {
            const response = await api.put(`${ORDER_BASE}/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Cancel order
    cancelOrder: async (id) => {
        try {
            const response = await api.put(`${ORDER_BASE}/${id}/cancel`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default orderService;
