import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useReveal } from '../../hooks/useReveal';
import { formatPrice } from '../../utils/formatPrice';
import SafeImage from '../../components/common/SafeImage';
import EmptyState from '../../components/common/EmptyState';

export default function FeaturedDishes({ dishes = [] }) {
  const { addItem } = useCart();
  const [category, setCategory] = useState('All');
  const [justAdded, setJustAdded] = useState(null);

  const visible = dishes.filter((d) => d.visible !== false);
  const categories = ['All', ...new Set(visible.map((d) => d.category))];
  const list = category === 'All' ? visible : visible.filter((d) => d.category === category);

  useReveal([category]);

  const add = (dish) => {
    addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image });
    setJustAdded(dish.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <section className="section light" aria-labelledby="featTitle" style={{ backgroundColor: '#faf9f6', padding: '80px 20px' }}>
      <div className="container">
        
        <div className="section-head reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px', borderBottom: '1px solid #eaeaea', paddingBottom: '24px' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 className="h2" id="featTitle" style={{ color: '#2a0b13', fontFamily: 'var(--serif)', fontSize: '3rem', margin: '0 0 12px 0', fontWeight: '400' }}>
              Featured dishes
            </h2>
            <p style={{ color: '#1a050a', fontSize: '1.1rem', margin: 0, letterSpacing: '0.3px', fontWeight: '500' }}>
              The plates our regulars come back for, picked by our chefs this week.
            </p>
          </div>
          
          <div className="filters" role="group" aria-label="Filter dishes" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button 
                key={c} 
                className="chip" 
                aria-pressed={c === category} 
                onClick={() => setCategory(c)}
                style={{
                  backgroundColor: c === category ? '#801a2d' : 'transparent', 
                  color: c === category ? '#ffffff' : '#444444', 
                  border: c === category ? '1px solid #801a2d' : '1px solid #d1d5db',
                  padding: '8px 24px',
                  borderRadius: '30px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? <EmptyState title="No dishes in this category" /> : (
          <div className="dishes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
            {list.map((d, i) => (
              <article className="dish reveal" key={d.id} style={{ transitionDelay: `${(i % 4) * 90}ms`, backgroundColor: '#fff', borderRadius: '150px 150px 12px 12px', overflow: 'hidden', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
                <div className="dish-img" style={{ position: 'relative', aspectRatio: '4/5', width: '100%', overflow: 'hidden' }}>
                  <SafeImage src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {d.tag && (
                    <span className={`dish-tag cat-${d.category}`} style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#a63d40', color: '#fff', padding: '4px 16px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                      {d.tag}
                    </span>
                  )}
                </div>
                
                <div className="dish-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ color: '#1a050a', fontSize: '1.15rem', marginBottom: '12px', fontFamily: 'var(--serif)', textAlign: 'center' }}>{d.name}</h3>
                  <p style={{ color: '#888888', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center', flexGrow: 1 }}>{d.description}</p>
                  <div className="dish-foot" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span className="price" style={{ color: '#555555', fontWeight: '500', fontSize: '0.9rem' }}>{formatPrice(d.price)}</span>
                    <button onClick={() => add(d)} aria-label={`Add ${d.name} to cart`} style={{ backgroundColor: justAdded === d.id ? '#10b981' : '#1a050a', color: '#fff', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', transition: 'background-color 0.2s' }}>
                      {justAdded === d.id ? '✓' : '+'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="center" style={{ marginTop: '48px' }}>
          <Link to="/order" className="btn btn-outline-dark" style={{ color: '#1a050a', border: '1px solid #1a050a', padding: '12px 32px', fontWeight: '600', textDecoration: 'none' }}>
            See the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}