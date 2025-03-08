import express from 'express';
import { register, login } from '../controllers/authController';
import { validateRegistration } from '../middleware/validateRegistration';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);

export default router; 