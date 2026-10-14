import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/common/Card';
import './OrderAdmin.css';

// Mock data array so we can filter it dynamically
const mockOrders = [
  { id: 'SF-1048', initials: 'NS', avatarColor: 'blue', name: 'Nimal Silva', time: 'Today, 09:15 AM', total: 'Rs. 5,200.00', status: 'New', statusClass: 'new' },
  { id: 'SF-1047', initials: 'AK', avatarColor: 'orange', name: 'Ayesha Khan', time: 'Today, 08:45 AM', total: 'Rs. 3,850.00', status: 'Preparing', statusClass: 'preparing' },
  { id: 'SF-1046', initials: 'DP', avatarColor: 'purple', name: 'David Perera', time: 'Yesterday, 08:00 PM', total: 'Rs. 9,600.00', status: 'On the way', statusClass: 'ontheway' },
  { id: 'SF-1045', initials: 'MF', avatarColor: 'green', name: 'Maya Fernando', time: 'Yesterday, 07:30 PM', total: 'Rs. 2,400.00', status: 'Completed', statusClass: 'completed' },
  { id: 'SF-1043', initials: 'SJ', avatarColor: 'red', name: 'Sara Jayawardena', time: 'Yesterday, 06:15 PM', total: 'Rs. 1,700.00', status: 'Cancelled', statusClass: 'cancelled' }
];

export default function OrderManagementPage() {
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Filter the array based on the dropdown selection
  const filteredOrders = statusFilter === 'All Statuses' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === statusFilter);

  return (
    <div className="menu-admin-page">
      <div className="admin-page-header">
        <h1>Order management</h1>
        <p>Track and manage incoming customer orders and their preparation status.</p>
      </div>

      <Card className="admin-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="admin-card-title" style={{ border: 'none', marginBottom: 0, paddingBottom: 0 }}>Recent Orders</h2>
          
          {/* Working Dropdown Filter */}
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>
                    <div className="customer-cell">
                      <div className={`avatar ${order.avatarColor}`}>{order.initials}</div> 
                      {order.name}
                    </div>
                  </td>
                  <td>{order.time}</td>
                  <td>{order.total}</td>
                  <td><span className={`status-badge ${order.statusClass}`}>{order.status}</span></td>
                  <td><Link to={`/admin/orders/${order.id}`} className="action-link">View</Link></td>
                </tr>
              ))
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