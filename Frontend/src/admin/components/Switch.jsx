export default function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!checked}
      className={`tgl ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="tgl-track"><span className="tgl-knob" /></span>
      {label && <span className="tgl-label">{label}</span>}
    </button>
  );
}