import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import { useCart } from '../../hooks/useCart';
import '../../assets/styles/Menu.css';

const mockMenuData = [
  {
    id: 1,
    name: 'Fire-roasted Sea Bass',
    category: 'Mains',
    price: 24,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
    desc: 'Charred lemon, shaved fennel & sofrito.',
    tag: 'CHEF PICK',
    tagType: 'pick',
    note: 'Note: Extra saffron butter infusion',
  },
  {
    id: 2,
    name: 'Burrata & Fig Salad',
    category: 'Starters',
    price: 14,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    desc: 'Warm mission figs, honey pistachio crumble.',
    tag: 'VEGETARIAN',
    tagType: 'veg',
    note: 'Note: Honey & pistachio dressing on side',
  },
  {
    id: 3,
    name: 'Wood-fired Margherita',
    category: 'Mains',
    price: 16,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
    desc: 'San Marzano tomato, buffalo mozzarella, fresh basil.',
    tag: 'POPULAR',
    tagType: 'popular',
  },
  {
    id: 4,
    name: 'Salted Caramel Tart',
    category: 'Desserts',
    price: 10,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    desc: 'Dark chocolate, sea salt flakes, cider.',
    tag: 'SWEET',
    tagType: 'sweet',
  },
  {
    id: 5,
    name: 'Smoked Lamb Rack',
    category: 'Mains',
    price: 32,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    desc: 'Slow-cooked over embers, garlic herb crust.',
    tag: 'SIGNATURE',
    tagType: 'pick',
  },
  {
    id: 6,
    name: 'Crispy Calamari',
    category: 'Starters',
    price: 18,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    desc: 'Local catch served with chili aioli.',
    tag: 'POPULAR',
    tagType: 'popular',
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { count } = useCart();

  const filteredMenu =
    activeCategory === 'All'
      ? mockMenuData
      : mockMenuData.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-container">
        {/* Header & Categories */}
        <header className="menu-header">
          <div className="menu-title-area">
            <h1>Featured dishes</h1>
            <p>The plates our regulars come back for, picked by our chefs this week.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {count > 0 && (
              <Link
                to="/checkout"
                style={{
                  background: 'var(--wine)',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                View Cart ({count}) →
              </Link>
            )}
          </div>
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