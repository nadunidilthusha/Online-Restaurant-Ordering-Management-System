import { useState, useEffect } from 'react';
import { moveItem } from '../../../utils/objectPath';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../../components/common/Button';
import Select from '../../../components/common/Select';
import SafeImage from '../../../components/common/SafeImage';
import ListItemTools from '../../components/ListItemTools';
import Switch from '../../components/Switch';

export default function FeaturedDishesEditor({ draft, update }) {
  const list = draft.featured || [];
  const [menu, setMenu] = useState([]);
  const [pick, setPick] = useState('');
  const set = (next) => update('featured', next);

  // Load the real menu (same source as the Menu page)
  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setMenu(data))
      .catch(() => setMenu([]));
  }, []);

  const liveOf = (id) => menu.find((m) => String(m.id) === String(id));
  const available = menu.filter((m) => m.available && !list.some((d) => String(d.id) === String(m.id)));

  const add = () => {
    const dish = available.find((m) => String(m.id) === String(pick || available[0]?.id));
    if (!dish) return;
    set([
      ...list,
      {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        category: dish.category || '',
        tag: dish.tag || '',
        tagType: dish.tagType || '',
        description: dish.description || '',
        image: dish.image || '',
        visible: true,
      },
    ]);
    setPick('');
  };

  return (
    <div className="panel" id="p-dishes">
      <div className="panel-head"><div><h2>Featured dishes</h2><p>Choose and order the dishes shown on the Home page. Dishes come from your Menu.</p></div></div>
      {list.map((d, i) => {
        const live = liveOf(d.id);
        const dish = live || d; // show live menu data when available
        const missing = menu.length > 0 && !live;
        return (
          <div className={`item ${d.visible ? '' : 'off'}`} key={d.id}>
            <div className="thumb"><SafeImage src={dish.image} /></div>
            <div className="grow">
              <b>{dish.name}</b>
              <small>
                {dish.category} · {formatPrice(dish.price)}
                {missing && <span style={{ color: '#b3261e' }}> · No longer in menu (remove it)</span>}
                {live && !live.available && <span style={{ color: '#b3261e' }}> · Unavailable in menu</span>}
              </small>
            </div>
            <Switch checked={d.visible} onChange={(v) => set(list.map((x, k) => (k === i ? { ...x, visible: v } : x)))} />
            <ListItemTools index={i} length={list.length} onMove={(idx, dir) => set(moveItem(list, idx, dir))} onRemove={(idx) => set(list.filter((_, k) => k !== idx))} />
          </div>
        );
      })}
      <div className="add-row">
        <Select
          id="dishPick"
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          options={available.length ? available.map((m) => ({ value: m.id, label: `${m.name} (${m.category})` })) : [{ value: '', label: menu.length ? 'All dishes added' : 'Menu is empty / not loaded' }]}
        />
        <Button onClick={add} variant="wine" type="button" disabled={!available.length}>+ Add to featured</Button>
      </div>
    </div>
  );
}