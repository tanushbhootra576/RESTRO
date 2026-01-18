import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);

export default router;
