import React from "react";
import styles from "./MonthlyTrendChart.module.css";

export interface MonthlyTrendPoint {
  month: number;
  label: string;
  valueJt: number;
}

interface MonthlyTrendChartProps {
  data: MonthlyTrendPoint[];
  maxY?: number;
}

export function MonthlyTrendChart({ data, maxY }: MonthlyTrendChartProps) {
  const maxVal = maxY || Math.max(1, ...data.map(d => d.valueJt)) * 1.15;
  const W = 520;
  const H = 220;
  const padLeft = 45;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 35;

  const innerW = W - padLeft - padRight;
  const innerH = H - padTop - padBottom;

  const yTicks = [0, 500, 1000, 1500, 2000].filter(t => t <= maxVal * 1.2);
  if (!yTicks.includes(0)) yTicks.unshift(0);

  // Compute point coordinates
  const points = data.map((d, i) => {
    const x = padLeft + (i / Math.max(1, data.length - 1)) * innerW;
    const y = padTop + innerH - (d.valueJt / maxVal) * innerH;
    return { ...d, x, y };
  });

  // Build SVG path
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const cx1 = p0.x + (p1.x - p0.x) / 2;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) / 2;
      const cy2 = p1.y;
      pathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
  }

  // Area path (closed at baseline)
  const baselineY = padTop + innerH;
  const areaD = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
    : "";

  return (
    <div className={styles.container}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {yTicks.map(t => {
          const y = padTop + innerH - (t / maxVal) * innerH;
          return (
            <g key={t} className={styles.gridRow}>
              <line x1={padLeft} y1={y} x2={W - padRight} y2={y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padLeft - 8} y={y + 3.5} textAnchor="end" className={styles.yTickText}>
                {t.toLocaleString("id-ID")}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        {areaD && <path d={areaD} fill="url(#areaGradient)" />}

        {/* Line stroke */}
        {pathD && <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

        {/* Points and value tags */}
        {points.map((p, i) => (
          <g key={p.month}>
            {/* Value label directly above point matching reference */}
            <text x={p.x} y={p.y - 10} textAnchor="middle" className={styles.pointValue}>
              {p.valueJt.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
            </text>

            {/* Circular dot */}
            <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" className={styles.pointDot} />

            {/* Month label on X-axis */}
            <text x={p.x} y={baselineY + 18} textAnchor="middle" className={styles.xTickText}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend at bottom */}
      <div className={styles.legend}>
        <span className={styles.legendLine} />
        <span className={styles.legendDot} />
        <span className={styles.legendText}>Pendapatan (Rp Juta)</span>
      </div>
    </div>
  );
}
