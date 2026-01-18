import api from './api';

const MENU_BASE = '/menu';

export const menuService = {
    // Create menu item
    createMenuItem: async (menuData) => {
        try {
            const response = await api.post(MENU_BASE, menuData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get all menu items
    getMenuItems: async (restaurantId = null) => {
        try {
            const params = restaurantId ? { restaurantId } : {};
            const response = await api.get(MENU_BASE, { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get single menu item
    getMenuItem: async (id) => {
        try {
            const response = await api.get(`${MENU_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update menu item
    updateMenuItem: async (id, menuData) => {
        try {
            const response = await api.put(`${MENU_BASE}/${id}`, menuData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete menu item
    deleteMenuItem: async (id) => {
        try {
            const response = await api.delete(`${MENU_BASE}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default menuService;
