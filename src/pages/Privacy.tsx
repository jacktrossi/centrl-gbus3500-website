import { Seo } from '../components/Seo';
import { site } from '../content';

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy | Centrl"
        description="How the Centrl marketing site handles information you send to hello@centrl.rossinetwork.com."
        path="/privacy"
      />
      <header className="page-hero">
        <h1>Privacy</h1>
        <p>Last updated November 3, 2026. This page covers the marketing site at centrl.rossinetwork.com.</p>
      </header>
      <article className="prose">
        <h2>What this site is</h2>
        <p>
          This is a static marketing site for Centrl. It describes the product, the $149 monthly plan, and how to
          reach us.
        </p>
        <h2>What you send us</h2>
        <p>
          The contact form does not post your message to a server run by this site. It opens your email app with a
          note addressed to {site.email}. If you send that email, we use it to reply and to talk about whether Centrl
          fits the work you described.
        </p>
        <p>We do not sell personal information. We do not run advertising cookies on this site.</p>
        <h2>Hosting</h2>
        <p>
          The host that serves this site may keep standard connection logs for security and operations. Those logs
          are not used to build an advertising profile.
        </p>
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a> if you want to see, correct, or delete a message
          you sent us.
        </p>
      </article>
    </>
  );
}
