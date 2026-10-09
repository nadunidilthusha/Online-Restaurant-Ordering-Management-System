// Sample data used while the backend is not connected.
// Shape = what the API should return from GET /content/home, GET /content/about, GET /admin/dashboard.
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const MENU_POOL = [
  { id: 1, name: 'Fire-roasted Sea Bass', price: 2500, category: 'Mains', tag: 'Chef pick', description: 'Charred lemon, fennel and saffron butter.', image: U('1467003909585-2f8a72700288') },
  { id: 2, name: 'Burrata & Fig Salad', price: 1900, category: 'Starters', tag: 'Vegetarian', description: 'Warm figs, honey, pistachio and basil oil.', image: U('1540189549336-e6e99c3679fe') },
  { id: 3, name: 'Wood-fired Margherita', price: 3500, category: 'Mains', tag: 'Popular', description: 'San Marzano tomato, buffalo mozzarella, basil.', image: U('1565299624946-b28f40a0ae38') },
  { id: 4, name: 'Smoked Lamb Rack', price: 3700, category: 'Mains', tag: 'New', description: 'Rosemary jus, charred greens, garlic mash.', image: U('1544025162-d76694265947') },
  { id: 5, name: 'Crispy Calamari', price: 3500, category: 'Starters', tag: '', description: 'Lime aioli and chili salt.', image: U('1519708227418-c8fd9a32b7a2') },
  { id: 6, name: 'Salted Caramel Tart', price: 900, category: 'Desserts', tag: 'Sweet', description: 'Dark chocolate, sea salt, crème fraîche.', image: U('1488477181946-6428a0291777') },
  { id: 7, name: 'Chocolate Fondant', price: 1500, category: 'Desserts', tag: 'Warm', description: 'Molten dark chocolate centre with vanilla ice cream.', image: U('1578985545062-69928b1d9587') },
  { id: 8, name: 'Classic Tiramisu', price: 1300, category: 'Desserts', tag: 'Popular', description: 'Espresso-soaked sponge, mascarpone and cocoa.', image: U('1571877227200-a0d98ea607e9') },
];

export const SAMPLE_HOME = {
  promo: { text: 'Free delivery on orders over Rs. 5000 this week', visible: true },
  hero: {
    headline: 'Seasonal food, cooked over open fire.', highlight: 'open fire.',
    subtext: 'Fresh ingredients from local farms, handmade daily by our chefs. Order for delivery or pickup, or book a table for tonight.',
    primaryLabel: 'Order now', primaryLink: '/order', secondaryLabel: 'Our story', secondaryLink: '/about',
    image: U('1555939594-58d7cb561ad1', 1000),
  },
  stats: { years: 12, dishes: 85, diners: 2400, rating: 4.9 },
  banners: [
    { id: 1, title: 'Weekend brunch', description: 'Bottomless coffee and slow-cooked eggs every Saturday and Sunday from 10 am.', link: '/order', active: true, image: U('1504674900247-0877df9cc836') },
    { id: 2, title: "Chef's tasting menu", description: 'Five courses cooked over open fire, with optional wine pairing.', link: '/order', active: true, image: U('1414235077428-338989a2e8c0') },
  ],
  featured: MENU_POOL.map((d) => ({ ...d, visible: true })),
};

export const SAMPLE_ABOUT = {
  header: { title: 'Our story', intro: 'Twelve years of fire, farms and family recipes, served at one table in Colombo.' },
  history: {
    photo: U('1517248135467-4c7edcad34c4'), foundedYear: '2014',
    items: [
      { id: 1, year: '2014', title: 'The first fire', text: 'Chef Amara opens with ten tables, one oven and a menu of four dishes.' },
      { id: 2, year: '2017', title: 'Farm partnerships', text: 'We sign our first local growers and start printing the menu weekly.' },
      { id: 3, year: '2020', title: 'Delivery begins', text: 'The kitchen goes online, with hot, careful delivery across the city.' },
      { id: 4, year: '2023', title: 'A bigger home', text: 'We move to Galle Road with an open kitchen and a 60-seat dining room.' },
    ],
  },
  mission: {
    quote: 'Cook honestly, source locally and make every guest feel at home.',
    story: 'We started Saffron & Fig because the best meals we remember were never about fuss. They were about good produce, patient fire and people gathered around a table.',
    photo: U('1555939594-58d7cb561ad1'), founderName: 'Amara Perera', founderTitle: 'Founder and head chef', founderPhoto: U('1577219491135-ce391730fb2c', 200),
    values: [
      { id: 1, icon: '🌿', title: 'Local first', text: 'Most of our produce comes from farms within 80 km of the kitchen.' },
      { id: 2, icon: '🔥', title: 'Real fire', text: 'Wood and charcoal give our dishes flavour no shortcut can match.' },
      { id: 3, icon: '🍷', title: 'Warm welcome', text: 'Every guest is treated like family, whether it is their first visit or their hundredth.' },
    ],
  },
  visit: {
    address: '24 Galle Road, Colombo 03, Sri Lanka', phone: '+94 11 000 0000', email: 'hello@saffronfig.com', lat: 6.912, lng: 79.848,
    hours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => ({
      day, open: i > 4 ? '10:00' : '11:00', close: i > 3 && i < 6 ? '23:30' : i === 6 ? '22:00' : '22:30', closed: false,
    })),
  },
  gallery: [
    { id: 1, img: U('1517248135467-4c7edcad34c4', 1100), caption: 'Dining room' },
    { id: 2, img: U('1555939594-58d7cb561ad1', 1100), caption: 'Open-fire grill' },
    { id: 3, img: U('1414235077428-338989a2e8c0', 1100), caption: 'Signature plate' },
    { id: 4, img: U('1565299624946-b28f40a0ae38', 1100), caption: 'Wood-fired oven' },
  ],
};

