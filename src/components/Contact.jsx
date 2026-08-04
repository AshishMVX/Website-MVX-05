import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import { CONTACT_EMAIL } from '../data/content.js';
import { track } from '../lib/analytics.js';

export default function Contact() {
  const lead = (content_type) => () => track('generate_lead', { method: 'email', content_type });
  return (
    <section id="contact" className="contact">
      <Reveal className="eyebrow">GET IN TOUCH</Reveal>
      <Reveal as="h2" delay={80}>Let's build something<br />that lasts.</Reveal>
      <Reveal as="p" delay={140}>
        Tell us what you're working on. Whichever layer of the stack you need,
        the right team at Mervix is ready.
      </Reveal>
      <Reveal className="contact-ctas" delay={200}>
        <Link to="/contact" className="btn btn-primary" onClick={lead('contact_teaser')}>
          Start a conversation <span style={{ fontSize: 18 }}>→</span>
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ghost" onClick={lead('contact_teaser_email')}>
          {CONTACT_EMAIL}
        </a>
      </Reveal>
    </section>
  );
}
