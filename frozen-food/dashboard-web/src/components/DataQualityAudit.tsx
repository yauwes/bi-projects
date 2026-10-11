import React from "react";
import { 
  Database, 
  ShieldAlert, 
  FileCheck, 
  AlertCircle, 
  HelpCircle, 
  Layers, 
  Tag, 
  Scale 
} from "lucide-react";
import type { Analysis, Dict } from "../analytics";
import { int, jt, rp } from "../format";
import styles from "./DataQualityAudit.module.css";

interface DataQualityAuditProps {
  analysis: Analysis;
  dict: Dict;
  kualitas: {
    barisRp0: number;
    duplikat: number;
    selisihHarga: number;
    barisTotal: number;
  };
}

export function DataQualityAudit({ analysis, dict, kualitas }: DataQualityAuditProps) {
  return (
    <div className={styles.container}>
      {/* Top Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePill}>Audit Kualitas Data</span>
            <span className={styles.badgePillHighlight}>Exploratory Data Analysis (EDA)</span>
          </div>
          <h2 className={styles.heading}>Profil Integritas & Pembersihan Data Transaksi</h2>
          <p className={styles.subheading}>
            Evaluasi menyeluruh terhadap reliabilitas 6.778 baris data Excel (April – September 2020) sebelum digunakan dalam analisis kecerdasan bisnis.
          </p>
        </div>
      </div>

      {/* 4 Core Data Quality Metric Cards */}
      <div className={styles.kpiGrid}>
        {/* Metric 1 */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Total Baris Tercatat</span>
            <Database size={16} className={styles.iconAccent} />
          </div>
          <span className={styles.kpiValue}>{int(kualitas.barisTotal || 6778)}</span>
          <p className={styles.kpiDesc}>6.720 baris reguler berbayar + 58 baris nominal Rp 0 dari 6 workbook bulanan.</p>
        </div>

        {/* Metric 2 */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Anomali Diskon / Selisih</span>
            <ShieldAlert size={16} className={styles.iconWarning} />
          </div>
          <span className={`${styles.kpiValue} ${styles.colorWarning}`}>
            {int(kualitas.selisihHarga || 77)} Baris
          </span>
          <p className={styles.kpiDesc}>
            1,1% baris memiliki <code>Jumlah &lt; Qty × Harga</code> (total selisih Rp 4,44 Jt akibat diskon atau pembulatan).
          </p>
        </div>

        {/* Metric 3 */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Transaksi Rp 0 (Non-Revenue)</span>
            <AlertCircle size={16} className={styles.iconInfo} />
          </div>
          <span className={styles.kpiValue}>{int(kualitas.barisRp0 || 58)} Baris</span>
          <p className={styles.kpiDesc}>
            0,9% transaksi bernilai Rp 0, diidentifikasi sebagai sampel tester, bonus promosi, atau retur barang cacat.
          </p>
        </div>

        {/* Metric 4 */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiLabel}>Baris Identik (Duplikasi)</span>
            <Layers size={16} className={styles.iconMuted} />
          </div>
          <span className={styles.kpiValue}>{int(kualitas.duplikat || 73)} Baris</span>
          <p className={styles.kpiDesc}>
            Baris dengan tanggal, produk, kuantitas, dan nominal sama persis. Tanpa invoice ID, tetap dipertahankan.
          </p>
        </div>
      </div>

      {/* Deep-Dive Quality Cards */}
      <div className={styles.detailGrid}>
        {/* Card 1: Penanganan Anomali & Diskon */}
        <article className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <Tag size={18} />
            </div>
            <h3 className={styles.cardTitle}>1. Rekonsiliasi Perhitungan Harga vs Omzet</h3>
          </div>
          <div className={styles.detailContent}>
            <p>
              Terdapat <strong>77 baris transaksi (1,1%)</strong> di mana nilai perkalian <code>QTY × HARGA</code> tidak sama dengan angka <code>JUMLAH</code> yang dilaporkan di laporan keuangan.
            </p>
            <div className={styles.exampleBox}>
              <strong>Contoh Kasus Riil (Agustus 2020, Baris 23):</strong>
              <code>27 PACK × Rp 28.900 = Rp 780.300</code>, tetapi kolom <code>JUMLAH</code> tercatat <code>Rp 390.150</code> (diskon tepat 50%).
            </div>
            <p className={styles.resolutionText}>
              <strong>Keputusan Pembersihan:</strong> Nilai omzet dalam dashboard selalu mengacu pada kolom <code>JUMLAH</code> aktual yang tercatat di pembukuan kasir, bukan perkalian sintetis, guna menjamin kesesuaian dengan arus kas riil perusahaan.
            </p>
          </div>
        </article>

        {/* Card 2: Normalisasi Master Data Pelanggan */}
        <article className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <FileCheck size={18} />
            </div>
            <h3 className={styles.cardTitle}>2. Normalisasi Variasi Nama Pelanggan</h3>
          </div>
          <div className={styles.detailContent}>
            <p>
              Data mentah memiliki variasi penulisan nama pelanggan akibat perbedaan cara input staf kasir antar bulan:
            </p>
            <ul className={styles.checkList}>
              <li>
                <strong>Awalan Prefix Toko:</strong> Format <code>C - TOKO CITA RASA BARU</code> dan <code>TOKO CITA RASA BARU</code> dinormalisasi menjadi satu entitas akun yang konsisten.
              </li>
              <li>
                <strong>Pergantian Nama Toko:</strong> Awalan <code>(MITRAKU)</code> yang sempat muncul di beberapa bulan diharmonisasi agar pelanggan tidak terhitung dua kali.
              </li>
              <li>
                <strong>Tier Khusus Prefix F:</strong> Pelanggan dengan awalan <code>F -</code> terbukti memiliki tier harga khusus yang berbeda dengan pelanggan reguler (dipertahankan sebagai segmen khusus).
              </li>
            </ul>
          </div>
        </article>

        {/* Card 3: Heterogenitas Satuan Unit (Unit Diversity) */}
        <article className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <Scale size={18} />
            </div>
            <h3 className={styles.cardTitle}>3. Heterogenitas Satuan Ukuran Produk</h3>
          </div>
          <div className={styles.detailContent}>
            <p>
              Dari 297 SKU produk, kuantitas tercatat dalam beragam satuan fisik:
            </p>
            <div className={styles.unitBadges}>
              <span className={styles.unitBadge}><strong>DUS</strong> (Grosir Karton)</span>
              <span className={styles.unitBadge}><strong>PACK</strong> (Satuan Kemasan)</span>
              <span className={styles.unitBadge}><strong>PAIL</strong> (Ember/Curah)</span>
              <span className={styles.unitBadge}><strong>BAL</strong> (Grosir Plastik)</span>
              <span className={styles.unitBadge}><strong>KG</strong> (Timbangan)</span>
            </div>
            <p className={styles.resolutionText}>
              <strong>Prinsip Analisis:</strong> Kuantitas tidak boleh dijumlahkan secara lintas produk (karena 1 DUS &ne; 1 PACK). Distribusi kuantitas dianalisis secara terpisah per unit (misal: Median DUS = 3, Median PACK = 1).
            </p>
          </div>
        </article>

        {/* Card 4: Ketiadaan Nomor Invoice / Nota */}
        <article className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <HelpCircle size={18} />
            </div>
            <h3 className={styles.cardTitle}>4. Batas Interpretasi & Rekomendasi Sistem</h3>
          </div>
          <div className={styles.detailContent}>
            <p>
              File pembukuan Excel sumber tidak memiliki kolom <strong>Nomor Faktur / Nomor Transaksi</strong>, <strong>Biaya Pokok Penjualan (HPP / COGS)</strong>, maupun alasan pemesanan.
            </p>
            <div className={styles.recommendBox}>
              <strong>Rekomendasi Pembenahan Sistem POS / ERP:</strong>
              <ol>
                <li>Tambahkan kolom <code>Invoice_ID</code> unik untuk mengelompokkan multi-item ke dalam satu keranjang belanja nota resmi.</li>
                <li>Catat kolom <code>HPP / Biaya Pokok</code> agar dashboard dapat menganalisis Margin Laba Kotor (Gross Margin), bukan hanya omzet kotor.</li>
                <li>Wajibkan validasi input diskon terpisah dari harga satuan.</li>
              </ol>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
