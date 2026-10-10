export default function PageHeading({ title, text, tabs = [] }) {
  return (
    <div className="page-head">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {tabs.length > 0 && <nav className="tabs">{tabs.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>}
    </div>
  );
}
