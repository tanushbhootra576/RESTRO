import api from './api';

const USER_BASE = '/users';

export const userService = {
    getProfile: async () => {
        try {
            const response = await api.get(`${USER_BASE}/me`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put(`${USER_BASE}/me`, profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default userService;
