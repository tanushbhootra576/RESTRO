import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import { successResponse, errorResponse } from '../utils/responses.js';

const normalizeRole = (role) => {
    if (!role) return 'customer';
    const normalized = role.toString().toLowerCase();
    if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
        return 'owner';
    }
    if (normalized === 'administrator') {
        return 'admin';
    }
    if (['admin', 'owner', 'customer'].includes(normalized)) {
        return normalized;
    }
    return 'customer';
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;
        const rawPhone = typeof phone === 'string' ? phone.trim() : phone;
        const digitsOnlyPhone = typeof rawPhone === 'string' ? rawPhone.replace(/\D/g, '') : '';

        if (digitsOnlyPhone && digitsOnlyPhone.length !== 10) {
            return errorResponse(res, 400, 'Please provide a valid 10-digit phone number');
        }

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return errorResponse(res, 400, 'Please provide all required fields');
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return errorResponse(res, 400, 'Email already registered');
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone: digitsOnlyPhone || undefined,
            role: normalizeRole(role)
        });

        // Generate tokens
        const accessToken = generateAccessToken(user._id, user.email, user.role);
        const refreshToken = generateRefreshToken(user._id);

        // Return response
        successResponse(res, 201, 'User registered successfully', {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            return errorResponse(res, 400, 'Registration failed', error.message);
        }
        if (error.code === 11000) {
            return errorResponse(res, 400, 'Email already registered');
        }
        errorResponse(res, 500, 'Registration failed', error.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return errorResponse(res, 400, 'Please provide email and password');
        }

        // Check user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid credentials');
        }

        // Check if user is active
        if (!user.isActive) {
            return errorResponse(res, 403, 'Your account has been deactivated');
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id, user.email, user.role, user.restaurant);
        const refreshToken = generateRefreshToken(user._id);

        successResponse(res, 200, 'Login successful', {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                restaurant: user.restaurant
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        errorResponse(res, 500, 'Login failed', error.message);
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('restaurant');

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        successResponse(res, 200, 'User details fetched', {
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
        errorResponse(res, 500, 'Failed to fetch user', error.message);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return errorResponse(res, 400, 'Refresh token is required');
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        const newAccessToken = generateAccessToken(user._id, user.email, user.role, user.restaurant);

        successResponse(res, 200, 'Token refreshed', {
            accessToken: newAccessToken
        });
    } catch (error) {
        errorResponse(res, 401, 'Invalid refresh token', error.message);
    }
};

export const logout = async (req, res) => {
    try {
        successResponse(res, 200, 'Logged out successfully');
    } catch (error) {
        errorResponse(res, 500, 'Logout failed', error.message);
    }
};
