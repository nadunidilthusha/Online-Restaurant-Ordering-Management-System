
import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/dashboard
router.get('/dashboard', requireAdmin, controller.getDashboard);

// GET /api/admin/notifications
router.get('/notifications', requireAdmin, controller.listNotifications);

// PATCH /api/admin/notifications/:id/read
router.patch(
  '/notifications/:id/read',
  requireAdmin,
  controller.markNotificationRead
);

// PATCH /api/admin/notifications/read-all
router.patch(
  '/notifications/read-all',
  requireAdmin,
  controller.markAllNotificationsRead
);

export default router;
