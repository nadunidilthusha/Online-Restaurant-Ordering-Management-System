import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function FoodCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="food-card" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%'
    }}>
      
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', marginBottom: '24px' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '150px 150px 0 0' }} 
        />
        {item.tag && (
          <div style={{ position: 'absolute', bottom: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <span style={{
              backgroundColor: '#98373b', 
              color: '#fff',
              padding: '4px 16px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {item.tag}
            </span>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 8px' }}>
        <h3 style={{ color: '#1a050a', fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--serif)', textAlign: 'center', fontWeight: '400' }}>
          {item.name}
        </h3>
        
        <p style={{ color: '#999999', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center', flexGrow: 1 }}>
          {item.desc}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%' }}>
          
          {/* FIXED: Increased fontSize to 1.45rem to make the amount bigger */}
          <span className="price" style={{ color: '#c98d49', fontFamily: 'var(--serif)', fontWeight: '400', fontSize: '1.45rem' }}>
            {formatPrice(item.price)}
          </span>
          
          <button 
            onClick={handleAddToCart} 
            aria-label={`Add ${item.name} to cart`}
            style={{
              backgroundColor: justAdded ? '#10b981' : '#c98d49', 
              color: '#1a050a', 
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '400',
              fontSize: '1.5rem',
              lineHeight: '1',
              transition: 'background-color 0.2s, transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {justAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}