import { Link } from 'react-router-dom';
import SafeImage from '../../components/common/SafeImage';

// Shows the banners managed in Admin > Home management > Promotional banners
export default function PromotionalSection({ banners = [] }) {
  const active = banners.filter((b) => b.active);
  if (!active.length) return null;

  return (
    <section className="promos" aria-labelledby="promoTitle">
      <div className="container">
        <div className="reveal">
          <h2 className="h2" id="promoTitle">Offers &amp; events</h2>
          <p className="muted">Limited-time treats from our kitchen.</p>
        </div>
        <div className="promo-grid">
          {active.map((b, i) => (
            <Link key={b.id} to={b.link || '/order'} className="promo-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <SafeImage src={b.image} />
              <div className="promo-body">
                <span className="promo-tag">Special offer</span>
                <h3>{b.title}</h3>
                {b.description && <p>{b.description}</p>}
                <span className="btn btn-primary">Order now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}