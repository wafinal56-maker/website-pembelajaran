# Laporan Audit dan Revisi — Website Pembelajaran HTML & CSS Semester 1

Tanggal audit: 9 November 2026
Ruang lingkup: `website/` (aplikasi pembelajaran), pembanding `semester-1/`
Status keseluruhan: **LULUS** untuk seluruh pengujian yang dijalankan
Status commit: **belum di-commit dan belum di-push** (menunggu persetujuan pemilik)

---

## 1. Ringkasan

Sistem pembelajaran di `website/index.html` telah dibangun ulang menjadi aplikasi
satu halaman yang menyajikan **18 pertemuan Semester 1** secara berurutan dan
kumulatif. Setiap pertemuan menambah bagian pada **satu proyek website yang sama**
(SMK Creative Hub), bukan potongan kode terpisah.

Setiap pertemuan memuat:

- identitas pertemuan, tujuan, keterampilan, durasi, prasyarat, dan status;
- materi singkat berbahasa Indonesia;
- tabel tag/atribut beserta fungsi dan alasannya;
- **9 langkah praktik**;
- kode **sebelum**, **tambahan**, dan **lengkap** yang dihitung otomatis;
- **pratinjau sebelum vs sesudah** di dalam iframe terisolasi;
- penanda visual elemen yang baru ditambahkan;
- target hasil, checklist, dan persiapan pertemuan berikutnya;
- penyelesaian eksplisit yang mengunci pertemuan berikutnya.

Desain, struktur halaman, dan identitas visual lama dipertahankan. Tidak ada
framework atau dependensi baru; seluruhnya HTML, CSS, dan JavaScript biasa.

---

## 2. File yang dibuat dan diubah

| File | Baris | Ukuran | Status | Keterangan |
|---|---:|---:|---|---|
| `website/index.html` | 87 | 4,4 KB | Diubah | Shell aplikasi: header, progres, sidebar, area materi, dialog layar penuh, toast, skip link |
| `website/css/app.css` | 512 | 20,8 KB | Baru | Gaya aplikasi, kode, pratinjau, dialog, checklist, responsif, reduced-motion |
| `website/js/data.js` | 2.135 | 96,3 KB | Baru | Sumber data tunggal: 18 pertemuan lengkap |
| `website/js/engine.js` | 355 | 13,8 KB | Baru | Pembangun proyek kumulatif, validasi edit, diff, highlighting, renderer pratinjau |
| `website/js/app.js` | 980 | 39,6 KB | Baru | Navigasi, progres, checklist, kode, pratinjau, mode guru, sinkronisasi URL |

Tidak ada perubahan pada:

- `semester-1/` — tetap menjadi hasil acuan Semester 1;
- `final-project/` — tetap menjadi hasil Semester 2;
- `DAFTAR_PERTEMUAN.txt`, `README.md`, `PETUNJUK.txt`, dan `index.html` di akar repo.

---

## 3. Arsitektur dan cara kerja

```
website/
├─ index.html          shell aplikasi
├─ css/app.css         tampilan aplikasi
└─ js/
   ├─ data.js          data 18 pertemuan (single source of truth)
   ├─ engine.js        mesin proyek kumulatif + diff + renderer pratinjau
   └─ app.js           UI, navigasi, progres, checklist, pratinjau
```

### 3.1 Model kode kumulatif

Kode tidak disimpan sebagai tiga salinan terpisah. Setiap pertemuan menyimpan
**operasi edit** (`create`, `insert`, `replace`, `append`, `setFile`) terhadap
proyek. Dari operasi tersebut, mesin menghitung otomatis:

- **Kode sebelum** — kondisi file sebelum pertemuan ini;
- **Tambahan** — baris yang ditambah/diganti pada pertemuan ini;
- **Kode lengkap** — isi file setelah pertemuan ini.

Dengan cara ini tidak ada `...` sebagai pengganti kode dan tidak ada perubahan
diam-diam terhadap kode sebelumnya. Bila suatu pertemuan perlu merapikan kode
lama, operasi `replace` menampilkan baris lama (merah) dan baris baru (hijau),
sehingga perubahan dapat dijelaskan.

### 3.2 Pratinjau

