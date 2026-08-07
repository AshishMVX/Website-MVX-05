import { useEffect, useState } from 'react';
import mervixIcon from '../assets/mervix-icon.png';

export default function Loader({ onDone }) {
  const [phase, setPhase] = useState('in'); // 'in' | 'hold' | 'exit'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100);
    const t2 = setTimeout(() => setPhase('exit'), 2700);
    const t3 = setTimeout(() => onDone?.(), 3350);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`loader loader--${phase}`} aria-hidden="true" role="presentation">
      {/* dot-grid backdrop */}
      <div className="loader-grid" />

      {/* radial corner glows */}
      <div className="loader-glow loader-glow--green" />
      <div className="loader-glow loader-glow--blue" />

      {/* centre content */}
      <div className="loader-center">

        {/* logo + rings */}
        <div className="loader-logo-area">
          <div className="loader-ring loader-ring--a" />
          <div className="loader-ring loader-ring--b" />
          <div className="loader-ring loader-ring--c" />

          {/* masked fill */}
          <div
            className="loader-logo-mask"
            style={{
              WebkitMaskImage: `url(${mervixIcon})`,
              maskImage: `url(${mervixIcon})`,
            }}
          >
            {/* base grey so empty logo is visible */}
            <div className="loader-logo-base" />
            {/* gradient fill that rises from bottom */}
            <div className="loader-logo-fill" />
          </div>

          {/* pulse glow that fires after fill */}
          <div className="loader-logo-pulse" />
        </div>

        {/* wordmark */}
        <div className="loader-wordmark">
          <span className="loader-brand">MERVIX</span>
          <span className="loader-tagline">TECHNOLOGY PVT LTD</span>
        </div>

      </div>

      {/* progress bar */}
      <div className="loader-bar-wrap">
        <div className="loader-bar" />
        <div className="loader-bar-glow" />
      </div>
    </div>
  );
}
