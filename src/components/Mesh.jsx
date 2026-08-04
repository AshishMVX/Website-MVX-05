import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/**
 * Ambient gradient-blob background. Each blob drifts idly via CSS keyframes
 * and additionally parallaxes at its own rate as the page scrolls, using the
 * standalone CSS `translate` property so it composes with the keyframe's
 * `transform` instead of overriding it.
 */
export default function Mesh() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const spans = ref.current?.querySelectorAll('span');
    if (!spans?.length) return undefined;
    const rates = [0.06, -0.09, 0.04];
    let raf;
    const loop = () => {
      const y = window.scrollY;
      spans.forEach((span, i) => { span.style.translate = `0 ${y * rates[i % rates.length]}px`; });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mesh" ref={ref}>
      <span /><span /><span />
    </div>
  );
}
