import { useEffect } from 'react';

const DEFAULT_TITLE = 'Mervix Group — Global SaaS, AI & Technology Company';
const DEFAULT_DESCRIPTION = "Mervix Group is a global technology house uniting four specialist companies across SaaS development, applied AI, cloud infrastructure, and digital marketing — one partner for the entire stack.";

/** Sets the document title + meta description for the active page, resetting on unmount. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — Mervix Group` : DEFAULT_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || DEFAULT_DESCRIPTION);
    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
