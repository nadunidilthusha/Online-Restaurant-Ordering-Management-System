import Input from '../../../components/common/Input';

export default function PageHeaderEditor({ bind }) {
  return (
    <div className="panel" id="a-intro">
      <div className="panel-head"><h2>Page header</h2></div>
      <div className="row2">
        <Input label="Page title" id="ph-title" {...bind('header.title')} />
        <Input label="Intro line" id="ph-intro" {...bind('header.intro')} />
      </div>
    </div>
  );
}
