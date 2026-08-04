import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function NotFound() {
  usePageMeta('Page not found', "The page you're looking for doesn't exist or may have moved.");

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />

      <Nav />

      <section className="section not-found">
        <Reveal className="eyebrow">404</Reveal>
        <Reveal as="h1" delay={80}>This page went off the grid.</Reveal>
        <Reveal as="p" delay={140}>
          The page you're looking for doesn't exist or may have moved.
          Let's get you back on track.
        </Reveal>
        <Reveal className="not-found-ctas" delay={200}>
          <Link to="/" className="btn btn-primary">
            Back to home <span style={{ fontSize: 18 }}>→</span>
          </Link>
          <Link to="/case-studies" className="btn btn-ghost">Browse case studies</Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
