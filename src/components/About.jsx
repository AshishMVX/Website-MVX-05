import Reveal from './Reveal.jsx';
import { missionCards } from '../data/content.js';

export default function About() {
  return (
    <section id="about" className="section about">
      <Reveal className="eyebrow">OUR MISSION</Reveal>
      <Reveal as="p" delay={80} className="about-mission">
        We exist to make great technology{' '}
        <span className="text-grad">accessible, connected, and built to last</span>
        {' '}— by uniting the specialists who shape every part of it.
      </Reveal>
      <div className="about-grid">
        {missionCards.map((m, i) => (
          <Reveal key={m.title} className="about-card" delay={i * 90}>
            <h4>{m.title}</h4>
            <p>{m.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
