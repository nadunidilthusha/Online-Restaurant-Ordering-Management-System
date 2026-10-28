import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function FoodCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const description = item.description || item.desc || "";
  const isLongDescription = description.length > 60;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

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
    <>
      {/* Main Grid Card */}
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
              color: '#666', fontSize: '0.85rem', lineHeight: '1.5', margin: '8px 0 4px 0',
              display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}>
              {description}
            </p>
            
            {/* Read More Trigger */}
            {isLongDescription && (
              <button 
                onClick={() => setShowModal(true)}
                style={{ background: 'none', border: 'none', color: 'var(--wine)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', padding: '0', marginBottom: '12px' }}
              >
                Read more →
              </button>
            )}
          </div>
          
          <div className="dish-foot">
            <span className="price">{formatPrice(item.price)}</span>
            <button className="add" onClick={handleAddToCart} aria-label={`Add ${item.name} to cart`} title={`Add ${item.name} to cart`}>
              {justAdded ? '✓' : '+'}
            </button>
          </div>
        </div>
      </article>

      {/* Dish Details Popup (Modal) */}
      {showModal && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }} 
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#fff', borderRadius: '16px', padding: '32px',
              maxWidth: '450px', width: '100%', position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              display: 'flex', flexDirection: 'column', gap: '20px'
            }} 
            onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)} 
              style={{
                position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px',
                background: '#f1f5f9', border: 'none', borderRadius: '50%', fontSize: '1.2rem', 
                cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ✕
            </button>
            
            <img 
              src={item.image} 
              alt={item.name} 
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px' }} 
            />
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h2 style={{ margin: '0', color: '#1a050a', fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: '500' }}>
                  {item.name}
                </h2>
              </div>
              
              {item.tag && (
                <span style={{ 
                  display: 'inline-block', padding: '4px 10px', backgroundColor: '#f5f2eb', 
                  color: '#888', fontSize: '0.75rem', borderRadius: '4px', marginBottom: '16px', 
                  fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' 
                }}>
                  {item.tag}
                </span>
              )}
              
              <p style={{ color: '#444', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
                {description}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--wine)' }}>
                {formatPrice(item.price)}
              </span>
              <button 
                onClick={() => { 
                  handleAddToCart(); 
                  setShowModal(false); 
                }} 
                style={{
                  backgroundColor: 'var(--wine)', color: '#fff', border: 'none', 
                  padding: '12px 28px', borderRadius: '30px', fontWeight: '600', 
                  cursor: 'pointer', fontSize: '0.95rem', transition: 'background-color 0.2s'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}