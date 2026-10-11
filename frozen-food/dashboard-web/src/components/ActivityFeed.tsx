import React from "react";
import { ShoppingCart, CheckCircle2, UserPlus, Truck, Award } from "lucide-react";
import styles from "./ActivityFeed.module.css";

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    title: "New order #ORD-10458",
    subtitle: "Pak Sutarmuji pesan 200 Dus Minaku",
    time: "2 min ago",
    icon: <ShoppingCart size={14} />,
    iconBg: "#f0effe",
    iconColor: "#6366f1",
  },
  {
    id: "act-2",
    title: "Payment received from Mas Rohmat",
    subtitle: "Pelunasan 150 Dus (Rp 45.750.000)",
    time: "15 min ago",
    icon: <CheckCircle2 size={14} />,
    iconBg: "#ecfdf5",
    iconColor: "#10b981",
  },
  {
    id: "act-3",
    title: "New customer registered",
    subtitle: "Toko Cita Rasa Baru (Mitra Utama)",
    time: "32 min ago",
    icon: <UserPlus size={14} />,
    iconBg: "#fff7ed",
    iconColor: "#f97316",
  },
  {
    id: "act-4",
    title: "Order #ORD-10450 shipped",
    subtitle: "Armada cold chain berangkat (-18°C)",
    time: "1 hr ago",
    icon: <Truck size={14} />,
    iconBg: "#f5f3ff",
    iconColor: "#8b5cf6",
  },
  {
    id: "act-5",
    title: "Monthly goal achieved!",
    subtitle: "Agustus tembus target Rp 883,3 Jt",
    time: "2 hr ago",
    icon: <Award size={14} />,
    iconBg: "#ecfdf5",
    iconColor: "#059669",
  },
];

export function ActivityFeed() {
  return (
    <div className={styles.card} aria-label="Aktivitas & Log Penjualan">
      <div className={styles.header}>
        <h3 className={styles.title}>Activity Feed</h3>
        <span className={styles.subtitle}>Notifikasi & Status Transaksi</span>
      </div>

      <div className={styles.list}>
        {ACTIVITIES.map(act => (
          <div key={act.id} className={styles.item}>
            <div className={styles.iconBox} style={{ background: act.iconBg, color: act.iconColor }}>
              {act.icon}
            </div>

            <div className={styles.textCol}>
              <strong className={styles.itemTitle}>{act.title}</strong>
              <span className={styles.itemSub}>{act.subtitle}</span>
            </div>

            <span className={styles.timeStr}>{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
