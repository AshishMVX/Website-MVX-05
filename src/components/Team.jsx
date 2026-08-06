import Reveal from './Reveal.jsx';
import { Marquee } from './Marquee.jsx';
import { team, companies } from '../data/content.js';
import { teamPhotos } from '../assets/teamPhotos.js';

const companyByName = Object.fromEntries(companies.map((c) => [c.name, c]));
const GROUP_BAR = 'linear-gradient(90deg,#2FA84F,#1E9C8C,#2B7FD4)';

const teamWithPhotos = team.map((member) => ({
  ...member,
  image: teamPhotos[member.name] || null,
}));

function UserStarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/>
      <path d="M8 15H7a4 4 0 0 0-4 4v2"/>
      <circle cx="10" cy="7" r="4"/>
    </svg>
  );
}

export default function Team() {
  return (
    <section id="team" className="team-marquee-section">
      <div className="team-marquee-inner">

        <div className="team-marquee-head">
          <Reveal>
            <div className="team-marquee-icon">
              <UserStarIcon />
            </div>
          </Reveal>
          <Reveal as="span" className="eyebrow" delay={40}>MEET THE TEAM</Reveal>
          <Reveal as="h2" delay={80}>The people behind the group.</Reveal>
          <Reveal as="p" delay={120} className="team-marquee-desc">
            Leadership across Mervix and all four sister companies — the talent driving every product and partnership forward.
          </Reveal>
        </div>

        <div className="team-marquee-container">
          <div className="team-marquee-fade team-marquee-fade-left" aria-hidden="true" />
          <div className="team-marquee-fade team-marquee-fade-right" aria-hidden="true" />
          <Marquee pauseOnHover>
            {teamWithPhotos.map((member) => {
              const c = member.company === 'Mervix Group' ? { bar: GROUP_BAR } : companyByName[member.company];
              return (
                <div className="team-marq-card" key={member.role}>
                  <div className="team-marq-photo-wrap">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="team-marq-photo"
                        loading="lazy"
                      />
                    ) : (
                      <div className="team-marq-photo team-marq-photo--initials" aria-label={member.name}>
                        {member.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                      </div>
                    )}
                    <div className="team-marq-overlay">
                      <span className="team-marq-name">{member.name}</span>
                      <span className="team-marq-role-text">{member.role}</span>
                    </div>
                  </div>
                  <div className="team-marq-bar" style={{ background: c?.bar }} />
                </div>
              );
            })}
          </Marquee>
        </div>

        <div className="team-marquee-quote">
          <Reveal>
            <p className="team-marq-quote-text">
              "We built Mervix to bring the best of engineering, design, and growth under one roof — so our clients never have to choose between quality and speed."
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="team-marq-quoter">
              <div className="team-marq-quoter-avatar">
                {teamPhotos['Kavireshi T S'] ? (
                  <img src={teamPhotos['Kavireshi T S']} alt="Founder &amp; CEO" />
                ) : (
                  <div className="team-marq-photo--initials" style={{ width: '100%', height: '100%', fontSize: '1rem' }}>KT</div>
                )}
              </div>
              <div>
                <p className="team-marq-quoter-name">Founder &amp; CEO</p>
                <p className="team-marq-quoter-title">Mervix Group</p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
