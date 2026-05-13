// Small set of SVG glyph icons used inside tiles.
// All sized via the `size` prop, single-stroke or filled with currentColor.

const Icons = {
  // Official Rideekanda monastery logo for the center tile
  home: ({size=44}) => (
    <img
      src="rideekanda-logo.svg"
      alt="Rideekanda"
      draggable="false"
      style={{
        width: size * 1.55,
        height: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    />
  ),

  play: ({size=32}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="currentColor">
      <path d="M -5 -7 L 7 0 L -5 7 Z"/>
    </svg>
  ),

  calendar: ({size=32}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="-9" y="-7" width="18" height="14" rx="1.5"/>
      <path d="M -9 -2 L 9 -2"/>
      <path d="M -5 -10 L -5 -5"/>
      <path d="M 5 -10 L 5 -5"/>
      <circle cx="-3" cy="3" r="1" fill="currentColor"/>
      <circle cx="3" cy="3" r="1" fill="currentColor"/>
    </svg>
  ),

  book: ({size=32}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -9 -7 C -5 -8, -1 -7, 0 -5 C 1 -7, 5 -8, 9 -7 L 9 7 C 5 6, 1 7, 0 9 C -1 7, -5 6, -9 7 Z"/>
      <path d="M 0 -5 L 0 9" strokeWidth="0.9"/>
    </svg>
  ),

  list: ({size=32}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="-7" cy="-6" r="1.4" fill="currentColor"/>
      <circle cx="-7" cy="0" r="1.4" fill="currentColor"/>
      <circle cx="-7" cy="6" r="1.4" fill="currentColor"/>
      <path d="M -3 -6 L 9 -6"/>
      <path d="M -3 0 L 7 0"/>
      <path d="M -3 6 L 9 6"/>
    </svg>
  ),

  lotus: ({size=32}) => (
    <svg width={size} height={size} viewBox="-14 -14 28 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M 0 8 C -10 5, -10 -4, 0 -8 C 10 -4, 10 5, 0 8 Z" fill="currentColor" fillOpacity="0.16"/>
      <path d="M 0 8 C -6 3, -7 -3, -3 -8"/>
      <path d="M 0 8 C 6 3, 7 -3, 3 -8"/>
      <path d="M 0 8 L 0 -10"/>
    </svg>
  ),

  wave: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M -9 0 Q -6 -6, -3 0 T 3 0 T 9 0"/>
      <path d="M -9 -5 Q -6 -2, -3 -5" opacity="0.5"/>
      <path d="M 3 5 Q 6 2, 9 5" opacity="0.5"/>
    </svg>
  ),

  image: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-9" y="-7" width="18" height="14" rx="1.5"/>
      <circle cx="-3" cy="-2" r="2"/>
      <path d="M -9 7 L -1 0 L 4 4 L 9 0 L 9 7 Z" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  ),

  pin: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 9 C -6 2, -7 -3, -4 -7 A 5.5 5.5 0 0 1 4 -7 C 7 -3, 6 2, 0 9 Z" fill="currentColor" fillOpacity="0.18"/>
      <circle cx="0" cy="-3" r="1.8"/>
    </svg>
  ),

  hands: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -8 4 L -8 -3 L -4 -7 L -4 0"/>
      <path d="M 8 4 L 8 -3 L 4 -7 L 4 0"/>
      <path d="M -8 4 C -4 8, 4 8, 8 4"/>
      <circle cx="0" cy="-6" r="2.4" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  ),

  broadcast: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="0" cy="0" r="2" fill="currentColor"/>
      <path d="M -4 -4 A 5.5 5.5 0 0 0 -4 4"/>
      <path d="M 4 -4 A 5.5 5.5 0 0 1 4 4"/>
      <path d="M -8 -7 A 11 11 0 0 0 -8 7"/>
      <path d="M 8 -7 A 11 11 0 0 1 8 7"/>
    </svg>
  ),

  mail: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="-9" y="-6" width="18" height="12" rx="1.5"/>
      <path d="M -9 -5 L 0 2 L 9 -5"/>
    </svg>
  ),

  sinhala: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none">
      <text x="0" y="6" textAnchor="middle" fill="currentColor" style={{fontFamily: "'Noto Serif Sinhala', serif", fontSize: '15px', fontWeight: 600}}>සි</text>
    </svg>
  ),

  moon: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M 7 1 A 8 8 0 1 1 -1 -7 A 6 6 0 0 0 7 1 Z" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="6" cy="-6" r="0.6" fill="currentColor"/>
      <circle cx="-7" cy="-3" r="0.6" fill="currentColor"/>
    </svg>
  ),

  scroll: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -8 -7 C -6 -7, -6 -5, -8 -5 L -8 6 C -8 7, -7 8, -6 8 L 6 8 C 8 8, 8 6, 8 6 L 8 -5 C 6 -5, 6 -7, 8 -7 Z" fill="currentColor" fillOpacity="0.14"/>
      <path d="M -4 -2 L 4 -2"/>
      <path d="M -4 2 L 4 2"/>
    </svg>
  ),

  feather: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 9 -9 C 2 -10, -7 -3, -7 6 L -2 6 C 6 6, 10 -1, 9 -9 Z" fill="currentColor" fillOpacity="0.14"/>
      <path d="M -7 9 L 4 -2"/>
    </svg>
  ),

  bell: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -6 4 C -6 -3, -3 -8, 0 -8 C 3 -8, 6 -3, 6 4 L -6 4 Z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M -7 5 L 7 5"/>
      <path d="M -1.5 7 C -1.5 9, 1.5 9, 1.5 7"/>
    </svg>
  ),

  tree: ({size=28}) => (
    <svg width={size} height={size} viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 0 9 L 0 -2"/>
      <path d="M -6 4 C -8 -1, -3 -4, 0 -3 C 3 -4, 8 -1, 6 4 C 3 3, 0 5, 0 5 C 0 5, -3 3, -6 4 Z" fill="currentColor" fillOpacity="0.18"/>
    </svg>
  ),
};

window.Icons = Icons;
