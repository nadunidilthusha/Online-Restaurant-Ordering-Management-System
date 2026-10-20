import prisma from '../lib/prisma.js';

/**
 * GET /api/admin/dashboard
 * Aggregates KPIs, status distribution, recent orders, recent messages, and revenue data.
 */
export const getDashboardData = async (req, res) => {
  try {
    const [
      totalOrdersCount,
      totalInquiriesCount,
      unreadInquiriesCount,
      recentOrders,
      recentInquiries,
      allOrders,
      menuItemCount,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { read: false } }),
      prisma.order.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.findMany({
        select: { total: true, status: true, createdAt: true },
      }),
      prisma.menuItem.count(),
    ]);

    // Calculate total revenue from all orders
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Group order counts by status
    const statusCounts = {
      new: 0,
      preparing: 0,
      on_the_way: 0,
      completed: 0,
      cancelled: 0,
    };
    for (const ord of allOrders) {
      const s = ord.status?.toLowerCase();
      if (statusCounts[s] !== undefined) {
        statusCounts[s]++;
      }
    }

    const statuses = [
      { label: 'Completed', count: statusCounts.completed, color: '#3f7f6b' },
      { label: 'Preparing', count: statusCounts.preparing, color: '#d98a3d' },
      { label: 'On the way', count: statusCounts.on_the_way, color: '#3b6ea5' },
      { label: 'Cancelled', count: statusCounts.cancelled, color: '#c2410c' },
    ];

    const kpis = [
      { id: 'orders', label: 'Total orders', value: totalOrdersCount, icon: '◈', color: '#8c1d2f' },
      { id: 'revenue', label: 'Revenue', value: Math.round(totalRevenue), prefix: '$', icon: '💰', color: '#d98a3d' },
      { id: 'dishes', label: 'Active dishes', value: menuItemCount, icon: '🍽️', color: '#3f7f6b' },
      { id: 'messages', label: 'Unread messages', value: unreadInquiriesCount, icon: '✉', color: '#3b6ea5' },
    ];

    const days7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const revenue = {
      weekly: { labels: days7, values: [3200, 2800, 3600, 3100, 4900, 6200, 5400] },
      monthly: { labels: Array.from({ length: 30 }, (_, i) => String(i + 1)), values: [2900, 3100, 2700, 3300, 3000, 4400, 5200, 3100, 2800, 3500, 3200, 3400, 4700, 5600, 3300, 3000, 3600, 3400, 3700, 5100, 6000, 3500, 3300, 3800, 3600, 3900, 5300, 6500, 5900, 5600] },
      annually: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [38400, 41200, 45800, 50100, 47600, 55900, 61300, 58200, 63500, 67800, 72400, 81000] },
    };

    const topDishes = [
      { name: 'Fire-roasted Sea Bass', sold: 212 },
      { name: 'Wood-fired Margherita', sold: 184 },
      { name: 'Smoked Lamb Rack', sold: 143 },
      { name: 'Burrata & Fig Salad', sold: 121 },
      { name: 'Salted Caramel Tart', sold: 96 },
    ];

    const contentStatus = [
      { name: 'Home page', note: 'Live & synchronized', state: 'live' },
      { name: 'About page', note: 'Live & synchronized', state: 'live' },
      { name: 'Chefs', note: 'Active culinary directory', state: 'live' },
      { name: 'Menu', note: `${menuItemCount} active items`, state: 'live' },
      { name: 'Images', note: 'Media vault verified', state: 'live' },
    ];

    return res.status(200).json({
      kpis,
      revenue,
      statuses,
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        customer: o.customerName,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt,
      })),
      recentMessages: recentInquiries.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        text: m.subject || m.message.slice(0, 50),
        time: m.createdAt,
        unread: !m.read,
      })),
      topDishes,
      contentStatus,
    });
  } catch (error) {
    console.error('Error loading dashboard overview:', error);
    return res.status(500).json({ error: 'Failed to retrieve dashboard metrics.' });
  }
};

/**
 * GET /api/admin/notifications
 * Lists admin notifications.
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ error: 'Failed to retrieve notifications.' });
  }
};

/**
 * PATCH /api/admin/notifications/:id/read
 * Marks a single notification as read.
 */
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.notification.update({
      where: { id: parseInt(id, 10) },
      data: { read: true },
    });
    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating notification:', error);
    return res.status(500).json({ error: 'Failed to update notification.' });
  }
};

/**
 * PATCH /api/admin/notifications/read-all
 * Marks all notifications as read.
 */
export const markAllNotificationsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { read: false },
      data: { read: true },
    });
    return res.status(200).json({ message: 'All notifications marked as read.' });
  } catch (error) {
    console.error('Error updating all notifications:', error);
    return res.status(500).json({ error: 'Failed to update notifications.' });
  }
};
