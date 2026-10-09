import { useState } from 'react';

// <img> that hides itself if the file fails to load (the gradient behind it shows instead)
export default function SafeImage({ src, alt = '', ...props }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} {...props} />;
}
