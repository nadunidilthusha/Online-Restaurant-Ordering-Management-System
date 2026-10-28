import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function FoodCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const description = item.description || item.desc || "";
  // If the description is longer than ~75 characters, it likely gets cut off
  const isLongDescription = description.length > 75;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: description, 
      tag: item.tag,
      tagType: item.tagType,
      note: item.note,
    });
    
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="dish">
      <div className="dish-img">
        <img
          src={item.image}
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
          }}
        />
        {item.tag && <span className={`dish-tag cat-${item.tagType}`}>{item.tag}</span>}
      </div>
      
      <div className="dish-body">
        <h3>{item.name}</h3>
        
        <div>
          <p style={{ 
            color: '#666666', 
            fontSize: '0.85rem', 
            lineHeight: '1.5', 
            margin: '8px 0 4px 0',
            // If expanded, show normally. If not, clamp to 2 lines.
            ...(isExpanded ? {} : {
                display: '-webkit-box',
                WebkitLineClamp: '2', 
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            })
          }}>
            {description}
          </p>
          
          {/* The Clickable Toggle Icon/Text */}
          {isLongDescription && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--wine)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '0',
                marginBottom: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {isExpanded ? 'Show less ▲' : 'Read more ▼'}
            </button>
          )}
        </div>
        
        <div className="dish-foot">
          <span className="price">{formatPrice(item.price)}</span>
          <button
            className="add"
            onClick={handleAddToCart}
            aria-label={`Add ${item.name} to cart`}
            title={`Add ${item.name} to cart`}
          >
            {justAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
}