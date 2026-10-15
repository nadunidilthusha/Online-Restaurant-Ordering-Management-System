import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../../api/dashboardApi';
import * as orderApi from '../../api/orderApi';
import * as menuApi from '../../api/menuApi';
import * as contactApi from '../../api/contactApi';
import { SAMPLE_DASHBOARD } from '../../data/sampleContent';

const LABELS = { page: 'Pages', order: 'Orders', dish: 'Dishes', message: 'Messages' };
const ICONS = { page: '↗', order: '◈', dish: '🍽', message: '✉' };
const TYPE_ORDER = ['page', 'order', 'dish', 'message'];

const PAGES = [
  { title: 'Dashboard', to: '/admin', extra: 'overview stats home' },
  { title: 'Home management', to: '/admin/home', extra: 'hero banner promo strip homepage' },
  { title: 'About management', to: '/admin/about', extra: 'history mission hours location gallery' },
  { title: 'Chefs', to: '/admin/chefs', extra: 'team staff' },
  { title: 'Menu', to: '/admin/menu', extra: 'dishes food items' },
  { title: 'Orders', to: '/admin/orders', extra: 'sales' },
  { title: 'Contact & inquiries', to: '/admin/contact', extra: 'messages inbox' },
  { title: 'Images', to: '/admin/images', extra: 'photos media gallery' },
].map((p) => ({
  ...p,
  type: 'page',
  key: `page-${p.to}`,
  sub: '',
  hay: `${p.title} ${p.extra}`.toLowerCase(),
}));

const list = (r) =>
  r.status === 'fulfilled' && Array.isArray(r.value) && r.value.length ? r.value : null;

// Builds the searchable index. Uses the API when it works, sample data otherwise.
async function loadIndex() {
  const [dash, orders, menu, msgs] = await Promise.allSettled([
    getDashboard(),
    orderApi.getAll(),
    menuApi.getAll(),
    contactApi.getAll(),
  ]);
  const d = dash.status === 'fulfilled' && dash.value ? dash.value : SAMPLE_DASHBOARD;

  const orderItems = (list(orders) || d.recentOrders || []).map((o, i) => {
    const id = o.id ?? o._id ?? o.orderNumber ?? i;
    const who = o.customer || o.customerName || o.name || '';
    const status = String(o.status || '').replace(/_/g, ' ');
    return {
      type: 'order',
      key: `order-${id}`,
      title: `Order #${id}`,
      sub: [who, status].filter(Boolean).join(' · '),
      to: `/admin/orders/${id}`,
      hay: `${id} ${who} ${status}`.toLowerCase(),
    };
  });

  const dishItems = (list(menu) || d.topDishes || []).map((m, i) => {
    const id = m.id ?? m._id;
    const name = m.name || m.title || 'Dish';
    return {
      type: 'dish',
      key: `dish-${id ?? name}-${i}`,
      title: name,
      sub: m.category || (m.sold ? `${m.sold} sold` : ''),
      to: id ? `/admin/menu/${id}/edit` : '/admin/menu',
      hay: `${name} ${m.category || ''}`.toLowerCase(),
    };
  });

  const messageItems = (list(msgs) || d.recentMessages || []).map((m, i) => {
    const id = m.id ?? m._id ?? i + 1;
    const body = m.text || m.message || m.subject || '';
    return {
      type: 'message',
      key: `msg-${id}`,
      title: m.name || 'Guest',
      sub: body,
      to: `/admin/contact?id=${id}`,
      hay: `${m.name || ''} ${m.email || ''} ${body} ${m.subject || ''}`.toLowerCase(),
    };
  });

  return [...orderItems, ...dishItems, ...messageItems];
}

export default function AdminSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState([]);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const loaded = useRef(false);

  // load data once, the first time the box is used
  const ensureIndex = () => {
    if (loaded.current) return;
    loaded.current = true;
    loadIndex().then(setIndex).catch(() => {});
  };

  // close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const all = [...PAGES, ...index];
    const hit = (e) => terms.every((t) => e.hay.includes(t));
    return TYPE_ORDER.flatMap((type) => all.filter((e) => e.type === type && hit(e)).slice(0, 4));
  }, [q, index]);

  const go = (item) => {
    navigate(item.to);
    setOpen(false);
    setQ('');
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active] || results[0]);
    }
  };

  const showPanel = open && q.trim() !== '';

  return (
    <div className="gsearch" ref={boxRef}>
      <span className="gsearch-ic" aria-hidden="true">⌕</span>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search orders, dishes, messages…"
        aria-label="Search"
        autoComplete="off"
        value={q}
        onFocus={() => {
          ensureIndex();
          setOpen(true);
        }}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
      />

      {showPanel && (
        <div className="gsearch-panel" role="listbox">
          {results.length === 0 ? (
            <p className="gsearch-empty">No results for “{q.trim()}”</p>
          ) : (
            results.map((r, i) => (
              <Fragment key={r.key}>
                {(i === 0 || results[i - 1].type !== r.type) && <h6>{LABELS[r.type]}</h6>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={`gsearch-item ${i === active ? 'active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span className={`gsearch-badge t-${r.type}`}>{ICONS[r.type]}</span>
                  <span className="gsearch-text">
                    <b>{r.title}</b>
                    {r.sub && <small>{r.sub}</small>}
                  </span>
                </button>
              </Fragment>
            ))
          )}
        </div>
      )}
    </div>
  );
}