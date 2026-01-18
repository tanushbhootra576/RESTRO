import express from 'express';
import {
    createRestaurant,
    getRestaurant,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant
} from '../controllers/restaurantController.js';
import { authenticate, authorize, ownerOrAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('owner', 'admin'), createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurant);
router.put('/:id', authenticate, ownerOrAdmin, updateRestaurant);
router.delete('/:id', authenticate, ownerOrAdmin, deleteRestaurant);

export default router;
