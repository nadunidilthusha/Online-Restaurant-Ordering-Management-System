import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/dashboard -> { kpis, revenue, statuses, recentOrders, recentMessages, topDishes, contentStatus }
router.get('/dashboard', requireAdmin, controller.getDashboardData);

// GET /api/admin/notifications -> [{ id, type, title, text, createdAt, read, link }]
router.get('/notifications', requireAdmin, controller.getNotifications);

// PATCH /api/admin/notifications/:id/read
router.patch('/notifications/:id/read', requireAdmin, controller.markNotificationRead);

// PATCH /api/admin/notifications/read-all
router.patch('/notifications/read-all', requireAdmin, controller.markAllNotificationsRead);

export default router;
