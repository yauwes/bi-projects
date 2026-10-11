import React from "react";
import styles from "./MonthlyQuantityBarChart.module.css";

export interface MonthlyQuantityItem {
  month: number;
  label: string;
  qty: number;
}

interface MonthlyQuantityBarChartProps {
  data: MonthlyQuantityItem[];
  maxY?: number;
}

export function MonthlyQuantityBarChart({ data, maxY }: MonthlyQuantityBarChartProps) {
  const maxVal = maxY || Math.max(25000, ...data.map(d => d.qty)) * 1.15;
  const W = 400;
  const H = 220;
  const padLeft = 45;
  const padRight = 15;
  const padTop = 25;
  const padBottom = 35;

  const innerW = W - padLeft - padRight;
  const innerH = H - padTop - padBottom;

  const yTicks = [0, 5000, 10000, 15000, 20000, 25000].filter(t => t <= maxVal);

  const barWidth = Math.min(32, innerW / (data.length * 1.6));
  const step = innerW / Math.max(1, data.length);

  return (
    <div className={styles.container}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
        {/* Horizontal grid lines */}
        {yTicks.map(t => {
          const y = padTop + innerH - (t / maxVal) * innerH;
          return (
            <g key={t}>
              <line x1={padLeft} y1={y} x2={W - padRight} y2={y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padLeft - 6} y={y + 3.5} textAnchor="end" className={styles.yTickText}>
                {t.toLocaleString("id-ID")}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = padLeft + (i + 0.5) * step;
          const barH = (d.qty / maxVal) * innerH;
          const barY = padTop + innerH - barH;

          return (
            <g key={d.month} className={styles.barGroup}>
              {/* Value label on top of bar matching reference */}
              <text x={cx} y={barY - 6} textAnchor="middle" className={styles.barValueText}>
                {d.qty.toLocaleString("id-ID")}
              </text>

              {/* Bar rectangle */}
              <rect
                x={cx - barWidth / 2}
                y={barY}
                width={barWidth}
                height={Math.max(2, barH)}
                rx="4"
                fill="#0d9488"
                className={styles.barRect}
              />

              {/* Month label */}
              <text x={cx} y={padTop + innerH + 18} textAnchor="middle" className={styles.xTickText}>
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
