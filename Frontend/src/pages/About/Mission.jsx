import SafeImage from '../../components/common/SafeImage';

export default function Mission({ mission }) {
  const { quote, story, photo, founderName, founderTitle, founderPhoto, values } = mission;
  return (
    <section className="section light" id="mission" aria-labelledby="mTitle">
      <div className="container">
        <div className="split">
          <div className="reveal reveal-left">
            <h2 className="h2" id="mTitle">Our mission</h2>
            <p className="quote">{quote}</p>
            <p className="story">{story}</p>
            <div className="founder">
              <div className="avatar"><SafeImage src={founderPhoto} alt={founderName} /></div>
              <div><b>{founderName}</b>{founderTitle}</div>
            </div>
          </div>
          <div className="photo-wrap reveal reveal-right">
            <div className="photo"><SafeImage src={photo} alt="Cooking over open fire" /></div>
          </div>
        </div>
        <div className="values">
          {values.map((v, i) => (
            <div className={`value reveal reveal-zoom v${i % 3}`} key={v.id} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="ic">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}