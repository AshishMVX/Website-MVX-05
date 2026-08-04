import { useEffect, useState } from 'react';

/** Thin fixed bar at the top of the viewport showing scroll progress through the page. */
export default function ScrollProgress() {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setRatio(scrollable > 0 ? el.scrollTop / scrollable : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${ratio})` }} />;
}
