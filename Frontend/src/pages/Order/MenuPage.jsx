import React, { useState } from 'react';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import '../../assets/styles/Menu.css';

// Mock data until API is connected
const mockMenuData = [
  { id: 1, name: 'Fire-roasted Sea Bass', category: 'Mains', price: 3500, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Sea+Bass', desc: 'Charred lemon, fennel, and white wine butter sauce.' },
  { id: 2, name: 'Burrata & Fig Salad', category: 'Starters', price: 2200, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Salad', desc: 'Heritage figs, local greens, and aged balsamic glaze.' },
  { id: 3, name: 'Wood-fired Margherita', category: 'Mains', price: 2900, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Pizza', desc: 'San Marzano tomato, buffalo mozzarella, fresh basil.' },
  { id: 4, name: 'Smoked Lamb Rack', category: 'Mains', price: 4200, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Lamb', desc: 'Slow-cooked over embers, garlic herb crust.' },
  { id: 5, name: 'Crispy Calamari', category: 'Starters', price: 1900, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Calamari', desc: 'Local catch served with chili aioli.' },
  { id: 6, name: 'Salted Caramel Tart', category: 'Desserts', price: 1600, image: 'https://placehold.co/300x400/2a0b13/d4af6a?text=Tart', desc: 'Dark chocolate, smooth salted caramel filling.' }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items based on active category tab
  const filteredMenu = activeCategory === 'All' 
    ? mockMenuData 
    : mockMenuData.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-container">
        
        {/* Header & Categories */}
        <header className="menu-header">
          <div className="menu-title-area">
            <h1>Featured dishes</h1>
            <p>The plates our regulars come back for, picked by our chefs this week.</p>
          </div>
          
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </header>

        {/* Food Cards Grid */}
        <div className="menu-grid">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}