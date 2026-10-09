import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/chefs', 'Chefs'],
  ['/order', 'Menu'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Main">
        <Link to="/" className="logo">
          Saffron<span>&amp;</span>Fig
        </Link>

        <ul className="nav-links">
          {links.map(([to, label]) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/order"
            style={{
              background: 'linear-gradient(135deg, #ecd5a1, #d4af6a)',
              color: '#1a1005',
              padding: '8px 20px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.88rem',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
            }}
          >
            Order online
          </Link>

          <Link
            to="/checkout"
            className="cart-link"
            title="Dining Cart &amp; Checkout"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span
              style={{
                background: '#8c1d2f',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '10px',
                lineHeight: 1,
              }}
            >
              {count}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
