import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('lastOrder');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const displayId = order?.id || orderId || 'SF-94821';
  const displayTotal = order ? order.total : 101.3;
  const items = order?.items || [
    { id: 1, name: 'Fire-roasted Sea Bass', price: 24, qty: 1, lineTotal: 24 },
    { id: 2, name: 'Burrata & Fig Salad', price: 14, qty: 2, lineTotal: 28 },
    { id: 3, name: 'Wood-fired Margherita', price: 16, qty: 1, lineTotal: 16 },
    { id: 4, name: 'Salted Caramel Tart', price: 10, qty: 2, lineTotal: 20 },
  ];

  return (
    <div
      style={{
        background: '#0d0a0b',
        color: '#f8f3ea',
        minHeight: '100vh',
        padding: '50px 20px 100px',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Success Header */}
        <div
          style={{
            textAlign: 'center',
            background: '#1a080f',
            border: '1px solid rgba(212, 175, 106, 0.3)',
            borderRadius: '8px',
            padding: '40px 24px',
            marginBottom: '30px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#8c1d2f',
              border: '2px solid #d4af6a',
              color: '#ecd5a1',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
              fontSize: '1.8rem',
            }}
          >
            ✓
          </div>

          <span
            style={{
              color: '#d4af6a',
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            CONFIRMATION &amp; KITCHEN RELAY
          </span>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#ecd5a1',
              marginTop: '6px',
              marginBottom: '10px',
            }}
          >
            Thank You for Dining with Saffron &amp; Fig
          </h1>

          <p style={{ color: '#b3a8a3', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 24px' }}>
            Your artisanal tasting order has been relayed directly to Head Chef Amara Perera's kitchen station.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
              background: '#230b12',
              border: '1px solid rgba(212, 175, 106, 0.3)',
              borderRadius: '6px',
              padding: '12px 28px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: '#d4af6a', letterSpacing: '0.1em' }}>
                ORDER ID
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#f8f3ea' }}>
                #{displayId}
              </div>
            </div>

            <div style={{ height: '36px', width: '1px', background: 'rgba(212, 175, 106, 0.2)' }}></div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#d4af6a', letterSpacing: '0.1em' }}>
                TOTAL DISPLAY
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#ecd5a1' }}>
                {formatPrice(displayTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* Live Kitchen Relay Progress Stepper */}
        <div
          style={{
            background: '#150f12',
            border: '1px solid rgba(212, 175, 106, 0.15)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '30px',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#d4af6a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Live Relay Status
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: '10px', background: '#240a12', borderRadius: '4px', border: '1px solid #8c1d2f' }}>
              <div style={{ color: '#6ee7b7', fontSize: '0.9rem', marginBottom: '4px' }}>● Complete</div>
              <div style={{ fontSize: '0.8rem', color: '#f8f3ea', fontWeight: 500 }}>Order Received</div>
            </div>
            <div style={{ padding: '10px', background: '#2c121b', borderRadius: '4px', border: '1px solid #d4af6a' }}>
              <div style={{ color: '#d4af6a', fontSize: '0.9rem', marginBottom: '4px' }}>⚡ In Progress</div>
              <div style={{ fontSize: '0.8rem', color: '#ecd5a1', fontWeight: 600 }}>Kitchen Preparation</div>
            </div>
            <div style={{ padding: '10px', background: '#191115', borderRadius: '4px' }}>
              <div style={{ color: '#7a6e69', fontSize: '0.9rem', marginBottom: '4px' }}>○ Upcoming</div>
              <div style={{ fontSize: '0.8rem', color: '#b3a8a3' }}>Thermal Packaging</div>
            </div>
            <div style={{ padding: '10px', background: '#191115', borderRadius: '4px' }}>
              <div style={{ color: '#7a6e69', fontSize: '0.9rem', marginBottom: '4px' }}>○ Upcoming</div>
              <div style={{ fontSize: '0.8rem', color: '#b3a8a3' }}>Courier Dispatch</div>
            </div>
          </div>
        </div>

        {/* Details & Breakdown Table */}
        <div
          style={{
            background: '#ffffff',
            color: '#1f1a1a',
            borderRadius: '8px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px solid #ebe4d8',
              paddingBottom: '16px',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.6rem',
                color: '#2a0b13',
              }}
            >
              Order Details &amp; Patron Coordinates
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#7a6e69' }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Patron Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              background: '#faf7f2',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: '#8c7853', textTransform: 'uppercase', fontWeight: 600 }}>
                Patron
              </div>
              <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                {order?.customerName || 'Alexander Wright'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6d615c' }}>
                {order?.email || 'alexander.w@example.com'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#8c7853', textTransform: 'uppercase', fontWeight: 600 }}>
                Phone Number
              </div>
              <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                {order?.phone || '+94 77 000 0000'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#8c7853', textTransform: 'uppercase', fontWeight: 600 }}>
                Fulfilment Mode
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#8c1d2f' }}>
                {order?.orderType === 'pickup'
                  ? 'Curbside Pickup'
                  : order?.orderType === 'dinein'
                  ? 'Dine-In Table VIP'
                  : 'Express Delivery'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6d615c' }}>
                {order?.deliveryWindow || '35–45 min dispatch'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#8c7853', textTransform: 'uppercase', fontWeight: 600 }}>
                Address / Coordinates
              </div>
              <div style={{ fontSize: '0.9rem', color: '#1f1a1a' }}>
                {order?.address || '48 Quai de la Tournelle, Apt 4B'}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e0d5c3', textAlign: 'left', fontSize: '0.8rem', color: '#8c7853', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 0' }}>Dishes</th>
                <th style={{ padding: '10px 0', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '10px 0', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '10px 0', textAlign: 'right' }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f2ebe1', fontSize: '0.9rem' }}>
                  <td style={{ padding: '12px 0', fontWeight: 500 }}>{item.name}</td>
                  <td style={{ padding: '12px 0', textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', color: '#6d615c' }}>
                    {formatPrice(item.price)}
                  </td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem' }}>
                    {formatPrice(item.lineTotal || item.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Breakdown Rows */}
          <div style={{ maxWidth: '280px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#5a4f4b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(order?.subtotal || 88.0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery &amp; Courier:</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(order?.deliveryFee !== undefined ? order.deliveryFee : 4.5)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST (10%):</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(order?.gst || 8.8)}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '2px solid #2a0b13',
                paddingTop: '8px',
                marginTop: '4px',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#2a0b13',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              <span>Total Display:</span>
              <span>{formatPrice(displayTotal)}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              background: '#230b12',
              border: '1px solid #d4af6a',
              color: '#ecd5a1',
              padding: '12px 28px',
              borderRadius: '4px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            🖨 Print Tasting Receipt
          </button>

          <Link
            to="/order"
            style={{
              background: 'linear-gradient(135deg, #ecd5a1, #d4af6a)',
              color: '#1a1005',
              padding: '12px 28px',
              borderRadius: '4px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Return to Seasonal Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
