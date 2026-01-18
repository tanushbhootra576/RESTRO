import Coupon from '../models/Coupon.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createCoupon = async (req, res) => {
    try {
        const { code, description, discountType, discountValue, maxDiscount, minOrderAmount, maxUses, startDate, endDate } = req.body;

        if (!code || !discountType || !discountValue) {
            return errorResponse(res, 400, 'Please provide required coupon fields');
        }

        const coupon = await Coupon.create({
            restaurant: req.user.restaurantId,
            code,
            description,
            discountType,
            discountValue,
            maxDiscount,
            minOrderAmount,
            maxUses,
            startDate,
            endDate
        });

        successResponse(res, 201, 'Coupon created', { coupon });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create coupon', error.message);
    }
};

export const getCoupons = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        const coupons = await Coupon.find({
            ...(restaurantId && { restaurant: restaurantId }),
            isActive: true
        });

        successResponse(res, 200, 'Coupons fetched', { coupons });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch coupons', error.message);
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code, restaurantId, orderAmount } = req.body;

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            restaurant: restaurantId,
            isActive: true
        });

        if (!coupon) {
            return errorResponse(res, 404, 'Coupon not found or expired');
        }

        const now = new Date();
        if (coupon.startDate > now || coupon.endDate < now) {
            return errorResponse(res, 400, 'Coupon is not valid for this period');
        }

        if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
            return errorResponse(res, 400, `Minimum order amount of ₹${coupon.minOrderAmount} required`);
        }

        if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
            return errorResponse(res, 400, 'Coupon usage limit exceeded');
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (orderAmount * coupon.discountValue) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else {
            discount = coupon.discountValue;
        }

        successResponse(res, 200, 'Coupon valid', {
            coupon: {
                code: coupon.code,
                discount,
                discountType: coupon.discountType
            }
        });
    } catch (error) {
        errorResponse(res, 500, 'Coupon validation failed', error.message);
    }
};
