import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import { timeAgo } from '../../utils/timeAgo';

const ICONS = { order: '🧾', message: '✉️', system: '🔔' };

export default function NotificationBell() {
  const { items, unread, markRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const navigate = useNavigate();

  // close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const openItem = (n) => {
    markRead(n.id);
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  return (
    <div className="notif" ref={box}>
      <button
        className={`bell-btn ${unread ? 'has-new' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications, ${unread} unread`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        🔔
        {unread > 0 && <span className="bell-count">{unread > 9 ? '9+' : unread}</span>}
      </button>

      {open && (
        <div className="notif-panel" role="dialog" aria-label="Notifications">
          <div className="notif-head">
            <h3>Notifications</h3>
            <button className="link" onClick={markAllRead} disabled={!unread}>Mark all as read</button>
          </div>

          <ul className="notif-list">
            {items.length === 0 && <li className="notif-empty">You're all caught up</li>}
            {items.map((n) => (
              <li key={n.id}>
                <button className={`notif-item ${n.read ? '' : 'unread'}`} onClick={() => openItem(n)}>
                  <span className={`notif-ic ${n.type}`}>{ICONS[n.type] || '🔔'}</span>
                  <span className="notif-body">
                    <b>{n.title}</b>
                    <span>{n.text}</span>
                    <time>{timeAgo(n.createdAt)}</time>
                  </span>
                  {!n.read && <i className="notif-dot" aria-label="Unread" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="notif-foot">
            <Link to="/admin/orders" onClick={() => setOpen(false)}>View orders</Link>
            <Link to="/admin/contact" onClick={() => setOpen(false)}>View messages</Link>
          </div>
        </div>
      )}
    </div>
  );
}
