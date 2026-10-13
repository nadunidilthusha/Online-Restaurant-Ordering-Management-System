import React from 'react';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts'];

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="filters" role="group" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {CATEGORIES.map(category => (
        <button 
          key={category}
          className="chip"
          onClick={() => onCategoryChange(category)}
          style={{
            backgroundColor: activeCategory === category ? '#801a2d' : 'transparent',
            color: activeCategory === category ? '#ffffff' : '#444444',
            border: activeCategory === category ? '1px solid #801a2d' : '1px solid #d1d5db',
            padding: '8px 24px',
            borderRadius: '30px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}