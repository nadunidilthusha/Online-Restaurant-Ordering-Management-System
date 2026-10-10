import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';

const COLORS = ['#3b6ea5', '#d98a3d', '#5a3d8c', '#3f7f6b', '#8c1d2f', '#c2410c'];
const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

export default function RecentOrders({ orders }) {
  const navigate = useNavigate();
  const rows = orders.map((o, i) => ({ ...o, color: COLORS[i % COLORS.length] }));

  const columns = [
    { key: 'id', label: 'Order', render: (o) => <b className="order-id">#{o.id}</b> },
    { key: 'customer', label: 'Customer', render: (o) => <div className="cust"><span className="mini" style={{ background: o.color }}>{initials(o.customer)}</span>{o.customer}</div> },
    { key: 'total', label: 'Total', render: (o) => `$${Number(o.total).toFixed(2)}` },
    { key: 'status', label: 'Status', render: (o) => <StatusBadge status={o.status} /> },
    { key: 'view', label: '', render: () => <button className="btn-view" onClick={() => navigate('/admin/orders')}>View</button> },
  ];

  return (
    <div className="panel">
      <div className="panel-head"><h2>Recent orders</h2><Link to="/admin/orders" className="link">View all</Link></div>
      <DataTable columns={columns} rows={rows} empty="No orders yet" />
    </div>
  );
}