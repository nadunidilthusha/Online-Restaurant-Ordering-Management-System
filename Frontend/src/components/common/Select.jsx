export default function Select({ label, id, options = [], error, ...props }) {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select className="input" id={id} {...props}>
        {options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
      <span className="hint">{error}</span>
    </div>
  );
}
