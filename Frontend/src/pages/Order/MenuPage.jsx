import React, { useState } from 'react';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import '../../assets/styles/Menu.css';

// Mock data updated with guaranteed working image URLs
const mockMenuData = [
  { id: 1, name: 'Fire-roasted Sea Bass', category: 'Mains', price: 3500, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80', desc: 'Charred lemon, fennel, and saffron butter.', tag: 'CHEF PICK' },
  { id: 2, name: 'Burrata & Fig Salad', category: 'Starters', price: 2200, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', desc: 'Warm figs, honey, pistachio and basil oil.', tag: 'VEGETARIAN' },
  { id: 3, name: 'Wood-fired Margherita', category: 'Mains', price: 2900, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80', desc: 'San Marzano tomato, buffalo mozzarella, basil.', tag: 'POPULAR' },
  { id: 4, name: 'Smoked Lamb Rack', category: 'Mains', price: 4200, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400&q=80', desc: 'Rosemary jus, charred greens, garlic mash.', tag: 'NEW' },
  { id: 5, name: 'Crispy Calamari', category: 'Starters', price: 1900, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80', desc: 'Lime aioli and chili salt.' },
  { id: 6, name: 'Salted Caramel Tart', category: 'Desserts', price: 1600, image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80', desc: 'Dark chocolate, sea salt, crème fraîche.', tag: 'SWEET' }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? mockMenuData 
    : mockMenuData.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page" style={{ backgroundColor: '#faf9f6', padding: '80px 20px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Layout */}
        <header className="menu-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          flexWrap: 'wrap', 
          gap: '24px', 
          marginBottom: '64px',
          borderBottom: '1px solid #eaeaea', 
          paddingBottom: '24px'
        }}>
          <div className="menu-title-area" style={{ textAlign: 'left' }}>
            <h1 style={{ color: '#2a0b13', fontFamily: 'var(--serif)', fontSize: '3rem', margin: '0 0 12px 0', fontWeight: '400' }}>
              Featured dishes
            </h1>
            {/* FIXED: Subtitle text color softened to #666666 and font weight reduced to 400 */}
            <p style={{ color: '#666666', fontSize: '1.1rem', margin: 0, letterSpacing: '0.3px', fontWeight: '400' }}>
              The plates our regulars come back for, picked by our chefs this week.
            </p>
          </div>
          
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </header>

        {/* Dynamic Grid optimized for the arched photo cards */}
        <div className="menu-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '32px' 
        }}>
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}