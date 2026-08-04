import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function LegalLayout({ title, updated, children }) {
  usePageMeta(title.replace(/&amp;/g, '&'));
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />

      <Nav />
      <section className="section legal">
        <div className="legal-head">
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {updated}</p>
        </div>
        <div className="legal-body">
          {children}
        </div>
      </section>
      <Footer />
    </div>
  );
}
