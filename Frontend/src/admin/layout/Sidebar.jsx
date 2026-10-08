import { Link, NavLink } from 'react-router-dom';

const items = [
  ['/admin', 'Dashboard', true],
  ['/admin/home', 'Home management'],
  ['/admin/about', 'About management'],
  ['/admin/chefs', 'Chef management'],
  ['/admin/menu', 'Menu management'],
  ['/admin/orders', 'Order management'],
  ['/admin/contact', 'Contact management'],
  ['/admin/images', 'Image management'],
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/admin" className="logo">Saffron<span>&amp;</span>Fig</Link>
      <nav aria-label="Admin">
        {items.map(([to, label, end]) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
