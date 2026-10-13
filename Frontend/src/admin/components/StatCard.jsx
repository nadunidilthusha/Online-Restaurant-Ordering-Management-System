import { useEffect, useState } from 'react';
import { ShoppingBag, Wallet, UserPlus, Mail } from 'lucide-react';

// icon for each summary card, picked by the card's id
const ICONS = { orders: ShoppingBag, revenue: Wallet, customers: UserPlus, messages: Mail };

// counts up to `value` once on mount
function useCountUp(target, ms = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

export default function StatCard({ id, label, value, prefix = '', icon, color }) {
  const n = useCountUp(value);
  const Icon = ICONS[id];

  return (
    <div className="kpi" style={{ '--c': color }}>
      <div className="kpi-ic">{Icon ? <Icon size={22} strokeWidth={1.8} /> : icon}</div>
      <span className="kpi-label">{label}</span>
      <b>{prefix}{n.toLocaleString()}</b>
    </div>
  );
}