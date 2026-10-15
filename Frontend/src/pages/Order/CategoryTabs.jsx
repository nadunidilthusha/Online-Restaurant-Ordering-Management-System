import React from 'react';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts'];

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="categories-wrapper">
      {CATEGORIES.map(category => (
        <button 
          key={category}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}