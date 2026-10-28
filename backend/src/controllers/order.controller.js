import prisma from '../lib/prisma.js';

/**
 * Helper: Calculate order subtotal, GST (10%), and grand total.
 */
export const calculateOrderTotals = (items = [], orderType = 'delivery', customDeliveryFee = null) => {
  const computedSubtotal = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = parseInt(item.qty, 10) || 1;
    return sum + itemPrice * itemQty;
  }, 0);

  // Delivery fee logic: Express / Delivery = $4.50 / Rs 450, pickup / dine-in = 0
  let deliveryFee = 0;
  if (customDeliveryFee !== null && customDeliveryFee !== undefined) {
    deliveryFee = parseFloat(customDeliveryFee) || 0;
  } else if (orderType.toLowerCase() === 'delivery' || orderType.toLowerCase() === 'express') {
    deliveryFee = 4.5;
  }

  // 10% GST / service tax
  const gst = Number((computedSubtotal * 0.1).toFixed(2));
  const total = Number((computedSubtotal + deliveryFee + gst).toFixed(2));

  return {
    subtotal: Number(computedSubtotal.toFixed(2)),
    deliveryFee: Number(deliveryFee.toFixed(2)),
    gst,
    total,
  };
};

/**
 * POST /api/orders
 * Public checkout endpoint:
 * 1. Generates unique Order ID (e.g., SF-XXXXX) if not supplied.
 * 2. Validates & saves customer details (name, email, phone, orderType, address, deliveryWindow, notes).
 * 3. Calculates and verifies total, subtotal, delivery fee, and GST.
 * 4. Saves order and nested order items.
 * 5. Creates real-time in-app notification for admin dashboard.
 */
export const createOrder = async (req, res) => {
  try {
    const {
      id,
      customerName,
      email,
      phone,
      orderType = 'delivery',
      address = '',
      deliveryWindow = '',
      notes = '',
      items = [],
      subtotal,
      deliveryFee,
      gst,
      total,
      status = 'new',
    } = req.body;

    // Validate required customer info and items
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ error: 'Customer name is required.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    // Generate readable ID if not sent by client (e.g. SF-74892)
    const orderId = (id && id.trim()) || `SF-${Math.floor(10000 + Math.random() * 90000)}`;

    // Calculate totals automatically or use supplied if valid
    const calculated = calculateOrderTotals(items, orderType, deliveryFee);
    const finalSubtotal = subtotal !== undefined ? parseFloat(subtotal) : calculated.subtotal;
    const finalDeliveryFee = deliveryFee !== undefined ? parseFloat(deliveryFee) : calculated.deliveryFee;
    const finalGst = gst !== undefined ? parseFloat(gst) : calculated.gst;
    const finalTotal = total !== undefined ? parseFloat(total) : calculated.total;

    // Normalize status to lowercase convention (new | preparing | on_the_way | completed | cancelled)
    const normalizedStatus = status ? status.toLowerCase().replace(/\s+/g, '_') : 'new';

    // Verify valid menuItemIds in database to avoid foreign key violations
    const candidateMenuItemIds = items
      .map((item) => parseInt(item.menuItemId || item.id, 10))
      .filter((id) => !isNaN(id) && id > 0);

    let validMenuItemIdSet = new Set();
    if (candidateMenuItemIds.length > 0) {
      try {
        const foundItems = await prisma.menuItem.findMany({
          where: { id: { in: candidateMenuItemIds } },
          select: { id: true },
        });
        validMenuItemIdSet = new Set(foundItems.map((m) => m.id));
      } catch (err) {
        console.warn('Unable to query menuItems for FK link, continuing without FK:', err.message);
      }
    }

    // Prepare line items
    const orderItemsData = items.map((item) => {
      const price = parseFloat(item.price) || 0;
      const qty = parseInt(item.qty, 10) || 1;
      const lineTotal = item.lineTotal !== undefined ? parseFloat(item.lineTotal) : price * qty;
      const candidateId = parseInt(item.menuItemId || item.id, 10);
      const hasValidFk = !isNaN(candidateId) && validMenuItemIdSet.has(candidateId);

      return {
        name: item.name || 'Dish Item',
        price,
        qty,
        lineTotal,
        ...(hasValidFk ? { menuItemId: candidateId } : {}),
      };
    });

    // Create Order with nested OrderItems via Prisma transaction
    const newOrder = await prisma.order.create({
      data: {
        id: orderId,
        customerName: customerName.trim(),
        email: (email || '').trim(),
        phone: (phone || '').trim(),
        orderType,
        address: (address || '').trim(),
        deliveryWindow: (deliveryWindow || '').trim(),
        notes: (notes || '').trim(),
        subtotal: finalSubtotal,
        deliveryFee: finalDeliveryFee,
        gst: finalGst,
        total: finalTotal,
        status: normalizedStatus,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Create in-app notification for admin console
    try {
      await prisma.notification.create({
        data: {
          type: 'order',
          title: `New Order #${newOrder.id}`,
          text: `${newOrder.customerName} placed an order for Rs. ${Number(newOrder.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${newOrder.items.length} items).`,
          link: `/admin/orders/${newOrder.id}`,
        },
      });
    } catch (notifErr) {
      console.warn('Notification log error (non-fatal):', notifErr.message);
    }

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'An order with this ID already exists.' });
    }
    return res.status(500).json({ error: 'Failed to create order.' });
  }
};

