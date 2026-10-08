export default function Input({ label, id, error, ...props }) {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input className="input" id={id} {...props} />
      <span className="hint">{error}</span>
    </div>
  );
}
