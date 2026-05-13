// Rideekanda Forest Monastery — spatial launcher prototype
// Honeycomb cluster of circular tiles with proximity-based fisheye scaling.
// Drag to wander · tap a satellite to bring it to center · tap the centered tile to open.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ──────────────────────────────────────────────────────────────
// Tile dataset. Positions are filled by buildLayout(). Colors are
// hand-picked earthy/saffron tones meant to harmonise with the
// monastery's warm-deep backdrop.
// ──────────────────────────────────────────────────────────────
const DEFAULT_TILES = [
  // CENTER — the home / about / main site
  { id: 'home', label: 'Rideekanda', sub: 'rideekanda.org · main site',
    url: 'https://rideekanda.org', size: 178, ring: 0,
    bg: 'radial-gradient(circle at 35% 30%, #4a2e16 0%, #1c100a 80%)',
    halo: 'rgba(224, 183, 106, 0.45)', fg: '#f4e1b8', icon: 'home' },

  // RING 1 — five primary destinations (medium)
  { id: 'youtube', label: 'YouTube Channel', sub: 'Dhamma talks · pūjā recordings',
    url: 'https://youtube.com/@rideekanda', size: 132, ring: 1,
    bg: 'radial-gradient(circle at 30% 25%, #8a2a18 0%, #4a1208 85%)',
    halo: 'rgba(200, 80, 40, 0.35)', fg: '#fbe2cb', icon: 'play' },

  { id: 'booking', label: 'Booking Platform', sub: 'reserve a stay for retreat',
    url: '#booking', size: 132, ring: 1,
    bg: 'radial-gradient(circle at 30% 25%, #a06a2a 0%, #5a3210 85%)',
    halo: 'rgba(217, 155, 74, 0.35)', fg: '#f6e0bd', icon: 'calendar' },

  { id: 'library', label: 'Project Library', sub: 'sutta translations, essays, notes',
    url: '#library', size: 132, ring: 1,
    bg: 'radial-gradient(circle at 30% 25%, #4a5a30 0%, #1e2812 85%)',
    halo: 'rgba(160, 180, 100, 0.32)', fg: '#e8e6c8', icon: 'book' },

  { id: 'requirements', label: 'Requirements List', sub: 'items the sangha needs',
    url: '#requirements', size: 132, ring: 1,
    bg: 'radial-gradient(circle at 30% 25%, #6a4e26 0%, #2e1f0c 85%)',
    halo: 'rgba(204, 160, 92, 0.32)', fg: '#f0e0bd', icon: 'list' },

  { id: 'dhamma', label: 'Dhamma Talks', sub: 'audio teachings · weekly',
    url: '#dhamma', size: 132, ring: 1,
    bg: 'radial-gradient(circle at 30% 25%, #7a3a1c 0%, #3a1808 85%)',
    halo: 'rgba(217, 130, 74, 0.32)', fg: '#fbdcc0', icon: 'lotus' },

  // RING 2 — secondary links (small)
  { id: 'audio', label: 'Audio Library', url: '#audio', size: 82, ring: 2,
    bg: '#3a2818', fg: '#e6d4ae', icon: 'wave' },
  { id: 'photos', label: 'Photo Gallery', url: '#photos', size: 82, ring: 2,
    bg: '#2a3624', fg: '#dee0c0', icon: 'image' },
  { id: 'visit', label: 'How to Visit', url: '#visit', size: 82, ring: 2,
    bg: '#4a3a24', fg: '#e8d6b0', icon: 'pin' },
  { id: 'donate', label: 'Dāna · Donate', url: '#donate', size: 82, ring: 2,
    bg: '#5a2a18', fg: '#f0c8a8', icon: 'hands' },
  { id: 'live', label: 'Live Pūjā', url: '#live', size: 82, ring: 2,
    bg: '#6a1c14', fg: '#f4c4b0', icon: 'broadcast' },
  { id: 'email', label: 'Contact', url: '#contact', size: 82, ring: 2,
    bg: '#2a261a', fg: '#d4c8a4', icon: 'mail' },
  { id: 'sinhala', label: 'සිංහල · Sinhala', url: '#si', size: 82, ring: 2,
    bg: '#3a2a3a', fg: '#e0c8d4', icon: 'sinhala' },
  { id: 'observance', label: 'Observance Days', url: '#poya', size: 82, ring: 2,
    bg: '#1c2838', fg: '#c4d2e4', icon: 'moon' },
  { id: 'suttas', label: 'Sutta Archive', url: '#suttas', size: 82, ring: 2,
    bg: '#4a3818', fg: '#ecd8a8', icon: 'scroll' },
  { id: 'newsletter', label: 'Newsletter', url: '#news', size: 82, ring: 2,
    bg: '#2a2628', fg: '#d4ccc8', icon: 'feather' },

  // RING 3 — tertiary / accent (tiny)
  { id: 'bell', label: 'Daily Bell', url: '#bell', size: 56, ring: 3,
    bg: '#2a1f14', fg: '#c8b48a', icon: 'bell' },
  { id: 'tree', label: 'Forest Map', url: '#map', size: 56, ring: 3,
    bg: '#1f2a18', fg: '#b8c8a0', icon: 'tree' },
  { id: 'admin', label: 'Admin', url: 'https://rideekanda.org/admin.html', size: 56, ring: 3,
    bg: '#252028', fg: '#b0a8b0', icon: 'list' },
  { id: 'photos2', label: 'Festival 2026', url: '#fest', size: 56, ring: 3,
    bg: '#382418', fg: '#ccab88', icon: 'image' },
];
window.DEFAULT_TILES = DEFAULT_TILES;