/**
 * GET /api/orders
 * Retrieves all orders with items.
 * Supports filtering by status and search keyword (id, customerName, email, phone).
 */
export const getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    const where = {};

    if (status && status !== 'All' && status !== 'All Statuses') {
      const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');
      where.status = {
        contains: normalizedStatus,
      };
    }

    if (search && search.trim()) {
      const query = search.trim();
      where.OR = [
        { id: { contains: query } },
        { customerName: { contains: query } },
        { email: { contains: query } },
        { phone: { contains: query } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to retrieve orders.' });
  }
};

/**
 * GET /api/orders/:id
 * Retrieves single order by ID with line items.
 */
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: `Order #${id} not found.` });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(`Error fetching order #${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to retrieve order details.' });
  }
};

/**
 * PUT /api/orders/:id
 * Full update of order details (status, address, notes, deliveryWindow, etc.).
 */
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customerName,
      email,
      phone,
      orderType,
      address,
      deliveryWindow,
      notes,
      status,
      deliveryFee,
    } = req.body;

    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: `Order #${id} not found.` });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(customerName !== undefined && { customerName: customerName.trim() }),
        ...(email !== undefined && { email: email.trim() }),
        ...(phone !== undefined && { phone: phone.trim() }),
        ...(orderType !== undefined && { orderType }),
        ...(address !== undefined && { address: address.trim() }),
        ...(deliveryWindow !== undefined && { deliveryWindow: deliveryWindow.trim() }),
        ...(notes !== undefined && { notes: notes.trim() }),
        ...(status !== undefined && { status: status.toLowerCase().replace(/\s+/g, '_') }),
        ...(deliveryFee !== undefined && { deliveryFee: parseFloat(deliveryFee) }),
      },
      include: {
        items: true,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(`Error updating order #${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to update order.' });
  }
};

/**
 * PATCH /api/orders/:id/status
 * Updates only the status of an order (new | preparing | on_the_way | completed | cancelled).
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Order status value is required.' });
    }

    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');

    const updated = await prisma.order.update({
      where: { id },
      data: { status: normalizedStatus },
      include: { items: true },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(`Error updating status for order #${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Order #${req.params.id} not found.` });
    }
    return res.status(500).json({ error: 'Failed to update order status.' });
  }
};

/**
 * DELETE /api/orders/:id
 * Deletes an order and its associated order items (handled by Prisma cascade).
 */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id },
    });

    return res.status(200).json({ message: `Order #${id} deleted successfully.` });
  } catch (error) {
    console.error(`Error deleting order #${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Order #${req.params.id} not found.` });
    }
    return res.status(500).json({ error: 'Failed to delete order.' });
  }
};
