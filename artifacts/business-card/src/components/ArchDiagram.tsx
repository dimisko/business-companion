import { motion } from "framer-motion";

const W = 380;
const H = 248;

const CORE = { cx: 190, cy: 124 };

const NODES = [
  { id: "gw",     cx: 190, cy: 22,  label: "api-gateway",    skill: "System Design"          },
  { id: "auth",   cx: 324, cy: 65,  label: "auth-service",   skill: "Security & Auth"        },
  { id: "health", cx: 324, cy: 183, label: "health-api",     skill: "Healthcare Systems"     },
  { id: "data",   cx: 190, cy: 226, label: "data-layer",     skill: "Clean Architecture"     },
  { id: "team",   cx: 56,  cy: 183, label: "team-platform",  skill: "Leadership & Mentoring" },
  { id: "ci",     cx: 56,  cy: 65,  label: "ci-cd-pipeline", skill: "Agile Delivery"         },
];

const HUB_LINES   = NODES.map((n) => ({ x1: CORE.cx, y1: CORE.cy, x2: n.cx, y2: n.cy }));
const RING_LINES  = NODES.map((n, i) => {
  const next = NODES[(i + 1) % NODES.length];
  return { x1: n.cx, y1: n.cy, x2: next.cx, y2: next.cy };
});

const NW = 84; const NH = 36; // outer node box
const CW = 96; const CH = 42; // core node box

const primary    = "hsl(210,79%,52%)";
const hubStroke  = "hsl(210 79% 52% / 0.30)";
const ringStroke = "hsl(210 79% 52% / 0.14)";
const coreFill   = "hsl(218 58% 17%)";
const outerFill  = "hsl(215 52% 14%)";
const coreBorder = "hsl(210 79% 52% / 0.65)";
const outerBorder= "hsl(210 79% 52% / 0.28)";

export function ArchDiagram() {
  return (
    <div className="w-full" aria-label="Microservice architecture diagram of skills">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ overflow: "visible" }}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <filter id="core-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill={hubStroke} />
          </marker>
        </defs>

        {/* Ring lines (outer mesh) */}
        {RING_LINES.map((l, i) => (
          <motion.line
            key={`ring-${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={ringStroke}
            strokeWidth="1"
            strokeDasharray="3 5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.03, duration: 0.3 }}
          />
        ))}

        {/* Hub lines (core to each node) */}
        {HUB_LINES.map((l, i) => (
          <motion.line
            key={`hub-${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={hubStroke}
            strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.35, ease: "easeOut" }}
          />
        ))}

        {/* Outer nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
          >
            <rect
              x={n.cx - NW / 2}
              y={n.cy - NH / 2}
              width={NW}
              height={NH}
              rx="7"
              fill={outerFill}
              stroke={outerBorder}
              strokeWidth="1"
              filter="url(#node-glow)"
            />
            {/* dot indicator */}
            <circle cx={n.cx - NW / 2 + 9} cy={n.cy - 5} r="2.5" fill={primary} opacity="0.7" />
            {/* service label */}
            <text
              x={n.cx - NW / 2 + 18}
              y={n.cy - 3}
              fontSize="6.8"
              fontFamily="'Courier New', monospace"
              fill="hsl(215 20% 55%)"
              letterSpacing="0.3"
            >
              {n.label}
            </text>
            {/* skill name */}
            <text
              x={n.cx}
              y={n.cy + 10}
              fontSize="8.5"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontWeight="600"
              fill="hsl(210 40% 88%)"
              textAnchor="middle"
            >
              {n.skill}
            </text>
          </motion.g>
        ))}

        {/* Core node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3 }}
        >
          {/* glow ring */}
          <ellipse
            cx={CORE.cx} cy={CORE.cy}
            rx={CW / 2 + 8} ry={CH / 2 + 8}
            fill="none"
            stroke={primary}
            strokeWidth="1"
            opacity="0.18"
          />
          <rect
            x={CORE.cx - CW / 2}
            y={CORE.cy - CH / 2}
            width={CW}
            height={CH}
            rx="9"
            fill={coreFill}
            stroke={coreBorder}
            strokeWidth="1.5"
            filter="url(#core-glow)"
          />
          {/* status dot */}
          <circle cx={CORE.cx - CW / 2 + 10} cy={CORE.cy - 7} r="3" fill="#4ade80" opacity="0.85" />
          {/* label */}
          <text
            x={CORE.cx - CW / 2 + 20}
            y={CORE.cy - 5}
            fontSize="7.2"
            fontFamily="'Courier New', monospace"
            fill="hsl(215 20% 60%)"
            letterSpacing="0.4"
          >
            backend-core
          </text>
          {/* name */}
          <text
            x={CORE.cx}
            y={CORE.cy + 10}
            fontSize="10"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="700"
            fill={primary}
            textAnchor="middle"
          >
            Java · Spring Boot
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
