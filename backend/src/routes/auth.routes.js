import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login -> { token, admin: { id, name, email, role } }
router.post('/login', authController.login);

// POST /api/auth/register -> Admin registration / provisioning
router.post('/register', authController.register);

// GET /api/auth/me -> { id, name, email, role } (protected, admin only)
router.get('/me', requireAdmin, authController.me);

export default router;
