import { connections } from '../content';

export function Marquee() {
  const names = connections.map((item) => item.name);
  return (
    <div className="marquee">
      <p className="marquee-caption">Designed to sit beside the tools small teams already run</p>
      <div className="marquee-track">
        <ul>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {names.map((name) => (
            <li key={`dup-${name}`}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
