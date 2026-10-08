export default function Textarea({ label, id, error, maxLength, value = '', ...props }) {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea className="input" id={id} maxLength={maxLength} value={value} {...props} />
      {maxLength && <small>{value.length} / {maxLength} characters</small>}
      <span className="hint">{error}</span>
    </div>
  );
}
