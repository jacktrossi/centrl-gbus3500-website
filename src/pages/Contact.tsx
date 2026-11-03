import { useState, type FormEvent } from 'react';
import { Seo } from '../components/Seo';
import { site } from '../content';

type Field = 'name' | 'email' | 'business' | 'message';
type Errors = Partial<Record<Field, string>>;

const lines = ['Centrl Support', 'Centrl Growth', 'Centrl Ops'] as const;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const business = String(data.get('business') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const team = String(data.get('team') ?? '').trim();
    const picked = lines.filter((line) => data.get(line) === 'on');

    const next: Errors = {};
    if (!name) next.name = 'Add your name so we know who to reply to.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Add a work email so the reply has somewhere to go.';
    }
    if (!business) next.business = 'Add the business name.';
    if (message.length < 12) next.message = 'Tell us, in a sentence or two, what you want handled.';
    setErrors(next);
    const order: Field[] = ['name', 'email', 'business', 'message'];
    const firstInvalid = order.find((key) => next[key]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    const body = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Team size: ${team || 'Not specified'}`,
      `Lines: ${picked.length ? picked.join(', ') : 'Not specified'}`,
      '',
      message,
    ].join('\n');

    const href = `mailto:${site.email}?subject=${encodeURIComponent('Start with Centrl')}&body=${encodeURIComponent(body)}`;
    setSent(body);
    setCopied(false);
    setCopyFailed(false);
    window.location.href = href;
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\n\n${sent}`);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
      setCopied(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact | Centrl"
        description="Start with Centrl. Tell us the size of the team and the work you want handled. hello@centrl.rossinetwork.com."
        path="/contact"
      />
      <header className="page-hero">
        <h1>
          Tell us what you
          <span className="dim"> want handled.</span>
        </h1>
        <p>
          The published plan is $149 a month. This form opens your email app with a note to {site.email}. It does not
          send the message to a server on this site.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-aside">
          <p>Include the team size and which line should go first: Support, Growth, or Ops.</p>
          <p>
            Or write directly to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        {sent ? (
          <div className="sent" role="status">
            <h2>Your email app should open now.</h2>
            <p>
              The note is addressed to {site.email}. If nothing opened, copy it and send it yourself.
            </p>
            <pre>{sent}</pre>
            <div className="cta-row">
              <button type="button" className="cta" onClick={copy}>
                {copied ? 'Copied' : 'Copy note'}
              </button>
              <a className="cta-ghost" href={`mailto:${site.email}`}>
                Open email
              </a>
            </div>
            {copyFailed ? <p className="field-error">Copy failed. Select the note above and copy it manually.</p> : null}
            <button type="button" className="text-link" onClick={() => setSent(null)}>
              Edit the note
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" data-invalid={errors.name ? 'true' : undefined} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
              {errors.name ? <p id="name-error" className="field-error">{errors.name}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" autoComplete="email" data-invalid={errors.email ? 'true' : undefined} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              {errors.email ? <p id="email-error" className="field-error">{errors.email}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="business">Business</label>
              <input id="business" name="business" autoComplete="organization" data-invalid={errors.business ? 'true' : undefined} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? 'business-error' : undefined} />
              {errors.business ? <p id="business-error" className="field-error">{errors.business}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="team">Team size</label>
              <select id="team" name="team" defaultValue="6 to 15">
                <option>2 to 5</option>
                <option>6 to 15</option>
                <option>16 to 30</option>
                <option>More than 30</option>
              </select>
            </div>
            <fieldset className="field">
              <legend>Where should we start?</legend>
              <div className="checks">
                {lines.map((line) => (
                  <label key={line}>
                    <input type="checkbox" name={line} />
                    {line}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="message">What should Centrl handle?</label>
              <textarea id="message" name="message" rows={6} data-invalid={errors.message ? 'true' : undefined} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
              {errors.message ? <p id="message-error" className="field-error">{errors.message}</p> : null}
            </div>
            <button type="submit" className="cta">
              Start with Centrl
            </button>
          </form>
        )}
      </div>
    </>
  );
}
