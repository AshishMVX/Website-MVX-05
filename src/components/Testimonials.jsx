import Reveal from './Reveal.jsx';
import { testimonials } from '../data/content.js';
import { prefersReducedMotion } from '../lib/motion.js';

function TestimonialCard({ t, hidden }) {
  return (
    <div className="testimonial-card" aria-hidden={hidden || undefined}>
      <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
      <div className="testimonial-attribution">
        <span className="testimonial-name">{t.attribution}</span>
        <span className="testimonial-company">{t.company}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = prefersReducedMotion();

  return (
    <section className="testimonials-section">
      <div className="section-intro">
        <Reveal className="eyebrow">WHAT PARTNERS SAY</Reveal>
        <Reveal as="h2" delay={80}>Trusted across every layer of the stack.</Reveal>
        <Reveal as="p" className="team-placeholder-note" delay={140}>
          Sample quotes shown for illustration — swap in real testimonials when ready.
        </Reveal>
      </div>

      <div className={`testimonial-track-wrap${reduceMotion ? ' static' : ''}`}>
        <div className="testimonial-track">
          {testimonials.map((t, i) => <TestimonialCard key={`a-${i}`} t={t} />)}
          {!reduceMotion && testimonials.map((t, i) => <TestimonialCard key={`b-${i}`} t={t} hidden />)}
        </div>
      </div>
    </section>
  );
}
