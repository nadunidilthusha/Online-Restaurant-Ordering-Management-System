import { useContent } from '../../hooks/useContent';
import { useReveal } from '../../hooks/useReveal';
import Loader from '../../components/common/Loader';
import PromoStrip from './PromoStrip';
import HeroSection from './HeroSection';
import Marquee from './Marquee';
import StatsStrip from './StatsStrip';
import PromotionalSection from './PromotionalSection';
import FeaturedDishes from './FeaturedDishes';

export default function HomePage() {
  const { data, loading } = useContent('home');
  useReveal([loading]); // starts the scroll animations once the content is on screen

  if (loading) return <Loader />;

  return (
    <>
      {data.promo?.visible && <PromoStrip text={data.promo.text} />}
      <HeroSection hero={data.hero} />
      <Marquee />
      <StatsStrip stats={data.stats} />
      <PromotionalSection banners={data.banners} />
      <FeaturedDishes dishes={data.featured} />
    </>
  );
}