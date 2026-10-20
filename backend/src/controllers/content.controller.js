import prisma from '../lib/prisma.js';

/**
 * GET /api/content/:page
 * Returns page content JSON for 'home' or 'about'.
 */
export const getContent = async (req, res) => {
  try {
    const { page } = req.params;
    const content = await prisma.content.findUnique({
      where: { page },
    });

    if (!content) {
      return res.status(200).json({});
    }

    return res.status(200).json(content.data);
  } catch (error) {
    console.error(`Error loading content for ${req.params.page}:`, error);
    return res.status(500).json({ error: 'Failed to load page content.' });
  }
};

/**
 * PUT /api/content/:page
 * Updates or creates page content JSON document.
 */
export const updateContent = async (req, res) => {
  try {
    const { page } = req.params;
    const data = req.body;

    const saved = await prisma.content.upsert({
      where: { page },
      update: { data },
      create: { page, data },
    });

    return res.status(200).json(saved.data);
  } catch (error) {
    console.error(`Error updating content for ${req.params.page}:`, error);
    return res.status(500).json({ error: 'Failed to save page content.' });
  }
};

/**
 * GET /api/banners
 * Returns active promotional banners from the home page configuration.
 */
export const getBanners = async (req, res) => {
  try {
    const homeContent = await prisma.content.findUnique({
      where: { page: 'home' },
    });

    const banners = (homeContent?.data && homeContent.data.banners) || [];
    return res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return res.status(500).json({ error: 'Failed to retrieve promotional banners.' });
  }
};

/**
 * GET /api/gallery
 * Returns gallery images from about page configuration.
 */
export const getGallery = async (req, res) => {
  try {
    const aboutContent = await prisma.content.findUnique({
      where: { page: 'about' },
    });

    const gallery = (aboutContent?.data && aboutContent.data.gallery) || [];
    return res.status(200).json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return res.status(500).json({ error: 'Failed to retrieve gallery images.' });
  }
};
