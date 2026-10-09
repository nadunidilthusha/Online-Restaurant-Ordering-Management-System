import { Link } from 'react-router-dom';
import SafeImage from '../../components/common/SafeImage';

const DEFAULT_MINI = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=75';

export default function HeroSection({ hero }) {
  const { headline, highlight, subtext, primaryLabel, primaryLink, secondaryLabel, secondaryLink, image, miniImage } = hero;
  const hasHighlight = highlight && headline.includes(highlight);
  const [before, after] = hasHighlight ? headline.split(highlight) : [headline, ''];

  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="blob" />
      <div className="container hero-grid">
        <div className="hero-text">
          <h1 id="heroTitle">{before}{hasHighlight && <em>{highlight}</em>}{after}</h1>
          <p className="lead">{subtext}</p>
          <div className="hero-cta">
            <Link to={primaryLink} className="btn btn-primary">{primaryLabel}</Link>
            <Link to={secondaryLink} className="btn btn-outline">{secondaryLabel}</Link>
          </div>
        </div>

        <div className="hero-visual">
          <SafeImage src={image} alt="Signature dish" />
          <div className="spin" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs><path id="spinPath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#spinPath" textLength="236" lengthAdjust="spacing">FRESH DAILY • WOOD FIRED • </textPath></text>
            </svg>
          </div>
          <div className="hero-mini"><SafeImage src={miniImage || DEFAULT_MINI} /></div>
          <div className="hero-badge"><b>4.9</b><small>from 2,400+<br />happy diners</small></div>
        </div>
      </div>
    </section>
  );
}