import { Router } from 'express';
import * as controller from '../controllers/order.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public checkout route: create new order
router.post('/', controller.createOrder);

// Admin routes: order retrieval and lifecycle management
router.get('/', requireAdmin, controller.getAllOrders);
router.get('/:id', requireAdmin, controller.getOrderById);
router.put('/:id', requireAdmin, controller.updateOrder);
router.patch('/:id/status', requireAdmin, controller.updateOrderStatus);
router.delete('/:id', requireAdmin, controller.deleteOrder);

export default router;
