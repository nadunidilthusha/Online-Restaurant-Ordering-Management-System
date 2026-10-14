import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { update } from '../../../api/contactApi';
import EmptyState from '../../../components/common/EmptyState';

export default function RecentMessages({ messages }) {
  const [list, setList] = useState(messages); // local copy so the red dot can disappear
  const navigate = useNavigate();

  const openMessage = (m) => {
    if (m.unread) {
      setList((l) => l.map((x) => (x.id === m.id ? { ...x, unread: false } : x)));
      update(m.id, { read: true }).catch(() => {}); // saved on the server once the API exists
    }
    // go straight to the Contact Management page with this message selected
    navigate(`/admin/contact?id=${m.id}`);
  };

  return (
    <div className="panel">
      <div className="panel-head"><h2>Messages</h2><Link to="/admin/contact" className="link">Inbox</Link></div>

      {list.length === 0 ? <EmptyState title="No messages yet" /> : list.map((m) => (
        <button type="button" className={`msg-row ${m.unread ? 'unread' : ''}`} key={m.id} onClick={() => openMessage(m)}>
          <span className="mini">{m.name[0]}</span>
          <span className="msg-text"><b>{m.name}</b><span className="msg-snippet">{m.text}</span></span>
          <time>{m.time}</time>
        </button>
      ))}
    </div>
  );
}