import Review from '../models/Review.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const createReview = async (req, res) => {
    try {
        const { restaurant, rating, title, comment, photos } = req.body;

        if (!restaurant || !rating) {
            return errorResponse(res, 400, 'Please provide restaurant and rating');
        }

        const review = await Review.create({
            restaurant,
            user: req.user.userId,
            rating,
            title,
            comment,
            photos,
            isVerifiedPurchase: true
        });

        successResponse(res, 201, 'Review created', { review });
    } catch (error) {
        errorResponse(res, 500, 'Failed to create review', error.message);
    }
};

export const getReviews = async (req, res) => {
    try {
        const { restaurantId } = req.query;

        const reviews = await Review.find({ restaurant: restaurantId })
            .populate('user', 'firstName lastName profilePicture')
            .sort({ createdAt: -1 });

        successResponse(res, 200, 'Reviews fetched', { reviews });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch reviews', error.message);
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, title, comment } = req.body;

        let review = await Review.findById(id);

        if (!review) {
            return errorResponse(res, 404, 'Review not found');
        }

        review = await Review.findByIdAndUpdate(
            id,
            { rating, title, comment },
            { new: true }
        );

        successResponse(res, 200, 'Review updated', { review });
    } catch (error) {
        errorResponse(res, 500, 'Failed to update review', error.message);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return errorResponse(res, 404, 'Review not found');
        }

        await Review.findByIdAndDelete(id);

        successResponse(res, 200, 'Review deleted');
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete review', error.message);
    }
};
