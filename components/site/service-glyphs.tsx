/* Fine-line motion glyphs for the service cards. Lines use currentColor at low
 * opacity; the single accent picks up --glyph, so each card's palette carries
 * over. Timing lives in app/site.css under "SERVICE GLYPHS". */

const VB = "0 0 132 76";

function Chart() {
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      {[18, 38, 58].map((y) => <line key={y} className="glyph__faint" x1="4" y1={y} x2="128" y2={y} />)}
      <path className="glyph__line gl-draw" pathLength={100} d="M4 62 L28 52 L50 56 L74 36 L96 40 L124 14" />
      <circle className="glyph__dot gl-pop" cx="124" cy="14" r="4" />
      <circle className="glyph__ring gl-ping" cx="124" cy="14" r="4" />
    </svg>
  );
}

function Grid() {
  const cells: [number, number][] = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) cells.push([6 + c * 30, 12 + r * 30]);
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} className="glyph__cell" x={x} y={y} width="20" height="20" rx="5" />)}
      <rect className="glyph__seek gl-seek" x="2" y="8" width="28" height="28" rx="8" />
    </svg>
  );
}

function Link() {
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      <line className="glyph__faint" x1="26" y1="38" x2="106" y2="38" strokeDasharray="2 5" />
      <circle className="glyph__node" cx="16" cy="38" r="12" />
      <circle className="glyph__node" cx="116" cy="38" r="12" />
      <circle className="glyph__dot gl-travel" cx="26" cy="38" r="3" />
      <path className="glyph__tick gl-tick" pathLength={100} d="M110 38.5l4 4 7-8" />
    </svg>
  );
}

function House() {
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      <circle className="glyph__orbit gl-spin" cx="40" cy="40" r="30" />
      <path className="glyph__line" d="M26 46 L40 32 L54 46 V58 H26 Z" />
      <rect className="glyph__dot-rect" x="37" y="49" width="6" height="9" rx="1.5" />
    </svg>
  );
}

const ARC = "M14 58 Q 66 -6 118 22";
function Flight() {
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      <path className="glyph__faint" d={ARC} strokeDasharray="2 5" />
      <circle className="glyph__node-sm" cx="14" cy="58" r="3.5" />
      <circle className="glyph__node-sm" cx="118" cy="22" r="3.5" />
      <text className="glyph__label" x="8" y="74">SIN</text>
      <text className="glyph__label" x="104" y="40">DXB</text>
      <circle className="glyph__dot" r="3">
        <animateMotion dur="5s" repeatCount="indefinite" path={ARC} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="spline" keySplines=".45 0 .3 1;0 0 1 1" />
      </circle>
    </svg>
  );
}

const NET: [number, number][] = [[20, 40], [52, 16], [58, 58], [92, 34], [118, 14], [116, 60]];
const EDGES: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
function Network() {
  return (
    <svg className="glyph" viewBox={VB} aria-hidden="true">
      {EDGES.map(([a, b]) => <line key={`${a}-${b}`} className="glyph__faint" x1={NET[a][0]} y1={NET[a][1]} x2={NET[b][0]} y2={NET[b][1]} />)}
      {NET.map(([x, y], i) => (
        <circle key={i} className={i === 3 ? "glyph__dot" : "glyph__node-sm gl-pulse"} style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r={i === 3 ? 5 : 3.5} />
      ))}
      <circle className="glyph__ring gl-ping" cx={NET[3][0]} cy={NET[3][1]} r="5" />
    </svg>
  );
}

export const SERVICE_GLYPHS = [Chart, Grid, Link, House, Flight, Network];
