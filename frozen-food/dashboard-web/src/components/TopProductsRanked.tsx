import React from "react";
import { ChevronDown } from "lucide-react";
import seafoodThumb from "../assets/category-seafood.jpg";
import sosisThumb from "../assets/category-sosis.jpg";
import nuggetThumb from "../assets/product-nugget.jpg";
import styles from "./TopProductsRanked.module.css";

interface ProductRankItem {
  id: string;
  rank: number;
  name: string;
  category: string;
  amount: string;
  growth: string;
  thumb: string;
}

const TOP_PRODUCTS: ProductRankItem[] = [
  {
    id: "p1",
    rank: 1,
    name: "Minaku Otak-Otak 500g",
    category: "Olahan Hasil Laut",
    amount: "Rp 967,7 Jt",
    growth: "+12%",
    thumb: seafoodThumb,
  },
  {
    id: "p2",
    rank: 2,
    name: "Okey Sosis Ayam 500g",
    category: "Olahan Sosis",
    amount: "Rp 520,3 Jt",
    growth: "+8%",
    thumb: sosisThumb,
  },
  {
    id: "p3",
    rank: 3,
    name: "Jofrans Nugget Ayam",
    category: "Olahan Nugget",
    amount: "Rp 310,5 Jt",
    growth: "+6%",
    thumb: nuggetThumb,
  },
  {
    id: "p4",
    rank: 4,
    name: "Belfoods Sosis Sapi",
    category: "Olahan Sosis",
    amount: "Rp 181,9 Jt",
    growth: "+4%",
    thumb: sosisThumb,
  },
  {
    id: "p5",
    rank: 5,
    name: "Cita Rasa Bakso Ikan",
    category: "Olahan Ikan",
    amount: "Rp 156,2 Jt",
    growth: "+7%",
    thumb: seafoodThumb,
  },
];

export function TopProductsRanked() {
  return (
    <div className={styles.card} aria-label="Top 5 Produk Terlaris">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <h3 className={styles.title}>Top Products</h3>
          <span className={styles.subtitle}>5 Produk Terlaris</span>
        </div>

        <button type="button" className={styles.dropdownBtn}>
          <span>This Month</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className={styles.list}>
        {TOP_PRODUCTS.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <span className={styles.rankNum}>{item.rank}</span>

            <div className={styles.thumbBox}>
              <img src={item.thumb} alt={item.name} className={styles.thumbImg} />
            </div>

            <div className={styles.nameCol}>
              <strong className={styles.prodName}>{item.name}</strong>
              <span className={styles.prodCat}>{item.category}</span>
            </div>

            <div className={styles.rightCol}>
              <strong className={styles.amountStr}>{item.amount}</strong>
              <span className={styles.growthBadge}>{item.growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
