import {
  LayoutDashboard,
  Target,
  TrendingUp,
  Package,
  LayoutGrid,
  Users,
  Activity,
  FileText,
  Snowflake,
} from "lucide-react";
import bowlImg from "../assets/sidebar-bowl.png";
import styles from "./Sidebar.module.css";

export type NavTabId =
  | "ringkasan"
  | "target3d"
  | "penjualan"
  | "produk"
  | "kategori"
  | "pelanggan"
  | "diagnostik"
  | "laporan";

interface SidebarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
}

const NAV_ITEMS: { id: NavTabId; label: string; icon: React.ReactNode }[] = [
  { id: "ringkasan", label: "Ringkasan", icon: <LayoutDashboard size={18} /> },
  { id: "target3d", label: "Target 3D", icon: <Target size={18} /> },
  { id: "penjualan", label: "Penjualan", icon: <TrendingUp size={18} /> },
  { id: "produk", label: "Produk", icon: <Package size={18} /> },
  { id: "kategori", label: "Kategori", icon: <LayoutGrid size={18} /> },
  { id: "pelanggan", label: "Pelanggan", icon: <Users size={18} /> },
  { id: "diagnostik", label: "Analisis Toko", icon: <Activity size={18} /> },
  { id: "laporan", label: "Laporan", icon: <FileText size={18} /> },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Navigasi Utama">
      {/* Brand Header */}
      <div className={styles.brand}>
        <div className={styles.logoCircle}>
          <Snowflake size={20} className={styles.snowflakeIcon} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>Frozen Food</span>
          <span className={styles.brandSubtitle}>Sales Dashboard</span>
        </div>
      </div>

      {/* Navigation List */}
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

      {/* Bottom Promo Artwork matching reference screenshot */}
      <div className={styles.bottomGraphic}>
        <img
          src={bowlImg}
          alt="Frozen Food Freshness for Better Life"
          className={styles.bowlImage}
          loading="lazy"
        />
      </div>
    </aside>
  );
}
