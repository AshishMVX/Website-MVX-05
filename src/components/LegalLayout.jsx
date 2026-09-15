import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import { useRoute } from '../lib/router.jsx';
import { usePageMeta } from '../lib/usePageMeta.js';

/**
 * Shared layout for the customer-facing policy pages.
 *
 * Pass a `sections` array of `{ id, title, body }`. The layout renders a
 * numbered table of contents (linking to each section's anchor) followed by the
 * sections themselves, auto-numbered to match. Longer pages get an on-page TOC;
 * `intro`, `subtitle`, effective/updated dates and a trailing `outro` are all
 * optional. Anchor clicks use the app's smooth-scroll with a fixed-nav offset.
 */
export default function LegalLayout({
  title,
  subtitle,
  effective,
  updated,
  canonicalPath,
  description,
  intro,
  sections = [],
  outro,
}) {
  const plainTitle = title.replace(/&amp;/g, '&');
  usePageMeta(plainTitle, description, canonicalPath);
  const { scrollToHash } = useRoute();

  const onTocClick = (e, id) => {
    e.preventDefault();
    window.history.replaceState({}, '', `#${id}`);
    scrollToHash(`#${id}`);
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      <section className="section legal">
        <div className="legal-head">
          <h1>{title}</h1>
          {subtitle && <p className="legal-subtitle">{subtitle}</p>}
          <div className="legal-dates">
            {effective && <span>Effective date: {effective}</span>}
            {updated && <span>Last updated: {updated}</span>}
          </div>
        </div>

        {intro && <div className="legal-intro">{intro}</div>}

        {sections.length > 0 && (
          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc-title">On this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={(e) => onTocClick(e, s.id)}>
                    <span className="legal-toc-num">{i + 1}.</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="legal-body">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="legal-section"
              aria-labelledby={`${s.id}-h`}
            >
              <h2 id={`${s.id}-h`}>
                <span className="legal-section-num">{i + 1}.</span> {s.title}
              </h2>
              {s.body}
            </section>
          ))}
          {outro && <div className="legal-outro">{outro}</div>}
        </div>
      </section>

      <Footer />
    </div>
  );
}
