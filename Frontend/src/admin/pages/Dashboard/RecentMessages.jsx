import { Link } from 'react-router-dom';
import EmptyState from '../../../components/common/EmptyState';

export default function RecentMessages({ messages }) {
  return (
    <div className="panel">
      <div className="panel-head"><h2>Messages</h2><Link to="/admin/contact" className="link">Inbox</Link></div>
      {messages.length === 0 ? <EmptyState title="No messages yet" /> : messages.map((m) => (
        <div className={`msg-row ${m.unread ? 'unread' : ''}`} key={m.id}>
          <span className="mini">{m.name[0]}</span>
          <div><b>{m.name}</b><p>{m.text}</p></div>
          <time>{m.time}</time>
        </div>
      ))}
    </div>
  );
}
