import { Link } from 'react-router-dom';

export default function TopDishes({ dishes }) {
  const max = Math.max(...dishes.map((d) => d.sold));
  return (
    <div className="panel">
      <div className="panel-head"><h2>Top selling dishes</h2><Link to="/admin/menu" className="link">Manage menu</Link></div>
      <ul className="top-list">
        {dishes.map((d, i) => (
          <li key={d.name}>
            <span className="rank">{i + 1}</span>
            <div className="grow"><b>{d.name}</b><div className="bar"><i style={{ width: `${(d.sold / max) * 100}%` }} /></div></div>
            <em>{d.sold} sold</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
