import api from './api';

const REVIEW_BASE = '/reviews';

export const reviewService = {
    createReview: async (reviewData) => {
        try {
            const response = await api.post(REVIEW_BASE, reviewData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getReviews: async (restaurantId) => {
        try {
            const response = await api.get(REVIEW_BASE, { params: { restaurantId } });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default reviewService;
