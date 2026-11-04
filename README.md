# Website Pembelajaran HTML & CSS — SMK Creative Hub

Paket pembelajaran HTML & CSS untuk SMK kelas X–XI yang dapat diakses langsung lewat browser.
Website ini **statis** (HTML, CSS, JavaScript) sehingga tidak memerlukan server, database, atau biaya hosting.

**Alamat website:** https://wafinal56-maker.github.io/website-pembelajaran/

## Isi repository

| Bagian | Keterangan |
| --- | --- |
| `index.html` | Landing page yang menghubungkan semua materi |
| `website/` | Materi interaktif Semester 1 (18 pertemuan); Semester 2 disembunyikan sementara |
| `semester-1/` | Hasil website Semester 1 (versi 1.0) sebagai pembanding |
| `final-project/` | Hasil akhir Semester 2: website sekolah 7 halaman + CSS |
| `Modul_Pembelajaran_HTML_CSS_Kelas_X_XI.pdf` | Modul pembelajaran |
| `DAFTAR_PERTEMUAN.txt` | Ringkasan rencana 36 pertemuan |
| `PETUNJUK.txt` | Petunjuk penggunaan paket |

## Hubungan materi, hasil Semester 1, dan final project

`website/` adalah aplikasi pembelajaran. Untuk sementara hanya **Semester 1 (Pertemuan 1–18)** yang ditampilkan; Semester 2 disembunyikan agar siswa fokus menyelesaikan Semester 1 lebih dulu.

`semester-1/` adalah **hasil website Semester 1 (versi 1.0)**. Tampilannya sengaja masih sederhana karena belum memakai Flexbox, Grid, media query, atau animasi. Hasil ini ditampilkan di Pertemuan 18 sebagai pembanding.

`final-project/` adalah **hasil akhir Semester 2 (versi 2.0)**. Folder ini tetap ada di repository, tetapi tidak ditampilkan di halaman utama selama Semester 2 disembunyikan.

## Menjalankan di komputer

1. Buka folder project ini.
2. Klik dua kali `index.html`, atau klik kanan lalu pilih **Open with → Browser**.
3. Semua halaman berjalan tanpa instalasi apa pun.

> Catatan: progress belajar disimpan di `localStorage` browser masing-masing perangkat.
> Jika data browser dihapus atau berganti perangkat, checklist perlu diisi ulang.

## Publikasi dengan GitHub Pages

Website ini dipublikasikan dari branch `main` folder root.

1. Buat repository **public** bernama `website-pembelajaran` di GitHub.
2. Kirim file dari komputer:
   ```bash
   git init
   git add .
   git commit -m "Website pembelajaran HTML & CSS"
   git branch -M main
   git remote add origin https://github.com/wafinal56-maker/website-pembelajaran.git
   git push -u origin main
   ```
3. Di GitHub buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Source: Deploy from a branch**.
5. Pilih **Branch: main**, folder **/ (root)**, lalu **Save**.
6. Tunggu 1–2 menit, lalu buka `https://wafinal56-maker.github.io/website-pembelajaran/`.

## Cara memperbarui materi

Setelah mengedit file, jalankan:

```bash
git add .
git commit -m "Perbarui materi"
git push
```

GitHub Pages akan memperbarui website secara otomatis dalam beberapa saat.

## Catatan penting

- Repository harus **public** agar GitHub Pages gratis aktif.
- Formulir kontak pada `final-project/kontak.html` hanya tampilan dan belum mengirim data.
- Ganti gambar contoh `final-project/images/sekolah.svg` dengan foto berizin.
- Jangan mempublikasikan foto, nama, atau kontak siswa tanpa izin.
