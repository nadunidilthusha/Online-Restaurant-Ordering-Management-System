import { Router } from 'express';
import * as controller from '../controllers/content.controller.js';
import { adminOnly } from '../utils/adminGuard.js';

const router = Router();

router.get('/content/:page', controller.getContent);                // public: customer Home and About pages
router.put('/content/:page', adminOnly, controller.saveContent);    // admin: Home management and About management
router.get('/banners', controller.getBanners);                      // public
router.get('/gallery', controller.getGallery);                      // public

export default router;
