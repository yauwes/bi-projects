# BI Projects: Frozen Food Sales Analytics & Interactive Dashboard

Dashboard Business Intelligence interaktif untuk menganalisis data penjualan Frozen Food periode **April – September 2020** (6.778 transaksi senilai **Rp 4,53 Miliar**).

🌐 **Demo Live di GitHub Pages:** [https://yauwes.github.io/bi-projects/](https://yauwes.github.io/bi-projects/)  
Repository Fork: [https://github.com/yauwes/bi-projects](https://github.com/yauwes/bi-projects) (Forked from [farhanwew/bi-projects](https://github.com/farhanwew/bi-projects))

---

## 📌 Ringkasan Eksekutif & Temuan Utama (Executive Findings)

Dashboard ini dirancang khusus untuk menyajikan temuan **Descriptive Analytics (Apa yang Terjadi)** dan **Diagnostic Analytics (Mengapa Terjadi)** secara visual, interaktif, dan siap dipresentasikan di forum/kelas ("Mode Angkat Tangan & Diutarakan").

### 📊 1. Descriptive Analytics (Apa yang Terjadi?)
1. **Rekor Omzet Agustus 2020:**
   - Omzet mencapai puncaknya di bulan Agustus sebesar **Rp 883,31 Juta** (+8,9% dari Juli, dan +17,0% di atas rata-rata bulanan Rp 755,05 Juta).
   - **Anomali Volume Transaksi:** Meskipun omzet naik, jumlah baris produk yang terjual justru **turun 19,4%** (dari 1.325 menjadi 1.068 baris). Kenaikan omzet didorong oleh lonjakan nilai per transaksi (+35,1% per baris), bukan penambahan kuantitas order.
2. **Dominasi Produk Utama (MIN-001):**
   - Produk **MIN-001 (Minaku Otak Otak 500 gr × 20 Pack)** merupakan kontributor terbesar dengan total omzet **Rp 967,69 Juta (21,4% dari seluruh penjualan)**.
   - Pada bulan Agustus saja, MIN-001 menyumbang **Rp 287,48 Juta (32,5% omzet Agustus)**.
3. **Prinsip Pareto (80/20):**
   - **Pelanggan:** 10 pelanggan teratas (5,5% pelanggan) menguasai **53,0% total omzet**. Sebanyak 36 dari 181 pelanggan menyumbang 80% omzet.
   - **Produk:** Hanya 40 dari 297 produk (13,5%) yang menyumbang 80% omzet perusahaan.
4. **Pola Transaksi Berdasarkan Waktu:**
   - Transaksi paling padat terjadi di **akhir bulan (tanggal 21–31)**, menyerap 38% omzet bulanan (pola kulakan toko sebelum awal bulan).
   - Hari belanja tertinggi jatuh pada hari **Sabtu dan Jumat**; Minggu toko tutup.

---

### 🔍 2. Diagnostic Analytics (Mengapa Terjadi & Akar Masalahnya?)
1. **Akar Masalah Lonjakan Agustus (Outlier Kuantitas / Jumbo Orders):**
   - Median kuantitas pesanan produk MIN-001 dalam satuan DUS adalah **3 DUS**.
   - Namun di bulan Agustus, terdeteksi **3 transaksi raksasa dari 2 pembeli**:
     * **Pak Sutarmuji (03 Agu 2020):** 200 DUS (Rp 63.200.000)
     * **Pak Sutarmuji (13 Agu 2020):** 200 DUS (Rp 63.200.000)
     * **Mas Rohmat (03 Agu 2020):** 150 DUS (Rp 45.750.000)
   - Kuantitas pesanan ini mencapai **50× hingga 67× lipat dari median pembelian tipikal kebanyakan pelanggan**!
   - Ketiga transaksi ini bernilai total **Rp 172.150.000** atau menyumbang **19,5% dari seluruh omzet Agustus**.
2. **Dekomposisi Kenaikan Agustus (Ilusi Pertumbuhan Pasar):**
   - Jika 3 transaksi jumbo tersebut dikeluarkan dari perhitungan, omzet Agustus sebenarnya hanya **Rp 711,16 Juta**.
   - Angka ini **Rp 100,2 Juta (-12,3%) LEBIH RENDAH dibandingkan bulan Juli** (Rp 811,36 Juta)!
   - *Diagnosa:* Pasar secara umum di bulan Agustus sebenarnya sedang lesu/turun, namun tertutupi oleh order borongan 2 akun grosir.
3. **Penyebab Anjloknya Omzet September (-15,4%):**
   - Penurunan September (turun Rp 136,23 Juta) terdiagnosa murni akibat **hilangnya order borongan kedua pembeli outlier**:
     * Pak Sutarmuji tidak melakukan repeat order sama sekali di bulan September (Rp 0).
     * Mas Rohmat hanya berbelanja normal Rp 9,27 Juta.
   - Sementara itu, penjualan ke seluruh pelanggan reguler lainnya justru **tumbuh +3,7%** (dari Rp 711,16 Juta ke Rp 737,82 Juta).
4. **Risiko Ketergantungan Pembeli Tunggal (Single Buyer Dependency):**
   - **6 dari 10 produk dengan omzet terbesar** memiliki lebih dari 50% penjualannya hanya diserap oleh SATU pembeli tunggal.
5. **Diagnosa Substitusi Pasokan (Supply Chain Disruption):**
   - Kelangkaan stok kentang goreng *Lutosa* di bulan Agustus terdistribusi seketika ke produk substitusi merek *Bart's*.
6. **Market Basket Association (Bundling Lift):**
   - Pasangan produk Okey Sosis & Okey Stick dibeli bersamaan sebanyak 183 kali. Terdapat pasangan lintas merek dengan nilai lift **4.3× di atas peluang acak**, membuktikan tingginya perilaku pembelian paket komplementer.

---

### 🙋 3. Fitur Interaktif Dashboard
- **Executive Insights Center:** Tab kategori temuan (*Semua*, *Descriptive*, *Diagnostic*, *Outlier*).
- **🙋 Mode Angkat Tangan & Presentasikan (Mode Bicara):** Dialog siap baca berisi narasi presentasi perwakilan kelompok lengkap dengan tombol *Salin Naskah*.
- **Tabel & Visual Bar Dekomposisi Agustus:** Menampilkan breakdown resmi vs tanpa outlier.
- **Toggle Nama Pelanggan:** Tombol beralih antara *Nama Asli Dataset (Pak Sutarmuji, Mas Rohmat)* dan *Nama Disamarkan (Pelanggan 001, dst)*.
- **Filter Fleksibel:** Filter rentang tanggal, filter bulan cepat, serta grafik interaktif (Arc UI + Motion + Lucide).

---

## 🛠️ Menjalankan Dashboard Secara Lokal

```bash
cd frozen-food/dashboard-web
npm install
npm run dev
```

Untuk memverifikasi integrasi data:
```bash
node --experimental-strip-types scripts/check.ts
npm run build
```

---

## 🚀 Deployment Otomatis ke GitHub Pages
Repository ini dikonfigurasi dengan GitHub Actions (`.github/workflows/deploy-frozen-food.yml`). Setiap commit yang di-push ke branch `main` akan otomatis dibuild dan dideploy ke GitHub Pages.
