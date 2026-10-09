import { useContentEditor } from '../../../hooks/useContentEditor';
import Loader from '../../../components/common/Loader';
import Toast from '../../../components/common/Toast';
import PageHeading from '../../components/PageHeading';
import SaveBar from '../../components/SaveBar';
import PageHeaderEditor from './PageHeaderEditor';
import HistoryEditor from './HistoryEditor';
import MissionEditor from './MissionEditor';
import VisitEditor from './VisitEditor';
import GalleryEditor from './GalleryEditor';

const TABS = [['a-intro', 'Page header'], ['a-history', 'History'], ['a-mission', 'Mission'], ['a-visit', 'Location & hours'], ['a-gallery', 'Gallery']];

export default function AboutManagementPage() {
  const editor = useContentEditor('about');
  const { draft, loading, usingSample, bind, update } = editor;
  if (loading || !draft) return <Loader />;

  return (
    <>
      <PageHeading title="About management" text="Edit the restaurant history, mission and visit details." tabs={TABS} />
      {usingSample && <p className="notice">API not connected: showing sample content. Saving will work once the backend is running.</p>}
      <PageHeaderEditor bind={bind} />
      <HistoryEditor draft={draft} bind={bind} update={update} />
      <MissionEditor draft={draft} bind={bind} update={update} />
      <VisitEditor draft={draft} bind={bind} update={update} />
      <GalleryEditor draft={draft} update={update} />
      <SaveBar dirty={editor.dirty} saving={editor.saving} onSave={editor.save} onDiscard={editor.discard} />
      <Toast message={editor.message} />
    </>
  );
}
