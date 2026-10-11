import React from "react";
import type { Analysis } from "../analytics";
import { jt } from "../format";
import styles from "./DiagnosticCharts.module.css";

interface DiagnosticChartsProps {
  analysis: Analysis;
  isMasked: boolean;
}

export function DiagnosticDecompositionCard({ analysis, isMasked }: DiagnosticChartsProps) {
  const augPeak = analysis.months.find(m => m.month === 8);
  const julMonth = analysis.months.find(m => m.month === 7);

  const augOmzetJt = augPeak ? augPeak.omzetJt : 883.31;
  const withoutTop3Jt = augPeak ? augPeak.tanpaTop3Jt : 711.16;
  const julOmzetJt = julMonth ? julMonth.omzetJt : 811.36;
  const diffJulPct = (((withoutTop3Jt / julOmzetJt) - 1) * 100).toFixed(1);

  const buyerSutarmuji = isMasked ? "Pelanggan 002" : "Pak Sutarmuji";
  const buyerRohmat = isMasked ? "Pelanggan 004" : "Mas Rohmat";

  return (
    <div className={styles.decompCard}>
      <div className={styles.cardHead}>
        <h3 style={{ margin: 0, fontSize: "var(--text-base)", fontWeight: 600, color: "var(--foreground)" }}>
          Dekomposisi Lonjakan Agustus: Omzet Resmi vs Anomali 3 Transaksi Outlier Jumbo
        </h3>
        <span className={styles.badgeDiag}>Diagnostik</span>
      </div>

      <div className={styles.decompBars}>
        <div className={styles.decompBarItem}>
          <div className={styles.decompBarLabel}>
            <span>1. Total Omzet Agustus Tercatat</span>
            <strong>100%</strong>
          </div>
          <div className={styles.decompBarTrack}>
            <div className={styles.decompBarFillMain} style={{ width: "100%" }} />
          </div>
          <span className={styles.decompBarValue}>Rp {jt(augOmzetJt)} Jt</span>
          <span className={styles.decompBarSub}>+8,9% dari Juli (Puncak Rekor)</span>
        </div>

        <div className={styles.decompBarItem}>
          <div className={styles.decompBarLabel}>
            <span>2. Nilai 3 Transaksi Jumbo (Outlier)</span>
            <strong style={{ color: "var(--danger)" }}>19,5%</strong>
          </div>
          <div className={styles.decompBarTrack}>
            <div className={styles.decompBarFillOutlier} style={{ width: "19.5%" }} />
          </div>
          <span className={styles.decompBarValue} style={{ color: "var(--danger)" }}>Rp 172,15 Jt</span>
          <span className={styles.decompBarSub}>Hanya 3 baris dari 1.068 baris</span>
        </div>

        <div className={styles.decompBarItem}>
          <div className={styles.decompBarLabel}>
            <span>3. Omzet Riil Tanpa 3 Transaksi Jumbo</span>
            <strong style={{ color: "var(--success)" }}>80,5%</strong>
          </div>
          <div className={styles.decompBarTrack}>
            <div className={styles.decompBarFillNormal} style={{ width: "80.5%" }} />
          </div>
          <span className={styles.decompBarValue}>Rp {jt(withoutTop3Jt)} Jt</span>
          <span className={styles.decompBarSub} style={{ color: "var(--danger)" }}>
            {diffJulPct}% di bawah omzet Juli (Rp {jt(julOmzetJt)} Jt)
          </span>
        </div>
      </div>

      <div className={styles.outlierTableWrapper}>
        <table className={styles.outlierTable}>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Pembeli</th>
              <th>Produk</th>
              <th>Kuantitas</th>
              <th>Median Normal</th>
              <th>Rasio vs Median</th>
              <th>Total Nilai (Rp)</th>
              <th>Porsi Omzet Agt</th>
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
          </tbody>
        </table>
      </div>

      <p className={styles.note}>
        💡 <strong>Diagnosa Data:</strong> Median pesanan produk MIN-001 satuan DUS adalah 3 DUS. Pesanan 150–200 DUS adalah outlier ekstrem (50×–67× median). 
        Tanpa 3 baris ini, penjualan Agustus sebenarnya turun 12,3% dari Juli; lonjakan Agustus berasal dari anomali 2 akun grosir, bukan ekspansi pasar ritel.
      </p>
    </div>
  );
}
