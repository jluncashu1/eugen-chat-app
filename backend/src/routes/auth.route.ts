import express from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller';
import protectRoute from '../middleware/protectRoute';

const router = express.Router();

router.get('/me', protectRoute, getMe)

router.post('/signup', register);

router.post('/login', login);

router.post('/logout', logout);

export default router;