import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

export default function OrderSummary({
  items = [],
  subtotal = 0,
  deliveryFee = 4.5,
  onCheckout,
  isSubmitting = false,
}) {
  const gst = Number((subtotal * 0.1).toFixed(2));
  const grandTotal = Number((subtotal + (items.length > 0 ? deliveryFee : 0) + gst).toFixed(2));

  return (
    <aside className="summary-wrapper">
      <div className="summary-card">
        <div className="summary-header">
          <h3 className="summary-title">Order summary</h3>
          <div className="summary-receipt-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path>
              <line x1="8" y1="8" x2="16" y2="8"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
              <line x1="8" y1="16" x2="12" y2="16"></line>
            </svg>
          </div>
        </div>

        {/* Line Items */}
        <div className="summary-items">
          {items.length === 0 ? (
            <p style={{ color: '#8c7e78', fontSize: '0.88rem' }}>No dishes selected yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="summary-item-row">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span className="price">{formatPrice(item.price * item.qty)}</span>
              </div>
            ))
          )}
        </div>

        {/* Calculations */}
        <div className="summary-calc-rows">
          <div className="summary-calc-row">
            <span>Subtotal</span>
            <span className="price">{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-calc-row">
            <span>Delivery & Courier Service</span>
            <span className="price">
              {items.length === 0 ? formatPrice(0) : deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
            </span>
          </div>

          <div className="summary-calc-row">
            <span>Fee (GST 10%)</span>
            <span className="price">{formatPrice(items.length === 0 ? 0 : gst)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="summary-total-row">
          <div className="total-flex">
            <span className="total-label">Total</span>
            <span className="total-amount">{formatPrice(items.length === 0 ? 0 : grandTotal)}</span>
          </div>
          <p className="total-caption">Inclusive of all local priorities</p>
        </div>

        {/* Checkout Button */}
        <button
          type="button"
          className="btn-checkout-cta"
          onClick={onCheckout}
          disabled={items.length === 0 || isSubmitting}
        >
          {isSubmitting ? 'Relaying to Kitchen...' : 'Place Order • Secure Checkout →'}
        </button>

        <div className="summary-security">
          <span>🔒 256-BIT SSL</span>
          <span>⚡ DIRECT KITCHEN RELAY</span>
          <span>📱 REAL-TIME SMS</span>
        </div>
      </div>

      {/* Brigade Specialist Card */}
      <div className="brigade-card">
        <div className="brigade-avatar">SF</div>
        <div className="brigade-meta">
          <span className="brigade-tag">BRIGADE SPECIALIST</span>
          <h4 className="brigade-name">Amara Perera</h4>
          <p className="brigade-desc">
            Head Chef · Wood-fire Specialist · Overseeing this evening's cellar system
          </p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="stats-strip">
        <div className="stat-item">
          <span className="stat-num">12</span>
          <span className="stat-title">Years Crafting</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">85</span>
          <span className="stat-title">Dishes</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">2,400+</span>
          <span className="stat-title">Happy Diners</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">4.9</span>
          <span className="stat-title">Rating</span>
        </div>
      </div>
    </aside>
  );
}
