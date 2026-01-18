import Order from '../models/Order.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createOrder = async (req, res) => {
    try {
        const { restaurant, items, totalAmount, discountAmount, deliveryCharge, tax, finalAmount, orderType, deliveryAddress, paymentMethod, notes } = req.body;

        if (!restaurant || !items || items.length === 0) {
            return errorResponse(res, 400, 'Please provide restaurant and menu items');
        }

        const order = await Order.create({
            customer: req.user.userId,
            restaurant,
            items,
            totalAmount,
            discountAmount,
            deliveryCharge,
            tax,
            finalAmount,
            orderType,
            deliveryAddress,
            paymentMethod,
            paymentStatus: paymentMethod === 'card' ? 'pending' : 'completed',
            notes
        });

        successResponse(res, 201, 'Order created successfully', { order });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create order', error.message);
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.userId })
            .populate('restaurant', 'name')
            .populate('items.menuItem', 'name price');

        successResponse(res, 200, 'Orders fetched', { orders });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch orders', error.message);
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate('customer')
            .populate('restaurant')
            .populate('items.menuItem');

        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }

        successResponse(res, 200, 'Order fetched', { order });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch order', error.message);
    }
};

export const updateOrderStatus = async (req, res) => {
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

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        successResponse(res, 200, 'Order status updated', { order: updatedOrder });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update order', error.message);
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return errorResponse(res, 404, 'Order not found');
        }

        if (order.status !== 'pending' && order.status !== 'confirmed') {
            return errorResponse(res, 400, 'Cannot cancel order in current status');
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true }
        );

        successResponse(res, 200, 'Order cancelled', { order: updatedOrder });
    } catch (error) {
        errorResponse(res, 500, 'Failed to cancel order', error.message);
    }
};
