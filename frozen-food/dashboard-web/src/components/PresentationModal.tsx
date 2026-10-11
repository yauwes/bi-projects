import React, { useState } from "react";
import { Copy, Check, X, Mic, Volume2 } from "lucide-react";
import styles from "./PresentationModal.module.css";

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMasked: boolean;
}

export function PresentationModal({ isOpen, onClose, isMasked }: PresentationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const buyerSutarmuji = isMasked ? "Pelanggan 002" : "Pak Sutarmuji";
  const buyerRohmat = isMasked ? "Pelanggan 004" : "Mas Rohmat";

  const scriptText = `Selamat pagi/siang Bapak/Ibu Dosen dan rekan-rekan sekalian.
Perkenankan perwakilan dari kelompok kami untuk angkat tangan dan mengutarakan hasil temuan Business Intelligence dari analisis 6.778 baris transaksi penjualan Frozen Food periode April hingga September 2020 (total omzet tercatat Rp 4,53 Miliar):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 1. TEMUAN DESCRIPTIVE ANALYTICS (Apa yang Terjadi?)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Puncak Omzet Agustus:
   Omzet bulanan mencapai rekor tertinggi pada Agustus 2020 sebesar Rp 883,31 Juta (+8,9% dari Juli, dan +17,0% di atas rata-rata bulanan Rp 755,05 Juta).

2. Anomali Volume vs Nilai Transaksi:
   Meskipun omzet naik, jumlah transaksi/baris barang di bulan Agustus justru TURUN 19,4% (dari 1.325 menjadi 1.068 baris). Artinya, lonjakan omzet berasal dari nilai per transaksi yang melonjak tajam (+35,1% per baris), bukan penambahan frekuensi pesanan.

3. Dominasi Produk MIN-001 (Minaku Otak-Otak 500g):
   Produk ini menyumbang Rp 967,69 Juta (21,4% total omzet 6 bulan) dan meroket menjadi 32,5% omzet Agustus (Rp 287,48 Juta).

4. Prinsip Pareto:
   Sebanyak 10 pelanggan teratas (5,5% pelanggan) menguasai 53,0% seluruh omzet bisnis, dan hanya 40 produk (13,5%) yang menyumbang 80% omzet.

5. Pola Temporal:
   Hari Senin dan Sabtu adalah hari dengan omzet terbesar. Akhir bulan (tanggal 21-31) menyerap 38% total omzet.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 2. TEMUAN DIAGNOSTIC ANALYTICS (Mengapa Terjadi & Akar Masalahnya?)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Akar Lonjakan Agustus (Outlier Kuantitas Pembelian Ekstrem):
   - Median kuantitas pesanan normal untuk produk MIN-001 satuan DUS adalah 3 DUS.
   - Namun di bulan Agustus terdeteksi 3 baris transaksi jumbo dari 2 orang pembeli:
     * ${buyerSutarmuji} (3 Agustus): 200 DUS (Rp 63.200.000) -> 67× median!
     * ${buyerSutarmuji} (13 Agustus): 200 DUS (Rp 63.200.000) -> 67× median!
     * ${buyerRohmat} (3 Agustus): 150 DUS (Rp 45.750.000) -> 50× median!
   - Kuantitas 150–200 DUS ini adalah 50× hingga 67× lipat dari median pembelian kebanyakan pelanggan! Gabungan ketiga transaksi ini bernilai Rp 172,15 Juta atau menyumbang 19,5% dari omzet Agustus.

2. Ilusi Kenaikan Pasar (Dekomposisi Penjualan):
   - Jika 3 transaksi jumbo tersebut dikeluarkan, omzet Agustus sebenarnya hanya Rp 711,16 Juta, yang artinya TURUN 12,3% dari bulan Juli (Rp 811,36 Juta).
   - Diagnosa: Permintaan pasar reguler di bulan Agustus sebenarnya melemah, tetapi tertutupi oleh order grosir 2 akun pembeli.

3. Penyebab Anjloknya Omzet September (-15,4%):
   - Penurunan September sebesar Rp 136,23 Juta bukan karena krisis pasar umum, melainkan karena ${buyerSutarmuji} tidak melakukan repeat order sama sekali (Rp 0) dan ${buyerRohmat} hanya belanja normal Rp 9,27 Juta.
   - Penjualan ke seluruh pelanggan lain justru naik +3,7% (dari Rp 711,2 Jt ke Rp 737,8 Jt).

4. Risiko Ketergantungan Pembeli Tunggal (Single Buyer Dependency):
   - 6 dari 10 produk dengan omzet terbesar memiliki lebih dari 50% penjualannya hanya bergantung pada satu pelanggan tunggal (misal Baso Ikan Super 100% dari ${buyerRohmat}).

5. Asosiasi Keranjang Belanja:
   - Produk lintas merek Okey Sosis + Okey Stick memiliki lift score 4.3× di atas acak, membuktikan afinitas belanja paket yang kuat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 3. REKOMENDASI SOLUSI BISNIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Key Account Management & Retention:
   Berikan kontrak suplai khusus B2B dan jadwal pengiriman terjadwal untuk pembeli volume besar seperti ${buyerSutarmuji} & ${buyerRohmat} agar pesanan berulang tetap stabil.
2. Diversifikasi Produk Kunci:
   Perluas basis pembeli untuk 6 SKU produk yang >50% transaksinya bergantung pada single buyer.
3. Paket Bundling:
   Kembangkan promo bundling lauk beku komplementer (seperti Okey Sosis + Okey Stick).

Sekian temuan dari kelompok kami, terima kasih!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconBadge}>
              <Mic size={20} className={styles.micIcon} />
            </div>
            <div>
              <h2 className={styles.title}>Naskah Presentasi Perwakilan Kelompok</h2>
              <p className={styles.subtitle}>Panduan berbicara siap pakai saat sesi presentasi kelas / rapat evaluasi</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              title="Salin seluruh teks naskah ke clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Salin Naskah</span>
                </>
              )}
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Tutup">
              <X size={20} />
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.introBox}>
            <Volume2 size={18} className={styles.introIcon} />
            <span>
              Naskah ini telah dioptimalkan secara retorika: langsung to-the-point, kaya angka konkret, dan membedakan secara tegas temuan <strong>Deskriptif</strong> vs <strong>Diagnostik</strong>.
            </span>
          </div>

          <pre className={styles.scriptPre}>{scriptText}</pre>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerNote}>Tips: Gunakan tombol "Salin Naskah" untuk membagikan teks ini ke anggota tim di grup WhatsApp / catatan pribadi.</span>
          <button type="button" className={styles.primaryBtn} onClick={onClose}>Selesai</button>
        </footer>
      </div>
    </div>
  );
}
