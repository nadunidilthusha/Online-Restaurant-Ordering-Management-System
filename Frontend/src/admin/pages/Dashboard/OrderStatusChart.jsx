export default function OrderStatusChart({ statuses }) {
  const total = statuses.reduce((s, x) => s + x.count, 0);
  let acc = 0;
  const stops = statuses.map((s) => { const from = (acc / total) * 100; acc += s.count; return `${s.color} ${from}% ${(acc / total) * 100}%`; });

  return (
    <div className="panel">
      <div className="panel-head"><h2>Orders by status</h2></div>
      <div className="donut-wrap">
        <div className="donut" style={{ background: `conic-gradient(${stops.join(',')})` }} role="img" aria-label="Orders by status"><span>{total}</span></div>
        <ul className="legend">
          {statuses.map((s) => <li key={s.label}><i style={{ background: s.color }} />{s.label}<b>{s.count}</b></li>)}
        </ul>
      </div>
    </div>
  );
}
