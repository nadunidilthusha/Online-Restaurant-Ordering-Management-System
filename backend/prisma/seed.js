import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma.js';

async function main() {
  console.log('🌱 Starting database seed for Saffron & Fig...\n');

  // ==========================================
  // 1. SEED ADMINISTRATOR (Admin registration / seed)
  // ==========================================
  const adminEmail = (process.env.ADMIN_EMAIL || 'amara.perera@saffronfig.com').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'EpicesEtSaveurs2025!';
  const adminName = process.env.ADMIN_NAME || 'Amara Perera';

  console.log(`👤 Seeding Admin account: ${adminEmail}`);
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
      role: 'ADMINISTRATOR',
    },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: 'ADMINISTRATOR',
    },
  });
  console.log(`   ✓ Admin ready: ${admin.name} (${admin.email})\n`);

  // ==========================================
  // 2. SEED MENU ITEMS
  // ==========================================
  const menuItemsData = [
    {
      name: 'Fire-roasted Sea Bass',
      description: 'Charred lemon, wild fennel, charred shallot puree and saffron butter reduction.',
      price: 25.0,
      category: 'Mains',
      tag: 'Chef pick',
      tagType: 'gold',
      note: 'Gluten Free',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Burrata & Fig Salad',
      description: 'Handcrafted fresh burrata, warm caramelized figs, wild organic honey, toasted pistachios, and cold-pressed basil oil.',
      price: 19.0,
      category: 'Starters',
      tag: 'Vegetarian',
      tagType: 'green',
      note: 'Contains nuts',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Wood-fired Margherita',
      description: 'San Marzano D.O.P. tomatoes, hand-torn buffalo mozzarella, aged parmesan, and garden basil over slow-fermented sourdough.',
      price: 35.0,
      category: 'Mains',
      tag: 'Popular',
      tagType: 'blue',
      note: 'Wood-fired oven',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Smoked Lamb Rack',
      description: 'Pasture-fed rack of lamb, 48-hour rosemary demi-glace, charred baby broccolini, and cultured garlic puree.',
      price: 37.0,
      category: 'Mains',
      tag: 'New',
      tagType: 'orange',
      note: 'Chef signature',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Crispy Calamari',
      description: 'Flash-fried coastal squid, lime aioli, fermented chili salt, and fresh micro herbs.',
      price: 18.5,
      category: 'Starters',
      tag: '',
      tagType: '',
      note: 'Coastal catch',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Salted Caramel Tart',
      description: 'Single-origin 70% dark chocolate ganache, Brittany Fleur de Sel caramel, and crème fraîche chantilly.',
      price: 14.0,
      category: 'Desserts',
      tag: 'Sweet',
      tagType: 'gold',
      note: 'Vegetarian',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Chocolate Fondant',
      description: 'Warm molten Valrhona dark chocolate center, Madagascar vanilla bean gelato, and freeze-dried raspberry dusting.',
      price: 15.0,
      category: 'Desserts',
      tag: 'Warm',
      tagType: 'orange',
      note: 'Baked to order',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
    {
      name: 'Classic Tiramisu',
      description: 'Espresso-dipped savoiardi biscuits, whipped mascarpone sabayon, dark cocoa powder, and Marsala wine perfume.',
      price: 13.0,
      category: 'Desserts',
      tag: 'Popular',
      tagType: 'blue',
      note: 'Italian classic',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=75',
      available: true,
    },
  ];

  console.log(`🍽️  Seeding ${menuItemsData.length} menu items...`);
  const createdMenuItems = [];
  for (const item of menuItemsData) {
    const existing = await prisma.menuItem.findFirst({ where: { name: item.name } });
    if (!existing) {
      const created = await prisma.menuItem.create({ data: item });
      createdMenuItems.push(created);
    } else {
      createdMenuItems.push(existing);
    }
  }
  console.log('   ✓ Menu items seeded.\n');

  // ==========================================
  // 3. SEED CHEFS
  // ==========================================
  const chefsData = [
    {
      name: 'Amara Perera',
      title: 'Executive Chef & Culinary Director',
      bio: 'Trained at Le Cordon Bleu Paris and leading kitchens in Lyon and Colombo, Chef Amara blends classical French precision with Ceylon botanicals and slow wood-fire cooking.',
      specialty: 'Wood-fired Seafood & Botanical Reductions',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=75',
      active: true,
    },
    {
      name: 'Marcus Vance',
      title: 'Chef de Cuisine',
      bio: 'Master of open-flame butchery and whole-animal cookery with over 15 years overseeing top charcoal brasseries across Australia and Asia.',
      specialty: 'Wood-fired Meats & Dry-aged Cuts',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=75',
      active: true,
    },
    {
      name: 'Elena Rostova',
      title: 'Head Pastry Chef & Chocolatier',
      bio: 'A specialist in Viennoiserie and contemporary plated desserts, Elena crafts seasonal tasting course conclusions with delicate European textures.',
      specialty: 'Valrhona Chocolate & Botanical Tarts',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=75',
      active: true,
    },
  ];

  console.log(`👨‍🍳 Seeding ${chefsData.length} culinary masters...`);
  for (const chef of chefsData) {
    const existing = await prisma.chef.findFirst({ where: { name: chef.name } });
    if (!existing) {
      await prisma.chef.create({ data: chef });
    }
  }
  console.log('   ✓ Chefs seeded.\n');

  // ==========================================
  // 4. SEED SAMPLE INQUIRIES (Contact API)
  // ==========================================
  const sampleInquiries = [
    {
      name: 'Hana Wijesinghe',
      email: 'hana.w@gmail.com',
      phone: '+94 77 123 4567',
      inquiryType: 'Group Booking',
      subject: 'Do you take group bookings for 12 people on Friday evening?',
      message: 'Hello Amara & culinary team, we are planning an intimate 40th wedding anniversary dinner with 12 close family members on Friday at 7:30 PM. We would love the secluded veranda garden table if possible. Please confirm if customized set menus or wine pairing packages can be pre-arranged.',
      status: 'Unread',
      read: false,
    },
    {
      name: 'Tom Mathews',
      email: 'tom.m@outlook.com',
      phone: '+94 71 884 9021',
      inquiryType: 'Culinary Feedback',
      subject: 'Loved the sea bass, thank you so much!',
      message: 'Dined at Saffron & Fig yesterday night. The fire-roasted sea bass with charred lemon butter was exceptional. My complements to Chef Amara and the kitchen staff!',
      status: 'Unread',
      read: false,
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@corp.com',
      phone: '+94 76 552 1904',
      inquiryType: 'Dietary Query',
      subject: 'Is the tasting menu available for vegans?',
      message: 'Looking to book dinner for 4 next Tuesday. Two of our guests are strictly vegan. Can the chef tasting menu accommodate plant-based courses without compromising flavor?',
      status: 'Unread',
      read: false,
    },
    {
      name: 'Kasun Rajapaksa',
      email: 'kasun.r@lk.biz',
      phone: '+94 77 900 3412',
      inquiryType: 'Catering Quote',
      subject: 'Corporate private dining inquiry for 30 executives',
      message: 'Please send your executive corporate dining package proposal for an end-of-year networking gathering at our Colombo offices.',
      status: 'Replied',
      read: true,
    },
  ];

  console.log(`✉️  Seeding ${sampleInquiries.length} sample contact inquiries...`);
  for (const inquiry of sampleInquiries) {
    const existing = await prisma.inquiry.findFirst({
      where: { email: inquiry.email, subject: inquiry.subject },
    });
    if (!existing) {
      await prisma.inquiry.create({ data: inquiry });
    }
  }
  console.log('   ✓ Contact inquiries seeded.\n');

  // ==========================================
  // 5. SEED SAMPLE ORDERS (Order API)
  // ==========================================
  const sampleOrders = [
    {
      id: 'SF-1048',
      customerName: 'Nimal Silva',
      email: 'nimal.silva@example.com',
      phone: '+94 77 234 5678',
      orderType: 'delivery',
      address: '15 Havelock Road, Apt 3B, Colombo 05',
      deliveryWindow: 'ASAP (approx 35-45 mins)',
      notes: 'Please leave with reception security desk.',
      subtotal: 52.0,
      deliveryFee: 4.5,
      gst: 5.2,
      total: 61.7,
      status: 'new',
      items: [
        { name: 'Fire-roasted Sea Bass', price: 25.0, qty: 1, lineTotal: 25.0 },
        { name: 'Wood-fired Margherita', price: 27.0, qty: 1, lineTotal: 27.0 },
      ],
    },
    {
      id: 'SF-1047',
      customerName: 'Ayesha Khan',
      email: 'ayesha.k@example.com',
      phone: '+94 71 345 6789',
      orderType: 'delivery',
      address: '88 Ward Place, Colombo 07',
      deliveryWindow: 'Tonight, 8:00 PM',
      notes: 'Extra sourdough bread please.',
      subtotal: 38.5,
      deliveryFee: 4.5,
      gst: 3.85,
      total: 46.85,
      status: 'preparing',
      items: [
        { name: 'Burrata & Fig Salad', price: 19.0, qty: 1, lineTotal: 19.0 },
        { name: 'Crispy Calamari', price: 19.5, qty: 1, lineTotal: 19.5 },
      ],
    },
    {
      id: 'SF-1046',
      customerName: 'David Perera',
      email: 'david.p@example.com',
      phone: '+94 76 456 7890',
      orderType: 'express',
      address: '42 Gregorys Road, Colombo 07',
      deliveryWindow: 'ASAP',
      notes: 'Ring bell #12 upon arrival.',
      subtotal: 96.0,
      deliveryFee: 4.5,
      gst: 9.6,
      total: 110.1,
      status: 'on_the_way',
      items: [
        { name: 'Smoked Lamb Rack', price: 37.0, qty: 2, lineTotal: 74.0 },
        { name: 'Classic Tiramisu', price: 11.0, qty: 2, lineTotal: 22.0 },
      ],
    },
  ];

  console.log(`📦 Seeding ${sampleOrders.length} sample orders...`);
  for (const ord of sampleOrders) {
    const existing = await prisma.order.findUnique({ where: { id: ord.id } });
    if (!existing) {
      await prisma.order.create({
        data: {
          id: ord.id,
          customerName: ord.customerName,
          email: ord.email,
          phone: ord.phone,
          orderType: ord.orderType,
          address: ord.address,
          deliveryWindow: ord.deliveryWindow,
          notes: ord.notes,
          subtotal: ord.subtotal,
          deliveryFee: ord.deliveryFee,
          gst: ord.gst,
          total: ord.total,
          status: ord.status,
          items: {
            create: ord.items,
          },
        },
      });
    }
  }
  console.log('   ✓ Orders seeded.\n');

  // ==========================================
  // 6. SEED NOTIFICATIONS
  // ==========================================
  const notificationsData = [
    {
      type: 'order',
      title: 'New order #SF-1048',
      text: 'Nimal Silva placed an order for $61.70',
      read: false,
      link: '/admin/orders/SF-1048',
    },
    {
      type: 'message',
      title: 'New message from Hana Wijesinghe',
      text: 'Do you take group bookings for 12 people on Friday evening?',
      read: false,
      link: '/admin/contact',
    },
  ];

  console.log(`🔔 Seeding ${notificationsData.length} initial notifications...`);
  for (const notif of notificationsData) {
    const existing = await prisma.notification.findFirst({ where: { title: notif.title } });
    if (!existing) {
      await prisma.notification.create({ data: notif });
    }
  }
  console.log('   ✓ Notifications seeded.\n');

  console.log('✨ All seed data created successfully!');
  console.log('   Admin Login Credentials:');
  console.log(`   - Email:    ${adminEmail}`);
  console.log(`   - Password: ${adminPassword}\n`);
}

main()
  .catch((err) => {
    console.error('❌ Database seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
