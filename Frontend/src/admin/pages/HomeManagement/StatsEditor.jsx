import Input from '../../../components/common/Input';

export default function StatsEditor({ bind }) {
  return (
    <div className="panel" id="p-stats">
      <div className="panel-head"><div><h2>Highlights numbers</h2><p>The stats strip below the hero.</p></div></div>
      <div className="row4">
        <Input label="Years of cooking" id="s1" type="number" {...bind('stats.years')} />
        <Input label="Dishes on menu" id="s2" type="number" {...bind('stats.dishes')} />
        <Input label="Happy diners" id="s3" type="number" {...bind('stats.diners')} />
        <Input label="Average rating" id="s4" type="number" step=".1" max="5" {...bind('stats.rating')} />
      </div>
    </div>
  );
}
