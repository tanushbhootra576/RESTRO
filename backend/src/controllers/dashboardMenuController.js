import MenuItem from '../models/MenuItem.js';
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
        return req.body.restaurantId || req.query.restaurantId || req.params.restaurantId || null;
    }

    return req.user?.restaurantId || null;
};

const buildRestaurantFilter = (restaurantId) => {
    if (!restaurantId) return {};
    return { $or: [{ restaurant: restaurantId }, { restaurantId }] };
};

export const getDashboardMenuItems = async (req, res) => {
    try {
        const restaurantId = getScopedRestaurantId(req);
        const role = normalizeRole(req.user?.role);

        if (role !== 'admin' && !restaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required for menu items');
        }

        const filter = buildRestaurantFilter(restaurantId);
        const menuItems = await MenuItem.find(filter).populate('restaurant', 'name');

        successResponse(res, 200, 'Menu items fetched', { menuItems });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch menu items', error.message);
    }
};

export const createDashboardMenuItem = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price,
            discountPrice,
            isVegetarian,
            isSpicy,
            preparationTime,
            tags,
            availability,
            image,
            images,
            restaurantId
        } = req.body;

        if (!name || !price) {
            return errorResponse(res, 400, 'Please provide menu item name and price');
        }

        const effectiveRestaurantId = restaurantId || req.user?.restaurantId;

        if (!effectiveRestaurantId) {
            return errorResponse(res, 400, 'Restaurant ID is required for menu item');
        }

        const menuItem = await MenuItem.create({
            restaurant: effectiveRestaurantId,
            restaurantId: effectiveRestaurantId,
            name,
            description,
            category,
            price,
            discountPrice,
            isVegetarian,
            isSpicy,
            preparationTime,
            tags,
            availability: availability ?? true,
            image: image || null,
            images: images || [],
            updatedBy: req.user?.userId || null
        });

        successResponse(res, 201, 'Menu item created', { menuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create menu item', error.message);
    }
};

export const updateDashboardMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            category,
            price,
            discountPrice,
            isVegetarian,
            isSpicy,
            preparationTime,
            tags,
            availability,
            image,
            images
        } = req.body;

        let menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        const itemRestaurantId = menuItem.restaurantId || menuItem.restaurant;
        const role = normalizeRole(req.user?.role);

        if (role !== 'admin' && itemRestaurantId?.toString() !== req.user?.restaurantId) {
            return errorResponse(res, 403, 'Not authorized to update this menu item');
        }

        menuItem = await MenuItem.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                price,
                discountPrice,
                isVegetarian,
                isSpicy,
                preparationTime,
                tags,
                availability,
                image,
                images,
                restaurantId: itemRestaurantId,
                updatedBy: req.user?.userId || null
            },
            { new: true, runValidators: true }
        );

        successResponse(res, 200, 'Menu item updated', { menuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update menu item', error.message);
    }
};

export const deleteDashboardMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        const itemRestaurantId = menuItem.restaurantId || menuItem.restaurant;
        const role = normalizeRole(req.user?.role);

        if (role !== 'admin' && itemRestaurantId?.toString() !== req.user?.restaurantId) {
            return errorResponse(res, 403, 'Not authorized to delete this menu item');
        }

        await MenuItem.findByIdAndDelete(id);

        successResponse(res, 200, 'Menu item deleted');
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete menu item', error.message);
    }
};

export const updateDashboardMenuStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        const itemRestaurantId = menuItem.restaurantId || menuItem.restaurant;
        const role = normalizeRole(req.user?.role);

        if (role !== 'admin' && itemRestaurantId?.toString() !== req.user?.restaurantId) {
            return errorResponse(res, 403, 'Not authorized to update this menu item');
        }

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            id,
            { availability: availability ?? !menuItem.availability, updatedBy: req.user?.userId || null },
            { new: true }
        );

        successResponse(res, 200, 'Menu item availability updated', { menuItem: updatedMenuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update menu item status', error.message);
    }
};
