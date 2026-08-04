import Reveal from './Reveal.jsx';
import { capabilities } from '../data/content.js';

export default function WhatWeDo() {
  return (
    <section id="work" className="section">
      <div className="section-intro">
        <Reveal className="eyebrow">WHAT WE DO</Reveal>
        <Reveal as="h2" delay={80}>Capabilities that span the whole technology stack.</Reveal>
        <Reveal as="p" delay={140}>
          From the cloud platforms our customers run on, to the intelligence inside
          them, to the infrastructure underneath — Mervix operates across every layer.
        </Reveal>
      </div>
      <div className="card-grid">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.num} className="cap-card lift" delay={i * 90}>
            <div>
              <div className="cap-num text-grad">{cap.num}</div>
              <div className="cap-rule" />
            </div>
            <h3>{cap.title}</h3>
            <p>{cap.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
