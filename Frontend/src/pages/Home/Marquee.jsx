const ITEMS = ['Fire-roasted seafood', 'Handmade pasta', 'Local farm produce', 'Wood-fired pizza', 'Seasonal desserts', 'Aged steaks'];

// scrolling banner between the hero and the stats (the list is repeated so the loop is seamless)
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}