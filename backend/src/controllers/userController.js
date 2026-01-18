import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('restaurant');

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        successResponse(res, 200, 'Profile fetched', {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                restaurant: user.restaurant,
                address: user.address,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch profile', error.message);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, address, profilePicture } = req.body;

        const updates = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(phone && { phone }),
            ...(address && { address }),
            ...(profilePicture && { profilePicture })
        };

        const user = await User.findByIdAndUpdate(req.user.userId, updates, {
            new: true,
            runValidators: true
        }).populate('restaurant');

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        successResponse(res, 200, 'Profile updated', {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                restaurant: user.restaurant,
                address: user.address,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update profile', error.message);
    }
};
