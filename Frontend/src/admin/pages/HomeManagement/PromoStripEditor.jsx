import Input from '../../../components/common/Input';
import Switch from '../../components/Switch';

export default function PromoStripEditor({ draft, bind, update }) {
  return (
    <div className="panel" id="p-promo">
      <div className="panel-head">
        <div><h2>Promo strip</h2><p>The gold bar at the very top of the site.</p></div>
        <Switch label="Visible" checked={draft.promo.visible} onChange={(v) => update('promo.visible', v)} />
      </div>
      <Input label="Message" id="promoText" {...bind('promo.text')} />
    </div>
  );
}
