import Button from '../../components/common/Button';

export default function SaveBar({ dirty, saving, onSave, onDiscard }) {
  return (
    <div className={`savebar ${dirty ? 'show' : ''}`}>
      <div className="msg"><i />You have unsaved changes</div>
      <Button variant="outline" onClick={onDiscard} type="button">Discard</Button>
      <Button onClick={onSave} loading={saving} type="button">Save &amp; publish</Button>
    </div>
  );
}
