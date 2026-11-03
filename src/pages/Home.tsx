import { ArrowRight, CalendarBlank, ChatCircle, Clock, FolderSimple, MagnifyingGlass, PaperPlaneTilt, Path, Waveform } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { CloseCta } from '../components/CloseCta';
import { FaqList } from '../components/FaqList';
import { Marquee } from '../components/Marquee';
import { MotionLoop } from '../components/MotionLoop';
import { GrowthMock, OpsMock, SupportMock } from '../components/Mocks';
import { PromptStage } from '../components/PromptStage';
import { Seo } from '../components/Seo';
import { TaglineReveal } from '../components/TaglineReveal';
import { connections, site } from '../content';

export function Home() {
  return (
    <>
      <Seo
        title="Centrl | One place for everything you use"
        description="Centrl connects the tools a small service business already uses. Ask once. Agents handle follow-ups, support replies, scheduling, and the admin in between. $149 a month."
        path="/"
      />

      <div className="announce-row">
        <Link to="/features" className="announce">
          <span className="pill">New</span>
          Agents that carry the work, not only the conversation
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <section className="hero">
        <div className="hero-copy">
          <h1>
            <span>One place for</span>
            <span className="dim">everything you use.</span>
          </h1>
          <p>
            Ask once. Centrl handles the rest. Connect the tools your service business already runs, then agents
            execute the follow-ups, replies, and scheduling.
          </p>
          <div className="cta-row">
            <Link to="/contact" className="cta">
              Start with Centrl
            </Link>
            <a className="cta-ghost" href={`mailto:${site.email}`}>
              Talk to us
            </a>
          </div>
        </div>
        <div className="hero-motion" aria-hidden="true">
          <MotionLoop name="hero" />
        </div>
      </section>

      <section className="steps" id="how" aria-label="How Centrl works">
        <article>
          <h2>
            <span>1.</span> Connect tools
          </h2>
          <p>Link the inbox, calendar, CRM, and chat you already run. Nothing gets ripped out.</p>
        </article>
        <article>
          <h2>
            <span>2.</span> Agents execute
          </h2>
          <p>Centrl Support, Centrl Growth, and Centrl Ops carry the task through to a finished action.</p>
        </article>
        <article>
          <h2>
            <span>3.</span> You ask once
          </h2>
          <p>One request. Centrl routes it, does the work, and leaves a record your team can read.</p>
        </article>
      </section>

      <Marquee />

      <section className="statement">
        <h2>
          <span className="dim">Your week splits across inbox, calendar, and chat.</span>
          Centrl turns that into one request.
        </h2>
        <div className="ask-loop" aria-hidden="true">
          <MotionLoop name="ask" />
        </div>
        <PromptStage />
      </section>

      <section className="feature" id="support-preview">
        <div className="feature-copy">
          <h2>Centrl Support</h2>
          <p>Customer questions, support email, and the follow-up that usually waits until evening.</p>
          <ul className="points">
            <li>
              <ChatCircle size={18} aria-hidden="true" />
              <strong>Reads the thread first</strong>
              <span>The reply follows the conversation already in the inbox.</span>
            </li>
            <li>
              <Clock size={18} aria-hidden="true" />
              <strong>Prepares the follow-up</strong>
              <span>Quiet threads get a next step, not another open tab.</span>
            </li>
            <li>
              <Waveform size={18} aria-hidden="true" />
              <strong>Keeps the shop’s voice</strong>
              <span>Customers hear the business they already hired.</span>
            </li>
          </ul>
          <Link to="/features#support" className="text-link">
            Explore <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <SupportMock />
      </section>

      <section className="feature reverse">
        <div className="feature-copy">
          <h2>Centrl Growth</h2>
          <p>Marketing execution, sales assist, and lead follow-up for estimates that go quiet.</p>
          <ul className="points">
            <li>
              <MagnifyingGlass size={18} aria-hidden="true" />
              <strong>Finds what stalled</strong>
              <span>Estimates and leads that stopped moving come back into view.</span>
            </li>
            <li>
              <PaperPlaneTilt size={18} aria-hidden="true" />
              <strong>Prepares the next note</strong>
              <span>Outreach is written from the record you already keep.</span>
            </li>
            <li>
              <Path size={18} aria-hidden="true" />
              <strong>Keeps the work moving</strong>
              <span>A visit or a reply is proposed, then left for you to send.</span>
            </li>
          </ul>
          <Link to="/features#growth" className="text-link">
            Explore <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <GrowthMock />
      </section>

      <section className="feature">
        <div className="feature-copy">
          <h2>Centrl Ops</h2>
          <p>Scheduling, workflow coordination, admin, and the filing that keeps a small team aligned.</p>
          <ul className="points">
            <li>
              <CalendarBlank size={18} aria-hidden="true" />
              <strong>Uses your calendar</strong>
              <span>Holds and moves land on the calendar the crew already shares.</span>
            </li>
            <li>
              <FolderSimple size={18} aria-hidden="true" />
              <strong>Files the detail</strong>
              <span>Notes land where the team already looks, not in a new drawer.</span>
            </li>
            <li>
              <Path size={18} aria-hidden="true" />
              <strong>Coordinates the handoff</strong>
              <span>The next person can see what changed without a scavenger hunt.</span>
            </li>
          </ul>
          <Link to="/features#ops" className="text-link">
            Explore <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <OpsMock />
      </section>

      <section className="stack-block" aria-labelledby="stack-heading">
        <div className="stack-intro">
          <h2 id="stack-heading">Connect your stack</h2>
          <p>
            Email, calendar, CRM, chat, invoicing, and the docs where the job actually lives. Centrl is designed to
            use what you already pay for.
          </p>
          <Link to="/features#stack" className="text-link">
            See the list <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="stack-motion">
          <MotionLoop name="connect" />
          <div className="sr-only">
            {connections.map((item, index) => (
              <article key={item.name}>
                <p>{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TaglineReveal />

      <section className="week" aria-labelledby="week-heading">
        <div className="week-grid">
          <figure>
            <blockquote id="week-heading">
              I asked once for the quiet estimates. Follow-ups went out, the next calls landed on the calendar, and I
              stayed with the job on site.
            </blockquote>
            <figcaption>
              Studio operator. An illustrative scenario, not a customer result.
            </figcaption>
          </figure>
          <div className="week-stat">
            <p className="stat-xl">
              6.4 <span>hours</span>
            </p>
            <p>returned to client work in a modeled 11-person week.</p>
          </div>
        </div>
        <dl className="stats">
          <div>
            <dt>Follow-ups prepared from one request</dt>
            <dd>38</dd>
          </div>
          <div>
            <dt>Existing tools left in place</dt>
            <dd>11</dd>
          </div>
          <div>
            <dt>Minutes to the first prepared reply</dt>
            <dd>2.7</dd>
          </div>
          <div>
            <dt>Threads read before those replies</dt>
            <dd>23</dd>
          </div>
        </dl>
        <p className="model-note">Figures describe a model week. They are not measured customer results.</p>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Questions</h2>
        <FaqList />
      </section>

      <CloseCta />
    </>
  );
}
