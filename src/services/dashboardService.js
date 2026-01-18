import api from './api';

const normalizeRole = (role) => {
    if (!role) return role;
    const normalized = role.toLowerCase();
    if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
        return 'owner';
    }
    if (normalized === 'administrator') {
        return 'admin';
    }
    return normalized;
};

const getBasePath = (role) => {
    const normalized = normalizeRole(role);
    return normalized === 'admin' ? '/admin' : '/owner';
};

export const dashboardService = {
    getMenuItems: async (role, restaurantId) => {
        const base = getBasePath(role);
        const params = restaurantId ? { restaurantId } : {};
        const response = await api.get(`${base}/menu`, { params });
        return response.data;
    },
    createMenuItem: async (role, payload) => {
        const base = getBasePath(role);
        const response = await api.post(`${base}/menu`, payload);
        return response.data;
    },
    updateMenuItem: async (role, id, payload) => {
        const base = getBasePath(role);
        const response = await api.put(`${base}/menu/${id}`, payload);
        return response.data;
    },
    deleteMenuItem: async (role, id) => {
        const base = getBasePath(role);
        const response = await api.delete(`${base}/menu/${id}`);
        return response.data;
    },
    updateMenuStatus: async (role, id, availability) => {
        const base = getBasePath(role);
        const response = await api.patch(`${base}/menu/${id}/status`, { availability });
        return response.data;
    },
    getOrders: async (role, restaurantId) => {
        const base = getBasePath(role);
        const params = restaurantId ? { restaurantId } : {};
        const response = await api.get(`${base}/orders`, { params });
        return response.data;
    },
    updateOrderStatus: async (role, id, status) => {
        const base = getBasePath(role);
        const response = await api.patch(`${base}/orders/${id}/status`, { status });
        return response.data;
    },
    getBookings: async (role, restaurantId) => {
        const base = getBasePath(role);
        const params = restaurantId ? { restaurantId } : {};
        const response = await api.get(`${base}/bookings`, { params });
        return response.data;
    },
    updateBooking: async (role, id, payload) => {
        const base = getBasePath(role);
        const response = await api.patch(`${base}/bookings/${id}`, payload);
        return response.data;
    },
    getRestaurant: async (role, restaurantId) => {
        const base = getBasePath(role);
        const path = normalizeRole(role) === 'admin' ? `${base}/restaurant/${restaurantId}` : `${base}/restaurant`;
        const response = await api.get(path);
        return response.data;
    },
    updateRestaurant: async (role, payload, restaurantId) => {
        const base = getBasePath(role);
        const path = normalizeRole(role) === 'admin' ? `${base}/restaurant/${restaurantId}` : `${base}/restaurant`;
        const response = await api.put(path, payload);
        return response.data;
    }
};

export default dashboardService;
