import React from "react";
import styles from "./CategoryDonutChart.module.css";

interface CategorySegment {
  name: string;
  pct: number;
  color: string;
}

const CATEGORIES: CategorySegment[] = [
  { name: "Olahan Ayam", pct: 45.2, color: "#6366f1" },       // Indigo / Blue
  { name: "Seafood & Ikan", pct: 28.7, color: "#06b6d4" },     // Cyan
  { name: "Olahan Sapi & Sosis", pct: 15.3, color: "#ec4899" }, // Pink
  { name: "Sayuran Beku", pct: 7.1, color: "#f59e0b" },       // Amber
  { name: "Bakso & Lainnya", pct: 3.7, color: "#10b981" },     // Green
];

interface CategoryDonutChartProps {
  totalOrdersStr?: string;
}

export function CategoryDonutChart({ totalOrdersStr = "6.778" }: CategoryDonutChartProps) {
  const size = 130;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPct = 0;

  return (
    <div className={styles.card} aria-label="Kategori Produk & Proporsi Penjualan">
      <div className={styles.header}>
        <h3 className={styles.title}>Traffic Source</h3>
        <span className={styles.subtitle}>Proporsi Kategori Produk</span>
      </div>

      <div className={styles.contentRow}>
        {/* Donut Ring with Total in Center */}
        <div className={styles.donutWrap}>
          <svg width={size} height={size} className={styles.svg}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="var(--border-subtle)"
              strokeWidth={strokeWidth}
            />

            {CATEGORIES.map(cat => {
              const dashLength = (cat.pct / 100) * circumference;
              const dashOffset = -((accumulatedPct / 100) * circumference);
              accumulatedPct += cat.pct;

              return (
                <circle
                  key={cat.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className={styles.segment}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
            })}
          </svg>

          {/* Centered Total Label */}
          <div className={styles.centerText}>
            <span className={styles.centerSub}>Total</span>
            <strong className={styles.centerMain}>{totalOrdersStr}</strong>
          </div>
        </div>

        {/* Legend List on Right */}
        <div className={styles.legendList}>
          {CATEGORIES.map(c => (
            <div key={c.name} className={styles.legendItem}>
              <div className={styles.legNameCol}>
                <span className={styles.dot} style={{ background: c.color }} />
                <span className={styles.legName}>{c.name}</span>
              </div>
              <strong className={styles.legPct}>{c.pct}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
