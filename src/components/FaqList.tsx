import { CaretDown } from '@phosphor-icons/react';
import { useId, useState } from 'react';
import { faqs } from '../content';

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="faq-list">
      {faqs.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q} className="faq-item">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.q}
                <CaretDown size={16} aria-hidden="true" className={expanded ? 'caret open' : 'caret'} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
