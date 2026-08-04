import Reveal from './Reveal.jsx';
import Globe from './Globe.jsx';
import { Link } from '../lib/router.jsx';
import { track } from '../lib/analytics.js';

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-globe" data-lenis-prevent>
        <div className="hero-globe-glow" />
        <Globe />
        <div className="hero-globe-fade" />
      </div>

      <div className="hero-content">
        <Reveal className="hero-badge">
          <span className="dot" />
          <span>MERVIX GROUP</span>
        </Reveal>
        <Reveal as="h1" delay={80}>
          One Group,<br />Whole Stack of<br />
          <span className="text-grad">Technology.</span>
        </Reveal>
        <Reveal as="p" delay={160}>
          Mervix Group is a global technology house — four specialist companies
          engineering SaaS platforms, applied AI, cloud infrastructure, and digital
          growth. One partner to design it, build it, run it, and scale it worldwide.
        </Reveal>
        <Reveal className="hero-ctas" delay={240}>
          <a href="#group" className="btn btn-primary" onClick={() => track('select_content', { content_type: 'group' })}>
            Explore the group <span style={{ fontSize: 18 }}>→</span>
          </a>
          <Link to="/contact" className="btn btn-ghost" onClick={() => track('contact_click', { location: 'hero' })}>
            Get in touch
          </Link>
        </Reveal>
        <Reveal className="hero-tagline" delay={320}>
          <div className="dots">
            <span style={{ background: '#2FA84F' }} />
            <span style={{ background: '#1E9C8C' }} />
            <span style={{ background: '#2B7FD4' }} />
            <span style={{ background: '#0E141B' }} />
          </div>
          <span>Four companies. One technology vision.</span>
        </Reveal>
      </div>
    </header>
  );
}
