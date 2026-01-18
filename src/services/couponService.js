import api from './api';

const COUPON_BASE = '/coupons';

export const couponService = {
    // Get coupons
    getCoupons: async (restaurantId = null) => {
        try {
            const params = restaurantId ? { restaurantId } : {};
            const response = await api.get(COUPON_BASE, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Validate coupon
    validateCoupon: async (code, restaurantId, orderAmount) => {
        try {
            const response = await api.post(`${COUPON_BASE}/validate`, {
                code,
                restaurantId,
                orderAmount
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default couponService;
