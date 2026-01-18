import api from './api';

const AUTH_BASE = '/auth';

export const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post(`${AUTH_BASE}/register`, userData);
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            const response = await api.post(`${AUTH_BASE}/login`, { email, password });
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.data.tokens.refreshToken);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get current user
    getCurrentUser: async () => {
        try {
            const response = await api.get(`${AUTH_BASE}/me`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            const response = await api.post(`${AUTH_BASE}/logout`);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Refresh token
    refreshToken: async (refreshToken) => {
        try {
            const response = await api.post(`${AUTH_BASE}/refresh-token`, { refreshToken });
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default authService;
