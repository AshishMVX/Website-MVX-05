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

      <div className="page-hero">
        <div className="page-hero-copy">
          <Reveal className="eyebrow">CASE STUDIES</Reveal>
          <Reveal as="h1" delay={60}>Work that shipped.</Reveal>
          <Reveal as="p" delay={120}>
            A look at how our companies solve real problems — from platform
            rebuilds and AI integrations to growth engines and the infrastructure
            underneath it all.
          </Reveal>
          <Reveal className="page-hero-tags-row" delay={180}>
            {companies.map((c) => (
              <span key={c.name} style={{ color: c.color, background: `${c.color}18`, borderColor: `${c.color}40` }}>
                {c.name}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="page-hero-aside" delay={140}>
          <div className="page-hero-stat-row">
            <div className="page-hero-stat">
              <span className="page-hero-stat-num text-grad">{caseStudies.length}</span>
              <span className="page-hero-stat-label">Case studies</span>
            </div>
            <div className="page-hero-stat">
              <span className="page-hero-stat-num text-grad">{companies.length}</span>
              <span className="page-hero-stat-label">Companies</span>
            </div>
          </div>
          <div className="page-hero-aside-divider" />
          <div className="page-hero-aside-tags">
            {['SaaS Platforms', 'Applied AI', 'Infrastructure', 'Digital & Media'].map((t) => (
              <span key={t} className="page-hero-aside-tag">{t}</span>
            ))}
          </div>
        </Reveal>
      </div>

      <section className="section">
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
