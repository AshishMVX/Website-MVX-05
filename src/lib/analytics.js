/** GA4 event helper — no-ops if gtag isn't loaded. */
export function track(name, params = {}) {
  if (window.gtag) window.gtag('event', name, params);
}
