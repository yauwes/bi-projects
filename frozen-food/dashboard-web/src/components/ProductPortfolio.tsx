import React from "react";
import { Sparkles, TrendingUp, ShoppingBag, ArrowUpRight } from "lucide-react";
import seafoodImg from "../assets/category-seafood.jpg";
import sosisImg from "../assets/category-sosis.jpg";
import nuggetImg from "../assets/product-nugget.jpg";
import styles from "./ProductPortfolio.module.css";

interface CategoryCardData {
  id: string;
  category: string;
  brand: string;
  topItem: string;
  omzetLabel: string;
  shareLabel: string;
  buyersLabel: string;
  strategicRole: string;
  badgeType: "anchor" | "volume" | "bundling";
  image: string;
  imageAlt: string;
  description: string;
}

const CATEGORIES: CategoryCardData[] = [
  {
    id: "seafood",
    category: "Olahan Hasil Laut & Ikan",
    brand: "Minaku",
    topItem: "Minaku Otak-Otak 500g X 10",
    omzetLabel: "Rp 962 Jt",
    shareLabel: "21.2% Total",
    buyersLabel: "552 Pelanggan",
    strategicRole: "Anchor SKU & Market Leader",
    badgeType: "anchor",
    image: seafoodImg,
    imageAlt: "Kemasan Olahan Hasil Laut & Bakso Ikan Beku",
    description: "Produk dengan omzet tertinggi dan jangkauan penetrasi warung paling luas di seluruh katalog.",
  },
  {
    id: "sosis",
    category: "Olahan Daging & Sosis",
    brand: "Okey & Champ",
    topItem: "Okey Sosis 500g X 20",
    omzetLabel: "Rp 520 Jt",
    shareLabel: "Tulang Punggung",
    buyersLabel: "380+ Pelanggan",
    strategicRole: "Volume Backbone & Fast Mover",
    badgeType: "volume",
    image: sosisImg,
    imageAlt: "Kemasan Sosis Beku Retail & Grosir",
    description: "Pesanan kartonan berulang dengan frekuensi harian stabil untuk pasokan pedagang dan gerai mitra.",
  },
  {
    id: "nugget",
    category: "Olahan Unggas & Nugget",
    brand: "Jofrans & Belfoods",
    topItem: "Jofrans Nugget Ayam Hati",
    omzetLabel: "Rp 310 Jt",
    shareLabel: "Lift Max 4.3×",
    buyersLabel: "240+ Pelanggan",
    strategicRole: "High Affinity Bundling Engine",
    badgeType: "bundling",
    image: nuggetImg,
    imageAlt: "Nugget Ayam Goreng & Kemasan Retail 500g",
    description: "Katalis komplementer terkuat: pembelian bersama sosis meningkat 4,3× lipat di atas peluang acak.",
  },
];

export function ProductPortfolio() {
  return (
    <section className={styles.section} aria-label="Portofolio Kategori Produk Utama">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>Pilar Kategori & Portofolio Produk Representatif</h3>
            <span className={styles.badge}>Visual Representasi Data</span>
          </div>
          <p className={styles.subtitle}>
            Tiga klaster produk utama yang mendominasi lebih dari 70% perputaran omzet distribusi
          </p>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {CATEGORIES.map(cat => (
          <article key={cat.id} className={styles.card}>
            <div className={styles.imageBox}>
              <img src={cat.image} alt={cat.imageAlt} className={styles.cardImg} loading="lazy" />
              <div className={styles.imgBadge}>
                {cat.badgeType === "anchor" && <Sparkles size={13} className={styles.iconGold} />}
                {cat.badgeType === "volume" && <ShoppingBag size={13} className={styles.iconBlue} />}
                {cat.badgeType === "bundling" && <TrendingUp size={13} className={styles.iconGreen} />}
                <span>{cat.strategicRole}</span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.categoryMeta}>
                <span className={styles.brandName}>{cat.brand}</span>
                <span className={styles.shareBadge}>{cat.shareLabel}</span>
              </div>

              <h4 className={styles.categoryTitle}>{cat.category}</h4>
              <p className={styles.topItemName}>{cat.topItem}</p>
              <p className={styles.cardDesc}>{cat.description}</p>

              <div className={styles.statsBar}>
                <div className={styles.statMini}>
                  <span className={styles.statLabel}>Estimasi Omzet</span>
                  <strong className={styles.statValue}>{cat.omzetLabel}</strong>
                </div>
                <div className={styles.statMini}>
                  <span className={styles.statLabel}>Penetrasi</span>
                  <strong className={styles.statValue}>{cat.buyersLabel}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
