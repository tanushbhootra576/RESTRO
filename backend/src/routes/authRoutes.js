import express from 'express';
import { register, login, getMe, logout, refreshToken } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/refresh-token', refreshToken);
router.get('/me', authenticate, getMe);

export default router;
