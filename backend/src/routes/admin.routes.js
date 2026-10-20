import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { adminOnly } from '../utils/adminGuard.js';

const router = Router();

router.use(adminOnly); // everything under /api/admin is admin only

router.get('/dashboard', controller.getDashboard);

router.get('/notifications', controller.listNotifications);
router.patch('/notifications/read-all', controller.markAllNotificationsRead);
router.patch('/notifications/:id/read', controller.markNotificationRead);

export default router;
