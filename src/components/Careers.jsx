import Reveal from './Reveal.jsx';
import { careerTags } from '../data/content.js';
import { track } from '../lib/analytics.js';
import { Link } from '../lib/router.jsx';

export default function Careers() {
  return (
    <section id="careers" className="careers">
      <Reveal className="careers-panel">
        <div className="glow blue" />
        <div className="glow green" />
        <div className="careers-copy">
          <div className="eyebrow">CAREERS</div>
          <h2>Build the future with us.</h2>
          <p>
            Engineers, designers, marketers, and operators — across four companies
            and every layer of technology. If you like hard problems and good
            people, we should talk.
          </p>
        </div>
        <div className="careers-side">
          <div className="careers-tags">
            {careerTags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <Link
            to="/careers"
            className="btn btn-light"
            onClick={() => track('select_content', { content_type: 'careers' })}
          >
            View open roles <span>→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
