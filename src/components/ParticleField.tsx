import { useEffect, useRef } from 'react';

type Variant = 'braid' | 'horizon';

export function ParticleField({ variant = 'braid' }: { variant?: Variant }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.62, y: 0.48 };
    let frame = 0;
    let running = true;
    let width = 1;
    let height = 1;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = reduce ? 1.2 : time * 0.00012;
      const shiftX = (pointer.x - 0.5) * 14;
      const shiftY = (pointer.y - 0.5) * 18;
      const ribbons = variant === 'horizon' ? 5 : 7;
      const count = variant === 'horizon' ? 110 : 86;

      for (let p = 0; p < ribbons; p += 1) {
        for (let i = 0; i < count; i += 1) {
          const u = i / (count - 1);
          const envelope = Math.sin(u * Math.PI);
          const base =
            variant === 'horizon'
              ? height * (0.42 + p * 0.045)
              : height * (0.16 + p * 0.1);
          const amp = variant === 'horizon' ? 10 + p * 4 : 18 + p * 7;
          const wave = Math.sin(u * (variant === 'horizon' ? 3.2 : 6.2) + t * 1.4 + p * 0.85);
          const cross = Math.sin(u * 2.4 - t * 0.8 + p) * (variant === 'horizon' ? 6 : 16);
          const x = u * width + shiftX + Math.sin(p + t) * 4;
          const y = base + (wave * amp + cross) * envelope + shiftY;
          const alpha = (0.08 + envelope * 0.55) * (p % 2 === 0 ? 0.7 : 1);
          const radius = i % 9 === 0 ? 1.7 : 1.05;
          ctx.beginPath();
          ctx.fillStyle = `rgba(244,244,244,${alpha})`;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (running && !reduce) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    observer.observe(wrap);

    const parent = wrap.parentElement;
    parent?.addEventListener('pointermove', onMove);

    const visibility = new IntersectionObserver(([entry]) => {
      running = entry?.isIntersecting ?? false;
      if (running && !reduce) {
        frame = window.requestAnimationFrame(draw);
      }
    });
    visibility.observe(wrap);
    frame = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      parent?.removeEventListener('pointermove', onMove);
    };
  }, [variant]);

  return (
    <div ref={wrapRef} className={`particle-wrap particle-${variant}`}>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
