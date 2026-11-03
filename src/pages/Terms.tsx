import { Seo } from '../components/Seo';
import { site } from '../content';

export function Terms() {
  return (
    <>
      <Seo
        title="Terms | Centrl"
        description="Terms for using the Centrl marketing site and for reading the published $149 monthly plan."
        path="/terms"
      />
      <header className="page-hero">
        <h1>Terms</h1>
        <p>Last updated November 3, 2026. These terms cover use of the site at centrl.rossinetwork.com.</p>
      </header>
      <article className="prose">
        <h2>The site</h2>
        <p>
          The pages describe Centrl: software that connects tools a small service business already uses, then uses
          agents to execute support, growth, and operations work. You may read them and contact us about the product.
        </p>
        <h2>The published plan</h2>
        <p>
          The published subscription is {site.price} a month. A subscription starts only after we confirm fit with
          you and you accept the service terms we send. This page is not itself an order.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site, attempt to break it, or present yourself as Centrl. Do not scrape it so aggressively
          that it stops working for other people.
        </p>
        <h2>Information on the site</h2>
        <p>
          Product descriptions can change as the product changes. Illustrative figures on the home page are a model
          week, not a promise of a measured result.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </article>
    </>
  );
}
