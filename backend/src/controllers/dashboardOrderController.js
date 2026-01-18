import Order from '../models/Order.js';
import { successResponse, errorResponse } from '../utils/responses.js';

const normalizeRole = (role) => {
    if (!role) return role;
    const normalized = role.toString().toLowerCase();
    if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
        return 'owner';
    }
    if (normalized === 'administrator') {
        return 'admin';
    }
    return normalized;
};

const getScopedRestaurantId = (req) => {
    const role = normalizeRole(req.user?.role);

    if (role === 'admin') {
        return req.query.restaurantId || req.body.restaurantId || null;
    }

    return req.user?.restaurantId || null;
};

export const getDashboardOrders = async (req, res) => {
    try {
        const role = normalizeRole(req.user?.role);
        const restaurantId = getScopedRestaurantId(req);

        if (role !== 'admin' && !restaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required for orders');
        }

        const filter = restaurantId ? { restaurant: restaurantId } : {};

        const orders = await Order.find(filter)
            .populate('customer', 'firstName lastName email')
            .populate('restaurant', 'name')
            .populate('items.menuItem', 'name price');

        successResponse(res, 200, 'Orders fetched', { orders });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch orders', error.message);
    }
};

export const updateDashboardOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }

        const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return errorResponse(res, 400, 'Invalid order status');
        }

        const role = normalizeRole(req.user?.role);
        if (role !== 'admin' && order.restaurant?.toString() !== req.user?.restaurantId) {
            return errorResponse(res, 403, 'Not authorized to update this order');
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        successResponse(res, 200, 'Order status updated', { order: updatedOrder });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update order status', error.message);
    }
};
