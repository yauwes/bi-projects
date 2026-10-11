import React from "react";
import { Search, Calendar, Bell, ChevronDown } from "lucide-react";
import { ThemeCustomizer } from "./ThemeCustomizer";
import styles from "./InsightHeader.module.css";

interface InsightHeaderProps {
  activeTitle?: string;
  onSearchChange?: (term: string) => void;
  dateRangeText?: string;
  onDateClick?: () => void;
}

export function InsightHeader({
  activeTitle = "Overview",
  onSearchChange,
  dateRangeText = "1 Apr – 30 Sep 2020",
  onDateClick,
}: InsightHeaderProps) {
  return (
    <header className={styles.header}>
      {/* Page Title */}
      <div className={styles.leftCol}>
        <h2 className={styles.pageTitle}>{activeTitle}</h2>
      </div>

      {/* Center Search Bar */}
      <div className={styles.centerCol}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search anything..."
            className={styles.searchInput}
            onChange={e => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className={styles.rightCol}>
        {/* Date Range Selector Pill */}
        <button
          type="button"
          className={styles.dateBtn}
          onClick={onDateClick}
          title="Filter Rentang Tanggal"
        >
          <Calendar size={14} className={styles.dateIcon} />
          <span>{dateRangeText}</span>
          <ChevronDown size={13} className={styles.chevron} />
        </button>

        {/* Theme Customizer Quick Toggle */}
        <ThemeCustomizer />

        {/* Notification Bell */}
        <button type="button" className={styles.iconBtn} title="Notifikasi Penjualan" aria-label="Notifikasi">
          <Bell size={17} />
          <span className={styles.notifBadge} />
        </button>

        {/* User Profile Avatar */}
        <div className={styles.profileBadge}>
          <div className={styles.avatar}>
            <span>OB</span>
          </div>
          <div className={styles.profileText}>
            <strong className={styles.profileName}>Owner Bisnis</strong>
            <span className={styles.profileRole}>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
