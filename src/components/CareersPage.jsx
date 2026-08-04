import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';
import { openRoles, companies, careerTags, CONTACT_EMAIL } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { spotlight } from '../lib/spotlight.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));

function applyMailto(role) {
  const subject = encodeURIComponent(`Application: ${role.title} (${role.company})`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

export default function CareersPage() {
  usePageMeta('Careers', 'Open roles across GeoLink, SkoutHaus, SkoutsMedia, and CoreCyrus — join a team building SaaS, AI, infrastructure, and digital products.');
  const departments = [...new Set(openRoles.map((r) => r.dept))];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />

      <Nav />

      <section className="section careers-page-head">
        <Reveal className="eyebrow">CAREERS</Reveal>
        <Reveal as="h1" delay={80}>Build the future with us.</Reveal>
        <Reveal as="p" delay={140}>
          Engineers, designers, marketers, and operators — across four companies
          and every layer of technology. If you like hard problems and good
          people, we should talk.
        </Reveal>
        <Reveal className="careers-page-tags" delay={200}>
          {careerTags.map((t) => <span key={t}>{t}</span>)}
        </Reveal>
        <Reveal className="careers-stats" delay={260}>
          <div className="case-stat">
            <CountUp value={String(openRoles.length)} className="case-stat-value text-grad" />
            <div className="case-stat-label">Open roles</div>
          </div>
          <div className="case-stat">
            <CountUp value={String(departments.length)} className="case-stat-value text-grad" />
            <div className="case-stat-label">Departments hiring</div>
          </div>
          <div className="case-stat">
            <CountUp value={String(companies.length)} className="case-stat-value text-grad" />
            <div className="case-stat-label">Companies</div>
          </div>
        </Reveal>
      </section>

      <section className="section roles-section">
        {departments.map((dept) => (
          <div key={dept} className="roles-group">
            <h3 className="roles-group-title">{dept}</h3>
            <div className="roles-list">
              {openRoles.filter((r) => r.dept === dept).map((role) => {
                const c = companyByName[role.company];
                return (
                  <Reveal key={role.title} as="div" className="role-card" onMouseMove={spotlight}>
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
                    <a
                      href={applyMailto(role)}
                      className="btn btn-ghost btn-sm"
                      onClick={() => track('generate_lead', { method: 'email', content_type: 'role', item_id: role.title })}
                    >
                      Apply <span>→</span>
                    </a>
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
