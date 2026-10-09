import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationsProvider } from '../../context/NotificationsContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile sidebar

  return (
    <NotificationsProvider>
      <div className="admin">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
        <div className="admin-main">
          <Header onMenu={() => setMenuOpen(true)} />
          <main className="admin-content"><Outlet /></main>
        </div>
      </div>
    </NotificationsProvider>
  );
}
