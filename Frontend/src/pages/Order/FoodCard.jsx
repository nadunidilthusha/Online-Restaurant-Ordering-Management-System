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
      image: item.image,
      desc: item.desc,
      tag: item.tag,
      tagType: item.tagType,
      note: item.note,
    });
    
    // Trigger the exact same checkmark animation as the home page
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
        {/* Render the tag if it exists in the menu data */}
        {item.tag && <span className={`dish-tag cat-${item.tagType}`}>{item.tag}</span>}
      </div>
      
      <div className="dish-body">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        
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