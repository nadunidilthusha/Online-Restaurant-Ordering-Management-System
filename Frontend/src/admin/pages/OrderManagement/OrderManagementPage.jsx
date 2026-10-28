import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';
import './OrderAdmin.css';

export default function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // Helper to map backend status to CSS classes & labels
  const formatStatus = (status) => {
    switch (status) {
      case 'new': return { label: 'New', className: 'new' };
      case 'preparing': return { label: 'Preparing', className: 'preparing' };
      case 'on_the_way': return { label: 'On the way', className: 'ontheway' };
      case 'completed': return { label: 'Completed', className: 'completed' };
      case 'cancelled': return { label: 'Cancelled', className: 'cancelled' };
      default: return { label: status, className: 'new' };
    }
  };

  const filteredOrders = statusFilter === 'All Statuses' 
    ? orders 
    : orders.filter(order => formatStatus(order.status).label.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="menu-admin-page">
      <div className="admin-page-header">
        <h1>Order management</h1>
        <p>Track and manage incoming customer orders and their preparation status.</p>
      </div>

      <Card className="admin-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="admin-card-title" style={{ border: 'none', marginBottom: 0, paddingBottom: 0 }}>Recent Orders</h2>
          
          <select 
            className="input" 
            style={{ width: '160px', padding: '8px 12px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="New">New</option>
            <option value="Preparing">Preparing</option>
            <option value="On the way">On the way</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date & Time</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#888' }}>Loading orders...</td></tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map(order => {
                const badge = formatStatus(order.status);
                const initials = order.customerName ? order.customerName.split(' ').map(n => n[0]).join('') : 'C';
                return (
                  <tr key={order.id}>
                    <td><strong>#{order.id}</strong></td>
                    <td>
                      <div className="customer-cell">
                        <div className="avatar blue">{initials}</div> 
                        {order.customerName}
                      </div>
                    </td>
                    <td>{new Date(order.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td>Rs. {Number(order.total).toLocaleString()}</td>
                    <td><span className={`status-badge ${badge.className}`}>{badge.label}</span></td>
                    <td><Link to={`/admin/orders/${order.id}`} className="action-link">View</Link></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                  No orders found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}