import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.price * item.qty;

  // Fallback image if broken
  const fallbackImg = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="dish-row">
      <img
        src={item.image || fallbackImg}
        alt={item.name}
        className="dish-thumb"
        onError={(e) => {
          e.target.src = fallbackImg;
        }}
      />

      <div className="dish-info">
        {item.tag && (
          <span className={`dish-tag ${item.tagType || 'popular'}`}>
            {item.tag}
          </span>
        )}
        <h4 className="dish-name">{item.name}</h4>
        {item.desc && <p className="dish-desc">{item.desc}</p>}
        {item.note && <p className="dish-note">{item.note}</p>}
      </div>

      <div className="qty-stepper" aria-label={`Quantity for ${item.name}`}>
        <button
          type="button"
          className="qty-btn"
          onClick={() => onDecrease(item.id)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{item.qty}</span>
        <button
          type="button"
          className="qty-btn"
          onClick={() => onIncrease(item.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="dish-price">{formatPrice(lineTotal)}</div>

      <button
        type="button"
        className="dish-remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
        title="Remove item"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
}
