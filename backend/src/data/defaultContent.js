// Starting content for the Home and About pages (same as the frontend sample data).
// Used by the seed script and when a page has never been saved.
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

export const DEFAULT_HOME = {
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

export const DEFAULT_ABOUT = {
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
