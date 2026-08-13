import { useState } from 'react';
import Nav from './Nav.jsx';
import Mesh from './Mesh.jsx';
import Footer from './Footer.jsx';
import Reveal from './Reveal.jsx';
import { Link } from '../lib/router.jsx';
import {
  CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, OFFICE, SOCIAL_LINKS,
  SERVICE_OPTIONS, BUDGET_OPTIONS, COUNTRY_OPTIONS,
} from '../data/content.js';
import { track } from '../lib/analytics.js';
import { usePageMeta } from '../lib/usePageMeta.js';

const FORMSPREE_URL = 'https://formspree.io/f/xdenejvq';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FIELDS = {
  name: '', company: '', email: '', phone: '', country: '', service: '', budget: '', message: '', agree: false,
};

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = "That email doesn't look right.";
  if (!fields.phone.trim()) errors.phone = 'Please enter your phone number.';
  if (!fields.country) errors.country = 'Please select your country.';
  if (!fields.service) errors.service = 'Let us know what you need.';
  if (!fields.budget) errors.budget = 'Please select a budget range.';
  if (!fields.message.trim()) errors.message = 'Tell us a bit about your project.';
  if (!fields.agree) errors.agree = 'Please accept the privacy policy to continue.';
  return errors;
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function ContactPage() {
  usePageMeta('Contact', 'Get in touch with Mervix Group — call, email, chat, or send us a message about your project.');
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    // Clear field error on change
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
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
          _subject: 'New Contact Form Submission - Mervix',
          name: fields.name,
          company: fields.company || '—',
          email: fields.email,
          phone: fields.phone,
          country: fields.country,
          service: fields.service,
          budget: fields.budget,
          message: fields.message,
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
  const chatHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Quick chat request')}`;
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
            Call, email, or send us a message — whichever's easiest. The right team
            across GeoLink, SkoutHaus, SkoutsMedia, or CoreCyrus will get back to you.
          </Reveal>
        </div>
        <Reveal className="page-hero-aside" delay={140}>
          <span className="page-hero-aside-label">Reach us directly</span>
          <div className="page-hero-aside-meta">
            <div className="page-hero-aside-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
              {CONTACT_EMAIL}
            </div>
            <div className="page-hero-aside-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {CONTACT_PHONE_DISPLAY}
            </div>
            <div className="page-hero-aside-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Coimbatore, India
            </div>
          </div>
          <div className="page-hero-aside-divider" />
          <div className="page-hero-aside-meta-item" style={{ fontSize: 13, color: 'var(--ink-4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Mon – Fri &nbsp;·&nbsp; 6:30 PM – 3:30 AM IST
          </div>
        </Reveal>
      </div>

      <section className="section contact-options-section">
        <div className="contact-options">
          <Reveal className="contact-option-card" delay={0}>
            <div className="contact-option-icon"><PhoneIcon /></div>
            <h3>Call us</h3>
            <p className="contact-option-value">{CONTACT_PHONE_DISPLAY}</p>
            <span className="contact-option-note">Placeholder — real number coming soon</span>
          </Reveal>
          <Reveal className="contact-option-card" delay={90}>
            <div className="contact-option-icon"><MailIcon /></div>
            <h3>Email us</h3>
            <a
              href={emailHref}
              className="contact-option-value contact-option-link"
              onClick={() => track('generate_lead', { method: 'email', content_type: 'contact_options_email' })}
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
          <Reveal className="contact-option-card" delay={180}>
            <div className="contact-option-icon"><ChatIcon /></div>
            <h3>Chat with us</h3>
            <a
              href={chatHref}
              className="contact-option-value contact-option-link"
              onClick={() => track('generate_lead', { method: 'email', content_type: 'contact_options_chat' })}
            >
              Start a conversation
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section contact-page-grid">
        <Reveal className="contact-page-form-wrap">
          <h2>Send us a message</h2>
          <form className="contact-form contact-page-form" onSubmit={handleSubmit} noValidate>
            {/* Hidden Formspree subject line */}
            <input type="hidden" name="_subject" value="New Contact Form Submission - Mervix" />

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
                <label htmlFor="c-phone">Phone</label>
                <input
                  id="c-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={update('phone')}
                  aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'c-phone-err' : undefined}
                />
                {errors.phone && <span className="form-error" id="c-phone-err">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-country">Country</label>
                <select
                  id="c-country" value={fields.country} onChange={update('country')}
                  aria-invalid={!!errors.country} aria-describedby={errors.country ? 'c-country-err' : undefined}
                >
                  <option value="">Select a country</option>
                  {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <span className="form-error" id="c-country-err">{errors.country}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="c-service">Service</label>
                <select
                  id="c-service" value={fields.service} onChange={update('service')}
                  aria-invalid={!!errors.service} aria-describedby={errors.service ? 'c-service-err' : undefined}
                >
                  <option value="">What do you need?</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <span className="form-error" id="c-service-err">{errors.service}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="c-budget">Budget</label>
              <select
                id="c-budget" value={fields.budget} onChange={update('budget')}
                aria-invalid={!!errors.budget} aria-describedby={errors.budget ? 'c-budget-err' : undefined}
              >
                <option value="">Select a range</option>
                {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.budget && <span className="form-error" id="c-budget-err">{errors.budget}</span>}
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
                Something went wrong. Please try again or email us directly at {CONTACT_EMAIL}.
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
          </div>

          <div className="hours-card">
            <h3>Business hours</h3>
            {OFFICE.hours.map((h) => (
              <div key={h.days} className="hours-row">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>

          <div className="social-card">
            <h3>Follow along</h3>
            <div className="social-links">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name} href="#" title={`Placeholder — add your ${s.name} URL`}
                  onClick={(e) => e.preventDefault()} className="social-link"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
