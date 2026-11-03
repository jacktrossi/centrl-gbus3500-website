import { useEffect, useRef, useState } from 'react';

export type MotionName = 'hero' | 'ask' | 'feature-support' | 'feature-growth' | 'feature-ops' | 'connect';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function MotionLoop({ name }: { name: MotionName }) {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = `/motion/${name}/poster.png`;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced, name]);

  return (
    <>
      {reduced ? null : (
        <video
          ref={videoRef}
          className="motion-loop"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          tabIndex={-1}
        >
          <source src={`/motion/${name}/${name}.webm`} type="video/webm" />
          <source src={`/motion/${name}/${name}.mp4`} type="video/mp4" />
        </video>
      )}
      <img className={reduced ? 'motion-still' : 'motion-still is-idle'} src={poster} alt="" />
    </>
  );
}
