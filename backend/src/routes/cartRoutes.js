import express from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/items', authenticate, addToCart);
router.delete('/items/:itemId', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

export default router;
