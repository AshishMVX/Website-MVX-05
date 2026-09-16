import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link, useRoute } from '../lib/router.jsx';
import { CONTACT_EMAIL } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { useJsonLd } from '../lib/useJsonLd.js';

/* ── Small, lightweight inline icons (decorative; labels carry the meaning) ── */
const iconProps = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true,
};
const BuildIcon = () => (<svg {...iconProps}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const SecureIcon = () => (<svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>);
const OperateIcon = () => (<svg {...iconProps}><rect x="2" y="3" width="20" height="8" rx="2" /><rect x="2" y="13" width="20" height="8" rx="2" /><path d="M6 7h.01M6 17h.01" /></svg>);
const GrowIcon = () => (<svg {...iconProps}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);

const HERO_NODES = [
  { key: 'build', label: 'Build', desc: 'Software & products', Icon: BuildIcon, pos: 'tl' },
  { key: 'secure', label: 'Secure', desc: 'Cloud & infrastructure', Icon: SecureIcon, pos: 'tr' },
  { key: 'operate', label: 'Operate', desc: 'Process & operations', Icon: OperateIcon, pos: 'bl' },
  { key: 'grow', label: 'Grow', desc: 'Brand & growth', Icon: GrowIcon, pos: 'br' },
];

const CAPABILITIES = [
  {
    num: '01',
    title: 'Digital Products & Engineering',
    copy: 'We design and develop web applications, mobile experiences, and SaaS platforms around real business needs. From MVPs to enterprise systems, our focus is software that is maintainable, scalable, and ready to evolve.',
    items: ['Web and mobile development', 'SaaS platforms', 'MVP and product development', 'Enterprise integrations', 'Automation and analytics'],
  },
  {
    num: '02',
    title: 'Cloud, Infrastructure & Reliability',
    copy: 'Through CoreCyrus, we support the environments that technology depends on, connecting cloud engineering, networking, cybersecurity, and hybrid infrastructure with day-to-day operational requirements.',
    items: ['Cloud engineering', 'Infrastructure and networking', 'DevOps', 'Cybersecurity services', 'Hybrid environments'],
  },
  {
    num: '03',
    title: 'Growth, Brand & Experiences',
    copy: 'SkoutHaus and SkoutsMedia connect brand strategy with campaigns, content, and experiences, helping businesses communicate clearly, reach relevant audiences, and improve how they engage customers.',
    items: ['Branding and creative production', 'Paid media and performance marketing', 'Funnel optimization and analytics', 'Corporate events and brand activations', 'Digital experiences and content amplification'],
  },
  {
    num: '04',
    title: 'Mortgage & Business Operations',
    copy: 'We support lenders, brokers, and financial institutions with structured operational assistance across mortgage workflows, helping their teams coordinate documentation, review processes, and back-office execution.',
    items: ['Mortgage processing', 'Underwriting support', 'Loan coordination', 'Document verification', 'Quality control and back-office operations'],
  },
];

const BRANDS = [
  {
    name: 'GeoLink',
    focus: 'Software & products',
    accent: '#4FCB6E',
    tagline: 'Software and SaaS, engineered to scale.',
    copy: 'Custom software, web and mobile applications, and SaaS products designed and built to scale across web, mobile, and cloud — from a first MVP to enterprise-grade systems.',
  },
  {
    name: 'CoreCyrus',
    focus: 'Cloud & infrastructure',
    accent: '#3F9BE0',
    tagline: 'Infrastructure that supports what comes next.',
    copy: 'Cloud engineering, networking, cybersecurity, and hybrid environments designed around reliability, scalability, and operational continuity.',
  },
  {
    name: 'SkoutHaus',
    focus: 'Growth & brand',
    accent: '#2CC0A6',
    tagline: 'A clearer path from brand to growth.',
    copy: 'Brand strategy, creative production, paid media, funnel optimization, and analytics brought together to strengthen customer acquisition and improve revenue performance.',
  },
  {
    name: 'SkoutsMedia',
    focus: 'Experiences & media',
    accent: '#5EA8E6',
    tagline: 'Experiences that carry the brand further.',
    copy: 'Corporate events, digital experiences, and brand activations connected with media production, content amplification, and performance marketing.',
  },
];

const STEPS = [
  { num: '01', title: 'Understand the business', copy: 'Start with the problem, the people involved, and the outcome the work needs to support.' },
  { num: '02', title: 'Define the path', copy: 'Translate priorities into a clear scope, practical architecture, and an achievable sequence of work.' },
  { num: '03', title: 'Build and coordinate', copy: 'Bring the relevant engineering, infrastructure, operations, and creative expertise together around delivery.' },
  { num: '04', title: 'Improve with evidence', copy: 'Use feedback, analytics, and operational insight to guide what happens next.' },
];

const PRINCIPLES = [
  { title: 'Business purpose first', copy: 'Technology choices should serve a clear operational or commercial need.' },
  { title: 'Maintainability matters', copy: 'Build with the next release, the next team, and the next stage in mind.' },
  { title: 'Ownership stays clear', copy: 'Make responsibilities visible and keep communication connected to the work.' },
  { title: 'Progress should be measurable', copy: 'Use relevant outcomes and evidence to guide improvement.' },
];

const MORTGAGE_SERVICES = [
  'Mortgage processing', 'Underwriting support', 'Loan coordination',
  'Document verification', 'Quality control', 'Back-office operations',
];

/** Central hub + four connected areas. Real text lives in labels and aria-label. */
function HeroDiagram() {
  return (
    <div
      className="abt-visual"
      role="img"
      aria-label="Mervix connects four areas of work — Build, Secure, Operate, and Grow — around one accountable partner."
    >
      <svg className="abt-visual-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="abtLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2FA84F" />
            <stop offset="52%" stopColor="#1E9C8C" />
            <stop offset="100%" stopColor="#2B7FD4" />
          </linearGradient>
        </defs>
        <line x1="50" y1="50" x2="19" y2="20" stroke="url(#abtLine)" strokeWidth="0.7" />
        <line x1="50" y1="50" x2="81" y2="20" stroke="url(#abtLine)" strokeWidth="0.7" />
        <line x1="50" y1="50" x2="19" y2="80" stroke="url(#abtLine)" strokeWidth="0.7" />
        <line x1="50" y1="50" x2="81" y2="80" stroke="url(#abtLine)" strokeWidth="0.7" />
      </svg>

      <div className="abt-visual-hub">
        <span className="abt-visual-hub-dot" />
        <span>Mervix</span>
      </div>

      {HERO_NODES.map(({ key, label, desc, Icon, pos }) => (
        <div key={key} className={`abt-visual-node abt-visual-node--${pos}`}>
          <span className="abt-visual-node-icon"><Icon /></span>
          <span className="abt-visual-node-label">{label}</span>
          <span className="abt-visual-node-desc">{desc}</span>
        </div>
      ))}
    </div>
  );
}

export default function AboutUs() {
  usePageMeta(
    'About Mervix | Technology, Operations & Growth',
    'Meet Mervix Technology Private Limited, connecting digital engineering, cloud infrastructure, mortgage process support, and growth expertise.',
    '/about-us',
    { exactTitle: true },
  );

  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mervix',
    legalName: 'Mervix Technology Private Limited',
    url: 'https://mervixtechnology.com/about-us',
    email: CONTACT_EMAIL,
    description: 'Mervix Technology Private Limited is a full-stack technology and digital engineering company providing web and mobile development, SaaS platforms, cloud solutions, enterprise integrations, automation, DevOps, analytics, and US mortgage process support services.',
    brand: BRANDS.map((b) => ({ '@type': 'Brand', name: b.name })),
    knowsAbout: [
      'Web and mobile application development', 'SaaS platforms', 'Cloud engineering',
      'Enterprise integrations', 'Automation', 'DevOps', 'Analytics', 'Cybersecurity',
      'US mortgage process support',
    ],
  });

  const { scrollToHash } = useRoute();
  const toCapabilities = (e) => { e.preventDefault(); scrollToHash('#capabilities'); };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      {/* ── A · HERO ── */}
      <header className="abt-hero">
        <div className="abt-hero-copy">
          <Reveal className="eyebrow">ABOUT MERVIX</Reveal>
          <Reveal as="h1" delay={70}>
            Technology that moves <span className="text-grad">business forward.</span>
          </Reveal>
          <Reveal as="p" delay={140}>
            Mervix Technology Private Limited brings digital engineering, infrastructure,
            operational support, and growth expertise together to help businesses build,
            run, and scale. From a startup&rsquo;s first product to complex enterprise
            systems, we connect technical execution with the needs of the business.
          </Reveal>
          <Reveal className="abt-hero-ctas" delay={210}>
            <Link to="/contact" className="btn btn-primary" onClick={() => track('contact_click', { location: 'about_hero' })}>
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <a href="#capabilities" className="btn btn-ghost" onClick={toCapabilities}>
              Explore our capabilities
            </a>
          </Reveal>
        </div>
        <Reveal className="abt-hero-visual-wrap" delay={160}>
          <HeroDiagram />
        </Reveal>
      </header>

      {/* ── B · WHO WE ARE ── */}
      <section className="section abt-who">
        <div className="abt-who-grid">
          <div className="abt-who-lead">
            <Reveal className="eyebrow">ONE ACCOUNTABLE PARTNER</Reveal>
            <Reveal as="h2" delay={70}>
              Built to connect the work that moves a business.
            </Reveal>
          </div>
          <div className="abt-who-body">
            <Reveal as="p" delay={90} className="abt-lead-p">
              Modern businesses need more than a product launch. They need software that
              can evolve, infrastructure that supports it, operations that keep work
              moving, and a clear path to market.
            </Reveal>
            <Reveal as="p" delay={140}>
              Mervix brings these disciplines together through a shared approach: understand
              the business, define the work, and execute with clear ownership. Our teams and
              specialized divisions help connect the decisions made during development with
              the realities of running and growing a business.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── C · WHAT WE DO ── */}
      <section id="capabilities" className="section abt-caps" aria-labelledby="abt-caps-h">
        <div className="section-intro">
          <Reveal className="eyebrow">OUR CAPABILITIES</Reveal>
          <Reveal as="h2" delay={70} id="abt-caps-h">From the first build to the next stage of growth.</Reveal>
        </div>
        <div className="abt-caps-list">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.num} className="abt-cap-panel" delay={i * 60}>
              <div className="abt-cap-num"><span className="text-grad">{cap.num}</span></div>
              <div className="abt-cap-main">
                <h3>{cap.title}</h3>
                <p>{cap.copy}</p>
              </div>
              <ul className="abt-cap-items">
                {cap.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── D · SPECIALIZED BRANDS (dark) ── */}
      <section className="abt-brands-band" aria-labelledby="abt-brands-h">
        <div className="section abt-brands">
          <span className="abt-glow abt-glow--green" aria-hidden="true" />
          <span className="abt-glow abt-glow--blue" aria-hidden="true" />
          <div className="abt-brands-head">
            <Reveal className="eyebrow">SPECIALIZED EXPERTISE. SHARED DIRECTION.</Reveal>
            <Reveal as="h2" delay={70} id="abt-brands-h">Distinct strengths, working together.</Reveal>
            <Reveal as="p" delay={130}>
              Our specialized brands extend Mervix&rsquo;s capabilities across software,
              infrastructure, growth, and experiences, bringing focused expertise to
              different parts of the same business journey.
            </Reveal>
          </div>
          <div className="abt-brands-list">
            {BRANDS.map((b, i) => (
              <Reveal key={b.name} className="abt-brand-row" delay={i * 80}>
                <div className="abt-brand-name">
                  <span className="abt-brand-rule" style={{ background: b.accent }} />
                  <h3 style={{ color: b.accent }}>{b.name}</h3>
                  <span className="abt-brand-focus">{b.focus}</span>
                </div>
                <div className="abt-brand-copy">
                  <p className="abt-brand-tagline">{b.tagline}</p>
                  <p>{b.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── E · HOW WE WORK ── */}
      <section className="section abt-work" aria-labelledby="abt-work-h">
        <div className="section-intro">
          <Reveal className="eyebrow">STRUCTURED EXECUTION</Reveal>
          <Reveal as="h2" delay={70} id="abt-work-h">Clear priorities. Connected teams. Accountable delivery.</Reveal>
        </div>
        <ol className="abt-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} as="li" className="abt-step" delay={i * 70}>
              <span className="abt-step-num">{s.num}</span>
              <div className="abt-step-body">
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── F · MORTGAGE OPERATIONS SPOTLIGHT ── */}
      <section className="section abt-mortgage" aria-labelledby="abt-mortgage-h">
        <div className="abt-mortgage-panel">
          <div className="abt-mortgage-copy">
            <Reveal className="eyebrow">US MORTGAGE PROCESS SUPPORT</Reveal>
            <Reveal as="h2" delay={70} id="abt-mortgage-h">Operational support for detail-intensive workflows.</Reveal>
            <Reveal as="p" delay={130}>
              Alongside digital engineering, Mervix supports the operational work behind US
              mortgage processes. We assist lenders, brokers, and financial institutions with
              mortgage processing, underwriting support, loan coordination, document
              verification, quality control, and back-office operations.
            </Reveal>
            <Reveal as="p" delay={170}>
              Our role is to support client teams with organized execution and coordination
              across the work they entrust to us.
            </Reveal>
          </div>
          <Reveal className="abt-mortgage-side" delay={120}>
            <span className="abt-mortgage-side-label">Where we help</span>
            <ul className="abt-mortgage-services">
              {MORTGAGE_SERVICES.map((m) => (
                <li key={m}><span className="abt-tick" aria-hidden="true" />{m}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── G · OUR PRINCIPLES ── */}
      <section className="section abt-principles" aria-labelledby="abt-principles-h">
        <div className="section-intro">
          <Reveal className="eyebrow">WHAT GUIDES THE WORK</Reveal>
          <Reveal as="h2" delay={70} id="abt-principles-h">Built for lasting business value.</Reveal>
        </div>
        <div className="abt-principles-grid">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} className="abt-principle" delay={i * 60}>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── H · FINAL CTA ── */}
      <section className="section abt-cta">
        <div className="abt-cta-panel">
          <span className="abt-glow abt-glow--green" aria-hidden="true" />
          <span className="abt-glow abt-glow--blue" aria-hidden="true" />
          <Reveal as="h2">What does your next stage need?</Reveal>
          <Reveal as="p" delay={80}>
            A new platform, stronger infrastructure, operational support, or a clearer route
            to market — tell us what you&rsquo;re working toward.
          </Reveal>
          <Reveal className="abt-cta-actions" delay={140}>
            <Link to="/contact" className="btn btn-primary" onClick={() => track('contact_click', { location: 'about_cta' })}>
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="abt-cta-mail" onClick={() => track('generate_lead', { method: 'email', content_type: 'about_cta' })}>
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
