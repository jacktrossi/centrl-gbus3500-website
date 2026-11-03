import { Link } from 'react-router';
import { CloseCta } from '../components/CloseCta';
import { GrowthMock, OpsMock, SupportMock } from '../components/Mocks';
import { Seo } from '../components/Seo';
import { connections, howSteps } from '../content';

export function Features() {
  return (
    <>
      <Seo
        title="Features | Centrl"
        description="Centrl Support, Centrl Growth, and Centrl Ops. Connect the tools you already use. Ask once. Agents execute the work."
        path="/features"
      />
      <header className="page-hero">
        <h1>
          Three lines of work.
          <span className="dim"> One ask.</span>
        </h1>
        <p>
          Centrl is not a general chatbot and not a replacement for your stack. It connects the tools a small service
          business already runs, then agents execute support, growth, and operations work.
        </p>
      </header>

      <section className="feature" id="support">
        <div className="feature-copy">
          <h2>Centrl Support</h2>
          <p>
            Customer questions, support email, and follow-ups. The agent reads the thread you already have, prepares
            the reply in the shop’s voice, and queues the next check-in.
          </p>
          <ul className="plain">
            <li>Open questions stop sitting in a shared inbox with no owner.</li>
            <li>Follow-ups are tied to the original thread, not a separate reminder list.</li>
            <li>You approve anything a customer will receive.</li>
          </ul>
        </div>
        <SupportMock />
      </section>

      <section className="feature reverse" id="growth">
        <div className="feature-copy">
          <h2>Centrl Growth</h2>
          <p>
            Marketing execution, sales assist, and lead follow-up. When an estimate goes quiet, Centrl prepares the
            next note from the record instead of waiting for someone to remember it after hours.
          </p>
          <ul className="plain">
            <li>Stalled leads are named, with how long they have been quiet.</li>
            <li>The next outreach uses the notes already on the job.</li>
            <li>A visit or a call can be proposed on the calendar you share.</li>
          </ul>
        </div>
        <GrowthMock />
      </section>

      <section className="feature" id="ops">
        <div className="feature-copy">
          <h2>Centrl Ops</h2>
          <p>
            Scheduling, workflow coordination, admin, and organizing information. The work of keeping a 2 to 30 person
            shop from tripping over its own calendar.
          </p>
          <ul className="plain">
            <li>Overlapping visits are caught before the crew drives them.</li>
            <li>Details are filed where the team already looks.</li>
            <li>Handoffs leave a record, not a verbal passing comment.</li>
          </ul>
        </div>
        <OpsMock />
      </section>

      <section className="move" id="move" aria-labelledby="move-heading">
        <h2 id="move-heading">How a request moves</h2>
        <ol className="move-list">
          {howSteps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stack-block" id="stack" aria-labelledby="stack-page-heading">
        <div className="stack-intro">
          <h2 id="stack-page-heading">Connect your stack</h2>
          <p>
            These are the places Centrl is designed to meet the work. They are not a claim that every connector is
            switched on. We confirm the exact connections with you before anything is live.
          </p>
          <Link to="/contact" className="text-link">
            Talk through your stack
          </Link>
        </div>
        <div className="stack-grid">
          {connections.map((item, index) => (
            <article key={item.name}>
              <p className="cell-index">{String(index + 1).padStart(2, '0')}</p>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <CloseCta />
    </>
  );
}
