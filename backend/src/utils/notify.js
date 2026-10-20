import prisma from '../lib/prisma.js';

// Call this from the order and contact controllers so the bell shows new activity:
//   await createNotification({ type: 'order', title: 'New order #SF-1048',
//     text: 'Nimal Silva placed an order for Rs. 5,200', link: '/admin/orders' });
export const createNotification = ({ type, title, text = '', link = '' }) =>
  prisma.notification.create({
    data: { type, title: title.slice(0, 190), text: text.slice(0, 190), link: link.slice(0, 190) },
  });
