import React from "react";
import { Package, ChevronDown } from "lucide-react";
import styles from "./PackageTypeRing.module.css";

interface PackageTypeItem {
  label: string;
  pct: number;
  color: string;
}

const PACKAGE_TYPES: PackageTypeItem[] = [
  { label: "DUS (Grosir)", pct: 58.6, color: "#6366f1" },
  { label: "PACK (Retail)", pct: 34.1, color: "#06b6d4" },
  { label: "BAL / Lainnya", pct: 7.3, color: "#8b5cf6" },
];

export function PackageTypeRing() {
  const size = 100;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  return (
    <div className={styles.card} aria-label="Rincian Satuan Kemasan">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <h3 className={styles.title}>Device Breakdown</h3>
          <span className={styles.subtitle}>Tipe Kemasan & Satuan</span>
        </div>

        <button type="button" className={styles.dropdownBtn}>
          <span>This Month</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className={styles.contentRow}>
        {/* Ring Chart with Box Icon */}
        <div className={styles.ringWrap}>
          <svg width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="var(--border-subtle)"
              strokeWidth={strokeWidth}
            />

            {PACKAGE_TYPES.map(pt => {
              const dash = (pt.pct / 100) * circumference;
              const offset = -((accumulated / 100) * circumference);
              accumulated += pt.pct;

              return (
                <circle
                  key={pt.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={pt.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
            })}
          </svg>

          <div className={styles.centerIcon}>
            <Package size={22} color="#6366f1" />
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legendList}>
          {PACKAGE_TYPES.map(pt => (
            <div key={pt.label} className={styles.legendRow}>
              <div className={styles.legLeft}>
                <span className={styles.dot} style={{ background: pt.color }} />
                <span className={styles.legLabel}>{pt.label}</span>
              </div>
              <strong className={styles.legPct}>{pt.pct}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
