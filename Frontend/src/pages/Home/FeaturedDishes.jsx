import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useReveal } from '../../hooks/useReveal';
import { formatPrice } from '../../utils/formatPrice';
import SafeImage from '../../components/common/SafeImage';
import EmptyState from '../../components/common/EmptyState';

// dishes = the featured list chosen in Admin > Home management (order + visible flag)
export default function FeaturedDishes({ dishes = [] }) {
  const { addItem } = useCart();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [justAdded, setJustAdded] = useState(null);

  // Load the live menu (same source as the Menu page)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        setMenu(data.filter((item) => item.available));
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Admin's selection, in admin's order, using LIVE menu data (price, image, name stay in sync).
  // Dishes deleted/unavailable in the menu are skipped.
  // If nothing has been selected in admin yet, fall back to the whole menu.
  const visible =
    dishes.length === 0
      ? menu
      : dishes
          .filter((d) => d.visible !== false)
          .map((d) => menu.find((m) => String(m.id) === String(d.id)))
          .filter(Boolean);

  const categories = ['All', ...new Set(visible.map((d) => d.category).filter(Boolean))];
  const list = category === 'All' ? visible : visible.filter((d) => d.category === category);

  useReveal([category, loading]);

  const add = (dish) => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      description: dish.description,
      tag: dish.tag,
      tagType: dish.tagType,
      note: dish.note,
    });
    setJustAdded(dish.id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <section className="section light" aria-labelledby="featTitle">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="h2" id="featTitle">Featured dishes</h2>
            <p className="muted-dark">The plates our regulars come back for, picked by our chefs this week.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter dishes">
            {categories.map((c) => (
              <button key={c} className="chip" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading menu...</div>
        ) : list.length === 0 ? (
          <EmptyState title="No dishes in this category" />
        ) : (
          <div className="dishes">
            {list.map((d, i) => (
              <article className="dish reveal" key={d.id} style={{ transitionDelay: `${(i % 4) * 90}ms` }}>
                <div className="dish-img">
                  <SafeImage src={d.image} alt={d.name} />
                  {d.tag && <span className={`dish-tag cat-${d.tagType}`}>{d.tag}</span>}
                </div>
                <div className="dish-body">
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>
                  <div className="dish-foot">
                    <span className="price">{formatPrice(d.price)}</span>
                    <button className="add" onClick={() => add(d)} aria-label={`Add ${d.name} to cart`}>{justAdded === d.id ? '✓' : '+'}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="center"><Link to="/order" className="btn btn-outline-dark">See the full menu</Link></div>
      </div>
    </section>
  );
}