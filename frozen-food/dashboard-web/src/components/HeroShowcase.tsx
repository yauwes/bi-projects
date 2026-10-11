import React from "react";
import { Snowflake, ThermometerSnowflake, Store, PackageCheck, Award } from "lucide-react";
import heroImg from "../assets/hero-banner.jpg";
import styles from "./HeroShowcase.module.css";

interface HeroShowcaseProps {
  totalOmzetM: number;
  totalTrx: number;
  totalPelanggan: number;
  topProdukNama: string;
  topProdukOmzetM: number;
}

export function HeroShowcase({
  totalOmzetM,
  totalTrx,
  totalPelanggan,
  topProdukNama,
  topProdukOmzetM,
}: HeroShowcaseProps) {
  return (
    <section className={styles.hero} aria-label="Profil Bisnis Distribusi Frozen Food">
      {/* Background Image Container with Gradient Overlay */}
      <div className={styles.imageWrapper}>
        <img
          src={heroImg}
          alt="Gudang Distribusi Cold Chain & Produk Frozen Food"
          className={styles.bannerImg}
          loading="eager"
        />
        <div className={styles.gradientOverlay} />
      </div>

      {/* Foreground Content */}
      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <span className={styles.badgeCold}>
            <ThermometerSnowflake size={14} className={styles.iconSnow} />
            <span>Cold Chain Standard (-18.5°C)</span>
          </span>
          <span className={styles.badgeSub}>
            <Snowflake size={13} />
            <span>Rantai Distribusi Produk Beku B2B</span>
          </span>
        </div>

        <div className={styles.mainInfo}>
          <h2 className={styles.title}>
            Executive Intelligence & Distribusi Frozen Food
          </h2>
          <p className={styles.description}>
            Pemantauan performa penjualan, dekomposisi lonjakan musiman, dan pola asosiasi keranjang belanja
            pada <strong>{totalTrx.toLocaleString("id-ID")}</strong> transaksi bernilai <strong>Rp {totalOmzetM.toFixed(2)} Miliar</strong> periode April – September 2020.
          </p>
        </div>

        {/* Operational Highlights Pills */}
        <div className={styles.pillsRow}>
          <div className={styles.pillItem}>
            <Store size={15} className={styles.pillIcon} />
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>Mitra Terlayani</span>
              <span className={styles.pillVal}>{totalPelanggan} Toko & Agen</span>
            </div>
          </div>

          <div className={styles.pillItem}>
            <PackageCheck size={15} className={styles.pillIcon} />
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>Volume Transaksi</span>
              <span className={styles.pillVal}>{totalTrx.toLocaleString("id-ID")} Nota</span>
            </div>
          </div>

          <div className={styles.pillItem}>
            <Award size={15} className={styles.pillIcon} />
            <div className={styles.pillText}>
              <span className={styles.pillLabel}>Anchor SKU Terlaris</span>
              <span className={styles.pillVal}>{topProdukNama} (Rp {topProdukOmzetM.toFixed(1)}M)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
