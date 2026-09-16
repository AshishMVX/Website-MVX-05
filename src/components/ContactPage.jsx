import { useState } from 'react';
import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link, useRoute } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, PHONE_AVAILABLE,
  OFFICE, SOCIAL_LINKS, SERVICE_OPTIONS, BUDGET_OPTIONS, COUNTRY_OPTIONS, CONTACT_TOPICS,
} from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';

const FORMSPREE_URL = 'https://formspree.io/f/xdenejvq';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FIELDS = {
  name: '', company: '', email: '', phone: '', country: '',
  topic: '', service: '', budget: '', reference: '', message: '',
  agree: false, marketing: false,
};

// Only genuinely necessary fields are required; the rest are optional so the
// form suits support, billing and privacy requests as well as sales enquiries.
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = "That email doesn't look right.";
  if (!fields.topic) errors.topic = 'Please choose what your message is about.';
  if (!fields.message.trim()) errors.message = 'Tell us a bit about how we can help.';
  if (!fields.agree) errors.agree = 'Please accept the privacy policy to continue.';
  return errors;
}

const SOCIAL_WITH_URLS = SOCIAL_LINKS.filter((s) => s.url);

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function ContactPage() {
  usePageMeta(
    'Contact Us',
    'Contact Mervix Technology Pvt Ltd — sales and project enquiries, service support, billing, cancellations, digital delivery and privacy requests.',
    '/contact',
  );
  const { scrollToHash } = useRoute();
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  const goToForm = (e) => {
    e.preventDefault();
    scrollToHash('#contact-form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New enquiry (${fields.topic}) — Mervix`,
          name: fields.name,
          company: fields.company || '—',
          email: fields.email,
          phone: fields.phone || '—',
          country: fields.country || '—',
          topic: fields.topic,
          service: fields.service || '—',
          budget: fields.budget || '—',
          reference: fields.reference || '—',
          message: fields.message,
          marketing_opt_in: fields.marketing ? 'Yes' : 'No',
        }),
      });
      if (res.ok) {
        track('generate_lead', { method: 'formspree', content_type: 'contact_page_form' });
        setStatus('success');
        setFields(INITIAL_FIELDS);
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const emailHref = `mailto:${CONTACT_EMAIL}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE.mapQuery)}&output=embed`;

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Mesh />
      <Nav />

      <div className="page-hero">
        <div className="page-hero-copy">
          <Reveal className="eyebrow">CONTACT</Reveal>
          <Reveal as="h1" delay={60}>Let's talk about what you're building.</Reveal>
          <Reveal as="p" delay={120}>
            Whether it's a new project, support for a service you already use, a
            billing question, or a privacy request — send us a message and the
            right team at Mervix will get back to you.
          </Reveal>
        </div>
        <Reveal className="page-hero-aside" delay={140}>
          <span className="page-hero-aside-label">Reach us directly</span>
          <div className="page-hero-aside-meta">
            <a className="page-hero-aside-meta-item" href={emailHref}>
              <MailIcon />
              {CONTACT_EMAIL}
            </a>
            {PHONE_AVAILABLE && (
              <a className="page-hero-aside-meta-item" href={CONTACT_PHONE_HREF}>
                <PhoneIcon />
                {CONTACT_PHONE_DISPLAY}
              </a>
            )}
            <div className="page-hero-aside-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Coimbatore, India
            </div>
          </div>
          <div className="page-hero-aside-divider" />
          <div className="page-hero-aside-hours">
            <div className="page-hero-aside-meta-item" style={{ fontSize: 13, color: 'var(--ink-4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Mon – Fri &nbsp;·&nbsp; 6:30 PM – 3:30 AM IST (overnight)
            </div>
            <div className="page-hero-aside-meta-item" style={{ fontSize: 13, color: 'var(--ink-4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              1st &amp; 3rd Sat &nbsp;·&nbsp; 2:00 PM – 8:00 PM IST
            </div>
          </div>
        </Reveal>
      </div>

      <section className="section contact-options-section">
        <div className="contact-options">
          <Reveal className="contact-option-card" delay={0}>
            <div className="contact-option-icon"><MailIcon /></div>
            <h3>Email us</h3>
            <a
              href={emailHref}
              className="contact-option-value contact-option-link"
              onClick={() => track('generate_lead', { method: 'email', content_type: 'contact_options_email' })}
            >
              {CONTACT_EMAIL}
            </a>
            <span className="contact-option-note">Sales, support, billing and privacy — one inbox, routed to the right team.</span>
          </Reveal>
          {PHONE_AVAILABLE && (
            <Reveal className="contact-option-card" delay={90}>
              <div className="contact-option-icon"><PhoneIcon /></div>
              <h3>Call us</h3>
              <a href={CONTACT_PHONE_HREF} className="contact-option-value contact-option-link">
                {CONTACT_PHONE_DISPLAY}
              </a>
              <span className="contact-option-note">Mon – Fri, 6:30 PM – 3:30 AM IST (overnight)</span>
            </Reveal>
          )}
          <Reveal className="contact-option-card" delay={PHONE_AVAILABLE ? 180 : 90}>
            <div className="contact-option-icon"><MessageIcon /></div>
            <h3>Send a message</h3>
            <a href="#contact-form" className="contact-option-value contact-option-link" onClick={goToForm}>
              Use the form below
            </a>
            <span className="contact-option-note">Tell us what you need and add an order reference if it's about an order.</span>
          </Reveal>
        </div>
      </section>

      <section className="section contact-page-grid">
        <Reveal className="contact-page-form-wrap">
          <h2 id="contact-form">Send us a message</h2>
          <p className="contact-form-intro">
            Choose what your message is about so we can route it to the right team.
            Fields marked optional can be left blank.
          </p>
          <form className="contact-form contact-page-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name" type="text" autoComplete="name" value={fields.name} onChange={update('name')}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined}
                />
                {errors.name && <span className="form-error" id="c-name-err">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="c-company">Company <span className="optional">(optional)</span></label>
                <input id="c-company" type="text" autoComplete="organization" value={fields.company} onChange={update('company')} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email" type="email" autoComplete="email" value={fields.email} onChange={update('email')}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined}
                />
                {errors.email && <span className="form-error" id="c-email-err">{errors.email}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="c-phone">Phone <span className="optional">(optional)</span></label>
                <input id="c-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={update('phone')} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-topic">What's this about?</label>
                <select
                  id="c-topic" value={fields.topic} onChange={update('topic')}
                  aria-invalid={!!errors.topic} aria-describedby={errors.topic ? 'c-topic-err' : undefined}
                >
                  <option value="">Select a category</option>
                  {CONTACT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.topic && <span className="form-error" id="c-topic-err">{errors.topic}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="c-country">Country <span className="optional">(optional)</span></label>
                <select id="c-country" value={fields.country} onChange={update('country')}>
                  <option value="">Select a country</option>
                  {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-service">Service <span className="optional">(optional)</span></label>
                <select id="c-service" value={fields.service} onChange={update('service')}>
                  <option value="">Which area?</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="c-budget">Budget <span className="optional">(optional)</span></label>
                <select id="c-budget" value={fields.budget} onChange={update('budget')}>
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="c-reference">
                Order / payment reference <span className="optional">(optional)</span>
              </label>
              <input id="c-reference" type="text" value={fields.reference} onChange={update('reference')} />
              <span className="form-hint">
                Helpful for billing, cancellation, refund or delivery questions — add
                your invoice or payment reference if you have one. Please don't include
                passwords, OTPs, CVV or full card numbers.
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message" rows={4} value={fields.message} onChange={update('message')}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined}
              />
              {errors.message && <span className="form-error" id="c-message-err">{errors.message}</span>}
            </div>

            <label className="form-checkbox">
              <input
                type="checkbox" checked={fields.agree} onChange={update('agree')}
                aria-invalid={!!errors.agree} aria-describedby={errors.agree ? 'c-agree-err' : undefined}
              />
              <span>
                I agree to the <Link to="/privacy-policy">Privacy Policy</Link> and consent to being
                contacted about my enquiry.
              </span>
            </label>
            {errors.agree && <span className="form-error" id="c-agree-err">{errors.agree}</span>}

            <label className="form-checkbox">
              <input type="checkbox" checked={fields.marketing} onChange={update('marketing')} />
              <span>
                <span className="optional">(Optional)</span> I'd also like to receive occasional updates
                and marketing from Mervix. You can unsubscribe at any time.
              </span>
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send message <span style={{ fontSize: 18 }}>→</span></>}
            </button>

            {status === 'success' && (
              <p className="form-sent form-status-success">
                ✓ Message sent — we'll be in touch shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status-error">
                Something went wrong. Please try again, or email us directly at{' '}
                <a href={emailHref}>{CONTACT_EMAIL}</a>.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal className="contact-side" delay={120}>
          <div className="office-card">
            <h3>Our office</h3>
            <p>{OFFICE.line1}</p>
            <p>{OFFICE.line2}</p>
            <div className="office-map">
              <iframe title="Office location" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <p className="office-map-note">
              The map above is embedded from Google Maps, which loads content from
              Google when this page opens. See our{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>

          <div className="hours-card">
            <h3>Business hours</h3>
            {OFFICE.hours.map((h) => (
              <div key={h.days} className="hours-row">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </div>
            ))}
            <p className="hours-note">{OFFICE.hoursNote}</p>
          </div>

          {SOCIAL_WITH_URLS.length > 0 && (
            <div className="social-card">
              <h3>Follow along</h3>
              <div className="social-links">
                {SOCIAL_WITH_URLS.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
