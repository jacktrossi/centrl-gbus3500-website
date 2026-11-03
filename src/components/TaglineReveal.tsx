import { useEffect, useRef, useState } from 'react';
import { site } from '../content';

const WORDS = site.tagline.split(' ');

export function TaglineReveal() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const end = window.innerHeight * 0.28;
      const next = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, next)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="tagline-section" ref={ref} aria-labelledby="tagline-heading">
      <h2 id="tagline-heading" className="sr-only">
        {site.tagline}
      </h2>
      <p className="tagline" aria-hidden="true">
        {WORDS.map((word, index) => {
          const threshold = index / Math.max(WORDS.length - 1, 1);
          const on = progress >= threshold - 0.001;
          return (
            <span key={`${word}-${index}`} className={on ? 'on' : undefined}>
              {word}{' '}
            </span>
          );
        })}
      </p>
    </section>
  );
}
