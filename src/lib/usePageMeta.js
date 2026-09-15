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

/**
 * Sets the document title + meta description for the active page, and — when a
 * `canonicalPath` is given (e.g. "/privacy-policy") — the canonical URL. Resets
 * title/description on unmount; the canonical link is left pointing at the last
 * active route so a direct load always has one.
 */
export function usePageMeta(title, description, canonicalPath) {
  useEffect(() => {
    document.title = title ? `${title} — Mervix Group` : DEFAULT_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || DEFAULT_DESCRIPTION);

    if (canonicalPath) {
      ensureCanonicalEl().setAttribute('href', `${BASE_URL}${canonicalPath}`);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description, canonicalPath]);
}
