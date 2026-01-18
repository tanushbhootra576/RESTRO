import express from 'express';
import {
    createBooking,
    getBookings,
    getBooking,
    updateBooking,
    cancelBooking
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.get('/:id', authenticate, getBooking);
router.put('/:id', authenticate, updateBooking);
router.delete('/:id', authenticate, cancelBooking);

export default router;
