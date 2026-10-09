import { useState } from 'react';

export default function PromoStrip({ text }) {
  const storageKey = `promo-closed:${text}`;
  const [closed, setClosed] = useState(() => sessionStorage.getItem(storageKey) === '1');
  const [closing, setClosing] = useState(false);

  if (closed) return null;

  const close = () => {
    setClosing(true); // plays the slide-up animation
    setTimeout(() => {
      sessionStorage.setItem(storageKey, '1'); // stays closed until the browser tab is closed
      setClosed(true);
    }, 300);
  };

  return (
    <div className={`promo-strip ${closing ? 'closing' : ''}`} role="region" aria-label="Announcement">
      <span>{text}</span>
      <button className="promo-close" onClick={close} aria-label="Close announcement">×</button>
    </div>
  );
}