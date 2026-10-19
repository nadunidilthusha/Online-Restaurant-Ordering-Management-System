const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');
const upload = require('../middleware/upload');

// Use the upload middleware specifically for routes that receive files
// 'image' is the field name the frontend must use in the FormData
router.post('/upload', upload.single('image'), imageController.uploadImage);
router.put('/:id', upload.single('image'), imageController.replaceImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;