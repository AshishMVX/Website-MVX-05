import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/** Splits "~2,000+" / "99.98%" / "10x" into { prefix, value, decimals, hasComma, suffix }. */
function parseValue(raw) {
  const match = String(raw).match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  const hasComma = numStr.includes(',');
  const value = parseFloat(numStr.replace(/,/g, ''));
  if (Number.isNaN(value)) return null;
  return { prefix, suffix, value, decimals, hasComma };
}

function format(n, decimals, hasComma) {
  const fixed = n.toFixed(decimals);
  if (!hasComma) return fixed;
  const [int, dec] = fixed.split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${withCommas}.${dec}` : withCommas;
}

/**
 * Animates a stat string (e.g. "10x", "99.98%", "2,000+") counting up from 0
 * once it scrolls into view. Falls back to rendering the raw string as-is.
 */
export default function CountUp({ value, duration = 1400, className }) {
  const ref = useRef(null);
  const parsed = parseValue(value);
  const reduceMotion = prefersReducedMotion();
  const [display, setDisplay] = useState(
    parsed ? format(reduceMotion ? parsed.value : 0, parsed.decimals, parsed.hasComma) : value
  );

  useEffect(() => {
    if (!parsed || reduceMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(parsed.value * eased, parsed.decimals, parsed.hasComma));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parsed) return <span ref={ref} className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {parsed.prefix}{display}{parsed.suffix}
    </span>
  );
}
