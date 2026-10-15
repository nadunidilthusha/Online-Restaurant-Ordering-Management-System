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
    <article className="dish" style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
      
      {/* Arched Image Section */}
      <div className="dish-img" style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '150px 150px 0 0' }} 
        />
        {item.tag && (
          <span style={{
            position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: '#98373b', color: '#fff', padding: '4px 16px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px', whiteSpace: 'nowrap'
          }}>
            {item.tag}
          </span>
        )}
      </div>
      
      {/* Standard Home Page Classes for Text and Price */}
      <div className="dish-body" style={{ padding: '24px 8px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ textAlign: 'center', marginBottom: '12px' }}>{item.name}</h3>
        <p style={{ textAlign: 'center', flexGrow: 1, marginBottom: '24px' }}>{item.desc}</p>
        
        {/* This exact setup matches your FeaturedDishes.jsx method */}
        <div className="dish-foot">
          <span className="price">{formatPrice(item.price)}</span>
          <button className="add" onClick={handleAddToCart} aria-label={`Add ${item.name} to cart`}>
            {justAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
      
    </article>
  );
}