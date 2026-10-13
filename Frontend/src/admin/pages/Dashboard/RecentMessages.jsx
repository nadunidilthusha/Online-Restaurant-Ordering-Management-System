import { useState } from 'react';
import { Link } from 'react-router-dom';
import { update } from '../../../api/contactApi';
import Modal from '../../../components/common/Modal';
import EmptyState from '../../../components/common/EmptyState';

export default function RecentMessages({ messages }) {
  const [list, setList] = useState(messages); // local copy so the red dot can disappear
  const [selected, setSelected] = useState(null);

  const openMessage = (m) => {
    setSelected(m);
    if (m.unread) {
      setList((l) => l.map((x) => (x.id === m.id ? { ...x, unread: false } : x)));
      update(m.id, { read: true }).catch(() => {}); // saved on the server once the API exists
    }
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

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="msg-detail">
            <div className="msg-detail-head">
              <span className="mini big">{selected.name[0]}</span>
              <div>
                <h3>{selected.name}</h3>
                <small>{selected.email || 'No email provided'} · {selected.time} ago</small>
              </div>
            </div>
            <p className="msg-detail-body">{selected.text}</p>
            <div className="msg-detail-actions">
              {selected.email && (
                <a className="btn btn-wine" href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: your message to Saffron & Fig')}`}>Reply by email</a>
              )}
              <Link to="/admin/contact" className="btn btn-ghost-light" onClick={() => setSelected(null)}>Open inbox</Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}