import { useState } from 'react';
import { MENU_POOL } from '../../../data/sampleContent';
import { moveItem } from '../../../utils/objectPath';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../../components/common/Button';
import Select from '../../../components/common/Select';
import SafeImage from '../../../components/common/SafeImage';
import ListItemTools from '../../components/ListItemTools';
import Switch from '../../components/Switch';

// MENU_POOL is a placeholder: load the real menu with menuApi.getAll()
export default function FeaturedDishesEditor({ draft, update }) {
  const list = draft.featured;
  const available = MENU_POOL.filter((m) => !list.some((d) => d.id === m.id));
  const [pick, setPick] = useState('');
  const set = (next) => update('featured', next);

  const add = () => {
    const dish = MENU_POOL.find((m) => String(m.id) === String(pick || available[0]?.id));
    if (dish) { set([...list, { ...dish, visible: true }]); setPick(''); }
  };

  return (
    <div className="panel" id="p-dishes">
      <div className="panel-head"><div><h2>Featured dishes</h2><p>Choose and order the dishes shown on the Home page.</p></div></div>
      {list.map((d, i) => (
        <div className={`item ${d.visible ? '' : 'off'}`} key={d.id}>
          <div className="thumb"><SafeImage src={d.image} /></div>
          <div className="grow"><b>{d.name}</b><small>{d.category} · {formatPrice(d.price)}</small></div>
          <Switch checked={d.visible} onChange={(v) => set(list.map((x, k) => (k === i ? { ...x, visible: v } : x)))} />
          <ListItemTools index={i} length={list.length} onMove={(idx, dir) => set(moveItem(list, idx, dir))} onRemove={(idx) => set(list.filter((_, k) => k !== idx))} />
        </div>
      ))}
      <div className="add-row">
        <Select id="dishPick" value={pick} onChange={(e) => setPick(e.target.value)} options={available.length ? available.map((m) => ({ value: m.id, label: m.name })) : [{ value: '', label: 'All dishes added' }]} />
        <Button onClick={add} variant="wine" type="button" disabled={!available.length}>+ Add to featured</Button>
      </div>
    </div>
  );
}
