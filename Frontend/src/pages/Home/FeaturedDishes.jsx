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

  useReveal([category]); // animate cards in again when the filter changes

  const add = (dish) => {
    addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image });
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

        {list.length === 0 ? <EmptyState title="No dishes in this category" /> : (
          <div className="dishes">
            {list.map((d, i) => (
              <article className="dish reveal" key={d.id} style={{ transitionDelay: `${(i % 4) * 90}ms` }}>
                <div className="dish-img">
                  <SafeImage src={d.image} alt={d.name} />
                  {d.tag && <span className={`dish-tag cat-${d.category}`}>{d.tag}</span>}
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