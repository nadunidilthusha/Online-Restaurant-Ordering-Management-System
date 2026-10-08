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
  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Main">
        <Link to="/" className="logo">Saffron<span>&amp;</span>Fig</Link>
        <ul className="nav-links">
          {links.map(([to, label]) => (
            <li key={to}><NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink></li>
          ))}
        </ul>
        <Link to="/order" className="cart-link">Cart · {count}</Link>
      </nav>
    </header>
  );
}
