import { Router } from 'express';
import * as controller from '../controllers/content.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public: get page content JSON ('home' | 'about')
router.get('/content/:page', controller.getContent);

// Admin: save page content JSON document
router.put('/content/:page', requireAdmin, controller.saveContent);

// Public: get banners and gallery
router.get('/banners', controller.getBanners);
router.get('/gallery', controller.getGallery);

export default router;
