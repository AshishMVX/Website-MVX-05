import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import { Link } from '../lib/router.jsx';
import { caseStudies, companies, CONTACT_EMAIL } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { useJsonLd } from '../lib/useJsonLd.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));

export default function CaseStudyPage({ slug }) {
  const cs = caseStudies.find((c) => c.slug === slug);
  usePageMeta(cs ? cs.title : 'Case study not found', cs?.summary);
  useJsonLd(cs ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.title,
    description: cs.summary,
    about: cs.client,
    author: { '@type': 'Organization', name: cs.company },
    publisher: { '@type': 'Organization', name: 'Mervix Group' },
  } : null);

  if (!cs) {
    return (
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Mesh />
        <Nav />
        <section className="section legal">
          <h1>Case study not found</h1>
          <p style={{ marginTop: 16 }}>
            <Link to="/case-studies">← Back to case studies</Link>
          </p>
        </section>
        <Footer />
      </div>
    );
  }

  const c = companyByName[cs.company];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <ScrollProgress />
      <Mesh />

      <Nav />

      <section className="section case-head">
        <Reveal as="div" className="page-back">
          <Link to="/case-studies">← Back to case studies</Link>
        </Reveal>
        <Reveal className="eyebrow" delay={40}>{cs.client.toUpperCase()}</Reveal>
        <Reveal as="h1" delay={80}>{cs.title}</Reveal>
        <Reveal as="p" delay={140} className="case-summary">{cs.summary}</Reveal>
        <Reveal className="case-meta" delay={180}>
          <span className="chip" style={{ color: c?.color, background: `${c?.color}1A` }}>{cs.company}</span>
          {cs.tags.map((t) => <span key={t} className="case-tag">{t}</span>)}
        </Reveal>
      </section>

      <section className="section case-stats-section">
        <Reveal className="case-stats">
          {cs.stats.map((s) => (
            <div key={s.label} className="case-stat">
              <CountUp value={s.value} className="case-stat-value text-grad" />
              <div className="case-stat-label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section legal case-body">
        {cs.body.map((block) => (
          <div key={block.h}>
            <h2>{block.h}</h2>
            <p>{block.p}</p>
          </div>
        ))}
      </section>

      <section className="section case-cta">
        <Reveal as="h2">Have a similar problem to solve?</Reveal>
        <Reveal as="p" delay={80}>
          Tell us what you're working on — the right team at Mervix is ready.
        </Reveal>
        <Reveal delay={140}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="btn btn-primary"
            onClick={() => track('generate_lead', { method: 'email', content_type: 'case_study_cta' })}
          >
            Start a conversation <span style={{ fontSize: 18 }}>→</span>
          </a>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
