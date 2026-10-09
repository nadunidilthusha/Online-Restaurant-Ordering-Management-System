import { useContentEditor } from '../../../hooks/useContentEditor';
import Loader from '../../../components/common/Loader';
import Toast from '../../../components/common/Toast';
import PageHeading from '../../components/PageHeading';
import SaveBar from '../../components/SaveBar';
import HeroEditor from './HeroEditor';
import PromoStripEditor from './PromoStripEditor';
import FeaturedDishesEditor from './FeaturedDishesEditor';
import BannersEditor from './BannersEditor';
import StatsEditor from './StatsEditor';

const TABS = [['p-hero', 'Hero'], ['p-promo', 'Promo strip'], ['p-dishes', 'Featured dishes'], ['p-banners', 'Banners'], ['p-stats', 'Stats']];

export default function HomeManagementPage() {
  const editor = useContentEditor('home');
  const { draft, loading, usingSample, bind, update } = editor;
  if (loading || !draft) return <Loader />;

  return (
    <>
      <PageHeading title="Home management" text="Edit everything visitors see on the Home page." tabs={TABS} />
      {usingSample && <p className="notice">API not connected: showing sample content. Saving will work once the backend is running.</p>}
      <HeroEditor draft={draft} bind={bind} update={update} />
      <PromoStripEditor draft={draft} bind={bind} update={update} />
      <FeaturedDishesEditor draft={draft} update={update} />
      <BannersEditor draft={draft} update={update} />
      <StatsEditor bind={bind} />
      <SaveBar dirty={editor.dirty} saving={editor.saving} onSave={editor.save} onDiscard={editor.discard} />
      <Toast message={editor.message} />
    </>
  );
}
