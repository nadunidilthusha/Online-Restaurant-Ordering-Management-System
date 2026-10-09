import { useEffect, useRef, useState } from 'react';

// Counts from 0 to `target` the first time the element is visible.
// usage: const [ref, text] = useCountUp(2400);  <b ref={ref}>{text}</b>
export function useCountUp(target, { decimals = 0, duration = 1800 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Number(target) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);

  return [ref, value.toFixed(decimals)];
}