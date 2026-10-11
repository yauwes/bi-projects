import React from "react";
import {
  LayoutDashboard,
  Activity,
  TrendingUp,
  Users,
  Package,
  Sparkles,
  Target,
  FileText,
  Download,
  Flame,
} from "lucide-react";
import styles from "./InsightSidebar.module.css";

export type InsightTabId =
  | "overview"
  | "analytics"
  | "sales"
  | "customers"
  | "products"
  | "marketing"
  | "goals"
  | "reports";

interface InsightSidebarProps {
  activeTab: InsightTabId;
  onTabChange: (tab: InsightTabId) => void;
}

const NAV_ITEMS: { id: InsightTabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={17} /> },
  { id: "analytics", label: "Analytics", icon: <Activity size={17} /> },
  { id: "sales", label: "Sales", icon: <TrendingUp size={17} /> },
  { id: "customers", label: "Customers", icon: <Users size={17} /> },
  { id: "products", label: "Products", icon: <Package size={17} /> },
  { id: "marketing", label: "Marketing", icon: <Sparkles size={17} /> },
  { id: "goals", label: "Goals (3D)", icon: <Target size={17} /> },
  { id: "reports", label: "Reports", icon: <FileText size={17} /> },
];

export function InsightSidebar({ activeTab, onTabChange }: InsightSidebarProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <aside className={styles.sidebar} aria-label="Menu Navigasi InsightHub">
      {/* Brand Header */}
      <div className={styles.brandRow}>
        <div className={styles.logoCircle}>
          <div className={styles.logoInner} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>InsightHub</span>
          <span className={styles.brandSub}>Frozen Food BI</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Download Report Button */}
      <div className={styles.bottomArea}>
        <button type="button" className={styles.downloadBtn} onClick={handleDownload}>
          <Download size={15} />
          <span>Download report</span>
        </button>
      </div>
    </aside>
  );
}
