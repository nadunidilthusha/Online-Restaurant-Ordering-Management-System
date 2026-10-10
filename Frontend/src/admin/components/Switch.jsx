export default function Switch({ checked, onChange, label }) {
  return (
    <label className="toggle-row">
      <span className="switch"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} /></span>
      {label}
    </label>
  );
}
