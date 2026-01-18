import express from 'express';
import {
    createReview,
    getReviews,
    updateReview,
    deleteReview
} from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createReview);
router.get('/', getReviews);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;
