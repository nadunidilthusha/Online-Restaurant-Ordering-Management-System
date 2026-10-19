import express from 'express';
import * as imageController from '../controllers/image.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.put('/:id', upload.single('image'), imageController.replaceImage);
router.delete('/:id', imageController.deleteImage);

export default router;