import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import OrderSummary from './OrderSummary';
import * as orderApi from '../../api/orderApi';
import '../../assets/styles/CartCheckout.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    count,
    increase,
    decrease,
    removeItem,
    clear,
    resetToDefault,
  } = useCart();

  // Fulfilment mode: 'express' | 'pickup' | 'dinein'
  const [fulfilmentMode, setFulfilmentMode] = useState('express');

  // Patron & dispatch details pre-filled from luxury mockup
  const [formData, setFormData] = useState({
    fullName: 'Alexander Wright',
    email: 'alexander.w@example.com',
    phone: '+94 77 000 0000',
    orderType: 'delivery',
    address: '48 Quai de la Tournelle',
    suite: 'Apt 4B',
    deliveryWindow: 'ASAP (approx 35–45 mins dispatch)',
    notes: 'Please ring building intercom #402. Saffron reduction kept separately warm if possible.',
  });

  const [toast, setToast] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = fulfilmentMode === 'express' ? 4.5 : 0.0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleSavePreferences = () => {
    showToast('Patron preferences & delivery coordinates updated.');
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Your cart is empty. Please add items to checkout.');
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert('Please fill in required contact details (Name, Email, Phone).');
      return;
    }

    setIsSubmitting(true);

    const gst = Number((subtotal * 0.1).toFixed(2));
    const grandTotal = Number((subtotal + deliveryFee + gst).toFixed(2));
    const generatedId = `SF-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderData = {
      id: generatedId,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      orderType: fulfilmentMode,
      address: fulfilmentMode === 'dinein' ? 'Reserved Salon Table' : `${formData.address}${formData.suite ? ', ' + formData.suite : ''}`,
      deliveryWindow: formData.deliveryWindow,
      notes: formData.notes,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        lineTotal: i.price * i.qty,
      })),
      subtotal,
      deliveryFee,
      gst,
      total: grandTotal,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    try {
      // Attempt backend persistence (FR-4.5)
      await orderApi.create(orderData).catch(() => {
        // Backend fallback for local dev / demo
      });
    } catch {
      // Ignore network errors in preview
    } finally {
      // Save order snapshot for confirmation screen
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
      clear();
      setIsSubmitting(false);
      navigate(`/order/confirmation/${generatedId}`);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Floating Notification */}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '24px',
              zIndex: 999,
              background: '#240a12',
              color: '#d4af6a',
              border: '1px solid #d4af6a',
              padding: '12px 20px',
              borderRadius: '6px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            ✓ {toast}
          </div>
        )}

        {/* Page Header */}
        <header className="checkout-header">
          <h1 className="checkout-title">Your Dining Cart &amp; Checkout</h1>
          <p className="checkout-subtitle">
            Review your artisanal selection, customize your culinary preferences, and provide delivery or table coordinates for this evening's tasting.
          </p>
        </header>

        {/* 3-Step Process Stepper */}
        <div className="checkout-stepper">
          <div className="step-card active">
            <span className="step-number">1</span>
            <div className="step-meta">
              <span className="step-label">CURRENT PHASE</span>
              <span className="step-title">Cart &amp; Preferences</span>
            </div>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <div className="step-meta">
              <span className="step-label">LOGISTICS</span>
              <span className="step-title">Delivery Details</span>
            </div>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <div className="step-meta">
              <span className="step-label">CULINARY DISPATCH</span>
              <span className="step-title">Payment &amp; Confirmation</span>
            </div>
          </div>
        </div>

        {/* Fulfilment Mode Selector */}
        <div className="fulfilment-modes">
          {/* Option 1: Express Delivery */}
          <div
            className={`fulfilment-card ${fulfilmentMode === 'express' ? 'active' : ''}`}
            onClick={() => setFulfilmentMode('express')}
            role="button"
            tabIndex={0}
          >
            <div className="fulfilment-badge-row">
              <div className="fulfilment-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <span className="fulfilment-pill red">ACTIVE SELECTION</span>
            </div>
            <h3 className="fulfilment-title">
              Express Delivery <span className="fulfilment-price">Rs. 450</span>
            </h3>
            <p className="fulfilment-desc">
              Discreet thermal lock chambers, dispatch to your residence
            </p>
            <div className="fulfilment-subtext">
              <span>● Est. 35–45 min</span>
              <span>• Courier Relay</span>
            </div>
          </div>

          {/* Option 2: Curbside Pickup */}
          <div
            className={`fulfilment-card ${fulfilmentMode === 'pickup' ? 'active' : ''}`}
            onClick={() => setFulfilmentMode('pickup')}
            role="button"
            tabIndex={0}
          >
            <div className="fulfilment-badge-row">
              <div className="fulfilment-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </div>
              <span className="fulfilment-pill green">COMPLIMENTARY</span>
            </div>
            <h3 className="fulfilment-title">
              Curbside Pickup <span className="fulfilment-price" style={{ color: '#6ee7b7' }}>FREE</span>
            </h3>
            <p className="fulfilment-desc">
              Dedicated concierge valet transfer at porte-cochère
            </p>
            <div className="fulfilment-subtext">
              <span>20–25 min</span>
              <span>• Bays 1–4</span>
            </div>
          </div>

          {/* Option 3: Dine-In Pre-Order */}
          <div
            className={`fulfilment-card ${fulfilmentMode === 'dinein' ? 'active' : ''}`}
            onClick={() => setFulfilmentMode('dinein')}
            role="button"
            tabIndex={0}
          >
            <div className="fulfilment-badge-row">
              <div className="fulfilment-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <span className="fulfilment-pill gold">TABLE VIP · ZERO FEE</span>
            </div>
            <h3 className="fulfilment-title">Dine-In Pre-Order</h3>
            <p className="fulfilment-desc">
              Freshly plated upon arrival with assigned maître d'
            </p>
            <div className="fulfilment-subtext">
              <span>Reserved table</span>
              <span>• Tasting priority</span>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="guarantee-strip">
          <div className="guarantee-main">
            <div className="guarantee-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="guarantee-text">
              <h4>ACTIVE FULFILMENT GUARANTEE</h4>
              <p>Thermal insulated packaging with live digital kitchen relay</p>
            </div>
          </div>
          <div className="guarantee-tags">
            <span>✓ Fleet hand-off</span>
            <span>🔒 Sealed Date</span>
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div className="checkout-grid">
          {/* Left Column: Dishes & Contact Form */}
          <div className="checkout-main">
            {/* Dishes Panel */}
            <div className="panel-white">
              <div className="panel-header">
                <div>
                  <div className="panel-meta">PATRON'S SELECTION</div>
                  <h2 className="panel-title">Your Selected Dishes</h2>
                </div>
                <span className="panel-badge">{count} Selected Dishes</span>
              </div>

              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7a6e69' }}>
                  <p style={{ marginBottom: '16px', fontSize: '1.05rem' }}>Your dining cart is currently empty.</p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      className="btn-update-patron"
                      onClick={resetToDefault}
                      style={{ background: '#240a12' }}
                    >
                      Restore Sample Tasting Menu
                    </button>
                    <Link to="/order" className="btn-update-patron">
                      Browse Menu
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="dishes-list">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={increase}
                      onDecrease={decrease}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}

              {/* Action row at bottom of dishes */}
              <div className="dishes-action-row">
                <Link to="/order" className="add-more-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add more dishes from seasonal menu
                </Link>

                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={clear}
                  disabled={items.length === 0}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                  </svg>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Delivery & Contact Details Panel */}
            <DeliveryDetailsForm
              formData={formData}
              onChange={handleInputChange}
              onSaveToast={handleSavePreferences}
              fulfilmentType={fulfilmentMode}
              setFulfilmentType={setFulfilmentMode}
            />

            {/* Bottom 3 Trust Badges */}
            <div className="features-strip">
              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Thermal Dispatch</h4>
                  <p className="feature-desc">Dishes held in optimal temperature chambers.</p>
                </div>
              </div>

              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Zero Plastic</h4>
                  <p className="feature-desc">All vessel 100% compostable packaging.</p>
                </div>
              </div>

              <div className="feature-box">
                <div className="feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2h8l4 10H4L8 2z"></path>
                    <path d="M12 12v9"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Sommelier Pairing</h4>
                  <p className="feature-desc">Includes bespoke vintage tasting notes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Brigade Specialist */}
          <OrderSummary
            items={items}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            onCheckout={handlePlaceOrder}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
