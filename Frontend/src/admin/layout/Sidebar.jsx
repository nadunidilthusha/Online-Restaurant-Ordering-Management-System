import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, House, BookOpen, ChefHat, UtensilsCrossed, ClipboardList, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

// badge = number of unread notifications of that type ('order' or 'message')
const GROUPS = [
  { title: 'OVERVIEW', items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  {
    title: 'SITE CONTENT',
    items: [
      { to: '/admin/home', label: 'Home management', icon: House },
      { to: '/admin/about', label: 'About management', icon: BookOpen },
      { to: '/admin/chefs', label: 'Chef management', icon: ChefHat },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { to: '/admin/menu', label: 'Menu management', icon: UtensilsCrossed },
      { to: '/admin/orders', label: 'Order management', icon: ClipboardList, badge: 'order' },
      { to: '/admin/contact', label: 'Contact management', icon: Mail, badge: 'message' },
    ],
  },
];

const initials = (name = 'Admin') => name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

export default function Sidebar({ open, onClose }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadByType } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <Link to="/admin" className="logo">Saffron<span>&amp;</span>Fig</Link>
        <small>ADMIN PANEL</small>
      </div>

      <nav className="side-menu" aria-label="Admin">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h6>{g.title}</h6>
            {g.items.map(({ to, label, icon: Icon, end, badge }) => {
              const count = badge ? unreadByType[badge] || 0 : 0;
              return (
              <NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="ic"><Icon size={18} strokeWidth={1.8} /></span>
                {label}
                {count > 0 && <span className="pill">{count > 99 ? '99+' : count}</span>}
              </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="side-foot">
        <div className="side-av">{initials(admin?.name)}</div>
        <div><b>{admin?.name || 'Administrator'}</b><small>Administrator</small></div>
        <button className="logout-btn" onClick={handleLogout} aria-label="Log out" title="Log out">
          <LogOut size={18} strokeWidth={1.8} />
        </button>
      </div>
    </aside>
  );
}
