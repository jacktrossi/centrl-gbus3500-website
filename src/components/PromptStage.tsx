import { ArrowRight, CalendarBlank, ChatCircle, Megaphone, Plus, Wrench, type Icon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

type AskId = 'support' | 'growth' | 'ops' | 'schedule';

const asks: Record<AskId, { label: string; request: string; result: string; icon: Icon }> = {
  support: {
    label: 'Support',
    icon: ChatCircle,
    request: 'Reply to the open support threads and set the follow-ups.',
    result:
      '2 replies drafted in the existing threads. A follow-up is queued for Thursday. Nothing is sent until you approve.',
  },
  growth: {
    label: 'Growth',
    icon: Megaphone,
    request: 'Follow up with every estimate that went quiet this week.',
    result:
      '3 estimates have been quiet for 6 to 11 days. Follow-ups are prepared for your review, with visit times proposed on the calendar.',
  },
  ops: {
    label: 'Ops',
    icon: Wrench,
    request: 'Move Thursday’s site visits so the same crew is not booked twice.',
    result:
      'One overlap found on Thursday afternoon. A new hold is proposed, and the confirmation is drafted in the thread.',
  },
  schedule: {
    label: 'Schedule',
    icon: CalendarBlank,
    request: 'Hold next Tuesday afternoon and send the confirmation.',
    result:
      'Tuesday 1:30 to 3:00 is open on the shared calendar. The confirmation is ready. It waits for your approval.',
  },
};

const order: AskId[] = ['support', 'growth', 'ops', 'schedule'];

export function PromptStage() {
  const [ask, setAsk] = useState<AskId>('growth');
  const [phase, setPhase] = useState<'idle' | 'reading' | 'ready'>('idle');
  const timer = useRef<number>(0);
  const current = asks[ask];

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = () => {
    window.clearTimeout(timer.current);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase('reading');
    timer.current = window.setTimeout(() => setPhase('ready'), reduce ? 0 : 700);
  };

  const select = (next: AskId) => {
    window.clearTimeout(timer.current);
    setAsk(next);
    setPhase('idle');
  };

  return (
    <div className="prompt-stage">
      <div className="prompt-card">
        <button type="button" className="icon-btn" aria-label="Clear the preview" onClick={() => select('growth')}>
          <Plus size={16} aria-hidden="true" />
        </button>
        <p>{current.request}</p>
        <button type="button" className="send" aria-label="Preview what Centrl prepares" onClick={run}>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="chips" role="group" aria-label="Lines of work">
        {order.map((id) => {
          const item = asks[id];
          const Icon = item.icon;
          return (
            <button
              key={id}
              type="button"
              className={id === ask ? 'chip is-on' : 'chip'}
              aria-pressed={id === ask}
              onClick={() => select(id)}
            >
              <Icon size={14} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="preview" aria-live="polite">
        {phase === 'idle' ? (
          <p className="preview-hint">Choose a line, then preview the work Centrl prepares.</p>
        ) : null}
        {phase === 'reading' ? <p className="preview-hint">Reading the tools you already use.</p> : null}
        {phase === 'ready' ? (
          <>
            <p className="preview-label">Preview</p>
            <p>{current.result}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
