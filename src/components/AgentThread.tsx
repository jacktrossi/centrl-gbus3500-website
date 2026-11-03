import { useEffect, useState } from 'react';
import { Mark } from './Mark';

type Scene = {
  id: string;
  ask: string;
  tools: readonly string[];
  answer: string;
};

const scenes: readonly Scene[] = [
  {
    id: 'growth',
    ask: 'Follow up with every estimate that went quiet.',
    tools: ['CRM', 'Inbox', 'Calendar'],
    answer: '3 estimates have been quiet for 6 to 11 days. Follow-ups are prepared. Nothing is sent until you approve.',
  },
  {
    id: 'support',
    ask: 'Reply to the open support threads.',
    tools: ['Inbox', 'Notes', 'Calendar'],
    answer: '2 replies drafted in the existing threads. A Thursday follow-up is queued. Nothing is sent until you approve.',
  },
  {
    id: 'ops',
    ask: 'Move Thursday so the crew is not double booked.',
    tools: ['Calendar', 'Crew', 'Thread'],
    answer: 'One overlap on Thursday afternoon. A new hold is proposed, and the confirmation is drafted.',
  },
];

type Step = 0 | 1 | 2 | 3;

export function AgentThread() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<Step>(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduce) {
      setStep(3);
      return;
    }
    setStep(0);
    const timers = [
      window.setTimeout(() => setStep(1), 360),
      window.setTimeout(() => setStep(2), 900),
      window.setTimeout(() => setStep(3), 1760),
      window.setTimeout(() => setIndex((value) => (value + 1) % scenes.length), 6200),
    ];
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [index, reduce]);

  const scene = scenes[index] ?? scenes[0];
  if (!scene) return null;

  return (
    <div className="hero-stage">
      <article className="thread" aria-hidden="true">
        <header className="thread-bar">
          <Mark size={15} />
          <span>Centrl</span>
          <span className="thread-kicker">Preview</span>
        </header>
        <div className="thread-scene" key={scene.id}>
          <div className={step >= 1 ? 'bubble on' : 'bubble'}>
            <p>{scene.ask}</p>
          </div>
          <ul className="thread-tools">
            {scene.tools.map((tool, toolIndex) => (
              <li key={tool} className={step >= 2 ? 'on' : ''} style={{ transitionDelay: `${toolIndex * 90}ms` }}>
                <span>{tool}</span>
                <span className="thread-check" />
              </li>
            ))}
          </ul>
          <p className={step >= 3 ? 'thread-answer on' : 'thread-answer'}>{scene.answer}</p>
          <div className="thread-composer">
            <p className={step === 0 ? 'is-ask' : undefined}>{step === 0 ? scene.ask : 'Ask Centrl'}</p>
            <span className={step === 0 ? 'thread-send is-ready' : 'thread-send'}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path
                  d="M8 12.5V3.5M8 3.5 4.5 7M8 3.5 11.5 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
