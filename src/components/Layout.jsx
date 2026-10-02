import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { NAV, PHONE_HREF, PHONE_LABEL } from '../content.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import Logo from './Logo.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NavLinks({ onNavigate }) {
  return (
    <ul className="nav__list">
      {NAV.map((item) => (
        <li key={item.to}>
          <NavLink to={item.to} end={item.to === '/'} className="nav__link" onClick={onNavigate}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    if (open) closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && open) close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, close]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <ScrollManager />

      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="North & Noble Care, home">
            <Logo />
          </Link>
          <nav className="nav nav--desktop" aria-label="Main">
            <NavLinks />
          </nav>
          <div className="site-header__actions">
            <a className="site-header__phone" href={PHONE_HREF}>
              <Icon name="phone" size={20} />
              <span>{PHONE_LABEL}</span>
            </a>
            <Button to="/contact" className="site-header__cta">Free Consultation</Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={28} />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? ' is-open' : ''}`} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <button type="button" className="drawer__scrim" tabIndex={-1} aria-label="Close menu" onClick={close} />
        <div className="drawer__panel">
          <div className="drawer__top">
            <Logo />
            <button ref={closeRef} type="button" className="menu-toggle" aria-label="Close menu" onClick={close}>
              <Icon name="close" size={28} />
            </button>
          </div>
          <nav className="nav nav--mobile" aria-label="Mobile">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
          <div className="drawer__actions">
            <Button href={PHONE_HREF} variant="ghost" icon="phone">{PHONE_LABEL}</Button>
            <Button to="/contact">Free Consultation</Button>
          </div>
        </div>
      </div>

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__about">
            <Logo light />
            <p>Gentle, dependable in-home care for seniors and the families who love them.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="site-footer__heading">Explore</h2>
            <ul className="site-footer__list">
              {NAV.map((item) => (
                <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="site-footer__heading">Get in touch</h2>
            <ul className="site-footer__list">
              <li><a href={PHONE_HREF}>{PHONE_LABEL}</a></li>
              <li>[PLACEHOLDER: email]</li>
              <li>[PLACEHOLDER: address]</li>
              <li>[PLACEHOLDER: hours]</li>
            </ul>
          </div>
        </div>
        <div className="container site-footer__legal">
          <span>&copy; {new Date().getFullYear()} North &amp; Noble Care. [PLACEHOLDER: licence details]</span>
        </div>
      </footer>

      <a className="call-fab" href={PHONE_HREF}>
        <Icon name="phone" size={22} />
        <span>Call Now</span>
      </a>
    </>
  );
}
