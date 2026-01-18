import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createRestaurant = async (req, res) => {
    try {
        const { name, description, cuisine, address, phone, email, website, operatingHours } = req.body;

        if (!name || !address) {
            return errorResponse(res, 400, 'Please provide restaurant name and address');
        }

        const restaurant = await Restaurant.create({
            name,
            description,
            cuisine,
            address,
            phone,
            email,
            website,
            operatingHours,
            owner: req.user.userId
        });

        // Update user's restaurant field
        await User.findByIdAndUpdate(req.user.userId, { restaurant: restaurant._id });

        successResponse(res, 201, 'Restaurant created successfully', { restaurant });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create restaurant', error.message);
    }
};

export const getRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id).populate('owner', 'firstName lastName email');

        if (!restaurant) {
            return errorResponse(res, 404, 'Restaurant not found');
        }

        successResponse(res, 200, 'Restaurant fetched', { restaurant });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch restaurant', error.message);
    }
};

export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isActive: true }).populate('owner', 'firstName lastName');

        successResponse(res, 200, 'Restaurants fetched', { restaurants });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch restaurants', error.message);
    }
};

export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, cuisine, address, phone, email, website, operatingHours } = req.body;

        let restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return errorResponse(res, 404, 'Restaurant not found');
        }

        // Check authorization
        if (restaurant.owner.toString() !== req.user.userId && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Not authorized to update this restaurant');
        }

        restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { name, description, cuisine, address, phone, email, website, operatingHours },
            { new: true, runValidators: true }
        );

        successResponse(res, 200, 'Restaurant updated', { restaurant });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update restaurant', error.message);
    }
};

export const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return errorResponse(res, 404, 'Restaurant not found');
        }

        // Check authorization
        if (restaurant.owner.toString() !== req.user.userId && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Not authorized to delete this restaurant');
        }

        await Restaurant.findByIdAndUpdate(id, { isActive: false });

        successResponse(res, 200, 'Restaurant deleted successfully');
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete restaurant', error.message);
    }
};
