# BI Projects: Frozen Food Sales Analytics & Monitoring Dashboard

Dashboard Business Intelligence interaktif modern yang berfokus penuh pada **visualisasi monitoring data transaksi penjualan Frozen Food** periode **April – September 2020** (6.778 baris transaksi senilai **Rp 4,53 Miliar**).

🌐 **Demo Live di GitHub Pages:** [https://yauwes.github.io/bi-projects/](https://yauwes.github.io/bi-projects/)  
Repository Fork: [https://github.com/yauwes/bi-projects](https://github.com/yauwes/bi-projects) (Forked from [farhanwew/bi-projects](https://github.com/farhanwew/bi-projects))

---

## 🎙️ Naskah Presentasi Perwakilan Kelompok (Siap Angkat Tangan & Diutarakan)

Bagian ini disediakan secara terpisah di README sebagai panduan berbicara komprehensif bagi perwakilan kelompok saat sesi presentasi kelas / rapat evaluasi bisnis:

> *"Selamat pagi/siang Bapak/Ibu Dosen dan rekan-rekan sekalian.*  
> *Perkenankan perwakilan dari kelompok kami untuk angkat tangan dan mengutarakan hasil temuan **Business Intelligence** dari analisis 6.778 transaksi penjualan Frozen Food periode April hingga September 2020 (total omzet tercatat **Rp 4,53 Miliar**):*
>
> ### 📊 1. Temuan Descriptive Analytics (Apa yang Terjadi?)
> 1. **Puncak Omzet Agustus:** Omzet bulanan mencapai rekor tertinggi pada **Agustus 2020 sebesar Rp 883,31 Juta** (+8,9% dari Juli, dan +17,0% di atas rata-rata bulanan Rp 755,05 Juta).
> 2. **Anomali Volume Transaksi:** Meskipun omzet naik, jumlah transaksi/baris barang di bulan Agustus justru **turun 19,4%** (dari 1.325 menjadi 1.068 baris). Artinya, lonjakan omzet berasal dari nilai per transaksi yang melonjak tajam (+35,1% per baris, dari Rp 612 rb ke Rp 827 rb), bukan penambahan frekuensi pesanan.
> 3. **Dominasi Produk MIN-001 (Minaku Otak-Otak 500g):** Produk ini menyumbang **Rp 967,69 Juta (21,4% total omzet 6 bulan)** dan meroket menjadi **32,5% omzet Agustus** (Rp 287,48 Juta).
> 4. **Prinsip Pareto:** Sebanyak 10 pelanggan teratas (5,5% pelanggan) menguasai **53,0% seluruh omzet bisnis**, dan hanya 40 produk (13,5%) yang menyumbang 80% omzet.
> 5. **Pola Temporal:** Hari Senin (Rp 867 Jt) dan Sabtu (Rp 890 Jt) menyerap omzet tertinggi (Minggu libur operasional). Tanggal 21–31 menyerap 38% omzet total mencerminkan siklus belanja akhir bulan.
>
> ---
>
> ### 🔍 2. Temuan Diagnostic Analytics (Mengapa Terjadi & Akar Masalahnya?)
> 1. **Akar Lonjakan Agustus (Outlier Kuantitas Pembelian Ekstrem):**
>    - Median kuantitas pesanan normal untuk produk MIN-001 satuan DUS adalah **3 DUS**.
>    - Namun di bulan Agustus terdeteksi **3 baris transaksi jumbo dari 2 orang pembeli**:
>      - **Pak Sutarmuji (3 Agustus):** 200 DUS (Rp 63.200.000) $\rightarrow$ **67× median**!
>      - **Pak Sutarmuji (13 Agustus):** 200 DUS (Rp 63.200.000) $\rightarrow$ **67× median**!
>      - **Mas Rohmat (3 Agustus):** 150 DUS (Rp 45.750.000) $\rightarrow$ **50× median**!
>    - Kuantitas pesanan 150–200 DUS ini adalah **50× hingga 67× lipat dari median pembelian kebanyakan pelanggan**! Gabungan ketiga transaksi ini bernilai **Rp 172,15 Juta atau menyumbang 19,5% dari omzet Agustus**.
> 2. **Ilusi Kenaikan Pasar (Dekomposisi Penjualan):**
>    - Jika 3 transaksi jumbo tersebut dikeluarkan, omzet Agustus sebenarnya hanya **Rp 711,16 Juta**, yang artinya **TURUN 12,3% dari bulan Juli** (Rp 811,36 Juta).
>    - *Diagnosa:* Permintaan pasar reguler di bulan Agustus sebenarnya melemah, tetapi tertutupi oleh order grosir 2 akun pembeli.
> 3. **Penyebab Anjloknya Omzet September (-15,4%):**
>    - Penurunan September sebesar Rp 136,23 Juta bukan karena krisis pasar umum, melainkan karena **Pak Sutarmuji tidak melakukan repeat order sama sekali (Rp 0 / churn)** dan Mas Rohmat hanya belanja normal Rp 9,27 Juta. Penjualan ke seluruh pelanggan lain justru naik +3,7% (dari Rp 711,2 Jt ke Rp 737,8 Jt).
> 4. **Risiko Ketergantungan Pembeli Tunggal (Single Buyer Dependency):**
>    - **6 dari 10 produk dengan omzet terbesar** memiliki lebih dari 50% penjualannya hanya bergantung pada satu pelanggan tunggal (misal Baso Ikan Super 100% dari Mas Rohmat).
> 5. **Asosiasi Keranjang Belanja (Market Basket Analysis):**
>    - Pasangan produk lintas merek **Okey Sosis + Okey Stick** memiliki *lift score* **4.3×** di atas frekuensi acak, membuktikan kebiasaan belanja paket lauk beku komplementer.
>
> ---
>
> ### 💡 3. Rekomendasi Solusi Bisnis
> - **Key Account Retention:** Berikan kontrak suplai khusus B2B untuk pembeli volume besar seperti Pak Sutarmuji & Mas Rohmat agar pesanan berulang tetap stabil.
> - **Diversifikasi Produk Kunci:** Perluas basis pembeli untuk 6 SKU produk yang >50% transaksinya bergantung pada single buyer.
> - **Paket Bundling:** Kembangkan promo bundling lauk beku komplementer (seperti Okey Sosis + Okey Stick yang memiliki *lift score* 4.3×).
>
> *Sekian temuan dari kelompok kami, terima kasih!"*

---

## 📋 Audit Kualitas Data & Exploratory Data Analysis (EDA)

Evaluasi reliabilitas teknis dataset dari 6 workbook Excel (`april 2020.xlsx` s.d. `sep 2020.xlsx`):

1. **Cakupan Dataset:** 6.778 total baris transaksi tercatat dengan nilai omzet bruto **Rp 4.530.330.620**.
2. **77 Baris Anomali Diskon / Selisih Perhitungan (1,1%):** Kolom `JUMLAH` tercatat lebih kecil dari hasil perkalian `QTY × HARGA`, dengan akumulasi selisih sebesar **Rp 4.436.797**. Contoh: baris 23 Agustus mencatat 27 Pack × Rp 28.900 = Rp 780.300, tetapi `JUMLAH` Rp 390.150 (diskon 50%). Dashboard selalu memakai nilai `JUMLAH` aktual kasir.
3. **58 Baris Transaksi Rp 0 (0,9%):** Baris tanpa nominal pendapatan, diidentifikasi sebagai sampel promosi, tester, bonus, atau penggantian barang rusak.
4. **73 Baris Transaksi Duplikat Identik:** Seluruh kolom (tanggal, pelanggan, barang, qty, harga, jumlah) sama persis pada hari yang sama tanpa nomor nota unik.
5. **Normalisasi Master Data Pelanggan:** Harmonisasi variasi nama toko (seperti prefix `C - TOKO...` vs `TOKO...` dan pergantian nama `(MITRAKU)`).
6. **Segmentasi Tier Prefix F:** Pelanggan dengan awalan `F -` memiliki tier harga khusus yang terbukti berbeda secara statistik dibanding pelanggan reguler.
7. **Heterogenitas Satuan Produk:** Produk dicatat dalam satuan berbeda (DUS, PACK, BAL, PAIL, KG) sehingga kuantitas dianalisis secara independen per satuan.

---

## 🎨 Fokus Antarmuka UI/UX Dashboard Monitoring

Halaman web dashboard berfokus murni pada **pengalaman visual monitoring eksekutif yang bersih, elegan, dan interaktif**:

1. **Header & Kontrol Interaktif Ringkas:**
   - **DateRangePicker:** Fleksibilitas memilih rentang tanggal kustom atau preset periode.
   - **ChipGroup Bulan:** Filter cepat per bulan (April – September).
   - **Tombol Reset:** Mengembalikan semua filter ke posisi semula dalam satu klik.
   - **Transparansi Dataset & Nama Asli:** Dashboard menggunakan seluruh data transaksi asli dan identitas pelanggan asli (*Pak Sutarmuji, Mas Rohmat, Toko Cita Rasa Baru*, dll.) secara langsung tanpa pengaburan nama.
2. **6 Kartu KPI Eksekutif Utama (Top Metrics):**
   - **Total Revenue:** Rp 4,53 Miliar (+12.5% vs Apr)
   - **Total Orders:** 6.778 Transaksi (+8.2% vs Apr)
   - **Customers:** 229 Toko & Mitra Aktif (+6.7% vs Apr)
   - **Avg. Order Value:** Rp 668.387 per nota (+3.1% vs Apr)
   - **Volume (Dus):** 19.820 Dus (+4.3% vs Apr)
   - **Active Products:** 297 SKU (+7.8% vs Apr)
3. **Navigasi Sidebar Bersih & Header Pintar (InsightHub Theme):**
   - **Sidebar Navigasi:** Mengadopsi arsitektur sidebar putih bersih modern (`#ffffff`) dengan logo gradien `InsightHub (Frozen Food BI)`, menu tab aktif lavender (`Overview`, `Analytics`, `Sales`, `Customers`, `Products`, `Marketing`, `Goals (3D)`, `Reports`), serta tombol `Download report` di bagian bawah.
   - **Top Header Bar:** Menampilkan breadcrumb halaman aktif, search bar dinamis (`Search anything...`), tombol pemilih tanggal interaktif (`📅 1 Apr – 30 Sep 2020`), switch mode tema (Light/Dark), bel notifikasi, dan profil avatar pengguna (*Owner Bisnis*).
4. **Tata Letak Bento Grid 3 Kolom (Sesuai Referensi UI/UX):**
   - **Kolom Kiri (Peta & Transaksi):**
     - **Global Overview:** Visualisasi bola dunia 3D relief interaktif dengan pin lokasi jaringan logistik cold storage dan pelanggan borongan utama (*Pak Sutarmuji*, *Mas Rohmat*, *Toko Cita Rasa Baru*, *Graha Sandeni*, dll.) lengkap dengan animasi denyut (*ripple pulse*).
     - **Revenue Overview:** Grafik batang ungu vertikal bulanan (Apr – Sep) dengan total pemasukan dan pertumbuhan.
     - **Recent Orders:** Tabel transaksi terverifikasi dengan Order ID, nama pembeli asli, produk, nominal, dan badge status (`Completed` hijau / `Processing` oranye).
   - **Kolom Tengah (Tren & Kategori):**
     - **Sales Trend:** Grafik kurva area ungu halus dengan gradien dan penanda puncak mengambang di bulan Agustus (`Rp 883,3 Jt`).
     - **Traffic Source (Kategori Produk):** Grafik donat multi-warna dengan total pesanan di bagian tengah (`6.778 Nota`) dan persentase kontribusi per kategori produk.
   - **Kolom Kanan (Produk & Aktivitas):**
     - **Top Products:** Daftar peringkat 1 s.d. 5 produk terlaris lengkap dengan thumbnail kemasan, kategori, omzet, dan persentase pertumbuhan hijau.
     - **Device Breakdown (Tipe Kemasan):** Diagram cincin pembagian satuan pesanan: Dus (58.6%), Pack (34.1%), Bal (7.3%).
     - **Activity Feed:** Catatan timeline transaksi terbaru, konfirmasi pelunasan, pendaftaran toko baru, dan armada cold chain.
5. **Dashboard 3 Dimensi Target Penjualan (`Target3DDashboard` / Tab Goals):**
   - **Data 3 Sumbu:** Menggabungkan dimensi **Waktu (Bulan)** pada sumbu X, **Kategori Produk** pada sumbu Y, dan **% Pencapaian Target** pada elevasi sumbu Z.
   - **Representasi Visual Intuitif:** Visualisasi matriks balok 3D isometrik dengan kode warna kinerja (🟢 *Tembus Target ≥100%*, 🟡 *Hampir Capai 85-99%*, 🔴 *Masih Kurang <85%*).
   - **Kontrol Perspektif Multi-Sudut:** Beralih mulus antara *Tampilan Balok 3D*, *Tabel Warna (Heatmap)*, dan *Performa Kategori*.
   - **Simulator Target Interaktif:** Slider target dinamis (Rp 500 Jt – Rp 1,1 Miliar/bulan) untuk mengevaluasi apakah hasil penjualan toko mampu mengejar target.
6. **Bahasa Ramah Pemilik Bisnis (Non-Teknis):**
   - Seluruh teks dan istilah statistik/data science telah disederhanakan ke bahasa operasional toko yang mudah dipahami pemilik bisnis: *Lift Score* menjadi *Kekuatan Pasangan / Beli Barengan*, *Single-Buyer Concentration* menjadi *Ketergantungan pada 1 Pembeli Terbesar*, *Outlier* menjadi *Pesanan Borongan Partai Besar*, dan *Kohort* menjadi *Langganan Baru vs Langganan Setia*.

---

## 🛠️ Menjalankan Dashboard Secara Lokal

```bash
cd frozen-food/dashboard-web
npm install
npm run dev
```

Untuk memverifikasi integrasi data dan build:
```bash
node --experimental-strip-types scripts/check.ts
npm run build
```

---

## 🚀 Deployment Otomatis ke GitHub Pages
Pipeline GitHub Actions di `.github/workflows/deploy-frozen-food.yml` otomatis membangun dan mendeploy dashboard ke GitHub Pages setiap ada commit baru di branch `main`.
