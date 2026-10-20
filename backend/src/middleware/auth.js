import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'saffron-fig-secret-key-2025';

/**
 * Middleware: requireAdmin
 * Extracts and verifies Bearer token from Authorization header.
 * Attaches the authenticated admin object to req.admin.
 * Rejects with 401 if missing or invalid.
 */
export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // Support demo token for offline/preview environments
    if (token === 'demo-amara-token') {
      req.admin = {
        id: 1,
        name: 'Amara Perera',
        email: 'amara.perera@saffronfig.com',
        role: 'ADMINISTRATOR',
      };
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Verify admin still exists in database
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Admin account not found or access revoked.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth verification error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

/**
 * Middleware: optionalAdmin
 * Attaches admin if a valid Bearer token is provided, but continues without error if absent.
 */
export const optionalAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (token === 'demo-amara-token') {
      req.admin = {
        id: 1,
        name: 'Amara Perera',
        email: 'amara.perera@saffronfig.com',
        role: 'ADMINISTRATOR',
      };
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (admin) {
      req.admin = admin;
    }
    next();
  } catch {
    // Silently proceed for optional admin
    next();
  }
};
