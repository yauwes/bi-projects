import React from "react";
import { 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Lightbulb, 
  Mic, 
  SlidersHorizontal,
  Package, 
  Users, 
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import type { Analysis } from "../analytics";
import { jt, rp, one, pct } from "../format";
import styles from "./ExecutiveFindings.module.css";

interface ExecutiveFindingsProps {
  analysis: Analysis;
  isMasked: boolean;
  excludeOutliers: boolean;
  onToggleOutliers: () => void;
  onOpenPresentation: () => void;
}

export function ExecutiveFindings({
  analysis,
  isMasked,
  excludeOutliers,
  onToggleOutliers,
  onOpenPresentation
}: ExecutiveFindingsProps) {
  const buyerSutarmuji = isMasked ? "Pelanggan 002" : "Pak Sutarmuji";
  const buyerRohmat = isMasked ? "Pelanggan 004" : "Mas Rohmat";

  const aug = analysis.months.find(m => m.month === 8);
  const jul = analysis.months.find(m => m.month === 7);
  const sep = analysis.months.find(m => m.month === 9);

  return (
    <div className={styles.container}>
      {/* Top Banner / Actions */}
      <div className={styles.topCard}>
        <div className={styles.topInfo}>
          <div className={styles.badgeRow}>
            <span className={styles.badgePill}>Kecerdasan Bisnis</span>
            <span className={styles.badgePillHighlight}>Laporan Komprehensif EDA & BI</span>
          </div>
          <h2 className={styles.topHeading}>Temuan Kunci Descriptive & Diagnostic Analytics</h2>
          <p className={styles.topSub}>
            Hasil sintesis analitis dari 6.778 transaksi penjualan Frozen Food (April – September 2020 senilai Rp 4,53 Miliar).
          </p>
        </div>
        <div className={styles.topActions}>
          <button
            type="button"
            className={styles.speechBtn}
            onClick={onOpenPresentation}
            title="Buka naskah bicara siap pakai untuk perwakilan kelompok"
          >
            <Mic size={18} />
            <span>🎙️ Naskah Presentasi Siap Pakai</span>
          </button>
          <button
            type="button"
            className={`${styles.simBtn} ${excludeOutliers ? styles.simBtnActive : ""}`}
            onClick={onToggleOutliers}
            title="Ubah mode antara menyertakan outlier atau simulasi normalisasi"
          >
            <SlidersHorizontal size={18} />
            <span>{excludeOutliers ? "Mode: Simulasi Normal" : "Mode: Data Asli"}</span>
          </button>
        </div>
      </div>

      {/* Grid of Finding Cards */}
      <div className={styles.grid}>
        {/* CARD 1: Descriptive Analytics */}
        <section className={`${styles.card} ${styles.cardDesc}`} aria-label="Temuan Descriptive Analytics">
          <header className={styles.cardHeader}>
            <div className={styles.headerTitle}>
              <div className={styles.iconCircleDesc}>
                <TrendingUp size={20} />
              </div>
              <div>
                <span className={styles.cardCat}>Descriptive Analytics</span>
                <h3 className={styles.cardTitle}>Apa yang Terjadi? (What Happened)</h3>
              </div>
            </div>
            <span className={styles.badgeDesc}>Fakta Data</span>
          </header>

          <div className={styles.findingList}>
            {/* Finding 1 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIcon}>
                <ArrowUpRight size={18} className={styles.upIcon} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Puncak Omzet Agustus: +17,0% di Atas Rata-Rata Bulanan</strong>
                  <span className={styles.pillStat}>Rp 883,31 Juta</span>
                </div>
                <p className={styles.findingText}>
                  Penjualan tertinggi terjadi pada bulan Agustus 2020 (+8,9% MoM dari Juli Rp 811,36 Jt, dan +17,0% di atas rata-rata 6 bulan Rp 755,05 Jt).
                </p>
              </div>
            </div>

            {/* Finding 2 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIcon}>
                <ArrowDownRight size={18} className={styles.downIcon} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Anomali Volume: Transaksi Turun -19,4%, Nilai per Baris Naik +35,1%</strong>
                  <span className={styles.pillStat}>Rp 827 rb / baris</span>
                </div>
                <p className={styles.findingText}>
                  Jumlah baris barang di bulan Agustus justru berkurang dari 1.325 menjadi 1.068 baris (-19,4%). Kenaikan omzet didorong oleh lonjakan nilai per transaksi, bukan frekuensi pesanan.
                </p>
              </div>
            </div>

            {/* Finding 3 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIcon}>
                <Package size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Dominasi Produk MIN-001 (Minaku Otak-Otak 500g)</strong>
                  <span className={styles.pillStat}>21,4% Total Omzet</span>
                </div>
                <p className={styles.findingText}>
                  Menghasilkan total Rp 967,69 Juta sepanjang periode, dan di bulan Agustus melonjak tajam menjadi 32,5% dari seluruh penjualan bulan tersebut (Rp 287,48 Juta).
                </p>
              </div>
            </div>

            {/* Finding 4 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIcon}>
                <Users size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Prinsip Pareto: Top 10 Pembeli Kuasai 53,0% Omzet</strong>
                  <span className={styles.pillStat}>5,5% Pembeli = 53%</span>
                </div>
                <p className={styles.findingText}>
                  Hanya 10 pelanggan dari 181 pembeli aktif yang menghasilkan separuh lebih dari seluruh pendapatan bisnis. Selain itu, hanya 40 produk (13,5%) yang menyumbang 80% omzet.
                </p>
              </div>
            </div>

            {/* Finding 5 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIcon}>
                <Calendar size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Pola Waktu: Puncak Hari Kerja & Akhir Bulan</strong>
                  <span className={styles.pillStat}>38% Akhir Bulan</span>
                </div>
                <p className={styles.findingText}>
                  Hari Senin (Rp 867 Jt) dan Sabtu (Rp 890 Jt) menyerap transaksi tertinggi (Minggu tutup operasional). Tanggal 21–31 menyerap 38% omzet total mencerminkan siklus restok bulanan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARD 2: Diagnostic Analytics */}
        <section className={`${styles.card} ${styles.cardDiag}`} aria-label="Temuan Diagnostic Analytics">
          <header className={styles.cardHeader}>
            <div className={styles.headerTitle}>
              <div className={styles.iconCircleDiag}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <span className={styles.cardCat}>Diagnostic Analytics</span>
                <h3 className={styles.cardTitle}>Mengapa Terjadi? (Why It Happened)</h3>
              </div>
            </div>
            <span className={styles.badgeDiag}>Akar Masalah</span>
          </header>

          <div className={styles.findingList}>
            {/* Finding 1 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIconDiag}>
                <AlertTriangle size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Akar Lonjakan: 3 Transaksi Jumbo Outlier Ekstrem</strong>
                  <span className={styles.pillDanger}>50×–67× Median</span>
                </div>
                <p className={styles.findingText}>
                  Median pembelian MIN-001 normal adalah <strong>3 DUS</strong>. Namun di Agustus muncul 3 baris order raksasa dari 2 akun pembeli: {buyerSutarmuji} (2× 200 DUS) dan {buyerRohmat} (150 DUS). Kuantitas ini berjarak 50× sampai 67× dari kebiasaan pasar!
                </p>
              </div>
            </div>

            {/* Finding 2 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIconDiag}>
                <Layers size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Ilusi Kenaikan Pasar: Tanpa Outlier, Agustus Justru Turun -12,3%</strong>
                  <span className={styles.pillDanger}>Rp 711,16 Juta Riil</span>
                </div>
                <p className={styles.findingText}>
                  Ketiga pesanan jumbo tersebut bernilai Rp 172,15 Juta (19,5% omzet Agustus). Tanpa kedua pembeli grosir ini, omzet Agustus sebenarnya hanya Rp 711,16 Jt (turun 12,3% dari Juli). Permintaan pasar reguler sesungguhnya melemah.
                </p>
              </div>
            </div>

            {/* Finding 3 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIconDiag}>
                <ArrowDownRight size={18} className={styles.downIcon} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Penyebab Anjloknya September (-15,4%): Churn Pembeli Jumbo</strong>
                  <span className={styles.pillDanger}>{buyerSutarmuji} = Rp 0</span>
                </div>
                <p className={styles.findingText}>
                  Penurunan September bukan karena krisis pelanggan umum, melainkan {buyerSutarmuji} tidak belanja sama sekali (Rp 0) dan {buyerRohmat} kembali ke pola normal (Rp 9,27 Jt). Penjualan ke seluruh pembeli lainnya justru tumbuh +3,7%!
                </p>
              </div>
            </div>

            {/* Finding 4 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIconDiag}>
                <Users size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Risiko Ketergantungan Pembeli Tunggal (Single Buyer Dependency)</strong>
                  <span className={styles.pillDanger}>6 dari 10 Produk</span>
                </div>
                <p className={styles.findingText}>
                  6 dari 10 produk dengan omzet terbesar memiliki &gt;50% penjualannya hanya bergantung pada satu pelanggan (misal: Baso Ikan Super 100% dibeli oleh {buyerRohmat}). Jika pembeli tersebut berhenti, penjualan produk ikut hilang seketika.
                </p>
              </div>
            </div>

            {/* Finding 5 */}
            <div className={styles.findingItem}>
              <div className={styles.findingIconDiag}>
                <Package size={18} />
              </div>
              <div className={styles.findingContent}>
                <div className={styles.findingHeading}>
                  <strong>Afinitas Keranjang Belanja: Cross-Selling Lintas Merek</strong>
                  <span className={styles.pillStat}>4.3× Lift Score</span>
                </div>
                <p className={styles.findingText}>
                  Produk seperti Okey Sosis + Okey Stick dibeli bersamaan jauh lebih sering daripada peluang acak (lift score 4.3×), menunjukkan pola belanja paket makanan beku komplementer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Business Recommendations Card */}
      <section className={styles.recomCard} aria-label="Rekomendasi Strategis Bisnis">
        <header className={styles.recomHeader}>
          <div className={styles.recomTitleGroup}>
            <div className={styles.recomIcon}>
              <Lightbulb size={20} />
            </div>
            <div>
              <h3 className={styles.recomTitle}>Rekomendasi Tindakan Strategis Bisnis</h3>
              <p className={styles.recomSubtitle}>Langkah terarah berbasis pembuktian analitis diagnostik</p>
            </div>
          </div>
        </header>

        <div className={styles.recomGrid}>
          <div className={styles.recomItem}>
            <div className={styles.recomBullet}><CheckCircle2 size={16} /></div>
            <div>
              <strong>Key Account Retention & Kontrak Pasokan B2B</strong>
              <p>Segera buat program kemitraan atau kontrak pasokan bertahap bagi pembeli besar seperti {buyerSutarmuji} dan {buyerRohmat} untuk menjamin kontinuitas repeat order dan mencegah fluktuasi omzet bulanan yang ekstrem.</p>
            </div>
          </div>

          <div className={styles.recomItem}>
            <div className={styles.recomBullet}><CheckCircle2 size={16} /></div>
            <div>
              <strong>Diversifikasi Pasar untuk 6 Produk Rentan</strong>
              <p>Produk yang &gt;50% penjualannya dikuasai satu pelanggan (seperti Baso Ikan Super) wajib dipromosikan ke restoran, katering, dan gerai ritel lain guna mereduksi risiko ketergantungan fatal.</p>
            </div>
          </div>

          <div className={styles.recomItem}>
            <div className={styles.recomBullet}><CheckCircle2 size={16} /></div>
            <div>
              <strong>Promo Bundling Keranjang Belanja Komplementer</strong>
              <p>Manfaatkan asosiasi kuat produk ber-lift score tinggi (seperti Okey Sosis & Stick) untuk membuat penawaran kombo paket hemat guna meningkatkan rata-rata belanja (basket size) pelanggan reguler.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
