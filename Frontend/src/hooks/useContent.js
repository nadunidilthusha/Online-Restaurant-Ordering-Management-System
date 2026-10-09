import { useEffect, useState } from 'react';
import { getContent } from '../api/contentApi';
import { SAMPLE_HOME, SAMPLE_ABOUT } from '../data/sampleContent';

const SAMPLES = { home: SAMPLE_HOME, about: SAMPLE_ABOUT };

// Loads page content from the API. If the API is not available yet, falls back to sample data.
export function useContent(page) {
  const [state, setState] = useState({ data: null, loading: true, usingSample: false });

  useEffect(() => {
    let alive = true;
    getContent(page)
      .then((data) => alive && setState({ data, loading: false, usingSample: false }))
      .catch(() => alive && setState({ data: SAMPLES[page], loading: false, usingSample: true }));
    return () => { alive = false; };
  }, [page]);

  return state;
}
