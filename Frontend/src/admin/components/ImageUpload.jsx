import { useRef, useState } from 'react';
import { upload } from '../../api/imageApi';
import SafeImage from '../../components/common/SafeImage';

// onChange(url) is called with the uploaded image url.
// If the API is not connected yet, a local preview url is used so the UI still works.
export default function ImageUpload({ label, value, onChange, round = false, hint }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  const handle = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setBusy(true);
    try {
      const { url } = await upload(file);
      onChange(url);
    } catch {
      onChange(URL.createObjectURL(file)); // local preview only
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="field">
      {label && <span className="lab">{label}</span>}
      <div
        className={`upload ${round ? 'round' : ''} ${drag ? 'drag' : ''}`}
        onClick={() => input.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
        role="button" tabIndex={0} aria-label={label || 'Upload image'}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current.click()}
      >
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => handle(e.target.files[0])} />
        <SafeImage src={value} alt="" />
        {!value && <div className="ph"><b>⬆</b>{busy ? 'Uploading…' : 'Click or drop an image'}</div>}
        {value && <div className="over">{busy ? 'Uploading…' : 'Click to replace'}</div>}
      </div>
      {hint && <small className="hint-text">{hint}</small>}
    </div>
  );
}
