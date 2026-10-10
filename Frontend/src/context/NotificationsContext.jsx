import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import * as notificationApi from '../api/notificationApi';
import { SAMPLE_NOTIFICATIONS } from '../data/sampleContent';

export const NotificationsContext = createContext({
  items: [], unread: 0, unreadByType: {}, markRead() {}, markAllRead() {},
});

// One shared list of notifications for the whole admin panel:
// the bell in the top bar and the number badges in the sidebar both read from here.
export function NotificationsProvider({ children, pollMs = 60000 }) {
  const [items, setItems] = useState([]);
  const sample = useRef(false);

  const load = useCallback(() => {
    if (sample.current) return;
    notificationApi.getNotifications()
      .then(setItems)
      .catch(() => { sample.current = true; setItems(SAMPLE_NOTIFICATIONS); }); // API not running yet
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, pollMs);
    return () => clearInterval(timer);
  }, [load, pollMs]);

  const markRead = (id) => {
    setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    if (!sample.current) notificationApi.markRead(id).catch(() => {});
  };

  const markAllRead = () => {
    setItems((list) => list.map((n) => ({ ...n, read: true })));
    if (!sample.current) notificationApi.markAllRead().catch(() => {});
  };

  // { order: 2, message: 1 } = unread notifications of each type
  const unreadByType = items.reduce((acc, n) => (n.read ? acc : { ...acc, [n.type]: (acc[n.type] || 0) + 1 }), {});

  const value = { items, unread: items.filter((n) => !n.read).length, unreadByType, markRead, markAllRead };
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}
