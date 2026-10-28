import prisma from '../lib/prisma.js';
import { sendEmail } from '../lib/mailer.js';

/**
 * POST /api/contact
 * Public storefront contact form submission endpoint.
 * Validates name, email, and message; persists inquiry; and notifies administrators.
 */
export const createMessage = async (req, res) => {
  try {
    const { name, email, phone = '', inquiryType = 'General Inquiry', subject = '', message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Inquiry message content is required.' });
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        inquiryType: inquiryType.trim() || 'General Inquiry',
        subject: subject.trim(),
        message: message.trim(),
        status: 'Unread',
        read: false,
      },
    });

    // Create in-app notification for admin dashboard
    try {
      await prisma.notification.create({
        data: {
          type: 'message',
          title: `New Inquiry from ${newInquiry.name}`,
          text: newInquiry.subject || newInquiry.message.slice(0, 60),
          link: '/admin/contact',
        },
      });
    } catch (notifErr) {
      console.warn('Inquiry notification creation error (non-fatal):', notifErr.message);
    }

    return res.status(201).json({
      message: 'Thank you for reaching out. Your message has been received.',
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return res.status(500).json({ error: 'Failed to submit contact message.' });
  }
};

/**
 * GET /api/contact
 * Retrieves all inquiries for the admin console.
 * Supports filtering by status, search keyword, and creation date.
 */
export const getAllMessages = async (req, res) => {
  try {
    const { status, search, date } = req.query;

    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (search && search.trim()) {
      const query = search.trim();
      where.OR = [
        { name: { contains: query } },
        { email: { contains: query } },
        { phone: { contains: query } },
        { subject: { contains: query } },
        { message: { contains: query } },
      ];
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return res.status(500).json({ error: 'Failed to retrieve contact inquiries.' });
  }
};

/**
 * GET /api/contact/:id
 * Retrieves a single inquiry by ID.
 */
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!inquiry) {
      return res.status(404).json({ error: `Inquiry #${id} not found.` });
    }

    return res.status(200).json(inquiry);
  } catch (error) {
    console.error(`Error retrieving inquiry #${req.params.id}:`, error);
    return res.status(500).json({ error: 'Failed to retrieve inquiry.' });
  }
};

/**
 * PUT /api/contact/:id
 * Updates inquiry status (Unread | Replied | Resolved) or read flag.
 */
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, read } = req.body;

    const data = {};
    if (status !== undefined) {
      data.status = status;
      if (status === 'Replied' || status === 'Resolved') {
        data.read = true;
      }
    }
    if (read !== undefined) {
      data.read = Boolean(read);
    }

    const updated = await prisma.inquiry.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(`Error updating inquiry #${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Inquiry #${req.params.id} not found.` });
    }
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
};

/**
 * DELETE /api/contact/:id
 * Deletes an inquiry message by ID.
 */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.inquiry.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({ message: `Inquiry #${id} deleted successfully.` });
  } catch (error) {
    console.error(`Error deleting inquiry #${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: `Inquiry #${req.params.id} not found.` });
    }
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
};

/**
 * POST /api/contact/:id/reply
 * Dispatches an email reply to the customer and marks the inquiry as Replied.
 */
export const sendReplyMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, subject, to } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Reply message text is required.' });
    }

    let inquiry = null;
    try {
      inquiry = await prisma.inquiry.findUnique({
        where: { id: parseInt(id, 10) },
      });
    } catch {
      // Proceed if DB is offline
    }

    const recipientEmail = to || inquiry?.email;
    if (!recipientEmail) {
      return res.status(400).json({ error: 'Recipient email address not found.' });
    }

    const emailSubject = subject || (inquiry?.subject ? `Re: ${inquiry.subject}` : 'Re: Saffron & Fig Dining Inquiry');

    // Dispatch email via Nodemailer
    const mailResult = await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      text: message,
    });

    // Update status in database if available
    try {
      await prisma.inquiry.update({
        where: { id: parseInt(id, 10) },
        data: { status: 'Replied', read: true },
      });
    } catch {
      // Proceed if DB is offline
    }

    return res.status(200).json({
      success: true,
      message: `Email reply successfully dispatched to ${recipientEmail}`,
      mailResult,
    });
  } catch (error) {
    console.error('Error sending reply email:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch email reply.' });
  }
};

const DEFAULT_CONTACT_INFO = {
  phone: '+94 11 234 5678',
  email: 'concierge@saffronfig.com',
  address: '24 Galle Road, Colombo 03, Sri Lanka',
  hours: 'Mon-Sun: 11:00 AM – 11:00 PM',
  valet: 'Complimentary Valet at North Carriage Gate',
};

/**
 * GET /api/contact/info
 * Retrieves public storefront contact coordinates & concierge details.
 */
export const getContactInfo = async (req, res) => {
  try {
    const record = await prisma.content.findUnique({
      where: { page: 'contact' },
    });
    if (record && record.data) {
      return res.status(200).json({ ...DEFAULT_CONTACT_INFO, ...record.data });
    }
    return res.status(200).json(DEFAULT_CONTACT_INFO);
  } catch (error) {
    console.warn('Error fetching contact info (using default fallback):', error.message);
    return res.status(200).json(DEFAULT_CONTACT_INFO);
  }
};

/**
 * PUT /api/contact/info
 * Updates public storefront contact coordinates (Admin only).
 */
export const updateContactInfo = async (req, res) => {
  try {
    const { phone, email, address, hours, valet } = req.body;
    const dataToSave = {
      phone: phone || DEFAULT_CONTACT_INFO.phone,
      email: email || DEFAULT_CONTACT_INFO.email,
      address: address || DEFAULT_CONTACT_INFO.address,
      hours: hours || DEFAULT_CONTACT_INFO.hours,
      valet: valet || DEFAULT_CONTACT_INFO.valet,
    };

    let savedData = dataToSave;
    try {
      const saved = await prisma.content.upsert({
        where: { page: 'contact' },
        update: { data: dataToSave },
        create: { page: 'contact', data: dataToSave },
      });
      savedData = saved.data;
    } catch (dbErr) {
      console.warn('Database upsert warning for contact info:', dbErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Storefront contact coordinates updated successfully.',
      data: savedData,
    });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return res.status(500).json({ error: 'Failed to update storefront contact info.' });
  }
};

