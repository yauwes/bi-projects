# BI Projects: Frozen Food Sales Analytics & Monitoring Dashboard

Dashboard Business Intelligence interaktif yang berfokus penuh pada **visualisasi monitoring data transaksi penjualan Frozen Food** periode **April – September 2020** (6.778 baris transaksi senilai **Rp 4,53 Miliar**).

🌐 **Demo Live di GitHub Pages:** [https://yauwes.github.io/bi-projects/](https://yauwes.github.io/bi-projects/)  
Repository Fork: [https://github.com/yauwes/bi-projects](https://github.com/yauwes/bi-projects) (Forked from [farhanwew/bi-projects](https://github.com/farhanwew/bi-projects))

---

## 🎙️ Naskah Presentasi Perwakilan Kelompok (Siap Angkat Tangan & Diutarakan)

Bagian ini disediakan secara terpisah di README sebagai panduan berbicara bagi perwakilan kelompok saat sesi presentasi di kelas / forum:

> *"Selamat pagi/siang Bapak/Ibu Dosen dan rekan-rekan sekalian.*  
> *Perkenankan perwakilan dari kelompok kami untuk angkat tangan dan mengutarakan hasil temuan **Business Intelligence** dari analisis 6.778 transaksi penjualan Frozen Food periode April hingga September 2020 (total omzet tercatat **Rp 4,53 Miliar**):*
>
> ### 📊 1. Temuan Descriptive Analytics (Apa yang Terjadi?)
> 1. **Puncak Omzet Agustus:** Omzet bulanan mencapai rekor tertinggi pada **Agustus 2020 sebesar Rp 883,31 Juta** (+8,9% dari Juli, dan +17,0% di atas rata-rata bulanan Rp 755,05 Juta).
> 2. **Anomali Volume Transaksi:** Meskipun omzet naik, jumlah transaksi/baris barang di bulan Agustus justru **turun 19,4%** (dari 1.325 menjadi 1.068 baris). Artinya, lonjakan omzet berasal dari nilai per transaksi yang melonjak tajam (+35,1% per baris), bukan penambahan frekuensi pesanan.
> 3. **Dominasi Produk MIN-001 (Minaku Otak-Otak 500g):** Produk ini menyumbang **Rp 967,69 Juta (21,4% total omzet 6 bulan)** dan meroket menjadi **32,5% omzet Agustus** (Rp 287,48 Juta).
> 4. **Prinsip Pareto:** Sebanyak 10 pelanggan teratas (5,5% pelanggan) menguasai **53,0% seluruh omzet bisnis**, dan hanya 40 produk (13,5%) yang menyumbang 80% omzet.
>
> ---
>
> ### 🔍 2. Temuan Diagnostic Analytics (Mengapa Terjadi & Akar Masalahnya?)
> 1. **Akar Lonjakan Agustus (Outlier Kuantitas Pembelian Ekstrem):**
>    - Median kuantitas pesanan normal untuk produk MIN-001 satuan DUS adalah **3 DUS**.
>    - Namun di bulan Agustus terdeteksi **3 baris transaksi jumbo dari 2 orang pembeli**:
>      - **Pak Sutarmuji (3 Agustus):** 200 DUS (Rp 63.200.000)
>      - **Pak Sutarmuji (13 Agustus):** 200 DUS (Rp 63.200.000)
>      - **Mas Rohmat (3 Agustus):** 150 DUS (Rp 45.750.000)
>    - Kuantitas pesanan 150–200 DUS ini adalah **50× hingga 67× lipat dari median pembelian kebanyakan pelanggan**! Gabungan ketiga transaksi ini bernilai **Rp 172,15 Juta atau menyumbang 19,5% dari omzet Agustus**.
> 2. **Ilusi Kenaikan Pasar (Dekomposisi Penjualan):**
>    - Jika 3 transaksi jumbo tersebut dikeluarkan, omzet Agustus sebenarnya hanya **Rp 711,16 Juta**, yang artinya **TURUN 12,3% dari bulan Juli** (Rp 811,36 Juta).
>    - *Diagnosa:* Permintaan pasar reguler di bulan Agustus sebenarnya melemah, tetapi tertutupi oleh order grosir 2 akun pembeli.
> 3. **Penyebab Anjloknya Omzet September (-15,4%):**
>    - Penurunan September sebesar Rp 136,23 Juta bukan karena krisis pasar umum, melainkan karena **Pak Sutarmuji tidak melakukan repeat order sama sekali (Rp 0)** dan Mas Rohmat hanya belanja normal Rp 9,27 Juta. Penjualan ke seluruh pelanggan lain justru naik +3,7% (dari Rp 711,2 Jt ke Rp 737,8 Jt).
> 4. **Risiko Ketergantungan Pembeli Tunggal (Single Buyer Dependency):**
>    - **6 dari 10 produk dengan omzet terbesar** memiliki lebih dari 50% penjualannya hanya bergantung pada satu pelanggan tunggal.
>
> ---
>
> ### 💡 3. Rekomendasi Solusi Bisnis
> - **Key Account Retention:** Berikan kontrak suplai khusus B2B untuk pembeli volume besar seperti Pak Sutarmuji & Mas Rohmat agar pesanan berulang tetap stabil.
> - **Diversifikasi Produk Kunci:** Perluas basis pembeli untuk produk yang >50% transaksinya bergantung pada single buyer.
> - **Paket Bundling:** Kembangkan promo bundling lauk beku komplementer (seperti Okey Sosis + Okey Stick yang memiliki *lift score* 4.3× di atas frekuensi acak).
>
> *Sekian temuan dari kelompok kami, terima kasih!"*

---

## 📊 Fitur Visualisasi Dashboard Business Intelligence & EDA

Dashboard dirancang sebagai solusi Business Intelligence eksekutif dan Exploratory Data Analysis (EDA) yang komprehensif, interaktif, dan responsif:

1. **Perspektif Monitoring Interaktif (5 Tab Navigasi):**
   - `🌐 Semua Visualisasi`: Menampilkan seluruh analitik secara menyeluruh dan terpadu.
   - `⭐ Temuan & Presentasi`: Kartu ringkasan eksekutif temuan Descriptive & Diagnostic Analytics, rekomendasi bisnis, dan tombol pembuka naskah presentasi.
   - `📊 Monitoring Deskriptif`: Memfokuskan grafik pada tren omzet bulanan & harian, Pareto pelanggan & produk teratas, pola hari kerja, dan siklus tanggal.
   - `🔍 Diagnostik & Anomali`: Memfokuskan grafik pada dekomposisi lonjakan Agustus, deteksi outlier kuantitas pesanan, analisis ketergantungan single-buyer, kohort pelanggan, dan market basket lift score.
   - `📋 Audit Kualitas Data (EDA)`: Analisis integritas dataset (77 baris anomali diskon Rp 4,44 Jt, 58 baris transaksi Rp 0, 73 baris duplikat, variasi penamaan pelanggan, dan heterogenitas satuan).
2. **Interactive Outlier Simulator (Simulasi Skenario Normal):**
   - Tombol toggle instan di header: beralih antara `🟢 Mode: Data Asli` dan `🔵 Mode: Simulasi Normal`.
   - Ketika simulasi aktif, 3 order jumbo MIN-001 (Rp 172,15 Jt) dikecualikan secara reaktif, membuktikan secara visual bahwa omzet Agustus terkontraksi menjadi Rp 711,16 Jt (-12,3% vs Juli).
3. **Visual Dekomposisi Penjualan Agustus:**
   - Membandingkan bar visual omzet tercatat (Rp 883,31 Jt), kontribusi 3 transaksi jumbo (Rp 172,15 Jt / 19,5%), dan omzet riil tanpa outlier (Rp 711,16 Jt).
   - Tabel interaktif 3 transaksi outlier dengan indikator rasio terhadap median (50×–67× median).
4. **Visual Histogram Distribusi Kuantitas & Deteksi Outlier:**
   - Grafik batang yang memvisualisasikan persebaran ukuran pesanan (median 3 DUS) dan lonjakan bar outlier ekstrem pada kelompok `>100 DUS`.
5. **Modal Naskah Presentasi Siap Pakai:**
   - Tombol `🎙️ Naskah Presentasi` membuka dialog terformat rapi dengan tombol salin (1-click copy to clipboard) untuk perwakilan kelompok.
6. **Interactive Filters:**
   - Filter rentang tanggal fleksibel (DateRangePicker) dan quick-filter per bulan (ChipGroup).
   - Toggle nama pelanggan: beralih instan antara **Nama Asli Dataset** (*Pak Sutarmuji, Mas Rohmat*) dan **Nama Disamarkan** (*Pelanggan 002, Pelanggan 004*).

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
Pipeline GitHub Actions di `.github/workflows/deploy-frozen-food.yml` otomatis membangun dan mendeploy dashboard ke GitHub Pages setiap ada commit baru di branch `main`.
