import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes (Customers viewing the site)
router.get('/categories', menuController.getCategories);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);

// Protected routes (Requires Admin Login)
router.post('/', requireAdmin, menuController.createMenuItem);
router.put('/:id', requireAdmin, menuController.updateMenuItem);
router.delete('/:id', requireAdmin, menuController.deleteMenuItem);

export default router;