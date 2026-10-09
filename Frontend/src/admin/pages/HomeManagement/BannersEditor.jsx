import { moveItem, newId } from '../../../utils/objectPath';
import Button from '../../../components/common/Button';
import Textarea from '../../../components/common/Textarea';
import ImageUpload from '../../components/ImageUpload';
import ListItemTools from '../../components/ListItemTools';
import Switch from '../../components/Switch';

export default function BannersEditor({ draft, update }) {
  const list = draft.banners;
  const set = (next) => update('banners', next);
  const edit = (i, patch) => set(list.map((b, k) => (k === i ? { ...b, ...patch } : b)));

  return (
    <div className="panel" id="p-banners">
      <div className="panel-head"><div><h2>Promotional banners</h2><p>Images for offers and events, shown in "Offers &amp; events" on the Home page.</p></div></div>
      {list.map((b, i) => (
        <div className={`ed ${b.active ? '' : 'off'}`} key={b.id}>
          <div className="ed-top"><Switch label={b.active ? 'Visible' : 'Hidden'} checked={b.active} onChange={(v) => edit(i, { active: v })} />
            <ListItemTools index={i} length={list.length} onMove={(idx, dir) => set(moveItem(list, idx, dir))} onRemove={(idx) => set(list.filter((_, k) => k !== idx))} /></div>
          <div className="cols">
            <div className="form">
              <div className="row2">
                <div className="field"><label>Title</label><input className="input" value={b.title} onChange={(e) => edit(i, { title: e.target.value })} /></div>
                <div className="field"><label>Link</label><input className="input" value={b.link} onChange={(e) => edit(i, { link: e.target.value })} /></div>
              </div>
              <Textarea label="Description" maxLength={350} value={b.description || ''} onChange={(e) => edit(i, { description: e.target.value })} />
            </div>
            <ImageUpload label="Banner image" value={b.image} onChange={(url) => edit(i, { image: url })} />
          </div>
        </div>
      ))}
      <Button variant="ghost-light" type="button" onClick={() => set([...list, { id: newId(), title: 'New banner', description: '', link: '/order', active: true, image: '' }])}>+ Add banner</Button>
    </div>
  );
}
