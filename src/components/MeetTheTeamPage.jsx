import { useState } from 'react';
import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { team, companies, CONTACT_EMAIL } from '../data/content.js';
import { usePageMeta } from '../lib/usePageMeta.js';
import { Link } from '../lib/router.jsx';
import { spotlight } from '../lib/spotlight.js';

const TEAM_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=480&h=640&fit=crop&crop=face&auto=format',
];

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));
const GROUP = { color: '#2B7FD4', bar: 'linear-gradient(90deg,#2FA84F,#1E9C8C,#2B7FD4)' };

const teamWithPhotos = team.map((member, i) => ({
  ...member,
  image: TEAM_PHOTOS[i % TEAM_PHOTOS.length],
  colorData: member.company === 'Mervix Group' ? GROUP : companyByName[member.company],
}));

const FILTERS = ['All', 'Mervix Group', ...companies.map((c) => c.name)];

export default function MeetTheTeamPage() {
  usePageMeta(
    'Meet the Team',
    'The leadership behind Mervix Group and our four companies — engineering, design, growth, and infrastructure.',
  );

  const [active, setActive] = useState('All');

  const visible =
    active === 'All'
      ? teamWithPhotos
      : teamWithPhotos.filter((m) => m.company === active);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      {/* ── Hero ── */}
      <section className="section mtt-hero">
        <Reveal className="eyebrow">LEADERSHIP</Reveal>

        <Reveal as="h1" delay={70} className="mtt-headline">
          The people who<br />build and lead.
        </Reveal>

        <Reveal as="p" delay={140} className="mtt-subhead">
          Leadership across Mervix Group and all four companies — engineering,
          design, growth, and infrastructure.
        </Reveal>

        <Reveal className="mtt-stats-row" delay={200}>
          <div className="mtt-stat">
            <span className="mtt-stat-num text-grad">{team.length}</span>
            <span className="mtt-stat-label">Leaders</span>
          </div>
          <div className="mtt-stat-sep" />
          <div className="mtt-stat">
            <span className="mtt-stat-num text-grad">{companies.length}</span>
            <span className="mtt-stat-label">Companies</span>
          </div>
          <div className="mtt-stat-sep" />
          <div className="mtt-stat">
            <span className="mtt-stat-num text-grad">1</span>
            <span className="mtt-stat-label">Group</span>
          </div>
        </Reveal>
      </section>

      {/* ── Filter ── */}
      <div className="mtt-filter-wrap">
        <div className="mtt-filter-inner">
          <div className="mtt-filter-bar">
            {FILTERS.map((f) => {
              const c = companyByName[f];
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  className={`mtt-filter-btn${isActive ? ' mtt-filter-btn--active' : ''}`}
                  style={
                    isActive && c
                      ? { background: c.color, borderColor: c.color }
                      : undefined
                  }
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <span className="mtt-count">
            {visible.length} {visible.length === 1 ? 'leader' : 'leaders'}
          </span>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section mtt-grid-section">
        <div className="mtt-grid">
          {visible.map((member, i) => (
            <Reveal
              key={member.role}
              as="div"
              className="mtt-card"
              delay={Math.min(i * 55, 300)}
              onMouseMove={spotlight}
            >
              {/* company accent bar */}
              <div className="mtt-card-bar" style={{ background: member.colorData?.bar }} />

              {/* photo */}
              <img
                src={member.image}
                alt={member.role}
                className="mtt-card-photo"
                loading="lazy"
              />

              {/* bottom overlay */}
              <div className="mtt-card-overlay">
                <span
                  className="mtt-card-co"
                  style={{ color: member.colorData?.color }}
                >
                  {member.company}
                </span>
                <h3 className="mtt-card-name">{member.name}</h3>
                <p className="mtt-card-role">{member.role}</p>
                <p className="mtt-card-focus">{member.focus}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="section mtt-join-section">
        <Reveal className="mtt-join-panel">
          <div className="mtt-join-glow mtt-join-glow--blue" />
          <div className="mtt-join-glow mtt-join-glow--green" />
          <div className="mtt-join-body">
            <span className="eyebrow" style={{ color: '#5FD08C' }}>JOIN THE TEAM</span>
            <h2 className="mtt-join-heading">Build something real with us.</h2>
            <p className="mtt-join-sub">
              We're growing across all four companies. Engineers, designers,
              marketers, and operators — if you like hard problems and good
              people, we'd like to hear from you.
            </p>
          </div>
          <div className="mtt-join-actions">
            <Link to="/careers" className="btn btn-light">
              See open roles →
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mtt-join-email"
            >
              or reach out directly
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
