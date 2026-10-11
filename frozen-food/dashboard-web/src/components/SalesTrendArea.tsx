import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./SalesTrendArea.module.css";

interface MonthlyPoint {
  month: number;
  label: string;
  valueJt: number;
}

interface SalesTrendAreaProps {
  data: MonthlyPoint[];
}

export function SalesTrendArea({ data }: SalesTrendAreaProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG dimensions
  const W = 360;
  const H = 160;
  const padL = 36;
  const padR = 20;
  const padT = 24;
  const padB = 26;

  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 950; // max scale in Jt

  // Calculate points
  const points = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * chartW;
    const y = padT + chartH - (d.valueJt / maxVal) * chartH;
    return { ...d, x, y };
  });

  // Construct smooth bezier curve path
  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cpX = (prev.x + p.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  // Area path (closed at bottom)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`;

  // August peak point (index 4: August)
  const augPoint = points.find(p => p.month === 8) || points[4];

  return (
    <div className={styles.card} aria-label="Grafik Tren Penjualan">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <h3 className={styles.title}>Sales Trend</h3>
          <span className={styles.subtitle}>Omzet Penjualan Bulanan</span>
        </div>

        <button type="button" className={styles.dropdownBtn}>
          <span>Monthly</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className={styles.svgWrapper}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
          <defs>
            <linearGradient id="salesTrendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
              <stop offset="65%" stopColor="#818cf8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4338ca" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Subtle Horizontal Grid lines */}
          <g stroke="#f1f5f9" strokeWidth="1">
            <line x1={padL} y1={padT} x2={W - padR} y2={padT} />
            <line x1={padL} y1={padT + chartH * 0.33} x2={W - padR} y2={padT + chartH * 0.33} />
            <line x1={padL} y1={padT + chartH * 0.66} x2={W - padR} y2={padT + chartH * 0.66} />
            <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} />
          </g>

          {/* Left Y Axis Labels */}
          <g fill="#94a3b8" fontSize="9" textAnchor="end">
            <text x={padL - 6} y={padT + 3}>900Jt</text>
            <text x={padL - 6} y={padT + chartH * 0.33 + 3}>600Jt</text>
            <text x={padL - 6} y={padT + chartH * 0.66 + 3}>300Jt</text>
            <text x={padL - 6} y={padT + chartH + 3}>0</text>
          </g>

          {/* Area Fill */}
          <path d={areaD} fill="url(#salesTrendGradient)" />

          {/* Main Curve Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <circle
              key={p.month}
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === idx ? 5 : 3.5}
              fill="#ffffff"
              stroke="#6366f1"
              strokeWidth="2"
              className={styles.pointDot}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}

          {/* Floating Peak Badge on August (matching reference UI) */}
          {augPoint && (
            <g transform={`translate(${augPoint.x}, ${augPoint.y - 12})`} filter="url(#badgeShadow)">
              <rect
                x="-32"
                y="-18"
                width="64"
                height="20"
                rx="10"
                fill="#4f46e5"
              />
              <text
                x="0"
                y="-4.5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="700"
                fontFamily="var(--font-display)"
              >
                Rp 883,3 Jt
              </text>
            </g>
          )}

          {/* X Axis Month Labels */}
          {points.map(p => (
            <text
              key={`xl-${p.month}`}
              x={p.x}
              y={H - 8}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9.5"
              fontWeight="500"
            >
              {p.label.slice(0, 3)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
