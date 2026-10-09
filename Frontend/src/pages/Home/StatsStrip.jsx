import { useCountUp } from '../../hooks/useCountUp';

function Stat({ to, label, decimals = 0, suffix = '' }) {
  const [ref, value] = useCountUp(to, { decimals });
  const text = decimals ? value : Number(value).toLocaleString();
  return (
    <div className="stat">
      <b ref={ref}>{text}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

export default function StatsStrip({ stats }) {
  return (
    <section className="stats" aria-label="Highlights">
      <div className="container stats-grid">
        <Stat to={stats.years} label="Years of cooking" />
        <Stat to={stats.dishes} label="Dishes on our menu" />
        <Stat to={stats.diners} label="Happy diners" suffix="+" />
        <Stat to={stats.rating} label="Average rating" decimals={1} />
      </div>
    </section>
  );
}