import { useState } from 'react';
import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import { Link } from '../lib/router.jsx';
import { openRoles, companies } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));

function IconLocation() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

export default function JobDetailPage({ slug }) {
  const role = openRoles.find((r) => r.slug === slug);
  const [copied, setCopied] = useState(false);

  usePageMeta(
    role ? `${role.title} — ${role.company}` : 'Role not found',
    role?.summary,
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!role) {
    return (
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Mesh />
        <Nav />
        <section className="section legal">
          <h1>Role not found</h1>
          <p style={{ marginTop: 16 }}>
            <Link to="/careers">← Back to careers</Link>
          </p>
        </section>
        <Footer />
      </div>
    );
  }

  const c = companyByName[role.company];
  const { jd } = role;
  const hasApplyUrl = Boolean(role.applyUrl);

  const ApplyButton = ({ label, className }) =>
    hasApplyUrl ? (
      <a
        href={role.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => track('generate_lead', { method: 'form', content_type: 'role', item_id: role.jobId })}
      >
        {label} <span>→</span>
      </a>
    ) : (
      <button className={`${className} job-apply-disabled`} disabled type="button" title="Application form coming soon">
        {label} <span>→</span>
      </button>
    );

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <ScrollProgress />
      <Mesh />
      <Nav />

      {/* ── Hero ── */}
      <div className="page-hero page-hero--job">
        {/* Left — title + summary + actions */}
        <div className="page-hero-copy">
          <Reveal as="div" className="page-back">
            <Link to="/careers">← Back to careers</Link>
          </Reveal>
          <Reveal className="eyebrow" delay={40}>
            {role.company.toUpperCase()} · {role.dept.toUpperCase()}
          </Reveal>
          <Reveal as="h1" delay={80}>{role.title}</Reveal>
          <Reveal as="p" delay={120}>{role.summary}</Reveal>
          <Reveal className="job-actions" delay={180}>
            <ApplyButton label="Apply Now" className="btn btn-primary" />
            <button className="btn btn-ghost job-share-btn" onClick={handleShare} type="button">
              <IconShare />
              {copied ? 'Link copied!' : 'Share'}
            </button>
          </Reveal>
        </div>

        {/* Right — role details card */}
        <Reveal className="page-hero-aside job-detail-aside" delay={120}>
          <span className="page-hero-aside-label">Role details</span>

          <div className="job-detail-aside-rows">
            <div className="job-detail-aside-row">
              <IconLocation />
              <div>
                <div className="job-detail-aside-row-label">Location</div>
                <div className="job-detail-aside-row-value">{role.location}</div>
              </div>
            </div>
            <div className="job-detail-aside-row">
              <IconBriefcase />
              <div>
                <div className="job-detail-aside-row-label">Employment</div>
                <div className="job-detail-aside-row-value">{role.type}</div>
              </div>
            </div>
            <div className="job-detail-aside-row">
              <IconTag />
              <div>
                <div className="job-detail-aside-row-label">Department</div>
                <div className="job-detail-aside-row-value">{role.dept}</div>
              </div>
            </div>
          </div>

          <div className="page-hero-aside-divider" />

          <div className="job-detail-aside-company">
            <span
              className="chip"
              style={{ color: c?.color, background: `${c?.color}1A` }}
            >
              {role.company}
            </span>
            <span className="job-detail-aside-jobid">Job ID: {role.jobId}</span>
          </div>

          {hasApplyUrl && (
            <>
              <div className="page-hero-aside-divider" />
              <ApplyButton label="Apply Now" className="btn btn-primary job-aside-apply-btn" />
            </>
          )}
        </Reveal>
      </div>

      {/* ── Job Description ── */}
      <section className="section job-body">
        <div className="job-body-inner">

          <Reveal as="div" className="job-section">
            <h2>About the role</h2>
            <p>{jd.about}</p>
          </Reveal>

          <Reveal as="div" className="job-section" delay={40}>
            <h2>What you'll do</h2>
            <ul className="job-list">
              {jd.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="div" className="job-section" delay={80}>
            <h2>What we're looking for</h2>
            <ul className="job-list">
              {jd.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          {jd.niceToHave?.length > 0 && (
            <Reveal as="div" className="job-section" delay={120}>
              <h2>Nice to have</h2>
              <ul className="job-list job-list--muted">
                {jd.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal as="div" className="job-section" delay={160}>
            <h2>What we offer</h2>
            <ul className="job-list">
              {jd.offer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section className="section case-cta">
        <Reveal as="h2">Ready to apply?</Reveal>
        <Reveal as="p" delay={80}>
          {hasApplyUrl
            ? 'Fill out the application form — we review every submission personally.'
            : 'The application form for this role will be live shortly. Check back soon.'}
        </Reveal>
        <Reveal delay={140}>
          <ApplyButton label={`Apply for ${role.title}`} className="btn btn-primary" />
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
