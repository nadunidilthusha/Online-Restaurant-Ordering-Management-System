import SafeImage from '../../components/common/SafeImage';

export default function RestaurantStory({ history }) {
  return (
    <section className="section" id="history" aria-labelledby="hTitle">
      <div className="container split">
        <div className="photo-wrap reveal reveal-left">
          <div className="photo"><SafeImage src={history.photo} alt="Inside the restaurant" /></div>
          <div className="stamp"><b>{history.foundedYear}</b>Founded</div>
        </div>
        <div className="reveal reveal-right">
          <h2 className="h2" id="hTitle">Restaurant history</h2>
          <p className="lead">What began as a ten-table kitchen with one wood oven has grown into the neighbourhood's favourite dinner table.</p>
          <ul className="timeline">
            {history.items.map((t, i) => (
              <li className="tl reveal" key={t.id} style={{ transitionDelay: `${i * 130}ms` }}>
                <b>{t.year}: {t.title}</b>
                <p>{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}