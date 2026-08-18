import { Fragment, useEffect, useState } from 'react';
import { track } from '../lib/analytics.js';
import { Link, HashLink } from '../lib/router.jsx';
import logo from '../assets/mervix-logo.png';

const NAV_LINKS = [
  { type: 'hash', to: '#work', label: 'What we do' },
  { type: 'hash', to: '#group', label: 'The group', trackContentType: 'group' },
  { type: 'link', to: '/case-studies', label: 'Case studies', trackContentType: 'case_studies_nav' },
  { type: 'link', to: '/insights', label: 'Insights', trackContentType: 'insights_nav' },
  {
    type: 'dropdown',
    label: 'About',
    children: [
      { type: 'hash', to: '#about', label: 'About us' },
      // Meet the team: temporarily disabled, re-add when the page comes back
      // { type: 'link', to: '/meet-the-team', label: 'Meet the team', highlight: true },
    ],
  },
  { type: 'link', to: '/careers', label: 'Careers', trackContentType: 'careers' },
];

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 880) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  const renderPlainLink = (link) => {
    const Tag = link.type === 'hash' ? HashLink : Link;
    const onClick = () => {
      if (link.trackContentType) track('select_content', { content_type: link.trackContentType });
      close();
    };
    return (
      <Tag key={link.to} to={link.to} className="nav-link" onClick={onClick}>
        {link.label}
      </Tag>
    );
  };

  const renderDesktopLink = (link) => {
    if (link.type === 'dropdown') {
      return (
        <div key={link.label} className="nav-dropdown">
          <button type="button" className="nav-dropdown-btn">
            {link.label} <ChevronDown />
          </button>
          <div className="nav-dropdown-panel">
            {link.children.map((child) => {
              const Tag = child.type === 'hash' ? HashLink : Link;
              return (
                <Tag
                  key={child.to}
                  to={child.to}
                  className={`nav-dropdown-item${child.highlight ? ' nav-dropdown-item--highlight' : ''}`}
                  onClick={close}
                >
                  {child.label}
                </Tag>
              );
            })}
          </div>
        </div>
      );
    }
    return renderPlainLink(link);
  };

  const renderMobileLink = (link) => {
    if (link.type === 'dropdown') {
      return (
        <Fragment key={link.label}>
          {link.children.map((child) => {
            const Tag = child.type === 'hash' ? HashLink : Link;
            return (
              <Tag
                key={child.to}
                to={child.to}
                className={`nav-link${child.highlight ? ' nav-link--highlight' : ''}`}
                onClick={close}
              >
                {child.label}
              </Tag>
            );
          })}
        </Fragment>
      );
    }
    return renderPlainLink(link);
  };

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={close}>
        <img src={logo} alt="Mervix Technology" />
      </Link>
      <div className="nav-menu">
        {NAV_LINKS.map(renderDesktopLink)}
        <Link
          to="/contact"
          className="btn btn-primary btn-sm"
          onClick={() => { track('contact_click', { location: 'nav' }); close(); }}
        >
          Get in touch
        </Link>
        <button
          type="button"
          className={`nav-burger${open ? ' active' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-mobile-panel${open ? ' open' : ''}`}>
        <div className="nav-mobile-links">
          {NAV_LINKS.map(renderMobileLink)}
        </div>
        <Link
          to="/contact"
          className="btn btn-primary"
          onClick={() => { track('contact_click', { location: 'nav_mobile' }); close(); }}
        >
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
