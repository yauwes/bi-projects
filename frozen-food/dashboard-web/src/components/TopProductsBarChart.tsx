import React from "react";
import styles from "./TopProductsBarChart.module.css";

export interface RankedProductItem {
  id: string;
  name: string;
  valueJt: number;
  formattedVal: string;
  color: string;
}

interface TopProductsBarChartProps {
  items: RankedProductItem[];
  maxValue?: number;
}

const BAR_COLORS = [
  "#2563eb", // Deep Royal Blue
  "#0d9488", // Emerald Teal
  "#0284c7", // Sky Blue
  "#16a34a", // Vibrant Green
  "#7c3aed", // Rich Purple
];

export function TopProductsBarChart({ items, maxValue }: TopProductsBarChartProps) {
  const max = maxValue || Math.max(1, ...items.map(i => i.valueJt));
  const ticks = [0, Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), Math.round(max)];

  return (
    <div className={styles.container}>
      <div className={styles.barsList}>
        {items.map((item, idx) => {
          const color = item.color || BAR_COLORS[idx % BAR_COLORS.length];
          const widthPct = Math.min(100, Math.max(4, (item.valueJt / max) * 100));

          return (
            <div key={item.id} className={styles.barRow}>
              <div className={styles.nameRow}>
                <span className={styles.productName} title={item.name}>
                  {item.name}
                </span>
              </div>
              <div className={styles.trackWrapper}>
                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: color,
                    }}
                  >
                    <span className={styles.valueLabelInside}>{item.formattedVal}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis Scale at bottom matching reference */}
      <div className={styles.axisScale}>
        <div className={styles.axisLine} />
        <div className={styles.ticksRow}>
          {ticks.map((t, i) => (
            <span key={i} className={styles.tickLabel}>
              {t.toLocaleString("id-ID")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
