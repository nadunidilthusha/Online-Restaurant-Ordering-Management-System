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
      image: item.image,
      desc: item.desc,
      tag: item.tag,
      tagType: item.tagType,
      note: item.note,
    });
  };

  return (
    <div className="food-card">
      <img
        src={item.image}
        alt={item.name}
        className="food-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
        }}
      />
      <h3 className="food-name">{item.name}</h3>
      <p className="food-desc">{item.desc}</p>
      <div className="food-action-row">
        <span className="food-price">{formatPrice(item.price)}</span>
        <button
          className="add-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} to cart`}
          title={`Add ${item.name} to cart`}
        >
          +
        </button>
      </div>
    </div>
  );
}