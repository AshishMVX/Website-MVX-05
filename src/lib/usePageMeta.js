import { useEffect } from 'react';

const DEFAULT_TITLE = 'Mervix Group — Global SaaS, AI & Technology Company';
const DEFAULT_DESCRIPTION = "Mervix Group is a global technology house uniting four specialist companies across SaaS development, applied AI, cloud infrastructure, and digital marketing — one partner for the entire stack.";
const BASE_URL = 'https://mervixtechnology.com';

/** Ensures a single <link rel="canonical"> exists and returns it. */
function ensureCanonicalEl() {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  return el;
}

/** Sets the content of a meta tag if it exists (the og and twitter tags live in index.html). */
function setMeta(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

/**
 * Sets the document title + meta description for the active page, keeps the
 * Open Graph / Twitter title + description in sync, and — when a `canonicalPath`
 * is given (e.g. "/about-us") — the canonical URL. Pass `exactTitle: true` in
 * the options to use `title` verbatim (no "— Mervix Group" suffix). Resets
 * title/description/social tags on unmount.
 */
export function usePageMeta(title, description, canonicalPath, options = {}) {
  const { exactTitle = false } = options;
  useEffect(() => {
    const fullTitle = title ? (exactTitle ? title : `${title} — Mervix Group`) : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;

    document.title = fullTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);

    if (canonicalPath) {
      ensureCanonicalEl().setAttribute('href', `${BASE_URL}${canonicalPath}`);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', DEFAULT_TITLE);
      setMeta('meta[property="og:description"]', DEFAULT_DESCRIPTION);
      setMeta('meta[name="twitter:title"]', DEFAULT_TITLE);
      setMeta('meta[name="twitter:description"]', DEFAULT_DESCRIPTION);
    };
  }, [title, description, canonicalPath, exactTitle]);
}
