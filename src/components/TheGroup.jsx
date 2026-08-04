import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import { companies } from '../data/content.js';
import { track } from '../lib/analytics.js';

/** Converts a hex color to a 10%-alpha rgba for the chip background. */
function tint(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},0.1)`;
}

export default function TheGroup() {
  return (
    <section id="group" className="group-band">
      <div className="section">
        <div className="group-head">
          <div>
            <Reveal className="eyebrow">THE GROUP</Reveal>
            <Reveal as="h2" delay={80}>Four specialist companies, one combined force.</Reveal>
          </div>
          <Reveal as="p" delay={140}>
            Each sister company is a leader in its field. Together, they deliver
            outcomes no single firm could.
          </Reveal>
        </div>

        <div className="group-grid">
          {companies.map((c, i) => (
            <Reveal
              key={c.name}
              as={Link}
              to="/contact"
              className="group-card lift"
              delay={i * 90}
              onClick={() => track('select_content', { content_type: 'company', item_id: c.name })}
            >
              <div className="bar" style={{ background: c.bar }} />
              <div className="row">
                <span className="chip" style={{ color: c.color, background: tint(c.color) }}>{c.chip}</span>
                <span className="arrow">↗</span>
              </div>
              <h3>{c.name}</h3>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
