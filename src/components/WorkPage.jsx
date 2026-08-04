import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import { caseStudies, companies } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { spotlight } from '../lib/spotlight.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));

export default function WorkPage() {
  usePageMeta('Case Studies', 'Real work across SaaS platforms, applied AI, infrastructure, and digital growth — see how Mervix Group companies solve real problems.');
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />

      <Nav />

      <section className="section">
        <div className="section-intro">
          <Reveal className="eyebrow">CASE STUDIES</Reveal>
          <Reveal as="h1" delay={80}>Work that shipped, across every layer of the stack.</Reveal>
          <Reveal as="p" delay={140}>
            A look at how our companies solve real problems — from platform
            rebuilds to growth engines to the infrastructure underneath it all.
          </Reveal>
        </div>

        <div className="work-grid">
          {caseStudies.map((cs, i) => {
            const c = companyByName[cs.company];
            return (
              <Reveal key={cs.slug} delay={i * 90}>
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="work-card lift"
                  onClick={() => track('select_content', { content_type: 'case_study', item_id: cs.slug })}
                  onMouseMove={spotlight}
                >
                  <div className="bar" style={{ background: c?.bar }} />
                  <div className="row">
                    <span className="chip" style={{ color: c?.color, background: `${c?.color}1A` }}>{cs.tag}</span>
                    <span className="arrow">↗</span>
                  </div>
                  <h3>{cs.title}</h3>
                  <p>{cs.summary}</p>
                  <div className="work-card-tags">
                    {cs.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
