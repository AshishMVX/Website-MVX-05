import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

/**
 * Scroll-reveal wrapper. Fades + slides children in when they enter the viewport.
 * <Reveal delay={120} as="h2" className="...">...</Reveal>
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' in' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay / 1000}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
