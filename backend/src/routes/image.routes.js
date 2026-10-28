import express from 'express';
import * as imageController from '../controllers/image.controller.js';
import upload from '../middleware/upload.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// image upload, replace and delete are admin only
router.use(requireAdmin);

// POST /api/images  <- the admin pages upload here
router.post('/', upload.single('image'), imageController.uploadImage);
// keep the old path working too
router.post('/upload', upload.single('image'), imageController.uploadImage);

router.put('/:id', upload.single('image'), imageController.replaceImage);
router.delete('/:id', imageController.deleteImage);

export default router;