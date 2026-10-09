import NotificationBell from '../components/NotificationBell';

export default function Header({ onMenu }) {
  return (
    <header className="admin-header">
      <button className="burger" onClick={onMenu} aria-label="Open menu">☰</button>

      <label className="admin-search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Search orders, dishes, messages…" aria-label="Search" />
      </label>

      <div className="admin-header-actions">
        <NotificationBell />
        <a href="/" target="_blank" rel="noreferrer" className="btn-live">
          View live site <span className="arrow">↗</span>
        </a>
      </div>
    </header>
  );
}
