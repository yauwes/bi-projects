import React, { useState } from "react";
import { 
  Sparkles, 
  Hand, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Check, 
  Copy, 
  X, 
  ArrowRight,
  ShieldAlert,
  BarChart2,
  Calendar,
  Users
} from "lucide-react";
import type { Analysis, Dict } from "../analytics";
import { int, jt, one, pct, rp } from "../format";
import styles from "./ExecutiveInsights.module.css";

interface ExecutiveInsightsProps {
  analysis: Analysis;
  dict: Dict;
  isMasked: boolean;
  onFilterMonth?: (month: number) => void;
  onResetFilter?: () => void;
  onScrollToSection?: (selector: string) => void;
}

type TabType = "all" | "descriptive" | "diagnostic" | "outlier";

export function ExecutiveInsights({
  analysis,
  dict,
  isMasked,
  onFilterMonth,
  onResetFilter,
  onScrollToSection
}: ExecutiveInsightsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Outlier buyer names according to masking setting
  const buyerSutarmuji = isMasked ? "Pelanggan 002" : "Pak Sutarmuji";
  const buyerRohmat = isMasked ? "Pelanggan 004" : "Mas Rohmat";

  // Data references
  const augPeak = analysis.months.find(m => m.month === 8);
  const julMonth = analysis.months.find(m => m.month === 7);
  const sepMonth = analysis.months.find(m => m.month === 9);

  const totalOmzetMiliar = (analysis.totalJt / 1000).toFixed(2);
  const augOmzetJt = augPeak ? augPeak.omzetJt : 883.31;
  const top3Jt = 172.15; // 3 huge orders in August
  const withoutTop3Jt = augPeak ? augPeak.tanpaTop3Jt : 711.16;
  const julOmzetJt = julMonth ? julMonth.omzetJt : 811.36;

  // Percentage comparison
  const diffJulPct = (((withoutTop3Jt / julOmzetJt) - 1) * 100).toFixed(1);

  // Presentation speech text
  const presentationScript = `[NASKAH PRESENTASI: PERWAKILAN ANGKAT TANGAN & DIUTARAKAN]

"Selamat pagi/siang rekan-rekan dan dosen pengampu,
Perkenankan perwakilan dari kelompok kami untuk angkat tangan dan mengutarakan hasil temuan Business Intelligence dari analisis dataset transaksi Penjualan Frozen Food periode April hingga September 2020:

1. TEMUAN DESCRIPTIVE ANALYTICS (APA YANG TERJADI?):
- Total transaksi tercatat 6.778 baris dengan omzet keseluruhan mencapai Rp 4,53 Miliar.
- Puncak omzet terjadi pada BULAN AGUSTUS 2020 sebesar Rp 883,31 Juta, naik 8,9% dibandingkan Juli dan jauh di atas rata-rata bulanan (Rp 755 Juta).
- Namun terjadi ANOMALI DESKRIPTIF: jumlah baris transaksi di Agustus justru TURUN 19,4% (dari 1.325 menjadi 1.068 baris). Artinya, lonjakan omzet berasal dari nilai per transaksi yang melonjak (+35,1% per transaksi), bukan dari bertambahnya pesanan.
- Produk MIN-001 (Minaku Otak-Otak 500g) merupakan produk juara dengan omzet Rp 967,7 Juta (21,4% total bisnis) dan melonjak menjadi 32,5% dari seluruh penjualan bulan Agustus.
- Berdasarkan prinsip Pareto, 10 pelanggan teratas menguasai 53,0% omzet perusahaan.

2. TEMUAN DIAGNOSTIC ANALYTICS (MENGAPA HAL ITU TERJADI & AKAR MASALAHNYA?):
- [Akar Masalah Lonjakan Agustus / Outlier Kuantitas]:
  Median pesanan normal produk MIN-001 dalam satuan DUS adalah 3 DUS. Namun di bulan Agustus, terdapat 3 baris pembelian JUMBO yang sangat ekstrem:
  * ${buyerSutarmuji} memesan 200 DUS pada 3 Agustus (Rp 63,2 Jt)
  * ${buyerSutarmuji} memesan 200 DUS lagi pada 13 Agustus (Rp 63,2 Jt)
  * ${buyerRohmat} memesan 150 DUS pada 3 Agustus (Rp 45,75 Jt)
  Kuantitas 150-200 DUS ini mencapai 50x hingga 67x lipat dari median pembelian kebanyakan pelanggan! Ketiga transaksi ini bernilai total Rp 172,15 Juta atau menyumbang 19,5% dari seluruh omzet Agustus.

- [Ilusi Kenaikan Pasar]:
  Jika ketiga transaksi raksasa tersebut dikeluarkan, omzet riil Agustus sebenarnya hanya Rp 711,16 Juta — yang artinya TURUN 12,3% dari bulan Juli. Jadi, pasar ritel Agustus sesungguhnya sedang lesu, tetapi tertutupi oleh order borongan 2 pembeli tersebut.

- [Penyebab Anjloknya September (-15,4%)]:
  Penurunan September (turun Rp 136,2 Juta) bukan karena hilangnya pasar umum, melainkan karena ${buyerSutarmuji} tidak melakukan order ulang (Rp 0) dan ${buyerRohmat} hanya belanja normal Rp 9,27 Jt. Sementara penjualan ke pelanggan lain justru naik +3,7%!

- [Risiko Ketergantungan]:
  6 dari 10 produk terbesar memiliki lebih dari 50% penjualannya hanya bergantung pada SATU pembeli tunggal (Single Buyer Dependency Risk).

3. REKOMENDASI STRATEGIS:
- Terapkan Key Account Management (KAM) dan kontrak retensi khusus untuk pembeli skala besar agar tidak terjadi churn mendadak.
- Diversifikasi channel distribusi untuk 6 produk yang rentan ketergantungan.
- Manfaatkan pola bundling untuk produk ber-lift score tinggi (seperti Okey Sosis & Stick).

Demikian temuan kunci dari kelompok kami, terima kasih!"`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(presentationScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className={styles.container}>
      {/* Executive Summary Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerGlow} />
        <div className={styles.bannerTop}>
          <div className={styles.bannerTitleArea}>
            <span className={styles.bannerTag}>
              <Sparkles size={14} /> Temuan Utama Kecerdasan Bisnis
            </span>
            <h2 className={styles.bannerTitle}>
              Executive Insights: Descriptive & Diagnostic Analytics
            </h2>
            <p className={styles.bannerDesc}>
              Hasil analisis mendalam terhadap 6.778 transaksi penjualan (Apr–Sep 2020) senilai <strong>Rp {totalOmzetMiliar} Miliar</strong>.
              Menemukan pola anomali omzet, pesanan outlier grosir, dekomposisi lonjakan Agustus, serta risiko ketergantungan pembeli.
            </p>
          </div>

          <div className={styles.bannerActions}>
            <button 
              type="button" 
              className={styles.presentButton}
              onClick={() => setShowModal(true)}
              aria-label="Mode presentasi naskah angkat tangan"
            >
              <Hand size={18} />
              <span>🙋 Angkat Tangan & Utarakan (Mode Bicara)</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.filterRow} role="tablist">
          <button
            type="button"
            className={`${styles.filterBtn} ${activeTab === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <Layers size={14} /> Semua Temuan (7)
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeTab === "descriptive" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveTab("descriptive")}
          >
            <BarChart2 size={14} /> 📊 Descriptive Analytics (Apa yang Terjadi?)
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeTab === "diagnostic" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveTab("diagnostic")}
          >
            <AlertTriangle size={14} /> 🔍 Diagnostic Analytics (Mengapa Terjadi?)
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${activeTab === "outlier" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveTab("outlier")}
          >
            <ShieldAlert size={14} /> ⚡ Outlier Jumbo & Dekomposisi
          </button>
        </div>
      </section>

      {/* Outlier Decomposition & Jumbo Transactions Card */}
      {(activeTab === "all" || activeTab === "diagnostic" || activeTab === "outlier") && (
        <section className={styles.decompCard}>
          <div className={styles.decompHeader}>
            <h3 className={styles.decompTitle}>
              <ShieldAlert size={20} color="var(--danger)" />
              Diagnosa Outlier: Dekomposisi Kenaikan Agustus & 3 Transaksi Jumbo
            </h3>
            <div className={styles.decompBadges}>
              <span className={styles.outlierBadge}>Diagnostic Finding #1</span>
            </div>
          </div>

          {/* Visual Decomposition Bars */}
          <div className={styles.decompBars}>
            <div className={styles.decompBarItem}>
              <div className={styles.decompBarLabel}>
                <span>1. Total Omzet Agustus Tercatat</span>
                <strong>100%</strong>
              </div>
              <div className={styles.decompBarTrack}>
                <div className={styles.decompBarFillMain} style={{ width: "100%" }} />
              </div>
              <span className={styles.decompBarValue}>Rp {jt(augOmzetJt)} Juta</span>
              <span className={styles.decompBarSub}>+8,9% dari Juli (Puncak Rekor)</span>
            </div>

            <div className={styles.decompBarItem}>
              <div className={styles.decompBarLabel}>
                <span>2. Nilai 3 Transaksi Jumbo ({buyerSutarmuji} & {buyerRohmat})</span>
                <strong style={{ color: "var(--danger)" }}>19,5%</strong>
              </div>
              <div className={styles.decompBarTrack}>
                <div className={styles.decompBarFillOutlier} style={{ width: "19.5%" }} />
              </div>
              <span className={styles.decompBarValue} style={{ color: "var(--danger)" }}>Rp 172,15 Juta</span>
              <span className={styles.decompBarSub}>Hanya 3 baris dari 1.068 baris transaksi</span>
            </div>

            <div className={styles.decompBarItem}>
              <div className={styles.decompBarLabel}>
                <span>3. Omzet Riil Agustus Tanpa 3 Transaksi Jumbo</span>
                <strong style={{ color: "var(--success)" }}>80,5%</strong>
              </div>
              <div className={styles.decompBarTrack}>
                <div className={styles.decompBarFillNormal} style={{ width: "80.5%" }} />
              </div>
              <span className={styles.decompBarValue}>Rp {jt(withoutTop3Jt)} Juta</span>
              <span className={styles.decompBarSub} style={{ color: "var(--danger)" }}>
                {diffJulPct}% di bawah omzet Juli (Rp {jt(julOmzetJt)} Juta)
              </span>
            </div>
          </div>

          {/* Table of the 3 Jumbo Transactions */}
          <div className={styles.outlierTableWrapper}>
            <table className={styles.outlierTable}>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Pembeli</th>
                  <th>Produk</th>
                  <th>Kuantitas</th>
                  <th>Median Pembelian Tipikal</th>
                  <th>Rasio vs Median</th>
                  <th>Total Nilai (Rp)</th>
                  <th>Porsi Omzet Agustus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>03/08/2020</strong></td>
                  <td><strong>{buyerSutarmuji}</strong></td>
                  <td>MIN-001 (Minaku Otak Otak 500 gr × 20 Pack)</td>
                  <td><span className={styles.outlierBadge}>200 DUS</span></td>
                  <td>3 DUS</td>
                  <td><strong>67× Median</strong></td>
                  <td><strong>Rp 63.200.000</strong></td>
                  <td>7,2%</td>
                </tr>
                <tr>
                  <td><strong>13/08/2020</strong></td>
                  <td><strong>{buyerSutarmuji}</strong></td>
                  <td>MIN-001 (Minaku Otak Otak 500 gr × 20 Pack)</td>
                  <td><span className={styles.outlierBadge}>200 DUS</span></td>
                  <td>3 DUS</td>
                  <td><strong>67× Median</strong></td>
                  <td><strong>Rp 63.200.000</strong></td>
                  <td>7,2%</td>
                </tr>
                <tr>
                  <td><strong>03/08/2020</strong></td>
                  <td><strong>{buyerRohmat}</strong></td>
                  <td>MIN-001 (Minaku Otak Otak 500 gr × 20 Pack)</td>
                  <td><span className={styles.outlierBadge}>150 DUS</span></td>
                  <td>3 DUS</td>
                  <td><strong>50× Median</strong></td>
                  <td><strong>Rp 45.750.000</strong></td>
                  <td>5,2%</td>
                </tr>
                <tr style={{ background: "var(--surface-muted)", fontWeight: 600 }}>
                  <td colSpan={6}><strong>TOTAL 3 BARIS PEMBELIAN OUTLIER</strong></td>
                  <td><strong style={{ color: "var(--danger)" }}>Rp 172.150.000</strong></td>
                  <td><strong style={{ color: "var(--danger)" }}>19,5% Omzet Agustus</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.cardNarrative}>
            💡 <strong>Diagnosa Kunci:</strong> Median kuantitas pesanan untuk MIN-001 dalam satuan DUS selama 6 bulan adalah <strong>3 DUS</strong>.
            Pesanan 150 hingga 200 DUS berada sangat jauh di luar kurva normal pembelian. Data membuktikan bahwa kenaikan omzet Agustus bukanlah ekspansi pasar ritel, melainkan ilusi yang didorong oleh 2 pembeli borongan.
          </p>
        </section>
      )}

      {/* Finding Cards Grid */}
      <div className={styles.cardsGrid}>
        {/* Finding Card 1: Descriptive - Rekor Agustus */}
        {(activeTab === "all" || activeTab === "descriptive") && (
          <article className={`${styles.insightCard} ${styles.insightCardDesc}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDesc}`}>Descriptive</span>
                <span className={styles.tagBadge}>Tren Penjualan Bulanan</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              Puncak Omzet Terjadi di Agustus (Rp 883,31 Jt, +8,9%), Namun Transaksi Turun 19,4%
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Omzet Agustus</span>
                <span className={styles.metricPillValue}>Rp 883,3 Jt</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Rata-rata 6 Bulan</span>
                <span className={styles.metricPillValue}>Rp 755,1 Jt (+17%)</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Frekuensi Transaksi</span>
                <span className={styles.metricPillValue}>1.068 (-19,4%)</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Nilai / Baris</span>
                <span className={styles.metricPillValue}>Rp 827 Rb (+35,1%)</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Omzet menanjak berturut-turut dari April (Rp 609,6 Jt) hingga mencapai titik tertinggi di Agustus. 
              Meskipun omzet naik +8,9% dari Juli, jumlah item produk yang terjual justru turun drastis dari 1.325 ke 1.068 baris. 
              Artinya, peningkatan Agustus ditopang oleh nilai per transaksi yang melonjak, bukan dari peningkatan jumlah nota atau pelanggan.
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => onFilterMonth?.(8)}
              >
                <span>Fokuskan ke Bulan Agustus</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}

        {/* Finding Card 2: Diagnostic - Outlier Kuantitas */}
        {(activeTab === "all" || activeTab === "diagnostic") && (
          <article className={`${styles.insightCard} ${styles.insightCardDiag}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDiag}`}>Diagnostic</span>
                <span className={styles.tagBadge}>Anomali Kuantitas Pembelian</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              Terdapat 2 Pembeli dengan Kuantitas Pembelian 50× Hingga 67× di Atas Median Tipikal
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Median Tipikal DUS</span>
                <span className={styles.metricPillValue}>3 DUS</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Pesanan Ekstrem</span>
                <span className={styles.metricPillValue}>150 - 200 DUS</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Kontribusi Nilai</span>
                <span className={styles.metricPillValue}>Rp 172,15 Juta</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Pelanggan Outlier</span>
                <span className={styles.metricPillValue}>{buyerSutarmuji} & {buyerRohmat}</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Dekomposisi kuantitas menunjukkan bahwa {buyerSutarmuji} memesan 200 DUS (2 kali = 400 DUS) dan {buyerRohmat} memesan 150 DUS untuk produk MIN-001. 
              Pesanan ini sangat jauh berbeda dengan pembeli kebanyakan (median 3 DUS). 
              Hanya dari 3 baris pesanan ini saja, sudah menyerap 19,5% dari total omzet seluruh toko pada bulan Agustus.
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => setActiveTab("outlier")}
              >
                <span>Buka Rincian Tabel Outlier</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}

        {/* Finding Card 3: Diagnostic - Penyebab September Anjlok */}
        {(activeTab === "all" || activeTab === "diagnostic") && (
          <article className={`${styles.insightCard} ${styles.insightCardDiag}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDiag}`}>Diagnostic</span>
                <span className={styles.tagBadge}>Akar Penurunan September</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              Penurunan September (-15,4%) Disebabkan Hilangnya Order Jumbo, Bukan Penurunan Pasar
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Penurunan Omzet Sep</span>
                <span className={styles.metricPillValue}>-Rp 136,23 Jt (-15,4%)</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Drop 2 Akun Outlier</span>
                <span className={styles.metricPillValue}>-Rp 162,88 Jt</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Pelanggan Lainnya</span>
                <span className={styles.metricPillValue}>+Rp 26,65 Jt (+3,7%)</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Pada September, omzet turun dari Rp 883,3 Jt ke Rp 747,1 Jt. Diagnosa data menunjukkan {buyerSutarmuji} sama sekali tidak melakukan repeat order (Rp 0), 
              dan {buyerRohmat} kembali ke pola pembelian normal (Rp 9,27 Jt). Sementara itu, total penjualan ke seluruh pelanggan selain kedua akun tersebut justru tumbuh +3,7% 
              (dari Rp 711,2 Jt menjadi Rp 737,8 Jt).
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => onFilterMonth?.(9)}
              >
                <span>Fokuskan ke Bulan September</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}

        {/* Finding Card 4: Descriptive - Dominasi MIN-001 */}
        {(activeTab === "all" || activeTab === "descriptive") && (
          <article className={`${styles.insightCard} ${styles.insightCardDesc}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDesc}`}>Descriptive</span>
                <span className={styles.tagBadge}>Pareto Produk</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              MIN-001 (Minaku Otak-Otak) Mendominasi 21,4% Omzet Total & Melonjak ke 32,5% di Agustus
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Omzet MIN-001</span>
                <span className={styles.metricPillValue}>Rp 967,69 Juta</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Porsi 6 Bulan</span>
                <span className={styles.metricPillValue}>21,4% Total Bisnis</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Porsi Agustus</span>
                <span className={styles.metricPillValue}>32,5% (Rp 287,5 Jt)</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Hukum Pareto 80/20</span>
                <span className={styles.metricPillValue}>40 dari 297 Produk (80%)</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Produk Minaku Otak Otak 500 gr × 20 Pack adalah kontributor omzet terbesar. Pada bulan Agustus, produk ini bertambah Rp 126,3 Jt dari Juli. 
              Sebaliknya, gabungan 296 produk lainnya justru mengalami penurunan -Rp 54,37 Jt dari Juli ke Agustus. Hanya 40 produk (13,5% jenis) yang menyumbang 80% omzet perusahaan.
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => onResetFilter?.()}
              >
                <span>Lihat Seluruh Produk</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}

        {/* Finding Card 5: Diagnostic - Ketergantungan Pembeli */}
        {(activeTab === "all" || activeTab === "diagnostic") && (
          <article className={`${styles.insightCard} ${styles.insightCardDiag}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDiag}`}>Diagnostic</span>
                <span className={styles.tagBadge}>Risiko Ketergantungan</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              Risiko Single Buyer: 6 dari 10 Produk Utama Dikuasai Lebih Dari 50% oleh Satu Pelanggan
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Produk Rentan</span>
                <span className={styles.metricPillValue}>6 dari 10 Produk</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Porsi Single Buyer</span>
                <span className={styles.metricPillValue}>50% - 63% Penjualan</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Pareto Pelanggan</span>
                <span className={styles.metricPillValue}>10 Pembeli = 53% Omzet</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Analisis konsentrasi mendiagnosa risiko operasional tinggi: 6 dari 10 produk dengan omzet terbesar separuh lebih transaksinya hanya diserap satu pembeli tunggal. 
              Jika pelanggan kunci tersebut berpindah vendor atau menunda belanja, perputaran produk tersebut akan langsung kolaps. 
              Selain itu, 10 pelanggan teratas mengendalikan lebih dari separuh (53,0%) total omzet perusahaan.
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => onResetFilter?.()}
              >
                <span>Lihat Grafik Ketergantungan</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}

        {/* Finding Card 6: Descriptive & Diagnostic - Pola Belanja & Bundling */}
        {(activeTab === "all" || activeTab === "descriptive" || activeTab === "diagnostic") && (
          <article className={`${styles.insightCard} ${styles.insightCardDesc}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardBadges}>
                <span className={`${styles.typeBadge} ${styles.typeBadgeDesc}`}>Descriptive</span>
                <span className={styles.tagBadge}>Pola Transaksi & Keranjang Nota</span>
              </div>
            </div>

            <h4 className={styles.cardTitle}>
              Konsentrasi Akhir Bulan (Tgl 21–31) & Peluang Bundling Lintas Merek (Lift 4.3×)
            </h4>

            <div className={styles.metricsPills}>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Fase Akhir Bulan</span>
                <span className={styles.metricPillValue}>38% Omzet Bulanan</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Hari Belanja Puncak</span>
                <span className={styles.metricPillValue}>Jumat & Sabtu</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Pasangan Terbanyak</span>
                <span className={styles.metricPillValue}>Okey Sosis + Stick (183 Nota)</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricPillLabel}>Cross-Brand Lift</span>
                <span className={styles.metricPillValue}>4.3× di Atas Kebetulan</span>
              </div>
            </div>

            <p className={styles.cardNarrative}>
              Transaksi melonjak teratur pada akhir bulan (tanggal 21–31), merefleksikan pola kulakan rutin pedagang eceran sebelum awal bulan. 
              Hari Sabtu dan Jumat merupakan hari tersibuk. Analisis market basket mendiagnosis bahwa pembeli sering membeli paket lauk beku komplementer lintas merek, 
              membuka peluang besar untuk promosi bundling strategis.
            </p>

            <div className={styles.cardFooter}>
              <button 
                type="button" 
                className={styles.focusBtn}
                onClick={() => onResetFilter?.()}
              >
                <span>Lihat Keranjang Pasangan</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        )}
      </div>

      {/* Modal Presentasi: Mode Angkat Tangan & Diutarakan */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <Hand size={22} color="var(--accent)" />
                <h3 className={styles.modalTitle}>
                  Panduan Berbicara: Perwakilan Angkat Tangan & Diutarakan
                </h3>
              </div>
              <button 
                type="button" 
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.scriptBox}>
                <div className={styles.scriptSection}>
                  <h4 className={styles.scriptSectionTitle}>
                    <Sparkles size={16} /> 1. Pembukaan & Descriptive Analytics (Apa yang Terjadi?)
                  </h4>
                  <ul className={styles.scriptList}>
                    <li>
                      <strong>Ringkasan Periode:</strong> "Selamat pagi/siang rekan-rekan dan Bapak/Ibu dosen. 
                      Dari analisis terhadap 6.778 baris penjualan frozen food (Apr–Sep 2020), total omzet tercatat sebesar <strong>Rp 4,53 Miliar</strong>."
                    </li>
                    <li>
                      <strong>Puncak Penjualan Agustus:</strong> "Bulan Agustus mencatat rekor omzet tertinggi sebesar <strong>Rp 883,31 Juta (+8,9% dari Juli)</strong>, 
                      jauh melampaui rata-rata bulanan sebesar Rp 755 Juta."
                    </li>
                    <li>
                      <strong>Anomali Volume:</strong> "Menariknya, meskipun omzet Agustus meningkat, jumlah baris transaksi justru <strong>turun 19,4%</strong> (dari 1.325 ke 1.068 baris). 
                      Kenaikan omzet murni didorong oleh lonjakan nilai per transaksi (+35,1%), bukan karena volume order bertambah."
                    </li>
                    <li>
                      <strong>Produk Juara:</strong> "Produk <strong>MIN-001 (Minaku Otak-Otak 500g)</strong> mendominasi dengan kontribusi <strong>21,4% (Rp 967,7 Juta)</strong> 
                      dari seluruh omzet, dan menyerap 32,5% omzet Agustus."
                    </li>
                  </ul>
                </div>

                <div className={styles.scriptSection}>
                  <h4 className={styles.scriptSectionTitle}>
                    <AlertTriangle size={16} /> 2. Diagnostic Analytics (Mengapa Terjadi & Akar Masalahnya?)
                  </h4>
                  <ul className={styles.scriptList}>
                    <li>
                      <strong>Akar Masalah Lonjakan Agustus (Outlier Kuantitas):</strong> "Ketika ditelusuri penyebabnya, 
                      median pesanan MIN-001 satuan DUS adalah <strong>3 DUS</strong>. 
                      Namun di bulan Agustus, terdapat 3 pesanan grosir raksasa dari 2 pembeli: 
                      <strong>{buyerSutarmuji} (200 DUS, 2 kali transaksi)</strong> dan <strong>{buyerRohmat} (150 DUS)</strong>. 
                      Kuantitas ini <strong>50x hingga 67x lipat</strong> dari pembelian kebanyakan pembeli, dengan nilai gabungan <strong>Rp 172,15 Juta (19,5% omzet Agustus)</strong>."
                    </li>
                    <li>
                      <strong>Ilusi Pertumbuhan Pasar:</strong> "Jika ketiga transaksi tersebut dikeluarkan, omzet riil Agustus sebenarnya hanya <strong>Rp 711,16 Juta</strong>, 
                      yang artinya <strong>TURUN 12,3% dari bulan Juli</strong>. Kenaikan Agustus bukan karena pertumbuhan pasar retail, melainkan anomali 2 akun pembeli."
                    </li>
                    <li>
                      <strong>Penyebab Anjloknya September:</strong> "Penurunan omzet September (-15,4% / turun Rp 136,2 Juta) juga terdiagnosa karena {buyerSutarmuji} tidak belanja ulang sama sekali (Rp 0), 
                      sedangkan penjualan ke seluruh pelanggan reguler lainnya justru naik +3,7%."
                    </li>
                    <li>
                      <strong>Risiko Ketergantungan Pembeli:</strong> "Sebanyak <strong>6 dari 10 produk utama</strong> memiliki lebih dari 50% penjualannya hanya bergantung pada SATU pembeli tunggal. 
                      Dan 10 pembeli teratas menguasai 53,0% omzet perusahaan."
                    </li>
                  </ul>
                </div>

                <div className={styles.scriptSection}>
                  <h4 className={styles.scriptSectionTitle}>
                    <TrendingUp size={16} /> 3. Rekomendasi Solusi Bisnis
                  </h4>
                  <ul className={styles.scriptList}>
                    <li>
                      <strong>Key Account Retention:</strong> Terapkan program insentif kontrak B2B khusus untuk akun grosir seperti {buyerSutarmuji} & {buyerRohmat} agar pasokan dan pesanan berulang tetap terjaga.
                    </li>
                    <li>
                      <strong>Diversifikasi Pembeli:</strong> Perluas basis pelanggan untuk produk-produk yang rentan ketergantungan guna menghindari volatilitas cash flow saat pelanggan kunci berhenti belanja.
                    </li>
                    <li>
                      <strong>Strategi Bundling:</strong> Kembangkan paket promo bundling lauk beku komplementer (seperti Okey Sosis & Stick yang memiliki lift score 4.3x).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                💡 Tip: Bacakan poin-poin di atas dengan tempo tenang dan artikulasi jelas saat presentasi di kelas/forum.
              </span>
              <button 
                type="button" 
                className={styles.copyBtn}
                onClick={copyToClipboard}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Naskah Berhasil Disalin!" : "Salin Naskah Presentasi"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
