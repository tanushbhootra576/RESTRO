import { verifyAccessToken } from '../utils/tokenUtils.js';
import { errorResponse } from '../utils/responses.js';

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

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return errorResponse(res, 401, 'No token provided. Please login.');
        }

        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return errorResponse(res, 401, 'Invalid or expired token. Please login again.');
        }

        req.user = { ...decoded, role: normalizeRole(decoded.role) };
        next();
    } catch (error) {
        errorResponse(res, 500, 'Authentication error', error.message);
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return errorResponse(res, 401, 'User not authenticated');
        }

        const allowedRoles = roles.map(normalizeRole);
        const currentRole = normalizeRole(req.user.role);

        if (!allowedRoles.includes(currentRole)) {
            return errorResponse(res, 403, 'You do not have permission to access this resource');
        }

        next();
    };
};

export const ownerOrAdmin = (req, res, next) => {
    if (!req.user) {
        return errorResponse(res, 401, 'User not authenticated');
    }

    const currentRole = normalizeRole(req.user.role);

    if (currentRole !== 'owner' && currentRole !== 'admin') {
        return errorResponse(res, 403, 'Only restaurant owners and admins can access this resource');
    }

    next();
};
