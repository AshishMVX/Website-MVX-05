/** Tracks pointer position within an element as CSS vars, driving a cursor-follow glow. */
export function spotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--sx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--sy', `${e.clientY - rect.top}px`);
}
