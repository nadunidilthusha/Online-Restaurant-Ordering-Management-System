import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/chefs', 'Chefs'],
  ['/order', 'Order'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const { count } = useCart();
  const [small, setSmall] = useState(false);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);

  // header gets smaller after scrolling
  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // cart badge pops when an item is added
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <header className={`site-header ${small ? 'small' : ''}`}>
      <nav className="container nav-bar" aria-label="Main">
        <Link to="/" className="logo">Saffron<span>&amp;</span>Fig</Link>

        <ul className={`main-nav ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/order" className="btn btn-primary nav-order">Order online</Link>
          <Link to="/order" className="cart-btn" aria-label={`Cart, ${count} items`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6L5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>
            <span className={`cart-count ${bump ? 'bump' : ''}`}>{count}</span>
          </Link>
          <button className="menu-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}