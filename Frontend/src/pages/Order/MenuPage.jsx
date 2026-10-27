import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import { useCart } from '../../hooks/useCart';
import '../../assets/styles/Menu.css';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { count } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        // Only show available items
        setMenuItems(data.filter(item => item.available));
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-container">
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
              <Link to="/checkout" style={{ background: 'var(--wine)', color: '#ffffff', padding: '8px 20px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                View Cart ({count}) →
              </Link>
            )}
          </div>
        </header>

        <div className="menu-grid">
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>Loading menu...</div>
          ) : (
            filteredMenu.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}