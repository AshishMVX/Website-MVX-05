import { useEffect, useRef } from 'react';
import { initGlobe } from '../lib/globe.js';
import icon from '../assets/mervix-icon-pad.png';

/**
 * Interactive three.js globe. All scene logic lives in lib/globe.js;
 * this component just owns the canvas lifecycle.
 */
export default function Globe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    return initGlobe(canvasRef.current, icon);
  }, []);

  return <canvas ref={canvasRef} aria-label="Interactive globe showing Mervix regions and technologies" />;
}
