import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { useReveal } from '../../hooks/useReveal';
import Loader from '../../components/common/Loader';
import RestaurantStory from './RestaurantStory';
import Mission from './Mission';
import Gallery from './Gallery';
import LocationHours from './LocationHours';

export default function AboutPage() {
  const { data, loading } = useContent('about');
  useReveal([loading]); // starts the scroll animations once the content is on screen

  if (loading) return <Loader />;

  // "Our story" -> "Our" + gold italic "story"
  const words = data.header.title.split(' ');
  const last = words.pop();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="crumbs"><Link to="/">Home</Link> / About</p>
          <h1>{words.length > 0 && `${words.join(' ')} `}<em>{last}</em></h1>
          <p>{data.header.intro}</p>
        </div>
      </section>
      <RestaurantStory history={data.history} />
      <Mission mission={data.mission} />
      <Gallery gallery={data.gallery} />
      <LocationHours visit={data.visit} />
    </>
  );
}