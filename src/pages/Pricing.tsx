import { Link } from 'react-router';
import { CloseCta } from '../components/CloseCta';
import { FaqList } from '../components/FaqList';
import { Seo } from '../components/Seo';
import { includes, site } from '../content';

export function Pricing() {
  return (
    <>
      <Seo
        title="Pricing | Centrl"
        description="Centrl is $149 a month for small service businesses. Support, Growth, and Ops are included. No extra published tiers."
        path="/pricing"
      />
      <header className="page-hero">
        <h1>
          One plan.
          <span className="dim"> $149 a month.</span>
        </h1>
        <p>
          For owners and operators of small service businesses, about 2 to 30 people. The same subscription covers
          Centrl Support, Centrl Growth, and Centrl Ops.
        </p>
      </header>

      <section className="price-layout" id="plan">
        <div>
          <p className="price">
            <span>{site.price}</span>
            <small>/ month</small>
          </p>
          <p className="price-note">Billed monthly. A setup conversation comes before the first workflow.</p>
          <div className="cta-row">
            <Link to="/contact" className="cta">
              Start with Centrl
            </Link>
            <a className="cta-ghost" href={`mailto:${site.email}`}>
              Talk to us
            </a>
          </div>
        </div>
        <ul className="includes">
          {includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="custom-plan">
        <h2>Need a different shape?</h2>
        <p>
          Write to us and describe the work. The only published price is $149 a month. We do not list an enterprise
          tier.
        </p>
        <Link to="/contact" className="text-link">
          Contact us
        </Link>
      </section>

      <section className="faq" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq">Questions</h2>
        <FaqList />
      </section>

      <CloseCta />
    </>
  );
}
