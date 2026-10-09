import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Switch from '../../components/Switch';

export default function VisitEditor({ draft, bind, update }) {
  const hours = draft.visit.hours;
  const set = (next) => update('visit.hours', next);
  const edit = (i, patch) => set(hours.map((h, k) => (k === i ? { ...h, ...patch } : h)));
  const copyMonday = () => set(hours.map((h) => ({ ...h, open: hours[0].open, close: hours[0].close, closed: hours[0].closed })));

  return (
    <div className="panel" id="a-visit">
      <div className="panel-head">
        <h2>Location and opening hours</h2>
        <Button variant="ghost-light" type="button" onClick={copyMonday}>Copy Monday to all days</Button>
      </div>
      <div className="cols">
        <div>
          {hours.map((h, i) => (
            <div className={`hr ${h.closed ? 'closed' : ''}`} key={h.day}>
              <span className="d">{h.day}</span>
              <input className="input" type="time" value={h.open} onChange={(e) => edit(i, { open: e.target.value })} aria-label={`${h.day} opens`} />
              <input className="input" type="time" value={h.close} onChange={(e) => edit(i, { close: e.target.value })} aria-label={`${h.day} closes`} />
              <Switch checked={!h.closed} onChange={(open) => edit(i, { closed: !open })} label={h.closed ? 'Closed' : 'Open'} />
            </div>
          ))}
        </div>
        <div className="form">
          <Input label="Address" id="v-addr" {...bind('visit.address')} />
          <div className="row2">
            <Input label="Phone" id="v-phone" {...bind('visit.phone')} />
            <Input label="Email" id="v-email" type="email" {...bind('visit.email')} />
          </div>
          <div className="row2">
            <Input label="Map latitude" id="v-lat" {...bind('visit.lat')} />
            <Input label="Map longitude" id="v-lng" {...bind('visit.lng')} />
          </div>
        </div>
      </div>
    </div>
  );
}
