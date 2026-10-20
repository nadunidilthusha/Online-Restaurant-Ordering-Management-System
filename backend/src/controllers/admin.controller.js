import prisma from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { dayKey, lastDays, lastMonths, round2, shortAgo, updatedAgo } from '../utils/time.js';

const DAY_MS = 86400000;

const STATUS_META = [
  { status: 'completed', label: 'Completed', color: '#3f7f6b' },
  { status: 'preparing', label: 'Preparing', color: '#d98a3d' },
  { status: 'on_the_way', label: 'On the way', color: '#3b6ea5' },
  { status: 'new', label: 'New', color: '#8c1d2f' },
  { status: 'cancelled', label: 'Cancelled', color: '#c2410c' },
];

// adds up revenue per day / per month from a list of { createdAt, total }
const sumBy = (orders, keyFn) => {
  const map = new Map();
  for (const o of orders) {
    const k = keyFn(o.createdAt);
    map.set(k, (map.get(k) || 0) + o.total);
  }
  return map;
};

const revenueSeries = (orders) => {
  const week = lastDays(7);
  const month = lastDays(30);
  const year = lastMonths(12);

  const byDay = sumBy(orders, dayKey);
  const byMonth = sumBy(orders, (d) => dayKey(d).slice(0, 7));

  return {
    weekly: { labels: week.map((d) => d.weekday), values: week.map((d) => round2(byDay.get(d.key) || 0)) },
    monthly: { labels: month.map((d) => d.day), values: month.map((d) => round2(byDay.get(d.key) || 0)) },
    annually: { labels: year.map((m) => m.label), values: year.map((m) => round2(byMonth.get(m.key) || 0)) },
  };
};

// GET /api/admin/dashboard
export const getDashboard = async (req, res) => {
  const now = Date.now();
  const since30 = new Date(now - 30 * DAY_MS);
  const sinceChart = new Date(now - 400 * DAY_MS); // covers the 12 month chart

  const [
    orderCount,
    revenueAgg,
    customerFirstOrders,
    unreadMessages,
    statusGroups,
    chartOrders,
    recentOrders,
    recentMessages,
    topGroups,
    homeRow,
    aboutRow,
    chefCount,
    chefsWithoutPhoto,
    menuCount,
    menuHidden,
    imageCount,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ where: { status: { not: 'cancelled' } }, _sum: { total: true } }),
    // first order date for every customer; "new customer" = first order in the last 30 days
    prisma.order.groupBy({ by: ['email', 'customerName'], _min: { createdAt: true } }),
    prisma.inquiry.count({ where: { status: 'Unread', read: false } }),
    prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.order.findMany({
      where: { status: { not: 'cancelled' }, createdAt: { gte: sinceChart } },
      select: { createdAt: true, total: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, customerName: true, total: true, status: true },
    }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { id: true, name: true, email: true, message: true, status: true, read: true, createdAt: true },
    }),
    prisma.orderItem.groupBy({
      by: ['name'],
      where: { order: { status: { not: 'cancelled' } } },
      _sum: { qty: true },
      orderBy: { _sum: { qty: 'desc' } },
      take: 5,
    }),
    prisma.content.findUnique({ where: { page: 'home' }, select: { updatedAt: true } }),
    prisma.content.findUnique({ where: { page: 'about' }, select: { updatedAt: true } }),
    prisma.chef.count(),
    prisma.chef.count({ where: { image: '' } }),
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { available: false } }),
    prisma.image.count(),
  ]);

  const newCustomers = customerFirstOrders.filter((c) => c._min.createdAt >= since30).length;

  const countsByStatus = Object.fromEntries(statusGroups.map((g) => [g.status, g._count._all]));

  const pageStatus = (row, name) => ({
    name,
    note: row ? updatedAgo(row.updatedAt) : 'Showing default content',
    state: 'live',
  });

  res.json({
    kpis: [
      { id: 'orders', label: 'Total orders', value: orderCount, icon: '◈', color: '#8c1d2f' },
      { id: 'revenue', label: 'Revenue', value: Math.round(revenueAgg._sum.total || 0), prefix: 'Rs.', icon: '💰', color: '#d98a3d' },
      { id: 'customers', label: 'New customers', value: newCustomers, icon: '☺', color: '#3f7f6b' },
      { id: 'messages', label: 'Unread messages', value: unreadMessages, icon: '✉', color: '#3b6ea5' },
    ],
    revenue: revenueSeries(chartOrders),
    statuses: STATUS_META.map((s) => ({ label: s.label, count: countsByStatus[s.status] || 0, color: s.color })),
    recentOrders: recentOrders.map((o) => ({ id: o.id, customer: o.customerName, total: o.total, status: o.status })),
    recentMessages: recentMessages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      text: m.message.length > 160 ? `${m.message.slice(0, 157)}...` : m.message,
      time: shortAgo(m.createdAt),
      unread: m.status === 'Unread' && !m.read,
    })),
    contentStatus: [
      pageStatus(homeRow, 'Home page'),
      pageStatus(aboutRow, 'About page'),
      chefsWithoutPhoto > 0
        ? { name: 'Chefs', note: `${chefsWithoutPhoto} ${chefsWithoutPhoto === 1 ? 'profile needs' : 'profiles need'} photos`, state: 'review' }
        : { name: 'Chefs', note: `${chefCount} ${chefCount === 1 ? 'profile' : 'profiles'}`, state: 'live' },
      { name: 'Menu', note: `${menuCount} items, ${menuHidden} hidden`, state: 'live' },
      { name: 'Images', note: `${imageCount} ${imageCount === 1 ? 'file' : 'files'}`, state: 'live' },
    ],
    topDishes: topGroups.map((g) => ({ name: g.name, sold: g._sum.qty || 0 })),
  });
};

// ---------------------------------------------------------------
// Notifications (the bell in the admin top bar)
// ---------------------------------------------------------------

const toClient = (n) => ({
  id: n.id,
  type: n.type,
  title: n.title,
  text: n.text,
  createdAt: n.createdAt.toISOString(),
  read: n.read,
  link: n.link,
});

// GET /api/admin/notifications  ->  newest 30
export const listNotifications = async (req, res) => {
  const rows = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, take: 30 });
  res.json(rows.map(toClient));
};

// PATCH /api/admin/notifications/:id/read
export const markNotificationRead = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid notification id');
  const result = await prisma.notification.updateMany({ where: { id }, data: { read: true } });
  if (result.count === 0) throw new HttpError(404, 'Notification not found');
  res.json({ ok: true });
};

// PATCH /api/admin/notifications/read-all
export const markAllNotificationsRead = async (req, res) => {
  const result = await prisma.notification.updateMany({ where: { read: false }, data: { read: true } });
  res.json({ ok: true, updated: result.count });
};
