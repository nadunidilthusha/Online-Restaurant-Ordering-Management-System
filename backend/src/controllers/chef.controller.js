const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create chef
exports.createChef = async (req, res) => {
  try {
    const { name, title, bio, specialty, image, active } = req.body;
    const newChef = await prisma.chef.create({
      data: {
        name,
        title: title || "",
        bio: bio || "",
        specialty: specialty || "",
        image: image || "",
        active: active !== undefined ? active : true,
      },
    });
    res.status(201).json(newChef);
  } catch (error) {
    console.error('Error creating chef:', error);
    res.status(500).json({ error: 'Failed to create chef' });
  }
};

// Get chefs
exports.getAllChefs = async (req, res) => {
  try {
    const chefs = await prisma.chef.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ error: 'Failed to fetch chefs' });
  }
};

// Get chef by ID
exports.getChefById = async (req, res) => {
  try {
    const { id } = req.params;
    const chef = await prisma.chef.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(200).json(chef);
  } catch (error) {
    console.error('Error fetching chef:', error);
    res.status(500).json({ error: 'Failed to fetch chef' });
  }
};

// Update chef
exports.updateChef = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, bio, specialty, image, active } = req.body;
    
    const updatedChef = await prisma.chef.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(title !== undefined && { title }),
        ...(bio !== undefined && { bio }),
        ...(specialty !== undefined && { specialty }),
        ...(image !== undefined && { image }),
        ...(active !== undefined && { active }),
      },
    });
    res.status(200).json(updatedChef);
  } catch (error) {
    console.error('Error updating chef:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(500).json({ error: 'Failed to update chef' });
  }
};

// Delete chef
exports.deleteChef = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.chef.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Chef deleted successfully' });
  } catch (error) {
    console.error('Error deleting chef:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Chef not found' });
    }
    res.status(500).json({ error: 'Failed to delete chef' });
  }
};