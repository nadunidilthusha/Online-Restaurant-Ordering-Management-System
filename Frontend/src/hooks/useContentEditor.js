import { useEffect, useState } from 'react';
import { saveContent } from '../api/contentApi';
import { useContent } from './useContent';
import { getIn, setIn } from '../utils/objectPath';

// Draft editing for admin pages: bind('hero.headline') -> { value, onChange }
export function useContentEditor(page) {
  const { data, loading, usingSample } = useContent(page);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  useEffect(() => { if (data) setDraft(structuredClone(data)); }, [data]);

  // warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (path, value) => {
    setDraft((d) => setIn(d, Array.isArray(path) ? path : path.split('.'), value));
    setDirty(true);
  };

  const bind = (path) => {
    const p = Array.isArray(path) ? path : path.split('.');
    return { value: getIn(draft, p) ?? '', onChange: (e) => update(p, e.target.value) };
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContent(page, draft);
      setDirty(false);
      setMessage({ type: 'success', text: 'Changes published to the website' });
    } catch (e) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Could not save. Is the API running?' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3500);
    }
  };

  const discard = () => { setDraft(structuredClone(data)); setDirty(false); };

  return { draft, loading, usingSample, dirty, saving, message, bind, update, save, discard };
}
