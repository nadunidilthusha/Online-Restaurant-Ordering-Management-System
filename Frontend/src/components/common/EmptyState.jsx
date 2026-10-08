export default function EmptyState({ title = 'Nothing here yet', text }) {
  return (
    <div className="state">
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
}
