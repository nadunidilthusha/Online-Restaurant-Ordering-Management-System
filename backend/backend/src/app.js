import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menu.routes.js';
import chefRoutes from './routes/chef.routes.js';
import orderRoutes from './routes/order.routes.js';
import contactRoutes from './routes/contact.routes.js';
import contentRoutes from './routes/content.routes.js';
import imageRoutes from './routes/image.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', contentRoutes);   // /content/:page, /banners, /gallery
app.use('/api/images', imageRoutes);
app.use('/api/admin', adminRoutes); // /dashboard, /notifications

app.use(notFound);
app.use(errorHandler);

export default app;
