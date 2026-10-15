import { useState } from 'react';

const SIZE = 150, R = 62, STROKE = 26, C = 2 * Math.PI * R;

export default function OrderStatusChart({ statuses }) {
  const total = statuses.reduce((s, x) => s + x.count, 0);
  const [hover, setHover] = useState(null);   // index of the slice being pointed at
  const [tip, setTip] = useState(false);      // show the floating tooltip (only when pointing at the chart)
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const pct = (n) => (total ? ((n / total) * 100).toFixed(1) : '0.0');

  // work out where each slice starts and how long it is
  let offset = 0;
  const slices = statuses.map((s) => {
    const len = total ? (s.count / total) * C : 0;
    const slice = { ...s, len, offset };
    offset += len;
    return slice;
  });

  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - box.left, y: e.clientY - box.top });
  };

  const active = hover !== null ? statuses[hover] : null;

  return (
    <div className="panel">
      <div className="panel-head"><h2>Orders by status</h2></div>
      <div className="donut-wrap">
        <div className="donut-box" onMouseMove={onMove} onMouseLeave={() => { setHover(null); setTip(false); }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="donut-svg" role="img" aria-label="Orders by status">
            <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
              {slices.map((s, i) => (
                <circle
                  key={s.label} className="donut-seg" cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={s.color}
                  strokeWidth={hover === i ? STROKE + 6 : STROKE}
                  strokeDasharray={`${s.len} ${C - s.len}`} strokeDashoffset={-s.offset}
                  opacity={hover === null || hover === i ? 1 : 0.4}
                  onMouseEnter={() => { setHover(i); setTip(true); }}
                />
              ))}
            </g>
          </svg>

          {/* centre of the donut: total by default, the percentage while pointing at a slice */}
          <div className="donut-center">
            {active
              ? <><span className="pct">{pct(active.count)}%</span><small>{active.label}</small></>
              : <><span>{total}</span><small>orders</small></>}
          </div>

          {active && tip && (
            <div className="donut-tip" style={{ left: pos.x, top: pos.y }}>
              <b>{active.label}</b>
              {active.count} orders · {pct(active.count)}%
            </div>
          )}
        </div>

        <ul className="legend">
          {statuses.map((s, i) => (
            <li
              key={s.label} className={hover !== null && hover !== i ? 'dim' : ''}
              onMouseEnter={() => { setHover(i); setTip(false); }} onMouseLeave={() => setHover(null)}
            >
              <i style={{ background: s.color }} />{s.label}<b>{s.count}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}