import { Link } from 'react-router';
import { Seo } from '../components/Seo';

export function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Centrl"
        description="That page is not on the Centrl site."
        path="/404"
      />
      <section className="not-found">
        <p className="not-found-code">404</p>
        <h1>This page is not on the map.</h1>
        <p>The link may be old, or the address may be mistyped.</p>
        <div className="cta-row">
          <Link to="/" className="cta">
            Back home
          </Link>
          <Link to="/contact" className="cta-ghost">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
