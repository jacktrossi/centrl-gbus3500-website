import { Link } from 'react-router';

export function CloseCta() {
  return (
    <section className="close">
      <h2>
        One place for everything you use.
      </h2>
      <p>Ask once. Centrl handles the rest.</p>
      <Link to="/contact" className="cta">
        Start with Centrl
      </Link>
    </section>
  );
}
