import { Link } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';

export default function ContentStatus({ items }) {
  return (
    <div className="panel">
      <div className="panel-head"><h2>Content status</h2></div>
      <ul className="status-list">
        {items.map((c) => (
          <li key={c.name}><div>{c.name}<small>{c.note}</small></div><StatusBadge status={c.state} /></li>
        ))}
      </ul>
    </div>
  );
}
