import { CloseCta } from '../components/CloseCta';
import { Seo } from '../components/Seo';

const principles = [
  {
    title: 'Execution over answers',
    body: 'Agents carry the task through. A window that stops at advice is a different product.',
  },
  {
    title: 'The stack you already run',
    body: 'Inbox, calendar, CRM, and chat stay. Centrl is not a rip-and-replace and not a new system of record.',
  },
  {
    title: 'Small teams, plainly',
    body: 'Built for service businesses of about 2 to 30 people, where the owner is still on the job.',
  },
  {
    title: 'A record a person can read',
    body: 'What was asked, what was prepared, and what is waiting for approval stays visible.',
  },
];

export function About() {
  return (
    <>
      <Seo
        title="About | Centrl"
        description="Centrl is built for owners and operators of small service businesses who lose hours to admin across email, calendars, CRM, and chat."
        path="/about"
      />
      <header className="page-hero">
        <h1>
          Built for the operator
          <span className="dim"> who is still on the job.</span>
        </h1>
        <p>
          Centrl exists so a small service business can ask once and have the operational work move.
        </p>
      </header>

      <section className="about-copy">
        <p>
          Owners and operators spend the day in the work, then lose the evening to inboxes, calendars, and follow-ups
          scattered across tools that do not talk. Centrl connects those tools and puts agents on the work: support
          replies, lead follow-up, scheduling, and the filing that keeps a team aligned.
        </p>
        <p>
          It is not a general chatbot. It does not ask you to abandon the systems you already pay for. You name the
          outcome. Centrl prepares the action and leaves a record.
        </p>
        <p>Centrl is built in Oxford, Mississippi.</p>
      </section>

      <section className="principles" aria-label="What Centrl is built around">
        {principles.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <CloseCta />
    </>
  );
}
