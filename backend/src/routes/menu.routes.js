import express from 'express';
import * as menuController from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/categories', menuController.getCategories);
router.post('/', menuController.createMenuItem);
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

export default router;