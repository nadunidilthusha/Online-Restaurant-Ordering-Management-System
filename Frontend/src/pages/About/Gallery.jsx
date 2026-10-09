import { useEffect, useState } from 'react';
import SafeImage from '../../components/common/SafeImage';

export default function Gallery({ gallery = [] }) {
  const [open, setOpen] = useState(null); // index of the photo in the viewer

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + gallery.length) % gallery.length);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, gallery.length]);

  if (!gallery.length) return null;
  const current = open !== null ? gallery[open] : null;

  return (
    <section className="section" id="gallery" aria-labelledby="gTitle">
      <div className="container">
        <h2 className="h2 reveal" id="gTitle">Gallery</h2>
        <p className="lead reveal">A look inside our kitchen, our dining room and our plates.</p>
        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <button key={g.id} className="g-item reveal reveal-zoom" style={{ transitionDelay: `${(i % 4) * 90}ms` }} onClick={() => setOpen(i)} aria-label={`View ${g.caption}`}>
              <SafeImage src={g.img} alt={g.caption} /><span className="g-cap">{g.caption}</span>
            </button>
          ))}
        </div>
      </div>
      {current && (
        <div className="lb open" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={() => setOpen(null)}>
          <button className="x" aria-label="Close">×</button>
          <button className="pv" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + gallery.length) % gallery.length); }}>‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={current.img} alt={current.caption} />
            <figcaption>{current.caption}<small>{open + 1} / {gallery.length}</small></figcaption>
          </figure>
          <button className="nx" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % gallery.length); }}>›</button>
        </div>
      )}
    </section>
  );
}