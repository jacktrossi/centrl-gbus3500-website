import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Nav } from './Nav';

export function Layout() {
  const location = useLocation();

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
        <main id="content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
