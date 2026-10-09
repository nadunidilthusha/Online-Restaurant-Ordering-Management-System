const to12 = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
};

function openStatus(hours) {
  const now = new Date();
  const today = hours[(now.getDay() + 6) % 7]; // list starts on Monday
  if (!today || today.closed) return { text: 'Closed today', open: false };
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const isOpen = mins >= toMin(today.open) && mins < toMin(today.close);
  return isOpen ? { text: `Open now, until ${to12(today.close)}`, open: true } : { text: `Closed now, opens at ${to12(today.open)}`, open: false };
}

export default function LocationHours({ visit }) {
  const { address, phone, email, lat, lng, hours } = visit;
  const todayIndex = (new Date().getDay() + 6) % 7;
  const status = openStatus(hours);
  const d = 0.01;
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d}%2C${+lng + d}%2C${+lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <section className="section visit" id="visit" aria-labelledby="vTitle">
      <div className="container">
        <h2 className="h2 reveal" id="vTitle">Location and opening hours</h2>
        <div className="visit-grid">
          <div className="card-dark reveal reveal-left">
            <div className={`status ${status.open ? 'open' : 'closed'}`}><span className="dot" />{status.text}</div>
            <ul className="hours">
              {hours.map((h, i) => (
                <li key={h.day} className={i === todayIndex ? 'today' : ''}>
                  <span>{h.day}{i === todayIndex && ' (today)'}</span>
                  <span>{h.closed ? 'Closed' : `${to12(h.open)} – ${to12(h.close)}`}</span>
                </li>
              ))}
            </ul>
            <div className="info">
              <div>📍 {address}</div>
              <div>📞 <a href={`tel:${phone}`}>{phone}</a></div>
              <div>✉️ <a href={`mailto:${email}`}>{email}</a></div>
            </div>
          </div>
          <div className="map reveal reveal-right">
            <iframe title="Map to the restaurant" loading="lazy" src={map} />
            <a className="btn btn-primary" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>Get directions</a>
          </div>
        </div>
      </div>
    </section>
  );
}