const days7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const SAMPLE_DASHBOARD = {
  kpis: [
    { id: 'orders', label: 'Total orders', value: 1284, icon: '◈', color: '#8c1d2f' },
    { id: 'revenue', label: 'Revenue', value: 48620, prefix: 'Rs.', icon: '💰', color: '#d98a3d' },
    { id: 'customers', label: 'New customers', value: 342, icon: '☺', color: '#3f7f6b' },
    { id: 'messages', label: 'Unread messages', value: 3, icon: '✉', color: '#3b6ea5' },
  ],
  revenue: {
    weekly: { labels: days7, values: [3200, 2800, 3600, 3100, 4900, 6200, 5400] },
    monthly: { labels: Array.from({ length: 30 }, (_, i) => String(i + 1)), values: [2900, 3100, 2700, 3300, 3000, 4400, 5200, 3100, 2800, 3500, 3200, 3400, 4700, 5600, 3300, 3000, 3600, 3400, 3700, 5100, 6000, 3500, 3300, 3800, 3600, 3900, 5300, 6500, 5900, 5600] },
    annually: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [38400, 41200, 45800, 50100, 47600, 55900, 61300, 58200, 63500, 67800, 72400, 81000] },
  },
  statuses: [
    { label: 'Completed', count: 66, color: '#3f7f6b' }, { label: 'Preparing', count: 28, color: '#d98a3d' },
    { label: 'On the way', count: 20, color: '#3b6ea5' }, { label: 'Cancelled', count: 12, color: '#c2410c' },
  ],
  recentOrders: [
    { id: 'SF-1048', customer: 'Nimal Silva', total: 52, status: 'new' },
    { id: 'SF-1047', customer: 'Ayesha Khan', total: 38.5, status: 'preparing' },
    { id: 'SF-1046', customer: 'David Perera', total: 96, status: 'on_the_way' },
    { id: 'SF-1045', customer: 'Maya Fernando', total: 24, status: 'completed' },
    { id: 'SF-1044', customer: 'Ravi Kumar', total: 61.2, status: 'completed' },
    { id: 'SF-1043', customer: 'Sara Jayawardena', total: 17, status: 'cancelled' },
  ],
  recentMessages: [
    { id: 1, name: 'Hana Wijesinghe', text: 'Do you take group bookings for 12 people on Friday?', time: '10m', unread: true },
    { id: 2, name: 'Tom Mathews', text: 'Loved the sea bass, thank you so much!', time: '2h', unread: true },
    { id: 3, name: 'Priya Nair', text: 'Is the tasting menu available for vegans?', time: '5h', unread: true },
    { id: 4, name: 'Kasun Rajapaksa', text: 'Please confirm my catering quote.', time: '1d', unread: false },
  ],
  contentStatus: [
    { name: 'Home page', note: 'Updated today', state: 'live' }, { name: 'About page', note: 'Updated 3 days ago', state: 'live' },
    { name: 'Chefs', note: '2 profiles need photos', state: 'review' }, { name: 'Menu', note: '85 items, 4 hidden', state: 'live' },
    { name: 'Images', note: '128 files', state: 'live' },
  ],
  topDishes: [
    { name: 'Fire-roasted Sea Bass', sold: 212 }, { name: 'Wood-fired Margherita', sold: 184 },
    { name: 'Smoked Lamb Rack', sold: 143 }, { name: 'Burrata & Fig Salad', sold: 121 }, { name: 'Salted Caramel Tart', sold: 96 },
  ],
};

// Sample notifications (replace with GET /admin/notifications). Times are relative to "now".
const ago = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();
export const SAMPLE_NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'New order #SF-1048', text: 'Nimal Silva placed an order for Rs. 5,200', createdAt: ago(4), read: false, link: '/admin/orders' },
  { id: 2, type: 'message', title: 'New message', text: 'Hana Wijesinghe: Do you take group bookings for 12 people on Friday?', createdAt: ago(10), read: false, link: '/admin/contact' },
  { id: 3, type: 'order', title: 'Order #SF-1047 is preparing', text: 'Ayesha Khan, 3 items', createdAt: ago(35), read: false, link: '/admin/orders' },
  { id: 4, type: 'message', title: 'New message', text: 'Tom Mathews: Loved the sea bass, thank you so much!', createdAt: ago(120), read: true, link: '/admin/contact' },
  { id: 5, type: 'system', title: 'Gallery updated', text: '2 new photos were added to the About page', createdAt: ago(60 * 26), read: true, link: '/admin/about' },
];