import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion.js';

/**
 * Minimal client-side router (no external dependency).
 * Tracks window.location.pathname and updates it via the History API.
 * Also owns the single app-wide Lenis smooth-scroll instance, so every
 * scroll — wheel, touch, anchor jump, or route change — is eased the same way.
 */
const RouterContext = createContext(null);

export function useRoute() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.pathname);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setPath(to);
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  };

  /** Smoothly scrolls to a "#hash" selector on the current page, offset for the fixed nav. */
  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -96, duration: 1.3 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate, scrollToHash }}>
      {children}
    </RouterContext.Provider>
  );
}

/**
 * Drop-in replacement for react-router's <Link>, backed by RouterProvider.
 * Forwards its ref so it can be used as Reveal's `as` prop (Reveal attaches
 * a ref to whatever tag/component it renders to drive its IntersectionObserver).
 */
export const Link = forwardRef(function Link({ to, children, className, onClick, ...rest }, ref) {
  const { navigate } = useRoute();
  return (
    <a
      ref={ref}
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
});

/**
 * Anchor link to a section on the homepage (e.g. "#work"). If not already on
 * "/", navigates home first, then scrolls to the target once it has rendered.
 */
export const HashLink = forwardRef(function HashLink({ to, children, className, onClick }, ref) {
  const { path, navigate, scrollToHash } = useRoute();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.(e);
    if (path !== '/') {
      navigate('/');
      requestAnimationFrame(() => setTimeout(() => scrollToHash(to), 60));
    } else {
      scrollToHash(to);
    }
  };

  return (
    <a ref={ref} href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
});
