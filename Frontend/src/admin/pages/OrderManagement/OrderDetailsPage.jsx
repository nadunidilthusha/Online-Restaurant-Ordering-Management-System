import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import './OrderAdmin.css';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id, token]);

  const updateOrderStatus = async (newStatus) => {
    try {
      const response = `http://localhost:5000/api/orders/${id}/status`;
      const res = await fetch(response, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!res.ok) throw new Error("Failed to update status");
      
      const updated = await res.json();
      setOrder(updated);
      alert(`Order status updated to ${newStatus}!`);
    } catch (error) {
      setOrder({ ...order, status: newStatus });
      alert(`Order status changed to ${newStatus}`);
    }
  };

  const handlePrint = () => { window.print(); };

  if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading order details...</div>;
  if (!order) return <div style={{ padding: '60px', textAlign: 'center' }}>Order not found.</div>;

  const stat = order.status?.toLowerCase();
  const currentStatusDisplay = 
      (stat === 'new' || stat === 'confirm' || stat === 'confirmed') ? 'New' : 
      stat === 'preparing' ? 'Preparing' : 
      stat === 'on_the_way' ? 'On the way' : 
      stat === 'completed' ? 'Completed' : 'Cancelled';

  const getBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'new';
      case 'Preparing': return 'preparing';
      case 'On the way': return 'ontheway';
      case 'Completed': return 'completed';
      case 'Cancelled': return 'cancelled';
      default: return 'new';
    }
  };

  return (
    <div className="menu-admin-page">
      <Link to="/admin/orders" style={{ color: '#888', fontSize: '0.9rem', display: 'inline-block', marginBottom: '16px', textDecoration: 'none', fontWeight: '500' }}>
        ← Back to Orders
      </Link>
      
      <div className="order-header-flex">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', color: '#1a050a', margin: 0, fontWeight: '500' }}>
              Order #{order.id}
            </h1>
            <span className={`status-badge ${getBadgeClass(currentStatusDisplay)}`}>
              {currentStatusDisplay}
            </span>
          </div>
          <p style={{ color: '#8c8c8c', fontSize: '0.95rem' }}>Placed on {new Date(order.createdAt || Date.now()).toLocaleString()}</p>
        </div>
        
        <Button onClick={handlePrint} variant="outline" style={{ backgroundColor: '#fff', borderColor: '#e9ecef', color: '#333' }}>
          🖨️ Print Ticket
        </Button>
      </div>

      <div className="order-details-grid">
        <Card className="admin-card" style={{ padding: '32px' }}>
          <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Order Items</h2>
          <table className="admin-table order-items-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 0 }}>Item Details</th>
                <th>Price</th>
                <th>Qty</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="item-detail-cell">
                      <div>
                        <strong style={{ display: 'block', marginBottom: '4px', color: '#333' }}>{item.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>Rs. {Number(item.price).toLocaleString()}</td>
                  <td>{item.qty}</td>
                  <td style={{ textAlign: 'right', fontWeight: '500', color: '#333' }}>Rs. {(item.price * item.qty).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Card className="admin-card" style={{ padding: '32px', marginBottom: 0 }}>
            <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Customer Details</h2>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Name & Contact</label>
              <div style={{ color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong>{order.customerName}</strong><br />
                {order.phone || '+94 77 000 0000'}<br />
                {order.email}
              </div>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Delivery Address</label>
              <div style={{ color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {order.address || 'Pickup Order'}
              </div>
            </div>
          </Card>

          <Card className="admin-card" style={{ padding: '32px', marginBottom: 0 }}>
            <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {Number(order.subtotal || 0).toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. {Number(order.deliveryFee || 0).toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span style={{ color: 'var(--burg)' }}>Rs. {Number(order.total || 0).toLocaleString()}</span>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <label style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                Update Order Status
              </label>
              <select 
                className="input" 
                value={currentStatusDisplay} 
                onChange={(e) => {
                  const val = e.target.value === 'New' ? 'new' : 
                              e.target.value === 'Preparing' ? 'preparing' : 
                              e.target.value === 'On the way' ? 'on_the_way' : 
                              e.target.value === 'Completed' ? 'completed' : 'cancelled';
                  updateOrderStatus(val);
                }}
              >
                <option value="New">New</option>
                <option value="Preparing">Preparing</option>
                <option value="On the way">On the way</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </Card>
        </div>
      </div>

      {currentStatusDisplay === 'New' && (
        <div className="sticky-bottom-bar">
          <span style={{ color: '#f5f2eb' }}>Action required: Acknowledge new order</span>
          <div className="sticky-actions">
            <Button onClick={() => updateOrderStatus('cancelled')} variant="outline" style={{ color: '#fff', borderColor: '#e9ecef' }}>
              Cancel Order
            </Button>
            <Button onClick={() => updateOrderStatus('preparing')} variant="primary">
              Accept & Start Preparing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}