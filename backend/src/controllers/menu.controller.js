const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create menu
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, tag, tagType, note, image, available } = req.body;
    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        tag,
        tagType,
        note,
        image,
        available: available !== undefined ? available : true,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};

// Get menu
exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Get menu by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
};

// Update menu
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, tag, tagType, note, image, available } = req.body;
    
    const updatedItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(category && { category }),
        ...(tag !== undefined && { tag }),
        ...(tagType !== undefined && { tagType }),
        ...(note !== undefined && { note }),
        ...(image && { image }),
        ...(available !== undefined && { available }),
      },
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(500).json({ error: 'Failed to update menu item' });
  }
};

// Delete menu
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menuItem.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};