import { useRef } from 'react';
import { upload } from '../../../api/imageApi';
import { moveItem, newId } from '../../../utils/objectPath';
import SafeImage from '../../../components/common/SafeImage';

export default function GalleryEditor({ draft, update }) {
  const gallery = draft.gallery;
  const input = useRef(null);
  const set = (next) => update('gallery', next);

  const addFiles = async (files) => {
    const added = [];
    for (const file of files) {
      let img;
      try { img = (await upload(file)).url; } catch { img = URL.createObjectURL(file); }
      added.push({ id: newId(), img, caption: file.name.replace(/\.[^.]+$/, '') });
    }
    set([...gallery, ...added]);
  };

  return (
    <div className="panel" id="a-gallery">
      <div className="panel-head"><div><h2>Gallery images</h2><p>Upload, reorder or delete photos. The first image is the cover.</p></div></div>
      <div className="grid-img">
        {gallery.map((g, i) => (
          <div className="gi" key={g.id}>
            {i === 0 && <span className="cover-tag">Cover</span>}
            <SafeImage src={g.img} alt={g.caption} />
            <div className="bar">
              <button type="button" onClick={() => set(moveItem(gallery, i, -1))} aria-label="Move left">←</button>
              <button type="button" onClick={() => set(moveItem(gallery, i, 1))} aria-label="Move right">→</button>
              <button type="button" onClick={() => window.confirm('Delete this image?') && set(gallery.filter((_, k) => k !== i))}>Delete</button>
            </div>
            <input className="cap-input" value={g.caption} aria-label="Caption" onChange={(e) => set(gallery.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)))} />
          </div>
        ))}
        <button type="button" className="gi add" onClick={() => input.current.click()}>
          <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles([...e.target.files])} />
          <div><b>+</b>Upload image</div>
        </button>
      </div>
    </div>
  );
}
