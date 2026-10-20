import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'saffron-fig-secret-key-2025';

/**
 * POST /api/auth/login
 * Authenticates admin credentials, verifies password hash, and returns JWT.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find admin by unique email
    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify email and password.' });
    }

    // Compare supplied password with bcrypt hash
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials. Please verify email and password.' });
    }

    // Generate JWT token (7-day validity)
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Authentication service encountered an unexpected error.' });
  }
};

/**
 * GET /api/auth/me
 * Returns current authenticated admin profile. Protected route.
 */
export const me = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    return res.status(200).json({
      id: req.admin.id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
};

/**
 * POST /api/auth/register
 * Admin registration / provisioning endpoint.
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters in length.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if admin already exists
    const existing = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return res.status(409).json({ error: 'An admin account with this email already exists.' });
    }

    // Hash password with bcryptjs (salt rounds: 10)
    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: role || 'ADMINISTRATOR',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Admin account created successfully.',
      token,
      admin: newAdmin,
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    return res.status(500).json({ error: 'Failed to register admin account.' });
  }
};
