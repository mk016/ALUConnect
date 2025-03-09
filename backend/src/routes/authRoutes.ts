import express from 'express';
import { register, login, updateProfile } from '../controllers/authController';
import { validateRegistration } from '../middleware/validateRegistration';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.put('/profile/:id', authenticateToken, updateProfile);

export default router; 