import { Router } from 'express';
import * as controller from '../controllers/contact.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/', controller.createMessage);
router.get('/info', controller.getContactInfo);

// Admin routes: storefront contact coordinates
router.put('/info', requireAdmin, controller.updateContactInfo);

// Admin routes: retrieve and manage contact inquiries
router.get('/', requireAdmin, controller.getAllMessages);
router.get('/:id', requireAdmin, controller.getMessageById);
router.put('/:id', requireAdmin, controller.updateMessage);
router.post('/:id/reply', requireAdmin, controller.sendReplyMessage);
router.delete('/:id', requireAdmin, controller.deleteMessage);

export default router;
