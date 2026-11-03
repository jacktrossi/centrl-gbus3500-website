import { Link } from 'react-router';
import { site } from '../content';

export function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div>
          <p className="foot-label">Product</p>
          <Link to="/features#support">Centrl Support</Link>
          <Link to="/features#growth">Centrl Growth</Link>
          <Link to="/features#ops">Centrl Ops</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div>
          <p className="foot-label">Company</p>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/#how">How a request moves</Link>
          <Link to="/#faq">Questions</Link>
        </div>
        <div>
          <p className="foot-label">Start</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p className="foot-note">Tell us the work you want handled first. The published plan is $149 a month.</p>
        </div>
      </div>

      <div className="wordmark-wrap" aria-hidden="true">
        <p className="wordmark">Centrl</p>
      </div>

      <div className="foot-bottom">
        <p>© 2026 Centrl</p>
        <p className="foot-legal">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </p>
      </div>
    </footer>
  );
}