- Proyek dirender menjadi HTML utuh di dalam `iframe` dengan `sandbox="allow-scripts"`.
- Halaman yang tersedia: Beranda, Profil, Jurusan, Kegiatan, Galeri, Portofolio,
  Kontak. Tab hanya muncul untuk file yang sudah dibuat.
- Gambar `images/sekolah.svg` disematkan sebagai data URI agar pratinjau tetap
  berjalan tanpa server.
- Tautan antarhalaman di dalam pratinjau mengirim pesan ke aplikasi induk.
  Pesan hanya diterima bila membawa **token per-muatan** (`PREVIEW_TOKEN`),
  sehingga pesan dari iframe lain tidak dapat mengubah tampilan.
- Pratinjau mendukung perbandingan sebelum/sesudah, ukuran Desktop/Tablet/HP,
  dan layar penuh dengan pemilih halaman.

### 3.3 Progres dan penguncian

- Kunci penyimpanan baru: `creativeHubProgressV2`.
- Migrasi otomatis dari `creativeHubDone` (format lama) tanpa mengaktifkan mode guru.
- Persentase dihitung dari 18 pertemuan aktif.
- Pertemuan berikutnya terbuka **hanya setelah** pertemuan sebelumnya ditandai
  selesai melalui tombol eksplisit (seluruh checklist harus tercentang).
- Mengunjungi halaman tidak menambah progres.
- `?guru=1` atau tombol **Mode guru** membuka semua pertemuan untuk peninjauan.
- Tautan menuju `semester-1/` disembunyikan sampai seluruh 18 pertemuan selesai.

---

## 4. Pemenuhan kebutuhan

| Kebutuhan | Status | Bukti |
|---|---|---|
| Identitas pertemuan, tujuan, keterampilan, durasi, status | LULUS | 18/18 pertemuan memiliki semua field; tes render semua pertemuan |
| Materi sederhana berbahasa Indonesia | LULUS | `data.js` berisi intro, konsep, analogi, dan alasan |
| 9 langkah praktik | LULUS | Tes menghitung tepat 9 item `.step-list li` pada setiap pertemuan |
| Target hasil dan checklist | LULUS | 18/18 memiliki target dan checklist (4–5 item) |
| Kode sebelum / tambahan / lengkap | LULUS | Tab kode diuji; baris tambahan bertanda hijau |
| Kode kumulatif tanpa `...` | LULUS | Pencarian `...` pada tabel tag sudah dibersihkan; validasi course lolos |
| Pratinjau sebelum dan sesudah | LULUS | 2 iframe per pertemuan; `srcdoc` terisi |
| Penanda elemen baru | LULUS | `outline:3px dashed #d97706` ditemukan di pratinjau |
| Navigasi halaman dalam pratinjau | LULUS | Pesan bertoken berpindah tab ke Profil |
| Layar penuh dan pemilih halaman | LULUS | Dialog terbuka, berisi opsi halaman, dapat ditutup |
| Progres eksplisit, bukan kunjungan | LULUS | Tombol nonaktif sampai checklist lengkap; reload mempertahankan progres |
| Kunci pertemuan berurutan | LULUS | P3 terkunci, P2 terbuka setelah P1 selesai |
| Mode guru | LULUS | Membuka P18 dan menampilkan badge |
| Migrasi progres lama | LULUS | `creativeHubDone` → V2, tanpa mode guru |
| Tautan hasil terkunci sampai tuntas | LULUS | Header dan sidebar baru terbuka saat 18/18 selesai |
| Semester 1 saja; Semester 2 tersembunyi | LULUS | Hanya 18 pertemuan Semester 1 yang dirender |
| Struktur dapat diperluas | LULUS | `meta.semester`, `meta.totalLessons`, data terpisah dari mesin |
| Responsif tanpa overflow | LULUS | 1440, 768, dan 390 px tanpa scroll horizontal |
| Tanpa framework/dependensi baru | LULUS | Hanya HTML, CSS, JS biasa |

---

## 5. Hasil pengujian

Pengujian dilakukan di **Microsoft Edge headless** melalui Chrome DevTools
Protocol, dengan server lokal `python -m http.server 8765`.

### 5.1 Validasi data dan mesin

