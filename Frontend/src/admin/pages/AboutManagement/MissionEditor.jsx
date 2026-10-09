import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import ImageUpload from '../../components/ImageUpload';

export default function MissionEditor({ draft, bind, update }) {
  const values = draft.mission.values;
  const editValue = (i, patch) => update('mission.values', values.map((v, k) => (k === i ? { ...v, ...patch } : v)));

  return (
    <div className="panel" id="a-mission">
      <div className="panel-head"><h2>Mission and story</h2></div>
      <div className="cols">
        <div className="form">
          <Input label="Mission quote" id="m-quote" {...bind('mission.quote')} />
          <Textarea label="Story" id="m-story" maxLength={350} style={{ minHeight: 150 }} {...bind('mission.story')} />
          <div>
            <span className="lab">Founder</span>
            <div className="founder-box">
              <ImageUpload round hint="Square photo, at least 400 × 400 px" value={draft.mission.founderPhoto} onChange={(url) => update('mission.founderPhoto', url)} />
              <div className="form">
                <Input label="Founder name" id="f-name" {...bind('mission.founderName')} />
                <Input label="Founder title" id="f-title" {...bind('mission.founderTitle')} />
              </div>
            </div>
          </div>
        </div>
        <ImageUpload label="Mission photo" value={draft.mission.photo} onChange={(url) => update('mission.photo', url)} />
      </div>

      <h3 className="sub">Value cards</h3>
      <div className="row3">
        {values.map((v, i) => (
          <div className="ed" key={v.id}>
            <div className="form">
              <div className="row-icon">
                <div className="field"><label>Icon</label><input className="input" value={v.icon} onChange={(e) => editValue(i, { icon: e.target.value })} /></div>
                <div className="field"><label>Title</label><input className="input" value={v.title} onChange={(e) => editValue(i, { title: e.target.value })} /></div>
              </div>
              <Textarea label="Text" maxLength={350} value={v.text} onChange={(e) => editValue(i, { text: e.target.value })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
