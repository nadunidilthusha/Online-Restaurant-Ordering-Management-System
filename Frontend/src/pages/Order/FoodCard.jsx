import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function FoodCard({ item }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} className="food-image" />
      <h3 className="food-name">{item.name}</h3>
      <p className="food-desc">{item.desc}</p>
      <div className="food-action-row">
        <span className="food-price">{formatPrice(item.price)}</span>
        <button 
          className="add-btn" 
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} to cart`}
        >
          +
        </button>
      </div>
    </div>
  );
}