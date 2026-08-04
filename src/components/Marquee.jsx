export function Marquee({ children, pauseOnHover = false, className = '' }) {
  return (
    <div
      className={`marquee-wrap${className ? ' ' + className : ''}`}
      data-pause-hover={pauseOnHover ? 'true' : undefined}
    >
      <div className="marquee-track">
        <div className="marquee-group" aria-hidden="false">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
