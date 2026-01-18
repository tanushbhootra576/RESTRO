import MenuItem from '../models/MenuItem.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createMenuItem = async (req, res) => {
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
            restaurantId
        } = req.body;

        if (!name || !price) {
            return errorResponse(res, 400, 'Please provide menu item name and price');
        }

        const effectiveRestaurantId = req.user.restaurantId || restaurantId;

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
            image: req.file?.path || null,
            updatedBy: req.user.userId
        });

        successResponse(res, 201, 'Menu item created', { menuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create menu item', error.message);
    }
};

export const getMenuItems = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        const filter = {};
        if (restaurantId) {
            filter.$or = [{ restaurant: restaurantId }, { restaurantId }];
        }

        const menuItems = await MenuItem.find(filter).populate('restaurant', 'name');

        successResponse(res, 200, 'Menu items fetched', { menuItems });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch menu items', error.message);
    }
};

export const getMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await MenuItem.findById(id).populate('restaurant', 'name');

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        successResponse(res, 200, 'Menu item fetched', { menuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch menu item', error.message);
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price, discountPrice, isVegetarian, isSpicy, preparationTime, tags, availability } = req.body;

        let menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        // Check authorization
        const itemRestaurantId = menuItem.restaurantId || menuItem.restaurant;

        if (itemRestaurantId?.toString() !== req.user.restaurantId && req.user.role !== 'admin') {
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
                restaurantId: itemRestaurantId,
                updatedBy: req.user.userId
            },
            { new: true, runValidators: true }
        );

        successResponse(res, 200, 'Menu item updated', { menuItem });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update menu item', error.message);
    }
};

export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        // Check authorization
        const itemRestaurantId = menuItem.restaurantId || menuItem.restaurant;

        if (itemRestaurantId?.toString() !== req.user.restaurantId && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Not authorized to delete this menu item');
        }

        await MenuItem.findByIdAndDelete(id);

        successResponse(res, 200, 'Menu item deleted');
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete menu item', error.message);
    }
};
