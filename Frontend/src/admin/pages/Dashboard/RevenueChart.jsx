import { useState } from 'react';

const W = 760, H = 280, P = { t: 20, r: 16, b: 30, l: 46 };
const RANGES = [['weekly', 'Weekly'], ['monthly', 'Monthly'], ['annually', 'Annually']];
const NICE_MAX = [4000, 8000, 12000, 16000, 20000, 40000, 60000, 80000, 100000, 120000, 200000];

export default function RevenueChart({ data }) {
  const [range, setRange] = useState('weekly');
  const { labels, values } = data[range];
  const peak = Math.max(...values);
  const max = NICE_MAX.find((n) => n >= peak) || peak;
  const x = (i) => P.l + (i * (W - P.l - P.r)) / (values.length - 1);
  const y = (n) => P.t + (1 - n / max) * (H - P.t - P.b);
  const line = values.map((n, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(n).toFixed(1)}`).join(' ');
  const step = values.length > 20 ? 4 : 1; // show fewer labels on the monthly view

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Revenue overview</h2>
        <div className="seg">
          {RANGES.map(([key, label]) => (
            <button key={key} aria-pressed={range === key} onClick={() => setRange(key)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="chart">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Revenue chart">
          <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8c1d2f" stopOpacity=".28" /><stop offset="1" stopColor="#8c1d2f" stopOpacity="0" /></linearGradient></defs>
          {[0, .25, .5, .75, 1].map((f) => (
            <g key={f}>
              <line x1={P.l} x2={W - P.r} y1={y(max * f)} y2={y(max * f)} stroke="#ece3d0" strokeDasharray="3 4" />
              <text x={P.l - 10} y={y(max * f) + 4} textAnchor="end">${(max * f) / 1000}k</text>
            </g>
          ))}
          {labels.map((t, i) => i % step === 0 && <text key={t + i} x={x(i)} y={H - 8} textAnchor="middle">{t}</text>)}
          <path d={`${line} L${x(values.length - 1)} ${H - P.b} L${P.l} ${H - P.b}Z`} fill="url(#areaGrad)" />
          <path d={line} fill="none" stroke="#8c1d2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {values.map((n, i) => (
            <circle key={i} cx={x(i)} cy={y(n)} r="4" fill="#fff" stroke="#8c1d2f" strokeWidth="2"><title>{`${labels[i]}: $${n.toLocaleString()}`}</title></circle>
          ))}
        </svg>
      </div>
    </div>
  );
}