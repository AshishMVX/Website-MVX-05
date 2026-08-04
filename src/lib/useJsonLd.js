import { useEffect } from 'react';

/** Injects a page-specific JSON-LD <script> into <head>, removed on unmount. */
export function useJsonLd(data) {
  useEffect(() => {
    if (!data) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, [data]);
}
