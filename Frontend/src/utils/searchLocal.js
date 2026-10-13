import { SAMPLE_DASHBOARD, MENU_POOL } from '../data/sampleContent';

// Search over the sample data. Used while the backend search endpoint does not exist yet.
const PAGES = [
  { title: 'Dashboard', link: '/admin' },
  { title: 'Home management', link: '/admin/home' },
  { title: 'About management', link: '/admin/about' },
  { title: 'Chef management', link: '/admin/chefs' },
  { title: 'Menu management', link: '/admin/menu' },
  { title: 'Order management', link: '/admin/orders' },
  { title: 'Contact management', link: '/admin/contact' },
];

const has = (text, q) => String(text ?? '').toLowerCase().includes(q);
const enc = encodeURIComponent;

export function searchLocal(term, limit = 4) {
  const q = term.trim().toLowerCase();
  if (!q) return [];

  const pages = PAGES.filter((p) => has(p.title, q))
    .map((p) => ({ type: 'page', id: p.link, title: p.title, subtitle: 'Go to page', link: p.link }));

  const orders = SAMPLE_DASHBOARD.recentOrders.filter((o) => has(o.id, q) || has(o.customer, q) || has(o.status, q))
    .map((o) => ({ type: 'order', id: o.id, title: `#${o.id}`, subtitle: `${o.customer} · $${Number(o.total).toFixed(2)}`, link: `/admin/orders?search=${enc(o.id)}` }));

  const dishes = MENU_POOL.filter((d) => has(d.name, q) || has(d.category, q) || has(d.description, q))
    .map((d) => ({ type: 'dish', id: d.id, title: d.name, subtitle: d.category, link: `/admin/menu?search=${enc(d.name)}` }));

  const messages = SAMPLE_DASHBOARD.recentMessages.filter((m) => has(m.name, q) || has(m.text, q) || has(m.email, q))
    .map((m) => ({ type: 'message', id: m.id, title: m.name, subtitle: m.text, link: `/admin/contact?search=${enc(m.name)}` }));

  return [...pages.slice(0, limit), ...orders.slice(0, limit), ...dishes.slice(0, limit), ...messages.slice(0, limit)];
}
