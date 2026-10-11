import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./RevenueOverviewBar.module.css";

interface MonthlyData {
  month: number;
  label: string;
  short: string;
  revenueJt: number;
}

interface RevenueOverviewBarProps {
  months: MonthlyData[];
  totalRevenueStr: string;
}

export function RevenueOverviewBar({ months, totalRevenueStr }: RevenueOverviewBarProps) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const maxVal = Math.max(...months.map(m => m.revenueJt), 950);

  return (
    <div className={styles.card} aria-label="Ringkasan Pendapatan Bulanan">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <span className={styles.cardLabel}>Revenue Overview</span>
          <div className={styles.valRow}>
            <strong className={styles.bigVal}>{totalRevenueStr}</strong>
            <span className={styles.growthBadge}>+12.5% vs Apr</span>
          </div>
        </div>

        <button type="button" className={styles.periodDropdown}>
          <span>Monthly</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* SVG Bar Chart with sleek purple bars */}
      <div className={styles.chartWrapper}>
        <div className={styles.barsContainer}>
          {months.map((m, idx) => {
            const heightPct = Math.round((m.revenueJt / maxVal) * 100);
            const isHovered = activeBar === idx;

            return (
              <div
                key={m.month}
                className={styles.barCol}
                onMouseEnter={() => setActiveBar(idx)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className={styles.tooltip}>
                    <strong>Rp {m.revenueJt.toFixed(1)} Jt</strong>
                    <span>{m.label} 2020</span>
                  </div>
                )}

                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${m.month === 8 ? styles.barFillPeak : ""}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={styles.barLabel}>{m.short}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
