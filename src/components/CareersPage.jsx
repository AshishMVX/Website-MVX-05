import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';
import { Link } from '../lib/router.jsx';
import { openRoles, companies, careerTags } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { spotlight } from '../lib/spotlight.js';
import { CONTACT_EMAIL } from '../data/content.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));

export default function CareersPage() {
  usePageMeta('Careers', 'Open roles across GeoLink, SkoutHaus, SkoutsMedia, and CoreCyrus — join a team building SaaS, AI, infrastructure, and digital products.');
  const departments = [...new Set(openRoles.map((r) => r.dept))];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      <div className="page-hero">
        <div className="page-hero-copy">
          <Reveal className="eyebrow">CAREERS</Reveal>
          <Reveal as="h1" delay={60}>Build the future with us.</Reveal>
          <Reveal as="p" delay={120}>
            Engineers, designers, marketers, and operators — across four companies
            and every layer of technology. If you like hard problems and good
            people, we should talk.
          </Reveal>
          <Reveal className="page-hero-tags-row" delay={180}>
            {careerTags.map((t) => <span key={t}>{t}</span>)}
          </Reveal>
        </div>

        <Reveal className="page-hero-aside" delay={140}>
          <div className="page-hero-stat-row page-hero-stat-row--3">
            <div className="page-hero-stat">
              <CountUp value={String(openRoles.length)} className="page-hero-stat-num text-grad" />
              <span className="page-hero-stat-label">Open roles</span>
            </div>
            <div className="page-hero-stat">
              <CountUp value={String(departments.length)} className="page-hero-stat-num text-grad" />
              <span className="page-hero-stat-label">Departments</span>
            </div>
            <div className="page-hero-stat">
              <CountUp value={String(companies.length)} className="page-hero-stat-num text-grad" />
              <span className="page-hero-stat-label">Companies</span>
            </div>
          </div>
          <div className="page-hero-aside-divider" />
          <div className="page-hero-aside-tags">
            {companies.map((c) => (
              <span key={c.name} className="page-hero-aside-tag" style={{ color: c.color, borderColor: `${c.color}50` }}>
                {c.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <section className="section roles-section">
        {departments.map((dept) => (
          <div key={dept} className="roles-group">
            <h3 className="roles-group-title">{dept}</h3>
            <div className="roles-list">
              {openRoles.filter((r) => r.dept === dept).map((role) => {
                const c = companyByName[role.company];
                return (
                  <Reveal key={role.title} as="div" className="role-card role-card--link" onMouseMove={spotlight}>
                    <Link to={`/careers/${role.slug}`} className="role-card-link-area">
                      <div className="role-main">
                        <span className="chip" style={{ color: c?.color, background: `${c?.color}1A` }}>
                          {role.company}
                        </span>
                        <h4>{role.title}</h4>
                        <div className="role-meta">
                          <span>{role.location}</span>
                          <span>·</span>
                          <span>{role.type}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="role-card-actions">
                      <Link to={`/careers/${role.slug}`} className="btn btn-ghost btn-sm">
                        View role <span>→</span>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}

        <Reveal className="roles-fallback">
          <p>
            Don't see the right role listed? We're always glad to hear from
            good people. <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => track('generate_lead', { method: 'email', content_type: 'careers_general' })}>
              Reach out anyway
            </a>.
          </p>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
