import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create chef
export const createChef = async (req, res) => {
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

const DEFAULT_CHEFS = [
  {
    id: 1,
    name: 'Amara Perera',
    title: 'Executive Chef & Culinary Director',
    bio: 'Pioneering open-fire Sri Lankan gastronomy for 12 years. Passionate about heritage heirloom vegetables and island foraging.',
    specialty: 'Wood-fired Seafood & Clay-pot Reductions',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=75',
    active: true,
  },
  {
    id: 2,
    name: 'Marcus Vance',
    title: 'Chef de Cuisine',
    bio: 'Master of open-flame butchery and whole-animal cookery with over 15 years overseeing top charcoal brasseries across Australia and Asia.',
    specialty: 'Wood-fired Meats & Dry-aged Cuts',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=75',
    active: true,
  },
  {
    id: 3,
    name: 'Elena Rostova',
    title: 'Head Pastry Chef & Chocolatier',
    bio: 'A specialist in Viennoiserie and contemporary plated desserts, Elena crafts seasonal tasting course conclusions with delicate European textures.',
    specialty: 'Valrhona Chocolate & Botanical Tarts',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=75',
    active: true,
  },
];

// Get chefs
export const getAllChefs = async (req, res) => {
  try {
    const chefs = await prisma.chef.findMany({
      orderBy: { createdAt: 'desc' }
    });
    if (chefs && chefs.length > 0) {
      return res.status(200).json(chefs);
    }
  } catch (error) {
    console.warn('Error fetching chefs (using default fallback):', error.message);
  }
  return res.status(200).json(DEFAULT_CHEFS);
};

// Get chef by ID
export const getChefById = async (req, res) => {
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
export const updateChef = async (req, res) => {
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
export const deleteChef = async (req, res) => {
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