/* eslint-disable */
/*
 * SUMBER DATA TUNGGAL — Semester 1 (18 pertemuan)
 * Setiap lesson hanya berisi operasi kode (create/insert/replace/setFile).
 * Hasil kumulatif dihitung oleh engine.js dari lesson 1 sampai lesson aktif.
 */
(function (root) {
  "use strict";

  const NAV_ITEMS = [
    ["index.html", "Beranda"],
    ["profil.html", "Profil"],
    ["jurusan.html", "Jurusan"],
    ["kegiatan.html", "Kegiatan"],
    ["galeri.html", "Galeri"],
    ["portofolio.html", "Portofolio"],
    ["kontak.html", "Kontak"]
  ];

  const FOOTER = `  <footer class="site-footer">
    <div class="container">
      <strong>SMK Creative Hub</strong>
      <p>Website latihan HTML dan CSS kelas X–XI.</p>
      <p><a href="kontak.html">Hubungi kami</a> · <a href="../index.html">Beranda utama</a></p>
      <small>&copy; 2026 SMK Creative Hub — konten contoh untuk pembelajaran.</small>
    </div>
  </footer>`;

  function navList(active, indent) {
    const pad = indent || "          ";
    return NAV_ITEMS.map(function (item) {
      const current = item[0] === active ? ' aria-current="page"' : "";
      return pad + '<li><a href="' + item[0] + '"' + current + '>' + item[1] + '</a></li>';
    }).join("\n");
  }

  function siteHeader(active) {
    return `  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html">SMK Creative Hub</a>
      <nav aria-label="Navigasi utama">
        <ul class="nav-list">
${navList(active)}
        </ul>
      </nav>
    </div>
  </header>`;
  }

  function finalPage(options) {
    return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${options.description}">
  <title>${options.title}</title>
</head>
<body>
${siteHeader(options.active)}
${options.main}
${FOOTER}
</body>
</html>`;
  }

  function simplePage(options) {
    return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${options.title}</title>
</head>
<body>
  <nav aria-label="Navigasi utama">
    <ul class="nav-list">
${navList(options.active, "      ")}
    </ul>
  </nav>
${options.main}
</body>
</html>`;
  }

  const SIMPLE_NAV = `  <nav aria-label="Navigasi utama">
    <ul class="nav-list">
${navList("index.html", "      ")}
    </ul>
  </nav>`;

  const CSS_12 = `/* SMK Creative Hub — stylesheet utama
   Dibuat bertahap pada Pertemuan 12–17. */

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1f2937;
  background: #f8fafc;
  line-height: 1.65;
}

h1 {
  color: #164e63;
}
`;

  const CSS_13 = `/* SMK Creative Hub — stylesheet utama
   Dibuat bertahap pada Pertemuan 12–17. */

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #1f2937;
  background: #f8fafc;
  line-height: 1.65;
}

h1 {
  color: #164e63;
}

.container {
  width: min(1100px, 92%);
  margin-inline: auto;
}

.button {
  display: inline-block;
  padding: .75rem 1.1rem;
}

#kontak {
  scroll-margin-top: 20px;
}

.site-header {
  background: #164e63;
  color: white;
  padding: .9rem 0;
}

.brand {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: .6rem 0 0;
}

.nav-list li {
  margin: .2rem 0;
}

.nav-list a {
  color: white;
  text-decoration: none;
}
`;

  const CSS_14 = `/* SMK Creative Hub — stylesheet utama
   Dibuat bertahap pada Pertemuan 12–17. */

:root {
  --primary: #164e63;
  --secondary: #0f766e;
  --accent: #f59e0b;
  --ink: #1f2937;
  --muted: #64748b;
  --surface: #fff;
  --background: #f8fafc;
  --line: #e2e8f0;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: var(--ink);
  background: var(--background);
  line-height: 1.65;
}

h1 {
  color: var(--primary);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--secondary);
}

.container {
  width: min(1100px, 92%);
  margin-inline: auto;
}

.button {
  display: inline-block;
  background: var(--accent);
  color: var(--ink);
  padding: .75rem 1.1rem;
}

#kontak {
  scroll-margin-top: 20px;
}

.site-header {
  background: var(--primary);
  color: white;
  padding: .9rem 0;
}

.brand {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: .6rem 0 0;
}

.nav-list li {
  margin: .2rem 0;
}

.nav-list a {
  color: white;
  text-decoration: none;
}
`;

  const CSS_15 = CSS_14 + `
.hero {
  padding: 2.2rem 0;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.12;
  margin: .4rem 0 1rem;
}

.hero p {
  max-width: 62ch;
}

.hero-image {
  width: 100%;
  height: auto;
  margin-top: 1rem;
}

.eyebrow {
  font-weight: bold;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--secondary);
}

.section {
  padding: 2rem 0;
}

.section-heading h2 {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
}
`;

  const CSS_16 = CSS_15 + `
* {
  box-sizing: border-box;
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.muted {
  color: var(--muted);
}
`;

  const CSS_17 = `/* SMK Creative Hub — stylesheet utama
   Dibuat bertahap pada Pertemuan 12–17. */

:root {
  --primary: #164e63;
  --secondary: #0f766e;
  --accent: #f59e0b;
  --ink: #1f2937;
  --muted: #64748b;
  --surface: #fff;
  --background: #f8fafc;
  --line: #e2e8f0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: var(--ink);
  background: var(--background);
  line-height: 1.65;
}

h1 {
  color: var(--primary);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--secondary);
}

.container {
  width: min(1100px, 92%);
  margin-inline: auto;
}

.site-header {
  background: var(--primary);
  color: white;
  padding: .9rem 0;
}

.brand {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: .6rem 0 0;
}

.nav-list li {
  margin: .2rem 0;
}

.nav-list a {
  color: white;
  text-decoration: none;
}

.hero {
  padding: 2.2rem 0;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.12;
  margin: .4rem 0 1rem;
}

.hero p {
  max-width: 62ch;
}

.hero-image {
  width: 100%;
  height: auto;
  margin-top: 1rem;
}

.eyebrow {
  font-weight: bold;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--secondary);
}

.button {
  display: inline-block;
  background: var(--accent);
  color: var(--ink);
  text-decoration: none;
  font-weight: bold;
  padding: .75rem 1.1rem;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
}

.section {
  padding: 2rem 0;
}

.section-heading h2 {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, .05);
  margin-bottom: 1rem;
}

.card h3 {
  margin-top: .2rem;
  color: var(--primary);
}

.muted {
  color: var(--muted);
}

.page-hero {
  background: #e6f3f1;
  padding: 2rem 0;
}

.page-hero h1 {
  color: var(--primary);
  margin: 0;
}

.content h2 {
  color: var(--primary);
  margin-top: 2rem;
}

.gallery-grid img {
  width: 100%;
  height: auto;
  border-radius: .75rem;
  margin-bottom: .8rem;
}

.site-footer {
  background: #102f40;
  color: #e2e8f0;
  padding: 2rem 0;
  margin-top: 2rem;
}

.site-footer a {
  color: #fde68a;
}
`;

  const INDEX_MAIN = `  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <p class="eyebrow">Belajar • Berkarya • Bertumbuh</p>
          <h1>Selamat datang di SMK Creative Hub</h1>
          <p>Ruang informasi sekolah, program keahlian, kegiatan, dan karya kreatif siswa.</p>
          <a class="button" href="jurusan.html">Jelajahi Program Keahlian</a>
        </div>
        <img class="hero-image" src="images/sekolah.svg" alt="Suasana kegiatan belajar di sekolah">
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Kenali kami</p>
          <h2>Belajar dengan pengalaman nyata</h2>
          <p class="muted">Pembelajaran kejuruan menghubungkan pengetahuan, keterampilan, dan kreativitas.</p>
        </div>
        <div class="grid">
          <article class="card">
            <h3>Program Keahlian</h3>
            <p>Kenali bidang keahlian dan kompetensi yang dipelajari.</p>
            <a href="jurusan.html">Lihat jurusan →</a>
          </article>
          <article class="card">
            <h3>Kegiatan Sekolah</h3>
            <p>Informasi kegiatan pembelajaran dan pengembangan diri.</p>
            <a href="kegiatan.html">Lihat kegiatan →</a>
          </article>
          <article class="card">
            <h3>Karya Siswa</h3>
            <p>Apresiasi hasil praktik dan kreativitas peserta didik.</p>
            <a href="galeri.html">Lihat galeri →</a>
          </article>
        </div>
      </div>
    </section>
  </main>`;

  const PROFIL_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Profil Sekolah</h1>
        <p>Informasi singkat tentang sekolah dan lingkungan belajar.</p>
      </div>
    </section>
    <section class="section">
      <div class="container content">
        <h2>Tentang Kami</h2>
        <p>SMK Creative Hub adalah contoh website pembelajaran yang dikembangkan siswa untuk menyajikan informasi sekolah secara terstruktur dan mudah diakses.</p>
        <p><strong>SMK Creative Hub</strong> — <em>belajar sambil berkarya.</em></p>
        <p><mark>Informasi penerimaan siswa</mark> dapat diperoleh melalui sekolah.</p>
        <p><small>Halaman ini dibuat bertahap oleh siswa.</small></p>
        <h2>Visi Pembelajaran</h2>
        <p>Mendorong peserta didik menjadi pembelajar yang kompeten, kreatif, bertanggung jawab, dan siap mengembangkan keterampilan.</p>
        <h2>Fasilitas dan lingkungan</h2>
        <p>Isi bagian ini dengan data, foto, dan informasi resmi sekolah setelah mendapatkan persetujuan pihak sekolah.</p>
      </div>
    </section>
  </main>`;

  const JURUSAN_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Program Keahlian</h1>
        <p>Contoh informasi program keahlian.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>Daftar Program</h2>
        <ul>
          <li>Teknik Komputer dan Jaringan
            <ul>
              <li>Dasar jaringan</li>
              <li>Layanan teknologi informasi</li>
            </ul>
          </li>
          <li>Desain Komunikasi Visual
            <ul>
              <li>Prinsip desain</li>
              <li>Produksi karya visual</li>
            </ul>
          </li>
          <li>Teknik Sepeda Motor
            <ul>
              <li>Perawatan dasar</li>
              <li>Pemeriksaan kendaraan</li>
            </ul>
          </li>
        </ul>
        <h2>Langkah Belajar</h2>
        <ol>
          <li>Mengamati contoh.</li>
          <li>Mencoba langkah praktik.</li>
          <li>Merefleksikan hasil.</li>
        </ol>
      </div>
    </section>
    <section class="section">
      <div class="container grid">
        <article class="card">
          <h3>Teknik Komputer dan Jaringan</h3>
          <p>Mempelajari dasar komputer, sistem operasi, jaringan, dan layanan teknologi informasi.</p>
        </article>
        <article class="card">
          <h3>Desain Komunikasi Visual</h3>
          <p>Mempelajari komunikasi visual, prinsip desain, ilustrasi, dan produksi karya visual.</p>
        </article>
        <article class="card">
          <h3>Teknik Sepeda Motor</h3>
          <p>Mempelajari dasar perawatan, pemeriksaan, dan perbaikan sepeda motor.</p>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2>Tabel Program Keahlian</h2>
        <table>
          <caption>Program Keahlian SMK Creative Hub</caption>
          <thead>
            <tr><th>Program</th><th>Fokus Pembelajaran</th></tr>
          </thead>
          <tbody>
            <tr><td>Teknik Komputer dan Jaringan</td><td>Komputer, sistem operasi, jaringan, dan layanan TI.</td></tr>
            <tr><td>Desain Komunikasi Visual</td><td>Komunikasi visual, prinsip desain, ilustrasi, dan produksi karya.</td></tr>
            <tr><td>Teknik Sepeda Motor</td><td>Perawatan, pemeriksaan, dan perbaikan sepeda motor.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>`;

  const KEGIATAN_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Kegiatan Sekolah</h1>
        <p>Catatan kegiatan belajar dan pengembangan siswa.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid">
        <article class="card">
          <h3>Pembelajaran Praktik</h3>
          <p>Dokumentasikan praktik sesuai program keahlian.</p>
        </article>
        <article class="card">
          <h3>Projek Kolaborasi</h3>
          <p>Dokumentasikan kerja kelompok dan proses pemecahan masalah.</p>
        </article>
        <article class="card">
          <h3>Pengembangan Diri</h3>
          <p>Dokumentasikan kegiatan organisasi, literasi, dan kreativitas.</p>
        </article>
      </div>
    </section>
  </main>`;

  const GALERI_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Galeri</h1>
        <p>Ganti gambar contoh dengan foto kegiatan yang telah mendapat izin.</p>
      </div>
    </section>
    <section class="section">
      <div class="container gallery-grid">
        <img src="images/sekolah.svg" alt="Contoh foto suasana sekolah">
        <img src="images/sekolah.svg" alt="Contoh dokumentasi kegiatan belajar">
        <img src="images/sekolah.svg" alt="Contoh dokumentasi praktik siswa">
      </div>
    </section>
  </main>`;

  const PORTOFOLIO_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Portofolio Siswa</h1>
        <p>Ruang untuk menampilkan karya dan proses belajar.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid">
        <article class="card">
          <h3>Desain Poster</h3>
          <p>Nama siswa: (isi nama). Jelaskan tujuan, konsep, dan perangkat yang digunakan.</p>
        </article>
        <article class="card">
          <h3>Projek Jaringan</h3>
          <p>Nama siswa: (isi nama). Jelaskan rancangan dan dokumentasi praktik.</p>
        </article>
        <article class="card">
          <h3>Perawatan Kendaraan</h3>
          <p>Nama siswa: (isi nama). Jelaskan proses pemeriksaan dan hasil pekerjaan.</p>
        </article>
      </div>
    </section>
  </main>`;

  const KONTAK_MAIN = `  <main>
    <section class="page-hero">
      <div class="container">
        <h1>Kontak</h1>
        <p>Contoh formulir tampilan untuk latihan HTML dan CSS.</p>
      </div>
    </section>
    <section class="section" id="kontak">
      <div class="container">
        <form>
          <div>
            <label for="nama">Nama lengkap</label>
            <input id="nama" name="nama" type="text" required>
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required>
          </div>
          <div>
            <label for="topik">Topik</label>
            <select id="topik" name="topik">
              <option>Informasi umum</option>
              <option>Program keahlian</option>
              <option>Kegiatan sekolah</option>
            </select>
          </div>
          <div>
            <label for="pesan">Pesan</label>
            <textarea id="pesan" name="pesan" rows="5"></textarea>
          </div>
          <button class="button" type="submit">Kirim (demo)</button>
          <p class="muted">Catatan: formulir ini belum terhubung ke server, sehingga data tidak dikirim atau disimpan.</p>
        </form>
      </div>
    </section>
  </main>`;

  const INDEX_6 = simplePage({
    title: "Beranda — SMK Creative Hub",
    active: "index.html",
    main: `  <main>
    <p class="eyebrow">Belajar • Berkarya • Bertumbuh</p>
    <h1>Selamat datang di SMK Creative Hub</h1>
    <p>Ruang informasi sekolah, program keahlian, kegiatan, dan karya kreatif siswa.</p>
    <h2>Belajar dengan pengalaman nyata</h2>
    <p><strong>SMK Creative Hub</strong> — <em>belajar sambil berkarya.</em></p>
    <p><mark>Informasi penerimaan siswa</mark> dapat diperoleh melalui sekolah.</p>
    <p><small>Halaman ini dibuat bertahap oleh siswa.</small></p>
    <p>Rumus air adalah H<sub>2</sub>O dan satuan luas adalah cm<sup>2</sup>.</p>
    <!-- Komentar hanya terlihat di kode, bukan di halaman. -->
    <section>
      <h2>Program Keahlian</h2>
      <ul>
        <li>Teknik Komputer dan Jaringan</li>
        <li>Desain Komunikasi Visual</li>
        <li>Teknik Sepeda Motor</li>
      </ul>
    </section>
    <section>
      <h2>Suasana Sekolah</h2>
      <img src="images/sekolah.svg" alt="Ilustrasi kegiatan belajar di sekolah" width="600">
    </section>
  </main>`
  });

  const PROFIL_6 = simplePage({
    title: "Profil — SMK Creative Hub",
    active: "profil.html",
    main: `  <main>
    <h1>Profil Sekolah</h1>
    <p>Informasi singkat tentang sekolah.</p>
  </main>`
  });

  const JURUSAN_6 = simplePage({
    title: "Program Keahlian — SMK Creative Hub",
    active: "jurusan.html",
    main: `  <main>
    <h1>Program Keahlian</h1>
    <p>Informasi singkat tentang program keahlian.</p>
  </main>`
  });

  const KONTAK_9 = simplePage({
    title: "Kontak — SMK Creative Hub",
    active: "kontak.html",
    main: `  <main id="kontak">
    <h1>Kontak</h1>
    <p>Contoh formulir tampilan untuk latihan HTML dan CSS.</p>
    <form>
      <div>
        <label for="nama">Nama lengkap</label>
        <input id="nama" name="nama" type="text" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required>
      </div>
      <div>
        <label for="topik">Topik</label>
        <select id="topik" name="topik">
          <option>Informasi umum</option>
          <option>Program keahlian</option>
          <option>Kegiatan sekolah</option>
        </select>
      </div>
      <div>
        <label for="pesan">Pesan</label>
        <textarea id="pesan" name="pesan" rows="5"></textarea>
      </div>
      <button class="button" type="submit">Kirim (demo)</button>
      <p class="muted">Catatan: formulir ini belum terhubung ke server, sehingga data tidak dikirim atau disimpan.</p>
    </form>
  </main>`
  });

  const lessons = [
    {
      no: 1,
      semester: 1,
      title: "Pengenalan web dan persiapan QuickEdit",
      duration: "2 × 45 menit",
      goals: [
        "Memahami cara kerja website di browser.",
        "Mengenal file, folder, dan editor kode.",
        "Membuat file index.html pertama."
      ],
      skills: ["Membuat folder proyek", "Membuat file HTML", "Membuka file di browser"],
      prerequisite: "Belum ada. Ini pertemuan pertama.",
      intro: "Sebelum menulis kode, kita perlu tahu dulu apa yang sedang kita buat. Website adalah kumpulan file yang dibaca oleh browser. File utamanya biasanya bernama index.html.\n\nPada pertemuan ini kita belum membuat tampilan yang lengkap. Kita hanya menyiapkan folder kerja dan membuat satu file HTML sederhana. File inilah yang akan kita kembangkan sampai Pertemuan 18.",
      concepts: [
        { term: "Website", text: "Kumpulan halaman dan file yang dapat dibuka melalui browser.", analogy: "Seperti buku yang terdiri dari beberapa halaman." },
        { term: "Browser", text: "Program yang membaca file HTML dan menampilkannya menjadi halaman.", analogy: "Seperti pembaca buku yang menerjemahkan tulisan menjadi gambar dan teks." },
        { term: "File dan folder", text: "Folder menyimpan file agar rapi. Nama file harus ditulis persis, termasuk huruf besar dan kecil.", analogy: "Folder seperti lemari, file seperti dokumen di dalamnya." },
        { term: "Editor kode", text: "Aplikasi untuk menulis kode, misalnya QuickEdit.", analogy: "Seperti buku tulis khusus yang bisa menyimpan tulisan digital." }
      ],
      why: "Tanpa file HTML, browser tidak punya apa pun untuk ditampilkan. File pertama ini adalah fondasi seluruh proyek.",
      tags: [
        { name: "<!doctype html>", fn: "Memberi tahu browser bahwa file ini adalah HTML versi modern.", why: "Agar browser menampilkan halaman dengan aturan standar." },
        { name: "<html>", fn: "Membungkus seluruh isi halaman.", why: "Menandai awal dan akhir dokumen HTML." },
        { name: "<head>", fn: "Menyimpan informasi tentang halaman.", why: "Judul tab dan informasi lain diletakkan di sini." },
        { name: "<title>", fn: "Menentukan judul yang muncul di tab browser.", why: "Membantu pengguna mengenali halaman yang sedang dibuka." },
        { name: "<body>", fn: "Menyimpan isi yang terlihat di halaman.", why: "Semua teks, gambar, dan tombol diletakkan di dalam body." },
        { name: "<h1>", fn: "Membuat judul utama.", why: "Memberi tahu pembaca dan mesin pencari tentang topik utama halaman." }
      ],
      steps: [
        "Apa yang akan dibuat? Sebuah folder proyek bernama `SMK-CREATIVE-HUB` dan file `index.html` pertama.",
        "Apa yang harus dipersiapkan? Aplikasi QuickEdit dan browser di perangkatmu.",
        "Buka aplikasi QuickEdit, lalu buat folder baru `SMK-CREATIVE-HUB`.",
        "Di dalam folder tersebut, buat file baru dengan nama `index.html`.",
        "Tulis kode pada tab Kode Tambahan persis dari baris pertama sampai terakhir.",
        "Perhatikan fungsi setiap tag pada tabel Materi. Jangan menghafal saja, pahami perannya.",
        "Simpan file dengan tombol simpan di QuickEdit.",
        "Buka file `index.html` melalui browser atau fitur Preview di QuickEdit.",
        "Pastikan judul `SMK Creative Hub` muncul di halaman dan di tab browser."
      ],
      edits: [
        {
          op: "create",
          file: "index.html",
          note: "Buat file baru dan tulis seluruh kode ini sebagai kerangka awal.",
          content: `<!doctype html>
<html lang="id">
<head>
  <title>SMK Creative Hub</title>
</head>
<body>
  <h1>SMK Creative Hub</h1>
</body>
</html>`
        }
      ],
      location: "Buat folder SMK-CREATIVE-HUB, lalu buat file index.html di dalamnya. Tulis seluruh kode dari baris pertama. Ini kerangka awal, bukan tambahan.",
      preview: {
        page: "index.html",
        highlight: ["h1"],
        beforeLabel: "Folder masih kosong",
        afterLabel: "Judul pertama sudah muncul",
        before: ["Belum ada file yang bisa dibuka di browser."],
        after: ["File index.html berhasil dibuat.", "Judul SMK Creative Hub tampil di halaman dan tab browser."]
      },
      target: [
        "Siswa berhasil membuat folder SMK-CREATIVE-HUB.",
        "Siswa berhasil membuat file index.html.",
        "Siswa dapat membuka file tersebut di browser."
      ],
      checklist: [
        "Folder SMK-CREATIVE-HUB sudah dibuat.",
        "File index.html sudah ada di dalam folder.",
        "Kode sudah ditulis dan disimpan.",
        "Judul SMK Creative Hub terlihat di browser."
      ],
      nextTeaser: "Pertemuan berikutnya kita merapikan struktur HTML dan memastikan huruf Indonesia tampil dengan benar."
    },
    {
      no: 2,
      semester: 1,
      title: "Struktur dasar HTML",
      duration: "2 × 45 menit",
      goals: [
        "Memahami fungsi DOCTYPE, html, head, title, dan body.",
        "Menambahkan meta charset dan viewport.",
        "Memastikan karakter Indonesia tampil benar."
      ],
      skills: ["Menulis struktur HTML5", "Mengatur karakter", "Mengatur tampilan awal di HP"],
      prerequisite: "Pertemuan 1: file index.html sudah dibuat.",
      intro: "Pada pertemuan sebelumnya kita sudah punya file HTML sederhana. Sekarang kita rapikan kerangkanya agar sesuai standar HTML5.\n\nKerangka yang rapi membuat browser lebih mudah membaca halaman. Kita juga menambahkan meta charset agar huruf seperti é, ñ, dan tanda baca Indonesia tidak berubah menjadi simbol aneh.",
      concepts: [
        { term: "DOCTYPE", text: "Baris pertama yang memberi tahu browser bahwa dokumen memakai HTML5.", analogy: "Seperti label di depan buku yang menjelaskan jenis bukunya." },
        { term: "meta charset", text: "Menentukan cara komputer membaca karakter teks.", analogy: "Seperti kamus yang memastikan huruf dibaca dengan benar." },
        { term: "meta viewport", text: "Mengatur lebar halaman agar sesuai layar HP.", analogy: "Seperti mengatur ukuran kertas agar pas di layar yang berbeda." },
        { term: "head dan body", text: "Head berisi informasi halaman, body berisi isi yang terlihat.", analogy: "Head seperti sampul dan daftar isi, body seperti isi buku." }
      ],
      why: "Tanpa charset, teks Indonesia bisa tampil rusak. Tanpa viewport, halaman bisa terlihat terlalu kecil di HP.",
      tags: [
        { name: "<meta charset=\"utf-8\">", fn: "Mengatur karakter teks agar mendukung huruf dan simbol internasional.", why: "Agar teks Indonesia tampil benar." },
        { name: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">", fn: "Mengatur lebar dan skala halaman di perangkat mobile.", why: "Agar halaman nyaman dibaca di HP." },
        { name: "<head>", fn: "Wadah informasi halaman yang tidak terlihat langsung.", why: "Tempat title dan meta diletakkan." },
        { name: "<title>", fn: "Judul tab browser.", why: "Membantu pengguna membedakan tab." },
        { name: "<body>", fn: "Wadah isi halaman.", why: "Semua konten yang terlihat berada di sini." }
      ],
      steps: [
        "Apa yang akan dibuat? Kerangka HTML5 yang lengkap pada file `index.html`.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 1.",
        "Buka file `index.html` di QuickEdit.",
        "Cari bagian `<head>`.",
        "Tambahkan `<meta charset=\"utf-8\">` dan `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` di dalam head, sebelum `<title>`.",
        "Pastikan `<title>` berisi `SMK Creative Hub`.",
        "Simpan perubahan.",
        "Buka atau refresh file di browser.",
        "Periksa judul tab dan pastikan tidak ada karakter yang rusak."
      ],
      edits: [
        {
          op: "replace",
          file: "index.html",
          find: `<head>
  <title>SMK Creative Hub</title>
</head>`,
          note: "Rapikan bagian head. Isi body tidak diubah.",
          content: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SMK Creative Hub</title>
</head>`
        }
      ],
      location: "Buka index.html, cari bagian <head>, lalu tambahkan dua baris meta sebelum <title>.",
      preview: {
        page: "index.html",
        highlight: ["h1"],
        beforeLabel: "Kerangka belum lengkap",
        afterLabel: "Kerangka HTML5 sudah lengkap",
        before: ["File masih memakai head sederhana tanpa charset dan viewport."],
        after: ["Karakter teks terbaca dengan benar.", "Halaman siap menyesuaikan lebar layar HP.", "Judul tab tetap SMK Creative Hub."]
      },
      target: [
        "Siswa berhasil menambahkan meta charset dan viewport.",
        "Siswa memahami perbedaan head dan body.",
        "Tidak ada karakter rusak pada halaman."
      ],
      checklist: [
        "Meta charset sudah ditambahkan.",
        "Meta viewport sudah ditambahkan.",
        "Title masih berisi SMK Creative Hub.",
        "Halaman sudah disimpan dan di-refresh."
      ],
      nextTeaser: "Pertemuan berikutnya kita mulai menambahkan judul dan paragraf yang terlihat di halaman."
    },
    {
      no: 3,
      semester: 1,
      title: "Heading dan paragraf",
      duration: "2 × 45 menit",
      goals: [
        "Memahami hierarki heading h1 sampai h6.",
        "Membuat paragraf dengan tag p.",
        "Menambahkan tagline dan deskripsi halaman."
      ],
      skills: ["Menyusun heading", "Menulis paragraf", "Menggunakan main"],
      prerequisite: "Pertemuan 2: kerangka HTML5 sudah lengkap.",
      intro: "Sekarang kita mulai mengisi halaman. Heading adalah judul atau subjudul. Paragraf adalah kumpulan kalimat yang menjelaskan sesuatu.\n\nBayangkan halaman seperti majalah: ada judul besar, subjudul, lalu paragraf penjelasan. Kita akan membuat susunan seperti itu.",
      concepts: [
        { term: "Heading", text: "Judul bertingkat dari h1 (paling penting) sampai h6 (paling kecil).", analogy: "Seperti judul bab, subbab, dan sub-subbab di buku." },
        { term: "Paragraf", text: "Kumpulan kalimat yang dibungkus tag p.", analogy: "Seperti satu paragraf di buku pelajaran." },
        { term: "main", text: "Menandai isi utama halaman.", analogy: "Seperti halaman inti di dalam buku." },
        { term: "Hierarki", text: "Urutan tingkat kepentingan judul. Gunakan satu h1 sebagai judul utama.", analogy: "Seperti urutan pangkat dalam organisasi." }
      ],
      why: "Heading membantu pembaca memahami susunan informasi. Paragraf membuat penjelasan lebih mudah dibaca.",
      tags: [
        { name: "<h1>", fn: "Judul utama halaman.", why: "Hanya satu h1 per halaman agar fokusnya jelas." },
        { name: "<h2>", fn: "Subjudul di bawah h1.", why: "Memecah isi menjadi beberapa bagian." },
        { name: "<p>", fn: "Membuat paragraf.", why: "Menampung kalimat penjelasan." },
        { name: "<main>", fn: "Membungkus isi utama.", why: "Memisahkan isi utama dari navigasi dan footer." }
      ],
      steps: [
        "Apa yang akan dibuat? Judul utama, tagline, dan subjudul pada halaman Beranda.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 2.",
        "Buka `index.html` dan cari bagian `<body>`.",
        "Ganti judul lama di dalam body dengan blok `<main>` yang berisi konten baru.",
        "Tambahkan `<p class=\"eyebrow\">`, `<h1>`, `<p>`, dan `<h2>` sesuai kode.",
        "Perhatikan bahwa h1 hanya dipakai satu kali sebagai judul utama.",
        "Simpan perubahan.",
        "Buka kembali preview di browser.",
        "Pastikan judul utama lebih besar dari subjudul dan paragraf terbaca rapi."
      ],
      edits: [
        {
          op: "replace",
          file: "index.html",
          find: `<body>
  <h1>SMK Creative Hub</h1>
</body>`,
          note: "Ganti judul lama dengan struktur main, heading, dan paragraf. Judul lama dipindahkan ke dalam h1 baru.",
          content: `<body>
  <main>
    <p class="eyebrow">Belajar • Berkarya • Bertumbuh</p>
    <h1>Selamat datang di SMK Creative Hub</h1>
    <p>Ruang informasi sekolah, program keahlian, kegiatan, dan karya kreatif siswa.</p>
    <h2>Belajar dengan pengalaman nyata</h2>
  </main>
</body>`
        }
      ],
      location: "Buka index.html, cari <body>, lalu ganti judul lama dengan blok <main> berisi heading dan paragraf.",
      preview: {
        page: "index.html",
        highlight: ["main h1", "main h2"],
        beforeLabel: "Baru ada satu judul",
        afterLabel: "Judul, tagline, dan subjudul sudah tersusun",
        before: ["Halaman hanya menampilkan satu judul."],
        after: ["Judul utama tampil lebih besar.", "Tagline dan paragraf penjelasan muncul.", "Subjudul membagi halaman menjadi bagian."]
      },
      target: [
        "Siswa berhasil membuat satu h1 sebagai judul utama.",
        "Siswa berhasil menambahkan paragraf dan subjudul.",
        "Siswa memahami hierarki heading."
      ],
      checklist: [
        "Blok main sudah ditambahkan.",
        "Hanya ada satu h1 di halaman.",
        "Paragraf tagline sudah muncul.",
        "Subjudul h2 sudah muncul."
      ],
      nextTeaser: "Pertemuan berikutnya kita memformat sebagian teks agar informasi penting lebih menonjol."
    },
    {
      no: 4,
      semester: 1,
      title: "Formatting teks dan komentar",
      duration: "2 × 45 menit",
      goals: [
        "Menggunakan strong, em, mark, small, sup, dan sub.",
        "Menulis komentar kode yang membantu.",
        "Menandai informasi penting dengan tepat."
      ],
      skills: ["Memformat teks", "Menulis komentar", "Memilih tag sesuai makna"],
      prerequisite: "Pertemuan 3: heading dan paragraf sudah ada.",
      intro: "Teks tidak harus tampil sama semua. Kadang kita perlu menebalkan nama sekolah, memiringkan slogan, atau menyorot informasi penting.\n\nHTML menyediakan tag pemformatan. Gunakan tag sesuai makna, bukan hanya karena bentuknya. Komentar juga penting agar kode mudah dipahami orang lain dan dirimu sendiri saat membukanya lagi.",
      concepts: [
        { term: "strong", text: "Menandai teks yang sangat penting.", analogy: "Seperti menyorot kalimat kunci dengan pena tebal." },
        { term: "em", text: "Memberi penekanan pada kata atau frasa.", analogy: "Seperti meninggikan suara saat mengucapkan kata penting." },
        { term: "mark", text: "Menyorot teks seperti stabilo.", analogy: "Seperti menandai bagian penting di buku." },
        { term: "small, sup, sub", text: "small untuk catatan kecil, sup untuk pangkat, sub untuk indeks bawah.", analogy: "Seperti catatan kaki dan rumus di buku sains." },
        { term: "Komentar", text: "Tulisan di kode yang tidak tampil di halaman.", analogy: "Seperti catatan tempel untuk diri sendiri." }
      ],
      why: "Pemformatan membantu pembaca menemukan informasi penting. Komentar membantu siswa mengingat alasan sebuah kode ditulis.",
      tags: [
        { name: "<strong>", fn: "Menandai teks penting.", why: "Memberi penekanan yang kuat." },
        { name: "<em>", fn: "Memberi penekanan ringan.", why: "Menonjolkan kata tanpa membuatnya terlalu berat." },
        { name: "<mark>", fn: "Menyorot teks.", why: "Menarik perhatian pada informasi tertentu." },
        { name: "<small>", fn: "Menampilkan teks lebih kecil.", why: "Cocok untuk catatan tambahan." },
        { name: "<sup> dan <sub>", fn: "Menulis pangkat dan indeks bawah.", why: "Berguna untuk rumus dan satuan." },
        { name: "<!-- -->", fn: "Komentar di dalam kode.", why: "Menjelaskan bagian kode tanpa mengubah tampilan." }
      ],
      steps: [
        "Apa yang akan dibuat? Beberapa paragraf dengan format teks dan satu komentar.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 3.",
        "Buka `index.html` dan cari subjudul `<h2>Belajar dengan pengalaman nyata</h2>`.",
        "Tambahkan paragraf baru setelah subjudul tersebut.",
        "Gunakan `strong` pada nama sekolah, `em` pada slogan, dan `mark` pada informasi penting.",
        "Tambahkan `small`, `sub`, `sup`, dan komentar sesuai contoh.",
        "Simpan perubahan.",
        "Buka preview dan perhatikan perbedaan bentuk setiap teks.",
        "Pastikan tidak ada tag yang lupa ditutup."
      ],
      edits: [
        {
          op: "insert",
          file: "index.html",
          after: `    <h2>Belajar dengan pengalaman nyata</h2>`,
          note: "Tambahkan paragraf formatting setelah subjudul. Jangan hapus heading dan paragraf sebelumnya.",
          content: `
    <p><strong>SMK Creative Hub</strong> — <em>belajar sambil berkarya.</em></p>
    <p><mark>Informasi penerimaan siswa</mark> dapat diperoleh melalui sekolah.</p>
    <p><small>Halaman ini dibuat bertahap oleh siswa.</small></p>
    <p>Rumus air adalah H<sub>2</sub>O dan satuan luas adalah cm<sup>2</sup>.</p>
    <!-- Komentar hanya terlihat di kode, bukan di halaman. -->`
        }
      ],
      location: "Buka index.html, cari <h2>Belajar dengan pengalaman nyata</h2>, lalu tambahkan paragraf baru setelahnya.",
      preview: {
        page: "index.html",
        highlight: ["main p"],
        beforeLabel: "Teks masih polos",
        afterLabel: "Teks penting sudah diberi penekanan",
        before: ["Semua paragraf tampil dengan gaya yang sama."],
        after: ["Nama sekolah tampil tebal.", "Slogan tampil miring.", "Informasi penting tersorot.", "Komentar tidak terlihat di halaman."]
      },
      target: [
        "Siswa berhasil memakai minimal tiga tag pemformatan.",
        "Siswa berhasil menulis komentar kode.",
        "Siswa memahami bahwa komentar tidak tampil di halaman."
      ],
      checklist: [
        "Tag strong dan em sudah dipakai.",
        "Tag mark sudah dipakai.",
        "Tag small, sub, dan sup sudah dicoba.",
        "Komentar kode sudah ditambahkan."
      ],
      nextTeaser: "Pertemuan berikutnya kita membuat daftar program keahlian menggunakan list."
    },
    {
      no: 5,
      semester: 1,
      title: "List dan konten terstruktur",
      duration: "2 × 45 menit",
      goals: [
        "Membuat daftar tidak berurutan dengan ul.",
        "Membuat daftar berurutan dengan ol.",
        "Menyusun daftar bertingkat dengan li."
      ],
      skills: ["Menyusun list", "Membuat nested list", "Mengelompokkan informasi"],
      prerequisite: "Pertemuan 4: heading, paragraf, dan formatting sudah ada.",
      intro: "Daftar membuat informasi lebih mudah dibaca. Ada dua jenis daftar yang sering dipakai: daftar tidak berurutan (ul) dan daftar berurutan (ol).\n\nKita akan menambahkan daftar program keahlian dan langkah belajar ke halaman Beranda. Nanti daftar ini dipindahkan ke halaman Jurusan agar Beranda lebih ringkas.",
      concepts: [
        { term: "ul", text: "Daftar tidak berurutan, biasanya memakai titik.", analogy: "Seperti daftar belanja." },
        { term: "ol", text: "Daftar berurutan dengan angka.", analogy: "Seperti langkah-langkah resep." },
        { term: "li", text: "Satu item di dalam daftar.", analogy: "Seperti satu baris dalam daftar." },
        { term: "Nested list", text: "Daftar di dalam daftar.", analogy: "Seperti sub-poin di dalam poin utama." }
      ],
      why: "Informasi yang berkelompok lebih cepat dipahami daripada satu paragraf panjang.",
      tags: [
        { name: "<ul>", fn: "Membuat daftar tanpa urutan.", why: "Cocok untuk daftar pilihan yang tidak harus berurutan." },
        { name: "<ol>", fn: "Membuat daftar berurutan.", why: "Cocok untuk langkah-langkah." },
        { name: "<li>", fn: "Membuat satu item daftar.", why: "Setiap item harus berada di dalam ul atau ol." },
        { name: "<section>", fn: "Membungkus satu bagian konten.", why: "Mengelompokkan daftar dengan judulnya." }
      ],
      steps: [
        "Apa yang akan dibuat? Daftar program keahlian dan langkah belajar.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 4.",
        "Buka `index.html` dan cari bagian akhir `</main>`.",
        "Tambahkan blok `<section>` sebelum `</main>`.",
        "Isi section dengan `<h2>`, `<ul>`, dan beberapa `<li>`.",
        "Tambahkan daftar bertingkat di dalam salah satu item agar siswa mengenal nested list.",
        "Simpan perubahan.",
        "Buka preview dan pastikan setiap item tampil sebagai daftar.",
        "Periksa kembali bahwa semua tag `<ul>`, `<ol>`, dan `<li>` sudah ditutup."
      ],
      edits: [
        {
          op: "insert",
          file: "index.html",
          before: `  </main>`,
          note: "Tambahkan section daftar tepat sebelum </main>. Jangan hapus konten sebelumnya.",
          content: `    <section>
      <h2>Program Keahlian</h2>
      <ul>
        <li>Teknik Komputer dan Jaringan</li>
        <li>Desain Komunikasi Visual</li>
        <li>Teknik Sepeda Motor</li>
      </ul>
    </section>
    <section>
      <h2>Langkah Belajar</h2>
      <ol>
        <li>Mengamati contoh.</li>
        <li>Mencoba langkah praktik.</li>
        <li>Merefleksikan hasil.</li>
      </ol>
    </section>
`
        }
      ],
      location: "Buka index.html, cari </main>, lalu tambahkan dua section daftar sebelum penutup main.",
      preview: {
        page: "index.html",
        highlight: ["section ul", "section ol"],
        beforeLabel: "Informasi masih berupa paragraf",
        afterLabel: "Daftar program dan langkah belajar sudah muncul",
        before: ["Belum ada daftar yang terstruktur."],
        after: ["Daftar program keahlian tampil dengan titik.", "Langkah belajar tampil dengan angka.", "Setiap item berada di dalam li."]
      },
      target: [
        "Siswa berhasil membuat daftar ul dan ol.",
        "Siswa berhasil menambahkan minimal tiga item.",
        "Siswa memahami nested list."
      ],
      checklist: [
        "Daftar ul sudah dibuat.",
        "Daftar ol sudah dibuat.",
        "Setiap item memakai li.",
        "Semua tag daftar sudah ditutup."
      ],
      nextTeaser: "Pertemuan berikutnya kita menghubungkan halaman Beranda dengan halaman lain melalui tautan."
    },
    {
      no: 6,
      semester: 1,
      title: "Hyperlink dan navigasi",
      duration: "2 × 45 menit",
      goals: [
        "Membuat tautan dengan tag a dan atribut href.",
        "Membedakan tautan relatif dan eksternal.",
        "Menyiapkan navigasi ke tujuh halaman."
      ],
      skills: ["Membuat hyperlink", "Menyusun navigasi", "Membuat halaman baru"],
      prerequisite: "Pertemuan 5: daftar dan struktur konten sudah ada.",
      intro: "Website yang baik terdiri dari beberapa halaman yang saling terhubung. Untuk berpindah halaman, kita memakai hyperlink atau tag a.\n\nPada pertemuan ini kita membuat menu navigasi dan dua halaman baru: profil.html dan jurusan.html. Halaman lain akan dilengkapi pada Pertemuan 11.",
      concepts: [
        { term: "Hyperlink", text: "Teks atau tombol yang membawa pengguna ke halaman lain.", analogy: "Seperti pintu yang menghubungkan satu ruangan ke ruangan lain." },
        { term: "href", text: "Atribut yang menyimpan alamat tujuan tautan.", analogy: "Seperti alamat rumah yang dituju." },
        { term: "Tautan relatif", text: "Tautan yang mengarah ke file di folder yang sama, misalnya profil.html.", analogy: "Seperti menunjukkan ruangan di gedung yang sama." },
        { term: "Tautan eksternal", text: "Tautan ke website lain, biasanya diawali https://.", analogy: "Seperti alamat gedung di kota lain." }
      ],
      why: "Tanpa navigasi, pengguna hanya bisa melihat satu halaman dan tidak dapat menjelajahi isi website.",
      tags: [
        { name: "<a>", fn: "Membuat tautan.", why: "Menghubungkan halaman satu dengan halaman lain." },
        { name: "href", fn: "Menentukan alamat tujuan.", why: "Tanpa href, tautan tidak memiliki tujuan." },
        { name: "target=\"_blank\"", fn: "Membuka tautan di tab baru.", why: "Berguna untuk tautan eksternal." },
        { name: "<nav>", fn: "Membungkus navigasi utama.", why: "Membantu pembaca dan alat bantu memahami menu." },
        { name: "aria-current", fn: "Menandai halaman yang sedang dibuka.", why: "Membantu pengguna dan pembaca layar." }
      ],
      steps: [
        "Apa yang akan dibuat? Menu navigasi tujuh halaman dan dua file halaman baru.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 5.",
        "Buka `index.html`, cari `<body>`, lalu tambahkan blok `<nav>` tepat setelah `<body>`.",
        "Buat file baru `profil.html` dengan struktur HTML lengkap dan navigasi yang sama.",
        "Buat file baru `jurusan.html` dengan struktur yang sama.",
        "Isi bagian main setiap halaman dengan judul sederhana terlebih dahulu.",
        "Simpan semua file.",
        "Buka `index.html` di browser, lalu klik tautan Profil dan Jurusan.",
        "Pastikan setiap tautan membuka file yang benar dan tidak menghasilkan halaman kosong."
      ],
      edits: [
        {
          op: "insert",
          file: "index.html",
          after: `<body>`,
          note: "Tambahkan navigasi tepat setelah <body>, sebelum main.",
          content: `
${SIMPLE_NAV}`
        },
        {
          op: "create",
          file: "profil.html",
          note: "Buat halaman profil.html dengan struktur dan navigasi yang sama.",
          content: PROFIL_6
        },
        {
          op: "create",
          file: "jurusan.html",
          note: "Buat halaman jurusan.html dengan struktur dan navigasi yang sama.",
          content: JURUSAN_6
        }
      ],
      location: "Buka index.html, tambahkan nav setelah <body>. Lalu buat profil.html dan jurusan.html di folder yang sama.",
      preview: {
        page: "index.html",
        highlight: ["nav"],
        beforeLabel: "Baru satu halaman",
        afterLabel: "Navigasi dan dua halaman baru sudah dibuat",
        before: ["Pengguna belum bisa berpindah halaman."],
        after: ["Menu navigasi muncul di atas konten.", "Halaman Profil dan Jurusan dapat dibuka.", "Tautan memakai alamat relatif."]
      },
      target: [
        "Siswa berhasil membuat navigasi dengan tag a.",
        "Siswa berhasil membuat dua halaman baru.",
        "Semua tautan internal mengarah ke file yang benar."
      ],
      checklist: [
        "Blok nav sudah ditambahkan.",
        "profil.html sudah dibuat.",
        "jurusan.html sudah dibuat.",
        "Tautan Profil dan Jurusan berfungsi."
      ],
      nextTeaser: "Pertemuan berikutnya kita menambahkan gambar ke halaman."
    },
    {
      no: 7,
      semester: 1,
      title: "Menampilkan gambar",
      duration: "2 × 45 menit",
      goals: [
        "Menampilkan gambar dengan tag img.",
        "Memahami atribut src, alt, dan width.",
        "Menyimpan gambar di folder images."
      ],
      skills: ["Menambahkan gambar", "Menulis alt yang bermakna", "Mengatur ukuran gambar"],
      prerequisite: "Pertemuan 6: navigasi dan dua halaman baru sudah ada.",
      intro: "Gambar membuat halaman lebih menarik dan membantu menjelaskan informasi. Namun gambar harus dipakai dengan tujuan yang jelas, bukan sekadar hiasan.\n\nKita akan menambahkan ilustrasi sekolah. Pada pertemuan berikutnya, gambar ini akan dipindahkan ke bagian hero agar tampil lebih menonjol.",
      concepts: [
        { term: "img", text: "Tag untuk menampilkan gambar.", analogy: "Seperti bingkai foto di dinding." },
        { term: "src", text: "Alamat file gambar.", analogy: "Seperti lokasi foto disimpan." },
        { term: "alt", text: "Teks pengganti jika gambar tidak muncul.", analogy: "Seperti deskripsi foto untuk orang yang tidak bisa melihatnya." },
        { term: "width", text: "Mengatur lebar gambar dalam piksel.", analogy: "Seperti mengatur ukuran bingkai foto." }
      ],
      why: "Gambar tanpa alt sulit dipahami pembaca layar. Gambar tanpa folder yang benar tidak akan muncul.",
      tags: [
        { name: "<img>", fn: "Menampilkan gambar.", why: "Tag ini tidak memiliki penutup." },
        { name: "src", fn: "Menentukan lokasi file gambar.", why: "Browser perlu tahu gambar mana yang ditampilkan." },
        { name: "alt", fn: "Memberi deskripsi gambar.", why: "Membantu aksesibilitas dan saat gambar gagal dimuat." },
        { name: "width", fn: "Mengatur lebar gambar.", why: "Mencegah gambar terlalu besar." },
        { name: "folder images/", fn: "Tempat menyimpan gambar proyek.", why: "Agar file gambar rapi dan mudah dicari." }
      ],
      steps: [
        "Apa yang akan dibuat? Section gambar suasana sekolah.",
        "Apa yang harus dipersiapkan? File `index.html` dan folder `images`.",
        "Buat folder `images` di dalam folder proyek jika belum ada.",
        "Simpan file `sekolah.svg` ke dalam folder `images`.",
        "Buka `index.html` dan cari `</main>`.",
        "Tambahkan section gambar sebelum `</main>` dengan tag `img`.",
        "Isi `src` dengan `images/sekolah.svg` dan `alt` dengan deskripsi yang jelas.",
        "Simpan perubahan dan buka preview.",
        "Pastikan gambar muncul dan teks alt tidak kosong."
      ],
      edits: [
        {
          op: "insert",
          file: "index.html",
          before: `  </main>`,
          note: "Tambahkan section gambar sebelum </main>. File gambar disimpan di folder images/.",
          content: `    <section>
      <h2>Suasana Sekolah</h2>
      <img src="images/sekolah.svg" alt="Ilustrasi kegiatan belajar di sekolah" width="600">
    </section>
`
        }
      ],
      location: "Buka index.html, cari </main>, lalu tambahkan section gambar sebelum penutup main. Simpan gambar di images/sekolah.svg.",
      preview: {
        page: "index.html",
        highlight: ["section img"],
        beforeLabel: "Belum ada gambar",
        afterLabel: "Gambar sekolah sudah tampil",
        before: ["Halaman hanya berisi teks dan daftar."],
        after: ["Gambar muncul di bawah daftar.", "Gambar memiliki alt yang menjelaskan isinya.", "Lebar gambar dibatasi 600 piksel."]
      },
      target: [
        "Siswa berhasil menampilkan gambar.",
        "Siswa berhasil menulis alt yang bermakna.",
        "Siswa memahami fungsi folder images."
      ],
      checklist: [
        "Folder images sudah dibuat.",
        "File sekolah.svg sudah disimpan.",
        "Tag img sudah ditambahkan.",
        "Atribut alt sudah diisi."
      ],
      nextTeaser: "Pertemuan berikutnya kita menyajikan data program keahlian dalam tabel."
    },
    {
      no: 8,
      semester: 1,
      title: "Tabel data",
      duration: "2 × 45 menit",
      goals: [
        "Membuat tabel dengan table, tr, th, dan td.",
        "Menggunakan caption dan thead.",
        "Menyajikan data program keahlian secara rapi."
      ],
      skills: ["Menyusun tabel", "Membedakan header dan isi", "Menulis caption"],
      prerequisite: "Pertemuan 7: gambar sudah ditambahkan.",
      intro: "Tabel dipakai ketika informasi memiliki baris dan kolom. Misalnya daftar program, jadwal, atau perbandingan data.\n\nKita akan menambahkan tabel program keahlian ke halaman jurusan.html. Tabel yang baik memiliki judul dan header kolom yang jelas.",
      concepts: [
        { term: "table", text: "Wadah seluruh tabel.", analogy: "Seperti lembar tabel di buku tulis." },
        { term: "tr", text: "Satu baris tabel.", analogy: "Seperti satu baris pada lembar tabel." },
        { term: "th", text: "Sel header, biasanya tebal.", analogy: "Seperti judul kolom." },
        { term: "td", text: "Sel data biasa.", analogy: "Seperti isi kolom." },
        { term: "caption", text: "Judul tabel.", analogy: "Seperti keterangan di atas tabel." }
      ],
      why: "Data yang tersusun dalam tabel lebih mudah dibandingkan daripada ditulis dalam paragraf panjang.",
      tags: [
        { name: "<table>", fn: "Membuat tabel.", why: "Membungkus seluruh baris dan sel." },
        { name: "<caption>", fn: "Memberi judul tabel.", why: "Menjelaskan isi tabel." },
        { name: "<thead>", fn: "Membungkus baris header.", why: "Memisahkan judul kolom dari data." },
        { name: "<tbody>", fn: "Membungkus isi tabel.", why: "Memisahkan data dari header." },
        { name: "<tr>, <th>, <td>", fn: "Membuat baris, header, dan sel data.", why: "Menyusun struktur tabel." }
      ],
      steps: [
        "Apa yang akan dibuat? Tabel program keahlian pada halaman Jurusan.",
        "Apa yang harus dipersiapkan? File `jurusan.html` dari Pertemuan 6.",
        "Buka `jurusan.html` dan cari `</main>`.",
        "Tambahkan `<h2>Program Keahlian</h2>` dan blok `<table>` sebelum `</main>`.",
        "Tambahkan `<caption>` berisi judul tabel.",
        "Susun header kolom di dalam `<thead>` dan data di dalam `<tbody>`.",
        "Simpan perubahan.",
        "Buka `jurusan.html` melalui preview.",
        "Pastikan tabel memiliki header dan setiap baris berisi jumlah sel yang sama."
      ],
      edits: [
        {
          op: "insert",
          file: "jurusan.html",
          before: `  </main>`,
          note: "Tambahkan tabel di halaman jurusan.html sebelum </main>.",
          content: `    <h2>Program Keahlian</h2>
    <table>
      <caption>Program Keahlian SMK Creative Hub</caption>
      <thead>
        <tr><th>Program</th><th>Fokus Pembelajaran</th></tr>
      </thead>
      <tbody>
        <tr><td>Teknik Komputer dan Jaringan</td><td>Komputer, sistem operasi, jaringan, dan layanan TI.</td></tr>
        <tr><td>Desain Komunikasi Visual</td><td>Komunikasi visual, prinsip desain, ilustrasi, dan produksi karya.</td></tr>
        <tr><td>Teknik Sepeda Motor</td><td>Perawatan, pemeriksaan, dan perbaikan sepeda motor.</td></tr>
      </tbody>
    </table>
`
        }
      ],
      location: "Buka jurusan.html, cari </main>, lalu tambahkan tabel sebelum penutup main.",
      preview: {
        page: "jurusan.html",
        highlight: ["table"],
        beforeLabel: "Halaman Jurusan masih berupa teks",
        afterLabel: "Tabel program keahlian sudah tampil",
        before: ["Belum ada tabel data."],
        after: ["Tabel memiliki caption.", "Header kolom berada di thead.", "Data program berada di tbody."]
      },
      target: [
        "Siswa berhasil membuat tabel dengan header.",
        "Siswa berhasil menambahkan caption.",
        "Struktur baris dan sel tabel valid."
      ],
      checklist: [
        "Tag table sudah ditambahkan.",
        "Caption sudah diisi.",
        "Header th sudah ada di thead.",
        "Data td sudah ada di tbody."
      ],
      nextTeaser: "Pertemuan berikutnya kita membuat formulir kontak sederhana."
    },
    {
      no: 9,
      semester: 1,
      title: "Formulir HTML",
      duration: "2 × 45 menit",
      goals: [
        "Membuat formulir dengan form.",
        "Menghubungkan label dengan input.",
        "Menggunakan input, textarea, select, dan button."
      ],
      skills: ["Membuat form", "Menulis label", "Memilih tipe input"],
      prerequisite: "Pertemuan 8: tabel data sudah dibuat.",
      intro: "Formulir memungkinkan pengguna memasukkan informasi. Contohnya formulir kontak, pendaftaran, atau survei.\n\nFormulir pada pertemuan ini hanya tampilan, belum terhubung ke server. Data tidak akan terkirim atau tersimpan. Meskipun begitu, struktur dan label harus benar agar formulir mudah digunakan.",
      concepts: [
        { term: "form", text: "Wadah seluruh isian formulir.", analogy: "Seperti formulir kertas yang berisi beberapa kolom." },
        { term: "label", text: "Teks yang menjelaskan isian.", analogy: "Seperti petunjuk pada formulir kertas." },
        { term: "input", text: "Kolom isian satu baris.", analogy: "Seperti kotak jawaban singkat." },
        { term: "textarea", text: "Kolom isian panjang.", analogy: "Seperti kotak jawaban uraian." },
        { term: "select", text: "Daftar pilihan.", analogy: "Seperti menu pilihan di kantin." }
      ],
      why: "Setiap isian harus memiliki label agar pengguna tahu apa yang harus diisi. Tipe input yang tepat membantu validasi dasar di browser.",
      tags: [
        { name: "<form>", fn: "Membungkus formulir.", why: "Menandai area isian." },
        { name: "<label for=\"nama\">", fn: "Menjelaskan isian dan terhubung ke input.", why: "Membantu pengguna dan pembaca layar." },
        { name: "<input type=\"email\">", fn: "Membuat kolom isian.", why: "Tipe menentukan format data." },
        { name: "<textarea>", fn: "Membuat kolom isian panjang.", why: "Cocok untuk pesan." },
        { name: "<select> dan <option>", fn: "Membuat daftar pilihan.", why: "Membatasi jawaban agar konsisten." },
        { name: "<button type=\"submit\">", fn: "Tombol untuk mengirim formulir.", why: "Menandai aksi pengiriman." }
      ],
      steps: [
        "Apa yang akan dibuat? Halaman kontak dengan formulir sederhana.",
        "Apa yang harus dipersiapkan? File `kontak.html` baru.",
        "Buat file `kontak.html` dengan struktur HTML lengkap dan navigasi yang sama.",
        "Di dalam `<main>`, tambahkan judul dan paragraf pengantar.",
        "Tambahkan `<form>` dan isi dengan input nama, email, topik, dan pesan.",
        "Hubungkan setiap `label` dengan `input` melalui atribut `for` dan `id`.",
        "Tambahkan tombol submit dan catatan bahwa formulir belum terhubung ke server.",
        "Simpan perubahan dan buka preview halaman Kontak.",
        "Pastikan setiap isian memiliki label dan tipe yang sesuai."
      ],
      edits: [
        {
          op: "create",
          file: "kontak.html",
          note: "Buat file kontak.html berisi formulir. Formulir hanya tampilan, belum mengirim data.",
          content: KONTAK_9
        }
      ],
      location: "Buat kontak.html di folder proyek, lalu letakkan seluruh form di dalam main.",
      preview: {
        page: "kontak.html",
        highlight: ["form"],
        beforeLabel: "Halaman Kontak belum ada",
        afterLabel: "Formulir kontak sudah tampil",
        before: ["Belum ada halaman kontak."],
        after: ["Formulir memiliki label dan input.", "Ada pilihan topik dan kolom pesan.", "Tombol kirim hanya demonstrasi."]
      },
      target: [
        "Siswa berhasil membuat formulir kontak.",
        "Setiap input memiliki label.",
        "Siswa memahami bahwa formulir belum memiliki backend."
      ],
      checklist: [
        "File kontak.html sudah dibuat.",
        "Form sudah ditambahkan.",
        "Setiap input memiliki label.",
        "Tombol submit sudah ada."
      ],
      nextTeaser: "Pertemuan berikutnya kita menyusun ulang halaman dengan elemen semantik."
    },
    {
      no: 10,
      semester: 1,
      title: "Semantic HTML",
      duration: "2 × 45 menit",
      goals: [
        "Menggunakan header, nav, main, section, article, dan footer.",
        "Menyusun ulang halaman Beranda agar lebih rapi.",
        "Memindahkan konten ke bagian yang sesuai."
      ],
      skills: ["Menyusun struktur semantik", "Memindahkan konten", "Menjaga kode tetap valid"],
      prerequisite: "Pertemuan 9: formulir dan halaman kontak sudah ada.",
      intro: "Semantic HTML adalah penggunaan tag yang menjelaskan fungsi bagian halaman. Tag header berarti bagian atas, nav berarti navigasi, main berarti isi utama, dan footer berarti bagian bawah.\n\nPada pertemuan ini kita merapikan halaman Beranda. Ini bukan menghapus pekerjaan lama, tetapi memindahkan konten ke tempat yang lebih tepat. Daftar program dan teks formatting akan dipindahkan ke halaman Jurusan dan Profil pada pertemuan berikutnya.",
      concepts: [
        { term: "header", text: "Bagian atas halaman, biasanya berisi identitas dan navigasi.", analogy: "Seperti kop surat." },
        { term: "nav", text: "Kumpulan tautan navigasi.", analogy: "Seperti daftar isi." },
        { term: "main", text: "Isi utama halaman.", analogy: "Seperti isi utama buku." },
        { term: "section", text: "Satu bagian tematik.", analogy: "Seperti bab dalam buku." },
        { term: "article", text: "Konten yang berdiri sendiri, misalnya kartu.", analogy: "Seperti artikel kecil yang bisa dibaca terpisah." },
        { term: "footer", text: "Bagian bawah halaman.", analogy: "Seperti catatan kaki dan informasi penerbit." }
      ],
      why: "Struktur semantik memudahkan pembaca layar, mesin pencari, dan pengembang lain memahami halaman.",
      tags: [
        { name: "<header>", fn: "Membungkus bagian atas halaman.", why: "Memisahkan identitas situs dari isi utama." },
        { name: "<nav>", fn: "Membungkus navigasi.", why: "Menandai area menu." },
        { name: "<main>", fn: "Membungkus isi utama.", why: "Hanya boleh ada satu main per halaman." },
        { name: "<section>", fn: "Membungkus satu bagian.", why: "Mengelompokkan konten dengan judul." },
        { name: "<article>", fn: "Membungkus konten mandiri.", why: "Cocok untuk kartu informasi." },
        { name: "<footer>", fn: "Membungkus bagian bawah.", why: "Menampung informasi penutup." }
      ],
      steps: [
        "Apa yang akan dibuat? Halaman Beranda dengan struktur header, main, dan footer yang semantik.",
        "Apa yang harus dipersiapkan? File `index.html` dari Pertemuan 9.",
        "Buka `index.html`. Perhatikan navigasi, heading, daftar, dan gambar yang sudah ada.",
        "Bungkus navigasi dengan `<header class=\"site-header\">` dan tambahkan identitas situs.",
        "Pindahkan judul, tagline, dan tombol ke dalam `<section class=\"hero\">`.",
        "Pindahkan gambar sekolah ke dalam hero agar menjadi ilustrasi utama.",
        "Ubah daftar menjadi kartu `<article>` di dalam `<section>`.",
        "Tambahkan `<footer>` di bawah main.",
        "Simpan, buka preview, dan pastikan tidak ada konten yang terduplikasi."
      ],
      edits: [
        {
          op: "setFile",
          file: "index.html",
          note: "Susun ulang Beranda dengan header, main, section, article, dan footer. Daftar dan teks formatting dipindahkan ke halaman lain pada Pertemuan 11.",
          content: finalPage({
            title: "Beranda — SMK Creative Hub",
            description: "Website pembelajaran SMK Creative Hub",
            active: "index.html",
            main: INDEX_MAIN
          })
        }
      ],
      location: "Buka index.html. Ganti isi body dengan struktur header, main, dan footer di tab Kode Lengkap. Jangan menghapus file halaman lain.",
      preview: {
        page: "index.html",
        highlight: [".site-header", ".hero", ".card", ".site-footer"],
        beforeLabel: "Struktur masih bercampur",
        afterLabel: "Halaman sudah memakai elemen semantik",
        before: ["Navigasi, judul, daftar, dan gambar masih berada dalam satu alur sederhana."],
        after: ["Header membungkus identitas dan navigasi.", "Hero menampilkan judul utama dan gambar.", "Kartu artikel menggantikan daftar panjang.", "Footer muncul di bagian bawah."]
      },
      target: [
        "Siswa berhasil menggunakan header, nav, main, section, article, dan footer.",
        "Siswa memahami perpindahan konten, bukan penghapusan.",
        "Halaman Beranda tetap menampilkan informasi utama."
      ],
      checklist: [
        "Header dan nav sudah dibungkus dengan benar.",
        "Main hanya ada satu.",
        "Kartu memakai article.",
        "Footer sudah ditambahkan."
      ],
      nextTeaser: "Pertemuan berikutnya kita melengkapi tujuh halaman dan memindahkan konten ke halaman yang tepat."
    },
    {
      no: 11,
      semester: 1,
      title: "Website multi-halaman",
      duration: "2 × 45 menit",
      goals: [
        "Melengkapi tujuh halaman website.",
        "Menyamakan navigasi dan footer di semua halaman.",
        "Menggunakan aria-current untuk halaman aktif."
      ],
      skills: ["Menyusun halaman konsisten", "Menghubungkan tautan relatif", "Menandai halaman aktif"],
      prerequisite: "Pertemuan 10: Beranda sudah semantik.",
      intro: "Website yang baik memiliki halaman yang konsisten. Pengguna harus bisa berpindah dari Beranda ke Profil, Jurusan, Kegiatan, Galeri, Portofolio, dan Kontak tanpa bingung.\n\nPada pertemuan ini kita melengkapi semua halaman. Daftar program dari Pertemuan 5 dipindahkan ke halaman Jurusan, sedangkan teks formatting dari Pertemuan 4 dipindahkan ke halaman Profil. Dengan begitu, tidak ada materi yang hilang.",
      concepts: [
        { term: "Multi-halaman", text: "Website yang terdiri dari beberapa file HTML.", analogy: "Seperti buku dengan beberapa bab." },
        { term: "Konsistensi", text: "Navigasi dan tampilan yang sama di setiap halaman.", analogy: "Seperti rambu yang sama di setiap ruangan." },
        { term: "Tautan relatif", text: "Tautan yang mengarah ke file di folder yang sama.", analogy: "Seperti menunjukkan ruangan di gedung yang sama." },
        { term: "aria-current", text: "Penanda halaman yang sedang aktif.", analogy: "Seperti penanda 'Anda di sini' pada peta." }
      ],
      why: "Tanpa halaman lengkap, menu akan menuju file yang tidak ada. Tanpa konsistensi, pengguna merasa tersesat.",
      tags: [
        { name: "href=\"profil.html\"", fn: "Tautan relatif ke halaman profil.", why: "Menghubungkan halaman dalam satu folder." },
        { name: "aria-current=\"page\"", fn: "Menandai halaman aktif.", why: "Membantu navigasi dan aksesibilitas." },
        { name: "<footer>", fn: "Bagian bawah yang konsisten.", why: "Memberi informasi kontak dan identitas." },
        { name: "meta description", fn: "Ringkasan halaman untuk mesin pencari.", why: "Membantu halaman dipahami mesin pencari." }
      ],
      steps: [
        "Apa yang akan dibuat? Tujuh halaman yang saling terhubung dan konsisten.",
        "Apa yang harus dipersiapkan? File index.html, profil.html, dan jurusan.html dari pertemuan sebelumnya.",
        "Buka `profil.html`, lalu lengkapi isinya. Pindahkan teks formatting dari Beranda ke halaman ini.",
        "Buka `jurusan.html`, lalu lengkapi daftar program, kartu, dan tabel.",
        "Buat `kegiatan.html`, `galeri.html`, dan `portofolio.html` dengan struktur yang sama.",
        "Perbarui `kontak.html` agar memakai header dan footer yang konsisten.",
        "Pada setiap halaman, pindahkan `aria-current=\"page\"` ke tautan halaman yang sedang dibuka.",
        "Simpan semua file, lalu buka setiap menu dari Beranda.",
        "Pastikan tidak ada tautan yang menuju halaman kosong atau file yang salah."
      ],
      edits: [
        {
          op: "setFile",
          file: "profil.html",
          note: "Lengkapi halaman Profil dan pindahkan teks formatting dari Beranda ke sini.",
          content: finalPage({
            title: "Profil — SMK Creative Hub",
            description: "Profil dan visi pembelajaran SMK Creative Hub",
            active: "profil.html",
            main: PROFIL_MAIN
          })
        },
        {
          op: "setFile",
          file: "jurusan.html",
          note: "Lengkapi halaman Jurusan dengan daftar, kartu, dan tabel dari pertemuan sebelumnya.",
          content: finalPage({
            title: "Jurusan — SMK Creative Hub",
            description: "Program keahlian SMK Creative Hub",
            active: "jurusan.html",
            main: JURUSAN_MAIN
          })
        },
        {
          op: "create",
          file: "kegiatan.html",
          note: "Buat halaman kegiatan.html dengan struktur yang sama.",
          content: finalPage({
            title: "Kegiatan — SMK Creative Hub",
            description: "Kegiatan pembelajaran dan pengembangan siswa",
            active: "kegiatan.html",
            main: KEGIATAN_MAIN
          })
        },
        {
          op: "create",
          file: "galeri.html",
          note: "Buat halaman galeri.html dengan struktur yang sama.",
          content: finalPage({
            title: "Galeri — SMK Creative Hub",
            description: "Galeri kegiatan SMK Creative Hub",
            active: "galeri.html",
            main: GALERI_MAIN
          })
        },
        {
          op: "create",
          file: "portofolio.html",
          note: "Buat halaman portofolio.html dengan struktur yang sama.",
          content: finalPage({
            title: "Portofolio — SMK Creative Hub",
            description: "Portofolio karya siswa SMK Creative Hub",
            active: "portofolio.html",
            main: PORTOFOLIO_MAIN
          })
        },
        {
          op: "setFile",
          file: "kontak.html",
          note: "Perbarui halaman Kontak agar memakai header, footer, dan struktur yang konsisten.",
          content: finalPage({
            title: "Kontak — SMK Creative Hub",
            description: "Formulir kontak SMK Creative Hub",
            active: "kontak.html",
            main: KONTAK_MAIN
          })
        }
      ],
      location: "Lengkapi tujuh file HTML di folder proyek. Gunakan header, nav, main, dan footer yang sama di setiap halaman.",
      preview: {
        page: "jurusan.html",
        highlight: [".nav-list", ".page-hero", ".card", "table"],
        beforeLabel: "Baru tiga halaman",
        afterLabel: "Tujuh halaman sudah saling terhubung",
        before: ["Halaman Profil dan Jurusan masih sederhana.", "Menu Kontak dan halaman lain belum lengkap."],
        after: ["Tujuh halaman dapat dibuka.", "Navigasi dan footer konsisten.", "Daftar, formatting, dan tabel tetap ada di halaman yang tepat.", "Halaman aktif ditandai aria-current."]
      },
      target: [
        "Siswa berhasil membuat tujuh halaman.",
        "Semua tautan navigasi berfungsi.",
        "Tidak ada konten dari pertemuan sebelumnya yang hilang."
      ],
      checklist: [
        "Tujuh file HTML sudah ada.",
        "Navigasi sama di semua halaman.",
        "aria-current sudah dipindahkan sesuai halaman.",
        "Tidak ada tautan yang rusak."
      ],
      nextTeaser: "Pertemuan berikutnya kita mulai mengatur tampilan dengan CSS."
    },
    {
      no: 12,
      semester: 1,
      title: "Pengenalan CSS",
      duration: "2 × 45 menit",
      goals: [
        "Memahami fungsi CSS.",
        "Membuat file css/style.css.",
        "Menghubungkan stylesheet ke semua halaman."
      ],
      skills: ["Membuat file CSS", "Menghubungkan stylesheet", "Mengubah warna dan font"],
      prerequisite: "Pertemuan 11: tujuh halaman HTML sudah lengkap.",
      intro: "HTML menyusun isi halaman. CSS mengatur tampilannya: warna, ukuran huruf, jarak, dan lain-lain.\n\nKita akan membuat satu file CSS yang dipakai oleh semua halaman. Dengan begitu, perubahan tampilan cukup dilakukan di satu tempat.",
      concepts: [
        { term: "CSS", text: "Bahasa yang mengatur tampilan halaman.", analogy: "Seperti cat dan dekorasi setelah rumah dibangun." },
        { term: "External CSS", text: "CSS yang ditulis di file terpisah lalu dihubungkan.", analogy: "Seperti satu buku panduan warna untuk semua ruangan." },
        { term: "Selector", text: "Bagian yang menentukan elemen mana yang diberi gaya.", analogy: "Seperti alamat ruangan yang akan dicat." },
        { term: "Properti dan nilai", text: "Properti adalah hal yang diatur, nilai adalah isinya.", analogy: "Seperti 'warna' adalah properti dan 'biru' adalah nilai." }
      ],
      why: "Tanpa CSS, halaman hanya tampil sebagai teks polos. Satu file CSS eksternal membuat tampilan mudah dirawat.",
      tags: [
        { name: "<link rel=\"stylesheet\" href=\"css/style.css\">", fn: "Menghubungkan file CSS ke HTML.", why: "Tanpa link, CSS tidak dipakai." },
        { name: "body { margin: 0; }", fn: "Selector untuk seluruh isi halaman.", why: "Mengatur font dan warna dasar." },
        { name: "color", fn: "Mengatur warna teks.", why: "Membedakan judul dan isi." },
        { name: "font-family", fn: "Mengatur jenis huruf.", why: "Menentukan tampilan teks." }
      ],
      steps: [
        "Apa yang akan dibuat? File `css/style.css` dan tautannya di semua halaman.",
        "Apa yang harus dipersiapkan? Tujuh file HTML dari Pertemuan 11.",
        "Buat folder `css` di dalam folder proyek.",
        "Buat file `style.css` di dalam folder `css`.",
        "Tulis aturan dasar untuk body dan h1.",
        "Buka setiap file HTML dan tambahkan `<link rel=\"stylesheet\" href=\"css/style.css\">` di dalam `<head>`, setelah `<title>`.",
        "Simpan semua file.",
        "Buka Beranda dan refresh browser.",
        "Pastikan warna dan jenis huruf berubah di semua halaman."
      ],
      edits: [
        {
          op: "create",
          file: "css/style.css",
          note: "Buat file CSS pertama. Aturan ini akan dikembangkan pada pertemuan berikutnya.",
          content: CSS_12
        },
        {
          op: "insert",
          file: "index.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head, setelah title.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "profil.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "jurusan.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "kegiatan.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "galeri.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "portofolio.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        },
        {
          op: "insert",
          file: "kontak.html",
          before: `</head>`,
          note: "Tambahkan link stylesheet di dalam head.",
          content: `  <link rel="stylesheet" href="css/style.css">\n`
        }
      ],
      location: "Buat css/style.css, lalu tambahkan <link rel=\"stylesheet\" href=\"css/style.css\"> di dalam head setiap halaman.",
      preview: {
        page: "index.html",
        highlight: ["body", "h1"],
        beforeLabel: "Halaman masih polos",
        afterLabel: "Warna dan font dasar sudah berubah",
        before: ["Tampilan masih memakai gaya bawaan browser."],
        after: ["Latar halaman menjadi terang.", "Teks memakai font Arial.", "Judul berwarna biru tua."]
      },
      target: [
        "Siswa berhasil membuat file CSS eksternal.",
        "Semua halaman terhubung ke stylesheet.",
        "Perubahan warna dan font terlihat."
      ],
      checklist: [
        "Folder css dan file style.css sudah dibuat.",
        "Aturan body dan h1 sudah ditulis.",
        "Link stylesheet ada di semua halaman.",
        "Perubahan terlihat setelah refresh."
      ],
      nextTeaser: "Pertemuan berikutnya kita memakai selector dan class untuk mengatur komponen."
    },
    {
      no: 13,
      semester: 1,
      title: "Selector dan cascade",
      duration: "2 × 45 menit",
      goals: [
        "Menggunakan selector elemen, class, dan id.",
        "Memahami grouping dan descendant selector.",
        "Menulis aturan CSS yang mudah dipakai ulang."
      ],
      skills: ["Memilih selector", "Membuat class", "Menghindari gaya berulang"],
      prerequisite: "Pertemuan 12: file CSS eksternal sudah terhubung.",
      intro: "Selector adalah cara CSS memilih elemen yang akan diberi gaya. Kita bisa memilih semua paragraf, satu class tertentu, atau satu id tertentu.\n\nClass dapat dipakai berulang di banyak elemen. Id sebaiknya dipakai untuk satu elemen unik. Pada pertemuan ini kita menata header, navigasi, container, dan tombol.",
      concepts: [
        { term: "Selector elemen", text: "Memilih semua elemen dengan nama tag tertentu, misalnya h1.", analogy: "Seperti memilih semua kursi di ruangan." },
        { term: "Selector class", text: "Memilih elemen dengan class tertentu, diawali titik.", analogy: "Seperti memilih semua kursi berlabel 'tamu'." },
        { term: "Selector id", text: "Memilih satu elemen dengan id tertentu, diawali tanda pagar.", analogy: "Seperti memilih satu kursi dengan nomor unik." },
        { term: "Descendant", text: "Memilih elemen di dalam elemen lain, misalnya .nav-list a.", analogy: "Seperti memilih pintu di dalam ruangan tertentu." },
        { term: "Cascade", text: "Aturan yang lebih spesifik atau ditulis belakangan dapat mengalahkan aturan sebelumnya.", analogy: "Seperti instruksi terbaru yang menggantikan instruksi lama." }
      ],
      why: "Selector yang tepat membuat CSS ringkas. Kita tidak perlu menulis gaya yang sama berulang kali.",
      tags: [
        { name: ".container", fn: "Membatasi lebar isi halaman.", why: "Agar teks tidak terlalu melebar di layar besar." },
        { name: ".button", fn: "Menata tombol dan tautan bergaya tombol.", why: "Agar semua tombol tampil konsisten." },
        { name: "#kontak", fn: "Memilih satu elemen dengan id kontak.", why: "Memberi aturan khusus pada satu bagian." },
        { name: ".site-header", fn: "Menata bagian header.", why: "Membedakan header dari isi utama." },
        { name: ".nav-list a", fn: "Memilih tautan di dalam daftar navigasi.", why: "Menghindari memengaruhi tautan lain." }
      ],
      steps: [
        "Apa yang akan dibuat? Aturan CSS untuk container, tombol, header, dan navigasi.",
        "Apa yang harus dipersiapkan? File `css/style.css` dari Pertemuan 12.",
        "Buka `css/style.css`.",
        "Tambahkan aturan `.container` untuk membatasi lebar halaman.",
        "Tambahkan aturan `.button` untuk memberi jarak dalam tombol.",
        "Tambahkan aturan `.site-header`, `.brand`, dan `.nav-list`.",
        "Tambahkan aturan `#kontak` sebagai contoh selector id.",
        "Simpan dan buka Beranda.",
        "Periksa apakah header, navigasi, dan tombol berubah tanpa mengubah elemen lain."
      ],
      edits: [
        {
          op: "setFile",
          file: "css/style.css",
          note: "Tambahkan selector class, id, descendant, dan aturan komponen dasar.",
          content: CSS_13
        }
      ],
      location: "Buka css/style.css, lalu tambahkan aturan container, tombol, header, dan navigasi setelah aturan h1.",
      preview: {
        page: "index.html",
        highlight: [".site-header", ".nav-list", ".button"],
        beforeLabel: "Baru warna dan font dasar",
        afterLabel: "Header dan navigasi sudah tertata",
        before: ["Navigasi masih tampil sebagai daftar biasa."],
        after: ["Header memiliki latar biru tua.", "Navigasi tidak lagi memakai titik.", "Tombol memiliki jarak dalam.", "Container membatasi lebar isi."]
      },
      target: [
        "Siswa berhasil menggunakan selector class dan id.",
        "Siswa memahami descendant selector.",
        "Header dan navigasi tampil lebih rapi."
      ],
      checklist: [
        "Aturan .container sudah ditambahkan.",
        "Aturan .button sudah ditambahkan.",
        "Aturan header dan navigasi sudah ditambahkan.",
        "Tidak ada elemen lain yang rusak."
      ],
      nextTeaser: "Pertemuan berikutnya kita memakai variabel warna dan satuan yang konsisten."
    },
    {
      no: 14,
      semester: 1,
      title: "Warna, background, dan satuan",
      duration: "2 × 45 menit",
      goals: [
        "Memahami warna HEX, rgb, dan hsl.",
        "Menggunakan variabel warna CSS.",
        "Mengatur background dan satuan px, rem, serta persen."
      ],
      skills: ["Menentukan palet warna", "Memakai variabel CSS", "Mengatur latar halaman"],
      prerequisite: "Pertemuan 13: selector dan komponen dasar sudah ada.",
      intro: "Warna membantu pengguna membedakan bagian halaman dan mengenali identitas website. Kita akan memakai satu palet warna agar tampilan tidak acak.\n\nVariabel CSS memungkinkan kita menyimpan warna di satu tempat. Jika ingin mengganti warna utama, cukup ubah satu nilai.",
      concepts: [
        { term: "HEX", text: "Kode warna berbentuk #164e63.", analogy: "Seperti kode cat dengan nomor khusus." },
        { term: "rgb dan hsl", text: "Cara lain menulis warna dengan nilai angka.", analogy: "Seperti mencampur cat dengan takaran." },
        { term: "Variabel CSS", text: "Nilai yang disimpan dengan awalan -- dan dipanggil memakai var().", analogy: "Seperti menyimpan warna cat utama di satu kaleng." },
        { term: "Satuan", text: "px untuk piksel, rem untuk ukuran relatif, persen untuk bagian dari induk.", analogy: "Seperti memilih satuan centimeter atau meter." }
      ],
      why: "Palet warna yang konsisten membuat website terlihat profesional dan mudah dikenali.",
      tags: [
        { name: ":root", fn: "Tempat menyimpan variabel global.", why: "Agar warna mudah diubah dari satu tempat." },
        { name: "--primary", fn: "Nama variabel warna utama.", why: "Dipakai ulang di banyak aturan." },
        { name: "var(--primary)", fn: "Memanggil nilai variabel.", why: "Menjaga konsistensi warna." },
        { name: "background", fn: "Mengatur latar elemen.", why: "Membedakan header, body, dan footer." },
        { name: "rem", fn: "Satuan relatif terhadap ukuran huruf dasar.", why: "Lebih fleksibel daripada px untuk teks." }
      ],
      steps: [
        "Apa yang akan dibuat? Palet warna dan latar halaman yang konsisten.",
        "Apa yang harus dipersiapkan? File `css/style.css` dari Pertemuan 13.",
        "Buka `css/style.css`.",
        "Tambahkan blok `:root` berisi variabel warna di paling atas file.",
        "Ganti warna body dan h1 dengan variabel.",
        "Tambahkan aturan `img` dan `a`.",
        "Ganti warna header dan tombol dengan variabel.",
        "Simpan dan buka preview.",
        "Pastikan warna header, tombol, dan tautan tetap konsisten di semua halaman."
      ],
      edits: [
        {
          op: "setFile",
          file: "css/style.css",
          note: "Tambahkan variabel warna dan ganti nilai warna langsung dengan var().",
          content: CSS_14
        }
      ],
      location: "Buka css/style.css. Letakkan :root di paling atas, lalu gunakan var(--nama) pada aturan body, header, dan tombol.",
      preview: {
        page: "index.html",
        highlight: ["body", ".site-header", ".button"],
        beforeLabel: "Warna masih ditulis langsung",
        afterLabel: "Palet warna sudah memakai variabel",
        before: ["Warna ditulis berulang di beberapa aturan."],
        after: ["Warna utama tersimpan di :root.", "Header dan tombol memakai warna yang sama.", "Latar halaman dan tautan lebih konsisten."]
      },
      target: [
        "Siswa berhasil membuat variabel warna.",
        "Siswa berhasil memakai var() pada beberapa aturan.",
        "Palet warna maksimal tiga warna utama."
      ],
      checklist: [
        "Blok :root sudah ditambahkan.",
        "Variabel warna utama sudah dibuat.",
        "Body dan header memakai variabel.",
        "Tombol dan tautan memakai warna palet."
      ],
      nextTeaser: "Pertemuan berikutnya kita mengatur tipografi agar teks mudah dibaca."
    },
    {
      no: 15,
      semester: 1,
      title: "Typography dan Google Fonts alternatif",
      duration: "2 × 45 menit",
      goals: [
        "Mengatur font-family, ukuran, dan line-height.",
        "Membuat hierarki judul dan isi.",
        "Menjaga teks tetap nyaman dibaca di HP."
      ],
      skills: ["Mengatur tipografi", "Memakai clamp", "Membatasi lebar teks"],
      prerequisite: "Pertemuan 14: palet warna sudah ada.",
      intro: "Tipografi adalah seni mengatur teks agar nyaman dibaca. Ukuran, jarak antarbaris, dan lebar paragraf memengaruhi kenyamanan membaca.\n\nKita akan memakai font sistem yang tersedia di perangkat. Ini lebih aman daripada memuat font eksternal dan tetap terlihat rapi.",
      concepts: [
        { term: "font-family", text: "Menentukan jenis huruf.", analogy: "Seperti memilih gaya tulisan tangan." },
        { term: "font-size", text: "Mengatur ukuran huruf.", analogy: "Seperti memilih ukuran huruf di buku." },
        { term: "line-height", text: "Mengatur jarak antarbaris.", analogy: "Seperti memberi napas antar baris agar tidak sesak." },
        { term: "clamp", text: "Membuat ukuran menyesuaikan layar dengan batas minimum dan maksimum.", analogy: "Seperti ukuran baju yang menyesuaikan tubuh." },
        { term: "Lebar paragraf", text: "Membatasi panjang baris agar mata tidak cepat lelah.", analogy: "Seperti kolom koran yang tidak terlalu lebar." }
      ],
      why: "Teks yang nyaman dibaca membuat siswa lebih mudah memahami materi dan pengguna lebih betah.",
      tags: [
        { name: "font-size: clamp(2rem, 5vw, 3.5rem)", fn: "Mengatur ukuran responsif tanpa media query.", why: "Judul tetap proporsional di HP dan desktop." },
        { name: "line-height: 1.65", fn: "Memberi jarak antarbaris.", why: "Teks tidak terlihat sesak." },
        { name: "max-width: 62ch", fn: "Membatasi lebar paragraf.", why: "Mata lebih mudah berpindah baris." },
        { name: "text-transform: uppercase", fn: "Mengubah teks menjadi huruf kapital.", why: "Memberi penekanan pada label kecil." },
        { name: "letter-spacing", fn: "Mengatur jarak antarkarakter.", why: "Membuat label lebih mudah dibaca." }
      ],
      steps: [
        "Apa yang akan dibuat? Aturan tipografi untuk hero, judul bagian, dan paragraf.",
        "Apa yang harus dipersiapkan? File `css/style.css` dari Pertemuan 14.",
        "Buka `css/style.css`.",
        "Tambahkan aturan `.hero`, `.hero h1`, dan `.hero p`.",
        "Tambahkan aturan `.eyebrow` untuk label kecil di atas judul.",
        "Tambahkan aturan `.section` dan `.section-heading h2`.",
        "Simpan file dan buka preview.",
        "Perkecil lebar preview ke ukuran HP.",
        "Pastikan judul tidak terlalu besar dan paragraf tetap nyaman dibaca."
      ],
      edits: [
        {
          op: "setFile",
          file: "css/style.css",
          note: "Tambahkan aturan tipografi, hero, label kecil, dan judul bagian.",
          content: CSS_15
        }
      ],
      location: "Buka css/style.css, lalu tambahkan aturan .hero, .eyebrow, .section, dan .section-heading h2.",
      preview: {
        page: "index.html",
        highlight: [".hero h1", ".hero p", ".eyebrow"],
        beforeLabel: "Judul masih memakai ukuran bawaan",
        afterLabel: "Hierarki teks sudah lebih jelas",
        before: ["Judul dan paragraf belum memiliki jarak yang nyaman."],
        after: ["Judul hero menyesuaikan lebar layar.", "Label kecil tampil kapital dan berjarak.", "Paragraf dibatasi agar mudah dibaca."]
      },
      target: [
        "Siswa berhasil mengatur ukuran dan jarak teks.",
        "Siswa memahami fungsi clamp.",
        "Teks nyaman dibaca di HP dan desktop."
      ],
      checklist: [
        "Aturan hero dan judul sudah ditambahkan.",
        "line-height sudah diatur.",
        "Paragraf dibatasi lebarnya.",
        "Teks tetap nyaman di layar HP."
      ],
      nextTeaser: "Pertemuan berikutnya kita mempelajari box model untuk mengatur jarak dan ukuran kotak."
    },
    {
      no: 16,
      semester: 1,
      title: "Box model",
      duration: "2 × 45 menit",
      goals: [
        "Memahami width, padding, border, dan margin.",
        "Menggunakan box-sizing border-box.",
        "Mengatur jarak kartu dan container secara konsisten."
      ],
      skills: ["Menghitung ukuran kotak", "Mengatur padding dan margin", "Membuat kartu dasar"],
      prerequisite: "Pertemuan 15: tipografi sudah diatur.",
      intro: "Setiap elemen HTML dianggap sebagai kotak. Kotak memiliki isi, padding (jarak dalam), border (garis tepi), dan margin (jarak luar).\n\nMemahami box model membantu kita mengatur jarak tanpa menebak-nebak. Kita juga memakai box-sizing agar lebar elemen lebih mudah dihitung.",
      concepts: [
        { term: "Content", text: "Isi elemen, misalnya teks di dalam kartu.", analogy: "Seperti barang di dalam kotak." },
        { term: "Padding", text: "Jarak antara isi dan border.", analogy: "Seperti busa pembungkus di dalam kotak." },
        { term: "Border", text: "Garis tepi elemen.", analogy: "Seperti dinding kotak." },
        { term: "Margin", text: "Jarak antara kotak dan elemen lain.", analogy: "Seperti jarak antarkotak di rak." },
        { term: "box-sizing", text: "Mengatur apakah padding dan border dihitung dalam lebar.", analogy: "Seperti memilih apakah ukuran kotak dihitung dengan pembungkusnya." }
      ],
      why: "Tanpa pemahaman box model, elemen bisa saling menempel atau melebar melewati layar.",
      tags: [
        { name: "width", fn: "Mengatur lebar elemen.", why: "Membatasi ukuran konten." },
        { name: "margin", fn: "Mengatur jarak luar.", why: "Memberi ruang antarelemen." },
        { name: "padding", fn: "Mengatur jarak dalam.", why: "Membuat isi tidak menempel pada border." },
        { name: "border", fn: "Memberi garis tepi.", why: "Memisahkan kartu dari latar." },
        { name: "* { box-sizing: border-box; }", fn: "Menghitung padding dan border dalam lebar elemen.", why: "Memudahkan perhitungan ukuran." }
      ],
      steps: [
        "Apa yang akan dibuat? Kartu informasi dan container dengan jarak yang konsisten.",
        "Apa yang harus dipersiapkan? File `css/style.css` dari Pertemuan 15.",
        "Buka `css/style.css`.",
        "Tambahkan aturan `* { box-sizing: border-box; }`.",
        "Tambahkan aturan `.card` dengan background, border, padding, dan margin.",
        "Tambahkan aturan `.muted` untuk teks pendukung.",
        "Simpan dan buka preview.",
        "Perhatikan jarak di dalam kartu dan jarak antarkartu.",
        "Pastikan kartu tidak melebar melewati layar HP."
      ],
      edits: [
        {
          op: "setFile",
          file: "css/style.css",
          note: "Tambahkan box-sizing, aturan kartu dasar, dan teks pendukung.",
          content: CSS_16
        }
      ],
      location: "Buka css/style.css, lalu tambahkan * { box-sizing: border-box }, .card, dan .muted.",
      preview: {
        page: "index.html",
        highlight: [".card", ".container"],
        beforeLabel: "Kartu masih menempel pada latar",
        afterLabel: "Kartu memiliki jarak dan garis tepi",
        before: ["Kartu belum memiliki padding dan border."],
        after: ["Isi kartu tidak menempel pada tepi.", "Kartu memiliki garis tepi tipis.", "Jarak antarkartu lebih konsisten."]
      },
      target: [
        "Siswa berhasil membedakan padding dan margin.",
        "Siswa berhasil membuat kartu dasar.",
        "Tidak ada elemen yang melebar melewati layar."
      ],
      checklist: [
        "box-sizing sudah ditambahkan.",
        "Aturan .card sudah ditambahkan.",
        "Padding dan margin sudah dicoba.",
        "Kartu tidak melebar di HP."
      ],
      nextTeaser: "Pertemuan berikutnya kita mempercantik kartu, tombol, dan footer."
    },
    {
      no: 17,
      semester: 1,
      title: "Border, shadow, dan komponen",
      duration: "2 × 45 menit",
      goals: [
        "Menggunakan border-radius dan box-shadow.",
        "Membuat tombol dengan hover sederhana.",
        "Menata footer dan komponen halaman dalam."
      ],
      skills: ["Membuat komponen visual", "Mengatur sudut dan bayangan", "Menambahkan hover"],
      prerequisite: "Pertemuan 16: box model dan kartu dasar sudah ada.",
      intro: "Sekarang kita menyempurnakan tampilan komponen. Sudut membulat dan bayangan halus membuat kartu terlihat lebih rapi tanpa mengganggu keterbacaan.\n\nKita juga menata footer, halaman dalam, dan galeri agar seluruh website memiliki identitas visual yang sama.",
      concepts: [
        { term: "border-radius", text: "Membuat sudut elemen membulat.", analogy: "Seperti memotong sudut kertas agar tidak tajam." },
        { term: "box-shadow", text: "Menambahkan bayangan pada kotak.", analogy: "Seperti bayangan benda yang terkena cahaya." },
        { term: "hover", text: "Gaya saat kursor berada di atas elemen.", analogy: "Seperti tombol yang menyala saat disentuh." },
        { term: "cursor: pointer", text: "Mengubah kursor menjadi tangan.", analogy: "Memberi tanda bahwa elemen dapat diklik." },
        { term: "Komponen", text: "Bagian tampilan yang dipakai berulang, misalnya tombol dan kartu.", analogy: "Seperti cetakan kue yang menghasilkan bentuk sama." }
      ],
      why: "Komponen yang konsisten membuat website terasa rapi dan mudah digunakan.",
      tags: [
        { name: "border-radius", fn: "Membulatkan sudut.", why: "Membuat kartu dan tombol lebih halus." },
        { name: "box-shadow", fn: "Memberi bayangan.", why: "Memisahkan kartu dari latar." },
        { name: ":hover", fn: "Mengubah gaya saat kursor di atas elemen.", why: "Memberi umpan balik interaktif." },
        { name: "text-decoration: none", fn: "Menghilangkan garis bawah tautan.", why: "Tombol terlihat seperti tombol, bukan tautan biasa." },
        { name: ".site-footer", fn: "Menata bagian bawah halaman.", why: "Menutup halaman dengan rapi." }
      ],
      steps: [
        "Apa yang akan dibuat? Kartu, tombol, footer, halaman dalam, dan galeri yang tertata.",
        "Apa yang harus dipersiapkan? File `css/style.css` dari Pertemuan 16.",
        "Buka `css/style.css`.",
        "Perbarui aturan `.card` dengan border-radius dan box-shadow.",
        "Perbarui aturan `.button` dengan sudut membulat dan hover.",
        "Tambahkan aturan `.site-footer`, `.page-hero`, `.content`, dan `.gallery-grid img`.",
        "Simpan dan buka preview.",
        "Arahkan kursor ke tombol untuk melihat perubahan.",
        "Periksa semua halaman agar kartu dan footer konsisten."
      ],
      edits: [
        {
          op: "setFile",
          file: "css/style.css",
          note: "Sempurnakan kartu, tombol, footer, halaman dalam, dan galeri.",
          content: CSS_17
        }
      ],
      location: "Buka css/style.css, lalu perbarui .card dan .button. Tambahkan aturan footer, page-hero, content, dan galeri.",
      preview: {
        page: "index.html",
        highlight: [".card", ".button", ".site-footer"],
        beforeLabel: "Komponen masih datar",
        afterLabel: "Komponen sudah memiliki sudut, bayangan, dan footer",
        before: ["Kartu belum memiliki sudut membulat dan bayangan."],
        after: ["Kartu tampil dengan sudut membulat.", "Tombol memiliki bentuk pil dan bereaksi saat hover.", "Footer menutup halaman dengan latar gelap.", "Halaman dalam dan galeri ikut tertata."]
      },
      target: [
        "Siswa berhasil membuat tiga komponen konsisten.",
        "Siswa berhasil menambahkan hover pada tombol.",
        "Footer dan halaman dalam tampil rapi."
      ],
      checklist: [
        "Border-radius dan box-shadow sudah dipakai.",
        "Tombol memiliki hover.",
        "Footer sudah ditata.",
        "Halaman dalam dan galeri ikut tertata."
      ],
      nextTeaser: "Pertemuan berikutnya kita melakukan review akhir Semester 1 dan membandingkan hasil dengan versi awal."
    },
    {
      no: 18,
      semester: 1,
      title: "Review semester dan website v1.0",
      duration: "2 × 45 menit",
      goals: [
        "Memeriksa seluruh halaman dan tautan.",
        "Memastikan kode kumulatif tetap valid.",
        "Membandingkan hasil akhir dengan hasil pertemuan sebelumnya."
      ],
      skills: ["Melakukan pengujian manual", "Memeriksa konsistensi", "Mendokumentasikan hasil"],
      prerequisite: "Pertemuan 17: seluruh komponen CSS sudah selesai.",
      intro: "Ini pertemuan terakhir Semester 1. Tidak ada kode baru. Tugas kita adalah memeriksa apakah website yang dibangun dari Pertemuan 1 sampai 17 sudah berjalan dengan baik.\n\nReview bukan sekadar membuka halaman. Kita harus menguji tautan, gambar, formulir, struktur heading, dan tampilan di beberapa ukuran layar.",
      concepts: [
        { term: "Review", text: "Memeriksa hasil kerja secara menyeluruh.", analogy: "Seperti memeriksa barang bawaan sebelum bepergian." },
        { term: "Validasi", text: "Memastikan kode mengikuti aturan dan tidak rusak.", analogy: "Seperti memeriksa apakah semua pintu rumah bisa ditutup." },
        { term: "Konsistensi", text: "Tampilan dan perilaku yang sama di seluruh halaman.", analogy: "Seperti semua rambu di sekolah memakai gaya yang sama." },
        { term: "Dokumentasi", text: "Catatan tentang apa yang sudah dibuat dan apa yang perlu diperbaiki.", analogy: "Seperti buku catatan perjalanan." }
      ],
      why: "Website yang belum diuji sering memiliki tautan rusak, gambar hilang, atau tampilan yang berantakan di HP.",
      tags: [
        { name: "Review tautan", fn: "Memastikan semua menu menuju file yang benar.", why: "Mencegah halaman kosong." },
        { name: "Review gambar", fn: "Memastikan gambar muncul dan memiliki alt.", why: "Menjaga aksesibilitas." },
        { name: "Review formulir", fn: "Memastikan setiap input memiliki label.", why: "Membantu pengguna mengisi data." },
        { name: "Review responsif", fn: "Menguji tampilan di lebar layar berbeda.", why: "Memastikan nyaman dipakai di HP." }
      ],
      steps: [
        "Apa yang akan dibuat? Laporan review dan salinan folder proyek sebagai versi 1.0.",
        "Apa yang harus dipersiapkan? Seluruh file dari Pertemuan 1 sampai 17.",
        "Buka setiap halaman: Beranda, Profil, Jurusan, Kegiatan, Galeri, Portofolio, dan Kontak.",
        "Klik setiap menu dan pastikan tidak ada tautan yang rusak.",
        "Periksa gambar, alt, heading, dan label formulir.",
        "Uji tampilan di lebar layar HP dan desktop.",
        "Bandingkan hasil akhir dengan preview Pertemuan 17.",
        "Tuliskan tiga hal yang sudah baik dan tiga hal yang perlu diperbaiki.",
        "Simpan salinan folder proyek sebagai `versi-1.0` sebelum melanjutkan ke Semester 2."
      ],
      edits: [],
      location: "Tidak ada kode baru. Buka semua halaman dan gunakan checklist pemeriksaan di bawah.",
      preview: {
        page: "index.html",
        highlight: [],
        beforeLabel: "Hasil Pertemuan 17",
        afterLabel: "Hasil akhir Semester 1",
        before: ["Website sudah memiliki HTML, CSS, dan tujuh halaman."],
        after: ["Tidak ada kode baru pada pertemuan ini.", "Seluruh halaman diperiksa dan dibandingkan.", "Hasil disimpan sebagai versi 1.0."]
      },
      target: [
        "Siswa berhasil memeriksa tujuh halaman.",
        "Siswa menemukan dan memperbaiki minimal satu masalah.",
        "Siswa menyimpan salinan proyek sebagai versi 1.0."
      ],
      checklist: [
        "Semua menu dapat dibuka.",
        "Semua gambar muncul dan memiliki alt.",
        "Setiap input formulir memiliki label.",
        "Tidak ada scroll horizontal di HP.",
        "Tiga catatan perbaikan sudah ditulis."
      ],
      nextTeaser: "Selamat! Kamu menyelesaikan Semester 1. Hasilmu dapat dibandingkan dengan folder hasil Semester 1, lalu dikembangkan lagi di Semester 2."
    }
/* __LESSONS__ */
  ];

  root.COURSE_DATA = {
    meta: {
      title: "Kelas HTML & CSS — SMK Creative Hub",
      semester: 1,
      totalLessons: lessons.length,
      storageKey: "creativeHubProgressV2",
      oldStorageKey: "creativeHubDone"
    },
    lessons: lessons
  };
})(typeof window !== "undefined" ? window : globalThis);
