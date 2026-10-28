import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// The database keeps "/uploads/<file>". The admin page runs on another port (5173),
// so send back the full address; otherwise the preview cannot load right after uploading.
const fullUrl = (req, url) =>
  `${(process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '')}${url}`;

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Assuming multer saves the file to a 'uploads' folder and provides req.file
    const { filename, mimetype, size } = req.file;
    
    // Construct a URL path for the frontend to access the image
    const url = `/uploads/${filename}`;

    const newImage = await prisma.image.create({
      data: {
        url,
        filename,
        mimeType: mimetype,
        size,
      },
    });

    res.status(201).json({ ...newImage, url: fullUrl(req, newImage.url) }); // <-- changed
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Replace image
export const replaceImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No new image file provided' });
    }

    const existingImage = await prisma.image.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingImage) {
      return res.status(404).json({ error: 'Image record not found' });
    }

    // Delete the old file from the server disk here using fs.unlinkSync
    try {
      const oldFilePath = path.join(import.meta.dirname, '../../uploads', existingImage.filename);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    } catch (err) {
      console.warn('Could not delete old image file from disk:', err);
    }

    const { filename, mimetype, size } = req.file;
    const url = `/uploads/${filename}`;

    const updatedImage = await prisma.image.update({
      where: { id: parseInt(id) },
      data: {
        url,
        filename,
        mimeType: mimetype,
        size,
      },
    });

    res.status(200).json({ ...updatedImage, url: fullUrl(req, updatedImage.url) }); // <-- changed
  } catch (error) {
    console.error('Error replacing image:', error);
    res.status(500).json({ error: 'Failed to replace image' });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const existingImage = await prisma.image.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the file from the server disk
    try {
      const filePath = path.join(import.meta.dirname, '../../uploads', existingImage.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
      console.warn('Could not delete image file from disk:', err);
    }

    await prisma.image.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};