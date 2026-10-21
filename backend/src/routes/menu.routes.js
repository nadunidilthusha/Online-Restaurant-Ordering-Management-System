import express from 'express';
import * as menuController from '../controllers/menu.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { menuSchema } from '../validators/menu.schema.js';

const router = express.Router();

router.get('/categories', menuController.getCategories);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);

// Apply validation specifically to POST and PUT routes
router.post('/', requireAdmin, validate(menuSchema), menuController.createMenuItem);
router.put('/:id', requireAdmin, validate(menuSchema), menuController.updateMenuItem);
router.delete('/:id', requireAdmin, menuController.deleteMenuItem);

export default router;