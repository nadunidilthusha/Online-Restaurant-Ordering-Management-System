import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function CartPanel() {
  const { items, subtotal, count, removeItem, increase, decrease, clear } = useCart();

  return (
    <div className="panel-white" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div className="panel-header">
        <div>
          <div className="panel-meta">DINING TASTING</div>
          <h3 className="panel-title">Your Cart</h3>
        </div>
        <span className="panel-badge">{count} items</span>
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#7a6e69', textAlign: 'center', padding: '24px 0' }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '10px',
                borderBottom: '1px solid #f0e9df',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#2a0b13' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#7a6e69' }}>
                  {formatPrice(item.price)} × {item.qty}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => decrease(item.id)}
                  style={{ width: '26px', height: '26px', background: '#faf6ee', border: '1px solid #d9cdb4', borderRadius: '4px' }}
                >
                  −
                </button>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{item.qty}</span>
                <button
                  type="button"
                  onClick={() => increase(item.id)}
                  style={{ width: '26px', height: '26px', background: '#faf6ee', border: '1px solid #d9cdb4', borderRadius: '4px' }}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  style={{ color: '#b91c1c', marginLeft: '6px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginTop: '8px', fontSize: '1.05rem' }}>
            <span>Subtotal:</span>
            <span style={{ color: '#8c1d2f' }}>{formatPrice(subtotal)}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <Link
          to="/checkout"
          className="btn-checkout-cta"
          style={{ textDecoration: 'none', textAlign: 'center' }}
        >
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