| Uji | Hasil |
|---|---|
| `Engine.validateCourse(COURSE_DATA)` | LULUS — `valid: true`, tanpa error |
| Jumlah pertemuan | LULUS — 18 |
| Kelengkapan field tiap pertemuan | LULUS — goals, skills, concepts, tags, steps, target, checklist, nextTeaser, preview semuanya 18/18 |
| Render proyek akhir P17 menjadi 8 file | LULUS — 7 HTML + 1 CSS |

### 5.2 Uji inti aplikasi (`cdp-test.js`)

**32 dari 32 LULUS**, antara lain:

- 18 pertemuan tampil dan judul P1 benar;
- dua iframe perbandingan, `srcdoc` terisi, skrip penutup ada;
- delapan bagian materi dan sembilan langkah;
- tab Tambahan menandai baris baru; Kode sebelum kosong pada P1;
- dialog layar penuh terbuka dan dapat ditutup;
- tombol selesai terkunci sebelum checklist, aktif setelah checklist;
- progres tersimpan, persentase menjadi 6%, P2 terbuka;
- P3 terkunci, progres bertahan setelah reload;
- mode guru membuka pertemuan terkunci;
- migrasi `creativeHubDone` berhasil;
- tautan hasil terbuka setelah 18/18 selesai;
- tidak ada error console/runtime.

### 5.3 Uji iframe dan geometri (`cdp-frame.js`)

**17 dari 17 LULUS**:

- iframe memuat tautan `data-page`, skrip `postMessage`, penanda elemen baru, dan token;
- pesan navigasi berpindah tab ke Profil, iframe sesudah ikut berganti, iframe sebelum tetap;
- desktop: sidebar + konten dua kolom, pratinjau berdampingan, tanpa overflow;
- tablet: sidebar satu kolom, tanpa overflow;
- HP: daftar pertemuan horizontal, pratinjau bertumpuk, iframe tidak melebihi viewport;
- tidak ada error console/runtime.

### 5.4 Uji seluruh 18 pertemuan (`cdp-all.js`)

**18 dari 18 pertemuan LULUS.** Setiap pertemuan memiliki:

- judul benar, 9 langkah, kode > 0 baris;
- 2 iframe, `srcdoc` > 500 karakter dan bukan pesan "belum dibuat";
- tab pratinjau sesuai jumlah halaman (1 → 7);
- tabel tag terisi dan checklist 4–5 item.

Tidak ada kegagalan dan tidak ada error console.

### 5.5 Tangkapan layar

