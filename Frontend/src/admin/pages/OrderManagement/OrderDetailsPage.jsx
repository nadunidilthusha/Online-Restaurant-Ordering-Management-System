import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import './OrderAdmin.css';

export default function OrderDetailsPage() {
  const { id } = useParams();
  
  // State to track the current status of the order
  const [orderStatus, setOrderStatus] = useState('New');

  // Function to trigger the browser print window
  const handlePrint = () => {
    window.print();
  };

  // Function to accept the order
  const handleAcceptOrder = () => {
    setOrderStatus('Preparing');
    alert("Order accepted and moved to Preparing status!");
  };

  // Function to cancel the order
  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrderStatus('Cancelled');
    }
  };

  // Helper function to get the correct CSS class for the status badge
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
              Order #{id || 'SF-1048'}
            </h1>
            {/* Dynamic Status Badge */}
            <span className={`status-badge ${getBadgeClass(orderStatus)}`}>
              {orderStatus}
            </span>
          </div>
          <p style={{ color: '#8c8c8c', fontSize: '0.95rem', fontFamily: 'var(--sans)' }}>Placed on Oct 7, 2026 at 09:15 AM</p>
        </div>
        
        {/* Working Print Button */}
        <Button onClick={handlePrint} variant="outline" style={{ backgroundColor: '#fff', borderColor: '#e9ecef', color: '#333' }}>
          🖨️ Print Ticket
        </Button>
      </div>

      <div className="order-details-grid">
        {/* Left Column: Order Items */}
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
              <tr>
                <td>
                  <div className="item-detail-cell">
                    <div className="item-thumb"></div>
                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px', color: '#333' }}>Burrata & Fig Salad</strong>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>Category: Starters</span>
                    </div>
                  </div>
                </td>
                <td>Rs. 2,200.00</td>
                <td>1</td>
                <td style={{ textAlign: 'right', fontWeight: '500', color: '#333' }}>Rs. 2,200.00</td>
              </tr>
              <tr>
                <td>
                  <div className="item-detail-cell">
                    <div className="item-thumb"></div>
                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px', color: '#333' }}>Clay Pot Chicken Simmer</strong>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>Category: Mains</span>
                    </div>
                  </div>
                </td>
                <td>Rs. 1,500.00</td>
                <td>2</td>
                <td style={{ textAlign: 'right', fontWeight: '500', color: '#333' }}>Rs. 3,000.00</td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* Right Column: Customer Details & Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <Card className="admin-card" style={{ padding: '32px', marginBottom: 0 }}>
            <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Customer Details</h2>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Name & Contact</label>
              <div style={{ color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong>Nimal Silva</strong><br />
                +94 77 123 4567<br />
                nimal.s@email.com
              </div>
            </div>
            <div>
              <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '4px' }}>Delivery Address</label>
              <div style={{ color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                42/1, Temple Road,<br />
                Colombo 05,<br />
                Sri Lanka
              </div>
            </div>
          </Card>

          <Card className="admin-card" style={{ padding: '32px', marginBottom: 0 }}>
            <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal (3 Items)</span>
              <span>Rs. 5,200.00</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. 0.00</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span style={{ color: 'var(--burg)' }}>Rs. 5,200.00</span>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <label style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                Update Order Status
              </label>
              {/* Working Manual Override Dropdown */}
              <select 
                className="input" 
                value={orderStatus} 
                onChange={(e) => setOrderStatus(e.target.value)}
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

      {/* Sticky Bottom Action Bar - ONLY SHOWS IF ORDER IS NEW */}
      {orderStatus === 'New' && (
        <div className="sticky-bottom-bar">
          <span style={{ color: '#f5f2eb' }}>Action required: Acknowledge new order</span>
          <div className="sticky-actions">
            <Button onClick={handleCancelOrder} variant="outline" style={{ color: '#fff', borderColor: '#e9ecef' }}>
              Cancel Order
            </Button>
            <Button onClick={handleAcceptOrder} variant="primary">
              Accept & Start Preparing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}