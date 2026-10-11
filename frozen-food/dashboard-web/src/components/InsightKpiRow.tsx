import React from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, Layers } from "lucide-react";
import styles from "./InsightKpiRow.module.css";

interface InsightKpiRowProps {
  totalRevenueStr: string;
  totalOrdersStr: string;
  customersCount: number;
  avgOrderValueStr: string;
  totalVolumeDusStr: string;
  activeSkuCount: number;
}

export function InsightKpiRow({
  totalRevenueStr,
  totalOrdersStr,
  customersCount,
  avgOrderValueStr,
  totalVolumeDusStr,
  activeSkuCount,
}: InsightKpiRowProps) {
  const cards = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: totalRevenueStr,
      badge: "+12.5% vs Apr",
      isPositive: true,
      icon: <DollarSign size={18} />,
      iconBg: "#f0effe",
      iconColor: "#6366f1",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: totalOrdersStr,
      badge: "+8.2% vs Apr",
      isPositive: true,
      icon: <ShoppingCart size={18} />,
      iconBg: "#ecfeff",
      iconColor: "#06b6d4",
    },
    {
      id: "customers",
      title: "Customers",
      value: customersCount.toLocaleString("id-ID"),
      badge: "+6.7% vs Apr",
      isPositive: true,
      icon: <Users size={18} />,
      iconBg: "#ecfdf5",
      iconColor: "#10b981",
    },
    {
      id: "aov",
      title: "Avg. Order Value",
      value: avgOrderValueStr,
      badge: "+3.1% vs Apr",
      isPositive: true,
      icon: <TrendingUp size={18} />,
      iconBg: "#fff7ed",
      iconColor: "#f97316",
    },
    {
      id: "volume",
      title: "Volume (Dus)",
      value: totalVolumeDusStr,
      badge: "+4.3% vs Apr",
      isPositive: true,
      icon: <Package size={18} />,
      iconBg: "#fdf2f8",
      iconColor: "#ec4899",
    },
    {
      id: "products",
      title: "Active Products",
      value: `${activeSkuCount} SKU`,
      badge: "+7.8% vs Apr",
      isPositive: true,
      icon: <Layers size={18} />,
      iconBg: "#f5f3ff",
      iconColor: "#8b5cf6",
    },
  ];

  return (
    <section className={styles.grid} aria-label="Ringkasan Metrik Utama">
      {cards.map(c => (
        <article key={c.id} className={styles.card}>
          <div className={styles.topRow}>
            <div className={styles.iconBox} style={{ background: c.iconBg, color: c.iconColor }}>
              {c.icon}
            </div>
            <div className={styles.meta}>
              <span className={styles.title}>{c.title}</span>
              <strong className={styles.value}>{c.value}</strong>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <span className={`${styles.badge} ${c.isPositive ? styles.badgeGreen : styles.badgeRed}`}>
              {c.badge}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
