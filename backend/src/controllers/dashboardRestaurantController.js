import Restaurant from '../models/Restaurant.js';
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

const resolveRestaurantId = (req) => {
    const role = normalizeRole(req.user?.role);
    if (role === 'admin') {
        return req.params.id || req.query.restaurantId || req.body.restaurantId || null;
    }

    return req.user?.restaurantId || null;
};

export const getDashboardRestaurant = async (req, res) => {
    try {
        const restaurantId = resolveRestaurantId(req);

        if (!restaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required');
        }

        const restaurant = await Restaurant.findById(restaurantId).populate('owner', 'firstName lastName email');

        if (!restaurant) {
            return errorResponse(res, 404, 'Restaurant not found');
        }

        successResponse(res, 200, 'Restaurant fetched', { restaurant });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch restaurant', error.message);
    }
};

export const updateDashboardRestaurant = async (req, res) => {
    try {
        const restaurantId = resolveRestaurantId(req);
        const { name, description, cuisine, address, phone, email, website, operatingHours } = req.body;

        if (!restaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required');
        }

        let restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return errorResponse(res, 404, 'Restaurant not found');
        }

        const role = normalizeRole(req.user?.role);
        if (role !== 'admin' && restaurant.owner?.toString() !== req.user?.userId) {
            return errorResponse(res, 403, 'Not authorized to update this restaurant');
        }

        restaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { name, description, cuisine, address, phone, email, website, operatingHours },
            { new: true, runValidators: true }
        );

        successResponse(res, 200, 'Restaurant updated', { restaurant });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update restaurant', error.message);
    }
};
