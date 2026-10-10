import { moveItem, newId } from '../../../utils/objectPath';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import ImageUpload from '../../components/ImageUpload';
import ListItemTools from '../../components/ListItemTools';

export default function HistoryEditor({ draft, bind, update }) {
  const items = draft.history.items;
  const set = (next) => update('history.items', next);
  const edit = (i, patch) => set(items.map((t, k) => (k === i ? { ...t, ...patch } : t)));

  return (
    <div className="panel" id="a-history">
      <div className="panel-head"><div><h2>Restaurant history</h2><p>Timeline entries appear in this order.</p></div></div>
      <div className="cols">
        <div>
          {items.map((t, i) => (
            <div className="ed" key={t.id}>
              <div className="ed-top"><b>Milestone {i + 1}</b>
                <ListItemTools index={i} length={items.length} onMove={(idx, dir) => set(moveItem(items, idx, dir))} onRemove={(idx) => set(items.filter((_, k) => k !== idx))} /></div>
              <div className="form">
                <div className="row2">
                  <div className="field"><label>Year</label><input className="input" value={t.year} onChange={(e) => edit(i, { year: e.target.value })} /></div>
                  <div className="field"><label>Title</label><input className="input" value={t.title} onChange={(e) => edit(i, { title: e.target.value })} /></div>
                </div>
                <Textarea label="Description" maxLength={350} value={t.text} onChange={(e) => edit(i, { text: e.target.value })} />
              </div>
            </div>
          ))}
          <Button variant="ghost-light" type="button" onClick={() => set([...items, { id: newId(), year: '', title: 'New milestone', text: '' }])}>+ Add milestone</Button>
        </div>
        <div className="form">
          <ImageUpload label="History photo" value={draft.history.photo} onChange={(url) => update('history.photo', url)} />
          <Input label="Founded badge year" id="founded" {...bind('history.foundedYear')} />
        </div>
      </div>
    </div>
  );
}
