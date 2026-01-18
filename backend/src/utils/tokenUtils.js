import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, email, role, restaurantId = null) => {
    const payload = {
        userId,
        email,
        role,
        ...(restaurantId && { restaurantId })
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '15m'
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId, type: 'refresh' }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    });
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};
