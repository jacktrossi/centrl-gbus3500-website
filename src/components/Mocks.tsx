import { MotionLoop } from './MotionLoop';

export function SupportMock() {
  return (
    <figure className="mock mock-motion">
      <MotionLoop name="feature-support" />
      <span className="tick">01</span>
    </figure>
  );
}

export function GrowthMock() {
  return (
    <figure className="mock mock-motion">
      <MotionLoop name="feature-growth" />
      <span className="tick">02</span>
    </figure>
  );
}

export function OpsMock() {
  return (
    <figure className="mock mock-motion">
      <MotionLoop name="feature-ops" />
      <span className="tick">03</span>
    </figure>
  );
}
