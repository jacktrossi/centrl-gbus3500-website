import { CaretDown, List, X } from '@phosphor-icons/react';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Mark } from './Mark';

type Item = { to: string; title: string; detail: string };

const featureItems: Item[] = [
  { to: '/features#support', title: 'Centrl Support', detail: 'Questions, support email, follow-ups' },
  { to: '/features#growth', title: 'Centrl Growth', detail: 'Outreach, sales assist, lead follow-up' },
  { to: '/features#ops', title: 'Centrl Ops', detail: 'Scheduling, admin, and coordination' },
];

const resourceItems: Item[] = [
  { to: '/#how', title: 'How a request moves', detail: 'From one ask to a finished action' },
  { to: '/#faq', title: 'Questions', detail: 'Fit, tools, and the monthly plan' },
  { to: '/contact', title: 'Contact', detail: 'hello@centrl.rossinetwork.com' },
  { to: '/privacy', title: 'Privacy', detail: 'How this site handles a note to us' },
  { to: '/terms', title: 'Terms', detail: 'The terms for using this site' },
];

function DesktopMenu({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div
      className="menu"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-link menu-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(event) => {
          if (event.detail === 0) {
            setOpen((value) => !value);
            return;
          }
          setOpen(true);
        }}
      >
        {label}
        <CaretDown size={12} aria-hidden="true" />
      </button>
      <div id={panelId} className={open ? 'menu-panel open' : 'menu-panel'} role="group" aria-label={label}>
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="menu-item" onClick={() => setOpen(false)}>
            <span>{item.title}</span>
            <small>{item.detail}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const panelId = useId();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
    <header className="nav">
      <Link to="/" className="brand" aria-label="Centrl home">
        <Mark />
        <span>Centrl</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        <DesktopMenu label="Features" items={featureItems} />
        <DesktopMenu label="Resources" items={resourceItems} />
        <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
          Pricing
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
          About
        </NavLink>
      </nav>

      <Link to="/contact" className="cta nav-cta">
        Start with Centrl
      </Link>

      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle"
        aria-expanded={mobileOpen}
        aria-controls={panelId}
        onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
      >
        {mobileOpen ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
        <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
      </button>
    </header>
    {mobileOpen ? (
      <div id={panelId} className="mobile-panel">
        <p className="mobile-label">Features</p>
        {featureItems.map((item) => (
          <Link key={item.to} to={item.to} onClick={closeMobile}>
            {item.title}
          </Link>
        ))}
        <p className="mobile-label">Resources</p>
        {resourceItems.map((item) => (
          <Link key={item.to} to={item.to} onClick={closeMobile}>
            {item.title}
          </Link>
        ))}
        <Link to="/pricing" onClick={closeMobile}>
          Pricing
        </Link>
        <Link to="/about" onClick={closeMobile}>
          About
        </Link>
        <Link to="/contact" className="cta" onClick={closeMobile}>
          Start with Centrl
        </Link>
      </div>
    ) : null}
    </>
  );
}