function buildLayout(tilesData, density) {
  const R1 = 240 * density;
  const R2 = 410 * density;
  const R3 = 540 * density;
  const tiles = tilesData.map(t => ({ ...t, x: 0, y: 0 }));
  const ring1 = tiles.filter(t => t.ring === 1);
  const ring2 = tiles.filter(t => t.ring === 2);
  const ring3 = tiles.filter(t => t.ring === 3);
  ring1.forEach((t, i) => {
    const a = (i / ring1.length) * Math.PI * 2 - Math.PI / 2;
    t.x = Math.cos(a) * R1; t.y = Math.sin(a) * R1;
  });
  ring2.forEach((t, i) => {
    const a = (i / ring2.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / ring2.length;
    t.x = Math.cos(a) * R2; t.y = Math.sin(a) * R2;
  });
  ring3.forEach((t, i) => {
    const a = (i / ring3.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / ring3.length / 2;
    t.x = Math.cos(a) * R3; t.y = Math.sin(a) * R3;
  });
  return tiles;
}

// Smooth step easing
const smoothstep = (t) => t * t * (3 - 2 * t);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

// ──────────────────────────────────────────────────────────────
// Hook: lerped pan position. setTarget moves the cluster toward
// (x, y); the actual pan eases toward it every frame.
// ──────────────────────────────────────────────────────────────
function useLerpedPan(stiffness = 0.16) {
  const targetRef = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panRef = useRef(pan);
  panRef.current = pan;

  useEffect(() => {
    let rafId;
    const tick = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const cur = panRef.current;
      const dx = tx - cur.x;
      const dy = ty - cur.y;
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        const next = { x: cur.x + dx * stiffness, y: cur.y + dy * stiffness };
        panRef.current = next;
        setPan(next);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stiffness]);

  const setTarget = useCallback((x, y) => {
    targetRef.current = { x, y };
  }, []);
  const nudgeTarget = useCallback((dx, dy) => {
    targetRef.current = {
      x: targetRef.current.x + dx,
      y: targetRef.current.y + dy,
    };
  }, []);
  const snapTo = useCallback((x, y) => {
    targetRef.current = { x, y };
    panRef.current = { x, y };
    setPan({ x, y });
  }, []);
  return { pan, setTarget, nudgeTarget, snapTo, targetRef, panRef };
}

// ──────────────────────────────────────────────────────────────
// Tile component (memoised). Receives final transform values and
// renders the visual chrome only — no math here.
// ──────────────────────────────────────────────────────────────
const Tile = React.memo(function Tile({ tile, x, y, scale, opacity, isFocal, onPointer }) {
  const Icon = Icons[tile.icon] || Icons.list;
  const iconSize = Math.round(tile.size * 0.42);
  return (
    <div
      className={'tile' + (isFocal ? ' focal' : '')}
      data-id={tile.id}
      style={{
        width: tile.size,
        height: tile.size,
        marginLeft: -tile.size / 2,
        marginTop: -tile.size / 2,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity,
        zIndex: Math.round(200 - (tile.ring || 0) * 10 + (isFocal ? 100 : 0)),
        '--tile-bg': tile.bg,
        '--tile-fg': tile.fg,
        '--halo': tile.halo || 'rgba(217,155,74,0.25)',
      }}
      onPointerUp={(e) => onPointer(e, tile)}
    >
      <div className="tile-inner" style={{ background: tile.bg }}>
        <div className="tile-icon" style={{ color: tile.fg }}>
          <Icon size={iconSize} />
        </div>
        <div className="tile-rim" />
      </div>
      <div className="tile-label">{tile.label}</div>
    </div>
  );
});

// ──────────────────────────────────────────────────────────────
// Honeycomb stage — owns the pan state and dispatches drag /
// click events. Math runs once per frame via panRef in render.
// ──────────────────────────────────────────────────────────────
function Honeycomb({ tweaks, tilesData, onAdminToggle }) {
  const stageRef = useRef(null);
  const tiles = useMemo(() => buildLayout(tilesData, tweaks.density), [tilesData, tweaks.density]);
  const { pan, setTarget, nudgeTarget, snapTo, panRef, targetRef } = useLerpedPan(0.16);
  const [dragging, setDragging] = useState(false);

  // Auto-snap to a tile id ('home' on first load)
  const [focalId, setFocalIdState] = useState('home');
  const focalIdRef = useRef('home');
  const setFocalId = (id) => { focalIdRef.current = id; setFocalIdState(id); };

  const onAdminToggleRef = useRef(onAdminToggle);
  onAdminToggleRef.current = onAdminToggle;

  // Drag handling
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let active = false;
    let lastX = 0, lastY = 0;
    let movedDist = 0;
    let pointerId = null;

    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      active = true;
      pointerId = e.pointerId;
      lastX = e.clientX; lastY = e.clientY;
      movedDist = 0;
      setDragging(true);
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!active) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      movedDist += Math.abs(dx) + Math.abs(dy);
      // Direct: bypass the lerp during drag so dragging feels 1:1
      targetRef.current = {
        x: targetRef.current.x + dx,
        y: targetRef.current.y + dy,
      };
      // also push pan immediately so it doesn't lag visibly
      panRef.current = {
        x: panRef.current.x + dx * 0.92,
        y: panRef.current.y + dy * 0.92,
      };
    };
    const onUp = (e) => {
      if (!active) return;
      active = false;
      setDragging(false);
      if (movedDist > 14) {
        const px = targetRef.current.x;
        const py = targetRef.current.y;
        let best = null, bestD = Infinity;
        for (const t of tiles) {
          const sx = t.x + px;
          const sy = t.y + py;
          const d = sx * sx + sy * sy;
          if (d < bestD) { bestD = d; best = t; }
        }
        if (best) {
          targetRef.current = { x: -best.x, y: -best.y };
          setFocalId(best.id);
        }
      } else {
        el.releasePointerCapture && pointerId != null && el.releasePointerCapture(pointerId);
        const tapped = document.elementFromPoint(e.clientX, e.clientY);
        const tileEl = tapped && tapped.closest('.tile');
        if (tileEl) {
          const hitId = tileEl.dataset.id;
          const hit = tiles.find(t => t.id === hitId);
          if (hit) {
            const px = targetRef.current.x;
            const py = targetRef.current.y;
            const sx = hit.x + px;
            const sy = hit.y + py;
            const distFromCenter = Math.sqrt(sx * sx + sy * sy);
            if (distFromCenter < 40) {
              if (hit.id === 'admin' && onAdminToggleRef.current) {
                onAdminToggleRef.current();
              } else if (hit.url && !hit.url.startsWith('#')) {
                window.open(hit.url, '_blank', 'noopener');
              }
            } else {
              targetRef.current = { x: -hit.x, y: -hit.y };
              setFocalId(hit.id);
            }
          }
        }
      }
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [tiles, targetRef, panRef]);

  // Wheel = pan
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const dx = -e.deltaX;
      const dy = -e.deltaY;
      targetRef.current = {
        x: targetRef.current.x + dx,
        y: targetRef.current.y + dy,
      };
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [targetRef]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      const step = 60;
      if (e.key === 'ArrowLeft')  nudgeTarget(step, 0);
      else if (e.key === 'ArrowRight') nudgeTarget(-step, 0);
      else if (e.key === 'ArrowUp') nudgeTarget(0, step);
      else if (e.key === 'ArrowDown') nudgeTarget(0, -step);
      else if (e.key === 'Escape' || e.key === 'Home') { setTarget(0, 0); setFocalId('home'); }
      else if (e.key === 'Enter') {
        const t = tiles.find(x => x.id === focalIdRef.current);
        if (t && t.url && !t.url.startsWith('#')) window.open(t.url, '_blank');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nudgeTarget, setTarget, tiles]);

  // Tile pointer-up: pan to it on tap; if already focal, open
  const handleTilePointer = useCallback((e, tile) => {
    // Distinguish tap from drag: if the stage already saw significant movement, the global
    // pointerup handler snaps to nearest and we don't want this to fire too.
    // We compare current screen pos of the tile to viewport center.
    const sx = tile.x + targetRef.current.x;
    const sy = tile.y + targetRef.current.y;
    const dist = Math.sqrt(sx * sx + sy * sy);
    if (dist < 40) {
      if (tile.id === 'admin' && onAdminToggle) {
        onAdminToggle();
        return;
      }
      if (tile.url && !tile.url.startsWith('#')) {
        window.open(tile.url, '_blank', 'noopener');
      } else {
        const el = e.currentTarget;
        el.animate(
          [{ transform: el.style.transform + ' translateZ(0)' },
           { transform: el.style.transform + ' translateZ(0) scale(1.06)' },
           { transform: el.style.transform + ' translateZ(0)' }],
          { duration: 240, easing: 'ease-out' }
        );
      }
    } else {
      // Pan to bring this tile to center
      setTarget(-tile.x, -tile.y);
      setFocalId(tile.id);
    }
  }, [setTarget, targetRef]);

  // Compute per-frame transforms. Re-renders happen via pan state.
  const intensity = tweaks.intensity;
  const maxDist = 540;
  const minScale = lerp(1, 0.25, intensity);
  const computed = tiles.map((t, i) => {
    const sx = t.x + pan.x;
    const sy = t.y + pan.y;
    const dist = Math.sqrt(sx * sx + sy * sy);
    const t01 = clamp(dist / maxDist, 0, 1);
    const eased = smoothstep(t01);
    const scale = lerp(1, minScale, eased) * (t.ring === 0 ? 1 : 1);
    // Radial inward pull at the edges — fisheye
    const pull = tweaks.fisheye ? eased * 0.18 : 0;
    const x = sx * (1 - pull);
    const y = sy * (1 - pull);
    const opacity = lerp(1, 0.45, eased);
    return { tile: t, x, y, scale, opacity, dist };
  });

  // Determine focal tile (closest to viewport center)
  let focalIdx = 0; let focalD = Infinity;
  for (let i = 0; i < computed.length; i++) {
    if (computed[i].dist < focalD) { focalD = computed[i].dist; focalIdx = i; }
  }
  const focalTile = computed[focalIdx].tile;

  // Update compass dot
  useEffect(() => {
    const dot = document.getElementById('compass-dot');
    if (!dot) return;
    const k = 0.06;
    dot.setAttribute('cx', String(clamp(-pan.x * k, -22, 22)));
    dot.setAttribute('cy', String(clamp(-pan.y * k, -22, 22)));
  }, [pan.x, pan.y]);

  return (
    <>
      <div ref={stageRef} className={'stage' + (dragging ? ' dragging' : '')}>
        {computed.map(({ tile, x, y, scale, opacity }) => (
          <Tile
            key={tile.id}
            tile={tile}
            x={x}
            y={y}
            scale={scale}
            opacity={opacity}
            isFocal={tile.id === focalTile.id && focalD < 60}
            onPointer={handleTilePointer}
          />
        ))}
      </div>

      <FocalReadout tile={focalTile} isCenter={focalD < 60} onOpen={() => {
        if (focalTile.url && !focalTile.url.startsWith('#')) {
          window.open(focalTile.url, '_blank', 'noopener');
        }
      }} />
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// Focal readout — large title + open pill, anchored bottom-center.
// ──────────────────────────────────────────────────────────────
function FocalReadout({ tile, isCenter, onOpen }) {
  const isHome = tile.id === 'home';
  return (
    <div className="focal-readout" style={{ opacity: isCenter ? 1 : 0.35, transition: 'opacity 0.4s ease' }}>
      <div className="kicker">{isHome ? 'රිදීකන්ද ආරණ්‍ය සේනාසනය' : 'destination'}</div>
      <div className="title">
        {isHome ? <><em>Rideekanda</em> Forest Monastery</> : tile.label}
      </div>
      {tile.sub && <div className="sub">{tile.sub}</div>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="open-pill" onClick={onOpen}>
          {tile.url && !tile.url.startsWith('#') ? 'Open' : 'Coming soon'}
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M 2 6 L 10 6" />
            <path d="M 7 3 L 10 6 L 7 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Root
// ──────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "palette": "monastery",
    "intensity": 0.7,
    "density": 0.78,
    "fisheye": true
  }/*EDITMODE-END*/);

  const [tiles, tileActions] = useTiles();
  const [adminMode, setAdminMode] = useState(false);

  const handleAdminToggle = useCallback(() => {
    if (adminMode) {
      setAdminMode(false);
      return;
    }
    const pin = prompt('Enter admin PIN:');
    if (pin === window.ADMIN_PIN) {
      setAdminMode(true);
    } else if (pin !== null) {
      alert('Incorrect PIN.');
    }
  }, [adminMode]);

  useEffect(() => {
    const body = document.body;
    const bd = document.getElementById('backdrop');
    body.classList.toggle('day', t.palette === 'parchment');
    if (bd) {
      bd.classList.remove('day', 'midnight');
      if (t.palette === 'parchment') bd.classList.add('day');
      if (t.palette === 'midnight') bd.classList.add('midnight');
    }
  }, [t.palette]);

  return (
    <>
      <Honeycomb tweaks={t} tilesData={tiles} onAdminToggle={handleAdminToggle} />
      <AdminPanel open={adminMode} onClose={() => setAdminMode(false)}
                  tiles={tiles} actions={tileActions} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Mood" value={t.palette}
          options={[
            { value: 'monastery', label: 'Saffron' },
            { value: 'midnight', label: 'Midnight' },
            { value: 'parchment', label: 'Day' },
          ]}
          onChange={(v) => setTweak('palette', v)} />

        <TweakSection label="Motion" />
        <TweakSlider label="Fisheye intensity" value={t.intensity}
          min={0.2} max={0.95} step={0.05}
          onChange={(v) => setTweak('intensity', v)} />
        <TweakToggle label="Radial pull (bowl)" value={t.fisheye}
          onChange={(v) => setTweak('fisheye', v)} />

        <TweakSection label="Layout" />
        <TweakSlider label="Cluster density" value={t.density}
          min={0.7} max={1.4} step={0.05}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
