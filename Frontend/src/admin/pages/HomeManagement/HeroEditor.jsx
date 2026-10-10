import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import ImageUpload from '../../components/ImageUpload';

export default function HeroEditor({ draft, bind, update }) {
  const hero = draft.hero;
  const headline = hero.headline, hl = hero.highlight;
  const [before, after] = hl && headline.includes(hl) ? headline.split(hl) : [headline, ''];

  return (
    <div className="panel" id="p-hero">
      <div className="panel-head"><div><h2>Hero section</h2><p>The first thing guests see.</p></div></div>
      <div className="cols">
        <div className="form">
          <div className="row2">
            <Input label={`Headline (${headline.length}/80)`} id="hh" maxLength={80} {...bind('hero.headline')} />
            <Input label="Highlighted words (shown in gold)" id="hw" {...bind('hero.highlight')} />
          </div>
          <Textarea label="Sub text" id="hs" maxLength={350} {...bind('hero.subtext')} />
          <div className="row2">
            <Input label="Primary button label" id="b1" {...bind('hero.primaryLabel')} />
            <Input label="Primary button link" id="b1l" {...bind('hero.primaryLink')} />
            <Input label="Secondary button label" id="b2" {...bind('hero.secondaryLabel')} />
            <Input label="Secondary button link" id="b2l" {...bind('hero.secondaryLink')} />
          </div>
          <ImageUpload label="Hero image" hint="1000 × 1300 px recommended" value={hero.image} onChange={(url) => update('hero.image', url)} />
        </div>
        <aside className="preview" aria-label="Live preview">
          {draft.promo.visible && <div className="pv-promo">{draft.promo.text}</div>}
          <small>LIVE PREVIEW</small>
          <h3>{before}{hl && headline.includes(hl) && <em>{hl}</em>}{after}</h3>
          <p>{hero.subtext}</p>
          <div className="pv-btns"><span>{hero.primaryLabel}</span><span>{hero.secondaryLabel}</span></div>
        </aside>
      </div>
    </div>
  );
}
