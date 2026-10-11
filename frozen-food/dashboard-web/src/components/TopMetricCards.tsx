import React from "react";
import { Coins, Package, ReceiptText, Users } from "lucide-react";
import styles from "./TopMetricCards.module.css";

interface TopMetricCardsProps {
  totalPendapatanStr: string;
  totalVolumeStr: string;
  rataRataTrxStr: string;
  totalPelanggan: number;
}

export function TopMetricCards({
  totalPendapatanStr,
  totalVolumeStr,
  rataRataTrxStr,
  totalPelanggan,
}: TopMetricCardsProps) {
  return (
    <section className={styles.grid} aria-label="Metrik Utama Eksekutif">
      {/* 1. Total Pendapatan */}
      <article className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.blue}`}>
          <Coins size={22} />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Total Pendapatan</span>
          <span className={styles.value}>{totalPendapatanStr}</span>
        </div>
      </article>

      {/* 2. Total Volume Penjualan */}
      <article className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.emerald}`}>
          <Package size={22} />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Total Volume Penjualan</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{totalVolumeStr}</span>
            <span className={styles.unit}>unit</span>
          </div>
        </div>
      </article>

      {/* 3. Rata-rata Nilai Transaksi */}
      <article className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.purple}`}>
          <ReceiptText size={22} />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Rata-rata Nilai Transaksi</span>
          <span className={styles.value}>{rataRataTrxStr}</span>
        </div>
      </article>

      {/* 4. Total Pelanggan Aktif */}
      <article className={styles.card}>
        <div className={`${styles.iconCircle} ${styles.orange}`}>
          <Users size={22} />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>Total Pelanggan Aktif</span>
          <span className={styles.value}>{totalPelanggan}</span>
        </div>
      </article>
    </section>
  );
}
