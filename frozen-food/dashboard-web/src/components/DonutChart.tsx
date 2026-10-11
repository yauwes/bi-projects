import React, { useState } from "react";
import styles from "./DonutChart.module.css";

export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  pct: number;
  color: string;
  subLabel?: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerTitle?: string;
  centerSubtitle?: string;
  size?: number;
  strokeWidth?: number;
  showLegend?: boolean;
}

export function DonutChart({
  segments,
  centerTitle,
  centerSubtitle,
  size = 200,
  strokeWidth = 36,
  showLegend = true,
}: DonutChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute total
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  // Cumulative angles
  let accumulatedAngle = -90; // Start at 12 o'clock

  const arcs = segments.map(seg => {
    const fraction = seg.value / total;
    const strokeDash = fraction * circumference;
    const gap = circumference - strokeDash;
    const rotate = accumulatedAngle;
    accumulatedAngle += fraction * 360;

    return {
      ...seg,
      strokeDash,
      gap,
      rotate,
      fraction,
    };
  });

  const activeSegment = hoveredId ? segments.find(s => s.id === hoveredId) : null;

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
          {/* Base background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--surface-muted)"
            strokeWidth={strokeWidth}
          />

          {/* Arcs */}
          {arcs.map(arc => {
            const isHovered = hoveredId === arc.id;
            return (
              <circle
                key={arc.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${arc.strokeDash} ${arc.gap}`}
                strokeDashoffset={0}
                transform={`rotate(${arc.rotate} ${size / 2} ${size / 2})`}
                className={styles.segment}
                onMouseEnter={() => setHoveredId(arc.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </svg>

        {/* Center Text Callout */}
        <div className={styles.centerText}>
          {activeSegment ? (
            <>
              <span className={styles.activePct}>{activeSegment.pct.toFixed(0)}%</span>
              <span className={styles.activeLabel}>{activeSegment.label}</span>
            </>
          ) : (
            <>
              {centerTitle && <span className={styles.centerTitle}>{centerTitle}</span>}
              {centerSubtitle && <span className={styles.centerSubtitle}>{centerSubtitle}</span>}
            </>
          )}
        </div>
      </div>

      {/* Legend on the right */}
      {showLegend && (
        <div className={styles.legend}>
          {segments.map(seg => (
            <div
              key={seg.id}
              className={`${styles.legendItem} ${hoveredId === seg.id ? styles.legendItemActive : ""}`}
              onMouseEnter={() => setHoveredId(seg.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.legendLeft}>
                <span className={styles.dot} style={{ background: seg.color }} />
                <span className={styles.legendLabel} title={seg.label}>
                  {seg.label}
                </span>
              </div>
              <span className={styles.legendPct}>{seg.pct.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
