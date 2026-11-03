import { useEffect, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Footer } from './Footer';
import { Nav } from './Nav';

function samePage(url: URL) {
  return url.pathname === window.location.pathname;
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof document.startViewTransition === 'function') {
      document.documentElement.classList.add('vt');
    }
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || samePage(url)) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || typeof document.startViewTransition !== 'function') return;
      event.preventDefault();
      event.stopPropagation();
      const to = `${url.pathname}${url.search}${url.hash}`;
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(to);
        });
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate]);

  useLayoutEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="frame">
        <Nav />
        <main id="content" key={location.pathname}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