Sembilan tangkapan layar tersimpan di
`C:\Users\aawav\AppData\Local\Temp\opencode\shots\`:

- `desktop-top`, `desktop-code`, `desktop-preview`;
- `tablet-top`, `tablet-code`, `tablet-preview`;
- `mobile-top`, `mobile-code`, `mobile-preview`.

Pemeriksaan geometri memastikan tidak ada overflow horizontal pada ketiga ukuran.

---

## 6. Perbedaan yang disengaja terhadap `semester-1/`

Proyek akhir hasil Pertemuan 18 **selaras** dengan `semester-1/`, tetapi tidak
identik byte-per-byte. Perbedaan berikut disengaja dan tidak mengubah
`semester-1/`:

| Item | Hasil kumulatif P18 | `semester-1/` | Alasan |
|---|---|---|---|
| `profil.html` | Memuat 3 paragraf formatting dari P4: `<strong>/<em>`, `<mark>`, `<small>` | Tidak memuat ketiganya | Materi P4 harus tetap tampil agar kumulatif; versi acuan diringkas |
| `jurusan.html` | Memuat daftar P5 "Daftar Program" dan "Langkah Belajar" | Tidak memuat daftar tersebut | Materi P5 harus tetap tampil; versi acuan diringkas |
| `jurusan.html` judul | `Jurusan — SMK Creative Hub` | `Program Keahlian — SMK Creative Hub` | Kosmetik; judul menu tetap "Jurusan" |
| `jurusan.html` tabel | `<h2>Tabel Program Keahlian</h2>` + tabel langsung | Dibungkus `.section-heading` + `.table-wrap` | Struktur hasil bertahap lebih sederhana |
| `portofolio.html` judul | `Portofolio — SMK Creative Hub` | `Portofolio Siswa — SMK Creative Hub` | Kosmetik |
| `kontak.html` | `<section class="section" id="kontak">` | Tanpa `id="kontak"` | Latihan anchor P9/P11 |
| Meta description | Spesifik per halaman | Umum ("Website pembelajaran SMK Creative Hub") | Kosmetik/SEO |
| `css/style.css` | Menambah `h1`, `.page-hero`, `.gallery-grid img` | Tidak memiliki ketiganya | Kelas dipakai halaman dalam dan galeri |
| `css/style.css` | Tidak memiliki `.semester-banner` | Memiliki `.semester-banner` | Banner hanya ada di halaman acuan `semester-1/` |

Selain perbedaan di atas, **isi dan teks** halaman Beranda, Kegiatan, Galeri,
Portofolio, dan Kontak identik dengan acuan (setelah banner, judul tab, dan meta
description diabaikan).

Jika pemilik menghendaki hasil P18 **persis** seperti `semester-1/`, langkah
yang perlu diambil adalah menyelaraskan lima hal berikut di `data.js`:
judul Jurusan/Portofolio, meta description, `id="kontak"`, pembungkus tabel
Jurusan, dan menghapus `.page-hero`/`.gallery-grid`/`h1` dari CSS. Namun itu
akan menghilangkan sebagian materi P4/P5 dari proyek kumulatif, sehingga
disarankan **tidak** dilakukan.

---

## 7. Catatan dan batasan

1. **Salin kode di headless Edge.** Uji otomatis menampilkan pesan
   "Kode tidak dapat disalin otomatis." karena clipboard dibatasi di mode
   headless. Di browser normal, tombol **Salin** memakai `navigator.clipboard`
   dan fallback `execCommand`. Perlu verifikasi manual singkat oleh pemilik.
2. **Pengujian hanya di Edge headless.** Perilaku browser lain (Firefox, Safari,
   Chrome mobile) belum diuji langsung, meskipun kode memakai API standar.
3. **Pratinjau memakai iframe `srcdoc`.** Tautan nyata ke file lain tidak dibuka
   di dalam iframe; navigasi ditangani melalui pesan bertoken ke aplikasi induk.
4. **P18 bersifat review.** Pertemuan 18 tidak menambah kode, sehingga pratinjau
   sebelum dan sesudah sama-sama menampilkan proyek P17. Ini sesuai tujuan
   pertemuan review.
5. **Penyimpanan lokal.** Progres tersimpan di `localStorage` perangkat. Mode
   privat atau pembatasan penyimpanan dapat menonaktifkan persistensi; aplikasi
   menampilkan toast bila penyimpanan gagal.
6. **Screenshot tidak diperiksa secara visual oleh model.** Validasi dilakukan
   melalui geometri, overflow, dan isi DOM. Pemilik tetap disarankan melihat
   tangkapan layar.

---

## 8. Status Git

```
 M website/index.html
?? website/css/
?? website/js/
```

- `website/index.html` diubah.
- `website/css/` dan `website/js/` masih belum dilacak.
- `semester-1/` dan `final-project/` tidak berubah.
- **Tidak ada commit atau push.** Sesuai instruksi, pekerjaan berhenti di tahap
  audit dan menunggu persetujuan pemilik.

---

## 9. Langkah review yang disarankan

1. Jalankan server lokal dari akar repo:

   ```
   python -m http.server 8765 --bind 127.0.0.1
   ```

2. Buka `http://127.0.0.1:8765/website/index.html`.
3. Periksa Pertemuan 1 → tandai selesai → pastikan Pertemuan 2 terbuka.
4. Buka `?guru=1` untuk meninjau seluruh 18 pertemuan tanpa mengunci.
5. Buka layar penuh pratinjau, coba Desktop/Tablet/HP dan pergantian halaman.
6. Bandingkan hasil akhir dengan `semester-1/` dan setujui perbedaan pada
   Bagian 6.
7. Bila setuju, beri instruksi eksplisit untuk commit/push.

---

## 10. Kesimpulan

Revisi memenuhi seluruh kebutuhan fungsional yang diminta. Sistem pembelajaran
kini kumulatif, dapat dipratinjau, memiliki perbandingan sebelum/sesudah,
menyimpan progres secara eksplisit, dan menjaga `semester-1/` maupun
`final-project/` tetap utuh.

**Status akhir: LULUS** untuk semua pengujian yang dijalankan, dengan catatan
terbuka pada Bagian 7. Pekerjaan belum di-commit atau di-push dan menunggu
keputusan pemilik.
