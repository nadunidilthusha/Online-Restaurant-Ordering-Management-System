import nodemailer from 'nodemailer';

let cachedTransporter = null;

/**
 * Initializes and caches a Nodemailer transport instance.
 * Uses real SMTP credentials from .env if provided;
 * otherwise automatically falls back to an Ethereal test account or console logging.
 */
export const getTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
    console.log(`📧 Configured active SMTP transport via ${process.env.SMTP_HOST || 'smtp.gmail.com'} (${user})`);
    return cachedTransporter;
  }

  // Fallback 1: Ethereal test account
  try {
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('📧 Created Ethereal test account for offline email simulation:', testAccount.user);
    return cachedTransporter;
  } catch (err) {
    // Fallback 2: Console simulation
    console.warn('⚠️ SMTP credentials not set and Ethereal unavailable. Using console email logger:', err.message);
    cachedTransporter = {
      sendMail: async (options) => {
        console.log('----------------------------------------------------');
        console.log('📬 [EMAIL DISPATCHED VIA SAFFRON & FIG MAILER]');
        console.log(`To:      ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log('Body:');
        console.log(options.text || options.html);
        console.log('----------------------------------------------------');
        return { messageId: `local-simulated-${Date.now()}` };
      },
    };
    return cachedTransporter;
  }
};

/**
 * Sends an email with formatted Haute Cuisine branding.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const mailer = await getTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || '"Saffron & Fig Haute Cuisine" <concierge@saffronfig.com>';

  const formattedHtml =
    html ||
    `
    <div style="font-family: 'Georgia', serif, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 28px; background-color: #fffcf7; border: 1px solid #d4af6a; border-radius: 6px; color: #1a0e05;">
      <div style="border-bottom: 2px solid #8c1d2f; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #8c1d2f; letter-spacing: 2px; text-transform: uppercase;">HAUTE CUISINE • COLOMBO</span>
        <h1 style="color: #8c1d2f; margin: 6px 0 0 0; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">Saffron &amp; Fig</h1>
      </div>
      
      <div style="font-size: 15px; line-height: 1.75; color: #2d2420; white-space: pre-line;">
${text}
      </div>

      <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e8decb; font-size: 13px; color: #6e6056; line-height: 1.6;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #8c1d2f;">Saffron &amp; Fig Dining Concierge</p>
        <p style="margin: 0 0 4px 0;">24 Galle Road, Colombo 03, Sri Lanka</p>
        <p style="margin: 0;">Tel: <a href="tel:+94112345678" style="color: #8c1d2f; text-decoration: none;">+94 11 234 5678</a> | Web: <a href="http://localhost:5173" style="color: #8c1d2f; text-decoration: none;">saffronfig.com</a></p>
      </div>
    </div>
  `;

  const info = await mailer.sendMail({
    from,
    to,
    subject,
    text,
    html: formattedHtml,
  });

  const previewUrl = nodemailer.getTestMessageUrl ? nodemailer.getTestMessageUrl(info) : null;
  if (previewUrl) {
    console.log('🔗 Sent Test Email Preview URL:', previewUrl);
  }

  return { success: true, messageId: info.messageId, previewUrl };
};
