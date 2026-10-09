import { useEffect, useState } from 'react';
import { getDashboard } from '../../../api/dashboardApi';
import { SAMPLE_DASHBOARD } from '../../../data/sampleContent';
import { useAuth } from '../../../hooks/useAuth';
import Loader from '../../../components/common/Loader';
import StatCard from '../../components/StatCard';
import RevenueChart from './RevenueChart';
import OrderStatusChart from './OrderStatusChart';
import RecentOrders from './RecentOrders';
import RecentMessages from './RecentMessages';
import TopDishes from './TopDishes';

const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default function DashboardPage() {
  const { admin } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData).catch(() => setData(SAMPLE_DASHBOARD)); // sample data until the API exists
  }, []);

  if (!data) return <Loader />;

  return (
    <>
      <div className="page-head">
        <h1>{greeting()}{admin?.name ? `, ${admin.name.split(' ')[0]}` : ''}</h1>
        <p>Here's what's happening at the restaurant today.</p>
      </div>

      <section className="kpis" aria-label="Key numbers">
        {data.kpis.map((k) => <StatCard key={k.id} {...k} />)}
      </section>

      <section className="grid2"><RevenueChart data={data.revenue} /><OrderStatusChart statuses={data.statuses} /></section>
      <section className="grid-orders"><RecentOrders orders={data.recentOrders} /><RecentMessages messages={data.recentMessages} /></section>
      <TopDishes dishes={data.topDishes} />
    </>
  );
}