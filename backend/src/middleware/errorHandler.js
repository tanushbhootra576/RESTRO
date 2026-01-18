import { errorResponse } from '../utils/responses.js';

export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors)
            .map((error) => error.message)
            .join(', ');
        return errorResponse(res, 400, 'Validation Error', { details: messages });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return errorResponse(res, 400, `${field} already exists`);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 401, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Token expired');
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    errorResponse(res, statusCode, message);
};

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
