import { CaretDown, List, X } from '@phosphor-icons/react';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const wasOpen = useRef(false);
  const location = useLocation();
  const panelId = useId();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 860px)');
    const onChange = () => {
      if (media.matches) setMobileOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    const content = document.getElementById('content');
    const footer = document.querySelector('footer');
    if (!mobileOpen) {
      content?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      return;
    }

    const scrollY = window.scrollY;
    const pathAtOpen = `${window.location.pathname}${window.location.hash}`;
    const body = document.body;
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    body.classList.add('menu-open');
    body.style.position = 'fixed';
    body.style.inset = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    content?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');

    const onTouchMove = (event: TouchEvent) => {
      const scroller = document.querySelector('.mobile-panel-scroll');
      if (
        scroller instanceof HTMLElement &&
        event.target instanceof Node &&
        scroller.contains(event.target) &&
        scroller.scrollHeight > scroller.clientHeight + 1
      ) {
        return;
      }
      event.preventDefault();
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      body.classList.remove('menu-open');
      body.style.position = '';
      body.style.inset = '';
      body.style.width = '';
      body.style.overflow = '';
      content?.removeAttribute('inert');
      footer?.removeAttribute('inert');
      document.removeEventListener('touchmove', onTouchMove);
      const pathNow = `${window.location.pathname}${window.location.hash}`;
      html.style.scrollBehavior = 'auto';
      if (pathNow === pathAtOpen) {
        window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      } else {
        const hash = window.location.hash;
        const id = hash ? decodeURIComponent(hash.slice(1)) : '';
        const target = id ? document.getElementById(id) : null;
        if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (wasOpen.current && !mobileOpen) {
      buttonRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = mobileOpen;
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const panel =
    mobileOpen &&
    createPortal(
      <div id={panelId} className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="mobile-panel-scroll">
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
        </div>
        <Link to="/contact" className="cta" onClick={closeMobile}>
          Start with Centrl
        </Link>
      </div>,
      document.body,
    );

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
      {panel}
    </>
  );
}
