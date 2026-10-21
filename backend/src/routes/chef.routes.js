import express from 'express';
import * as chefController from '../controllers/chef.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes (Customers viewing the site)
router.get('/', chefController.getAllChefs);
router.get('/:id', chefController.getChefById);

// Protected routes (Requires Admin Login)
router.post('/', requireAdmin, chefController.createChef);
router.put('/:id', requireAdmin, chefController.updateChef);
router.delete('/:id', requireAdmin, chefController.deleteChef);

export default router;