# Fix SEO — InBody Clinic

Dokumen pekerjaan untuk menuntaskan kesesuaian situs dengan `panduan-seo-react-vite.md`.
Berbeda dari `task.md`, file ini khusus membahas gap SEO hasil audit project terhadap panduan,
beserta rencana perbaikan yang siap dieksekusi.

Audit dilakukan tanggal **24 Oktober 2026** terhadap hasil build `dist/` terbaru.

---

## Status kesesuaian terhadap panduan

| Tahap panduan | Status | Bukti di project |
| --- | --- | --- |
| 1. Strategi rendering (prerender) | ✅ Lewat | `scripts/build.mjs` prerender 23 route + `404.html` (SSR `renderToString`), setara `vite-ssg` tanpa tool pihak ketiga |
| 2. URL nyata, tanpa hash routing | ✅ Lewat | `BrowserRouter` + hydration (`src/entry-client.jsx`); tiap URL adalah file fisik `.html` |
| 3. Meta tag per halaman | ✅ Implemented; publish on next build/deploy | `title`, `description`, canonical, Open Graph, dan Twitter Card dihasilkan dari `src/routes.js` oleh `scripts/build.mjs` |
| 4. robots.txt & sitemap.xml | ✅ Implemented; publish on next build/deploy | `scripts/build.mjs` now generates both files from `src/routes.js`; GitHub Pages provides its full public base URL through `SITE_URL` |
| 5. Hosting SPA tidak 404 | ✅ Lewat | Semua URL = file fisik, tidak butuh rewrite; `404.html`, `.nojekyll`, `.github/workflows/deploy.yml` lengkap |
| 6. Struktur heading, `<a href>`, alt | ✅ Lewat | 24/24 file HTML tepat satu `<h1>`; nav memakai `<a href>` nyata; alt deskriptif dari `js/data/` |
| 7. Performa | ⚠️ Sebagian | `loading="lazy"` + `fetchPriority` ✅; GSAP CDN async dengan fallback ✅; 12 foto galeri disajikan sebagai WebP ≤ 114 KB dengan JPEG fallback; optimasi gambar hero/detail service masih tersisa |
| 8. Search Console / Bing | ❌ Belum | Token verifikasi belum ada (menunggu domain live) |
| 9. Structured Data JSON-LD | ✅ Implemented; publish on next build/deploy | `scripts/build.mjs` emits one shared `MedicalClinic` entity on every public route; clinic address and opening hours come from `js/data/clinic-contact.js` |
| 10. Pantau & bersabar | — | Bekerja setelah situs online |

**Kesimpulan:** fondasi jauh di atas minimum panduan (konten penuh tersedia di HTML awal,
satu `<h1>` per halaman, animasi tidak menyembunyikan konten bila CDN gagal —
`js/features/content-reveal.js:80` hanya men-set `opacity: 0` saat runtime dengan timeout 1 detik).
robots.txt, sitemap.xml, canonical, Open Graph, Twitter Card, dan structured data klinik sekarang dibuat saat build;
gap SEO yang tersisa meliputi pengoptimalan media serta verifikasi setelah domain dipublikasikan.

---

## Rencana implementasi

### Prioritas 1 — Generate robots.txt & sitemap.xml saat build ✅

Semua file dibuat oleh `scripts/build.mjs`. Pola `public/` dari panduan **tidak berlaku** di project ini
(`vite.config.js` memakai `publicDir: false`); build script memakai `src/routes.js` sebagai sumber URL.
Build memvalidasi `SITE_URL` sebagai URL HTTPS sebelum mulai menghasilkan output.

Kode pembuat file setelah prerender dan penyalinan aset:

```js
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteBaseUrl}/sitemap.xml\n`;
await writeFile(resolve(outputRoot, 'robots.txt'), robots);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url>\n    <loc>${escape(`${siteBaseUrl}${route.path}`)}</loc>\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(outputRoot, 'sitemap.xml'), sitemap);
```

- 23 `<url>` di-generate otomatis; menambah halaman baru di `routes.js` otomatis ikut sitemap.
- Jangan memasukkan `/404.html` ke sitemap.
- `SITE_URL` harus berisi URL HTTPS publik, termasuk base path bila hosting memakai subfolder; workflow GitHub Pages mengisi nilai ini dari konfigurasi Pages.
- `<lastmod>` tidak ditambahkan karena build timestamp bukan tanggal perubahan masing-masing halaman.

### Prioritas 2 — Canonical + Open Graph + Twitter Card per halaman ✅

Tag dihasilkan di `writePage()` memakai marker `<!--app-route-->`. URL absolut mempertahankan base path dari `SITE_URL`:

```js
const canonical = `${siteBaseUrl}${path}`;
const configuredOgImage = route.ogImage ?? '/assets/logo/site_logo.png';
const ogImage = `${siteBaseUrl}/${configuredOgImage.replace(/^\/+/, '')}`;
// Canonical, og:*, and twitter:* are added to each public route's static HTML.
// 404.html receives no canonical and is marked noindex.
```

- `og:image` per halaman bersifat opsional lewat field `ogImage` di `src/routes.js`; halaman lain memakai logo.
  URL hasil build bersifat absolut dan mempertahankan base path agar crawler bisa mengambil gambarnya.
- **Tidak perlu `react-helmet-async`** — injeksi build-time lebih kokoh untuk situs prerendered.
- Efek client-side penggantian title/description di `src/App.jsx:78-79` tidak perlu diubah.

### Prioritas 3 — JSON-LD klinik pada seluruh halaman publik ✅

`scripts/build.mjs` menyisipkan satu entitas `MedicalClinic` bersama ke setiap halaman publik.
`Physiotherapy` dipakai sebagai nilai `medicalSpecialty`, bukan sebagai tipe entitas:

```js
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'InBody Clinic',
  url: `${siteBaseUrl}/`,
  logo: `${siteBaseUrl}/assets/logo/site_logo.png`,
  telephone: '+61424912490',
  email: 'Sailainsua@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 336 New South Head Road',
    addressLocality: 'Double Bay',
    addressRegion: 'NSW',
    postalCode: '2028',
    addressCountry: 'AU',
  },
  medicalSpecialty: 'https://schema.org/Physiotherapy',
};
```

- Alamat, jam, telepon, email, dan peta dibaca dari `js/data/clinic-contact.js` agar tidak ada sumber data kedua.
- 404 tidak diberi structured data; setiap halaman publik mendapat tepat satu blok JSON-LD.
- Tidak ada `sameAs` Fresha karena URL booking yang tersedia merupakan tautan alur booking, bukan profil klinik yang dikonfirmasi sebagai profil publik.

### Prioritas 4 — Kompresi & WebP galeri ✅

- Semua 12 foto `assets/gallery/` punya varian WebP hingga lebar 1600px; tiap varian di bawah 200 KB.
- Galeri klinik dan foto resepsionis di halaman The InBody Method memakai `<picture>` dengan WebP + fallback JPEG.
- Foto JPEG asli tetap ada untuk fallback dan konten non-galeri; hero slider `home_slider_*.jpg` ikut `fetchPriority="high"` jadi prioritas.
- Foto hero/detail service (≤ 190 KB) boleh menyusul; bukan bloker LCP.

### Prioritas 5 — Perkuat `scripts/check-pages.mjs` ✅

`npm test` sekarang memeriksa keluaran SEO build agar perubahan pada P1–P4 tidak mudah terlewat:

- Setiap halaman publik harus memiliki canonical HTTPS yang cocok dengan route, seluruh metadata Open Graph dan Twitter Card yang cocok dengan judul/deskripsinya, serta gambar sosial yang diharapkan (`scripts/check-pages.mjs`, mulai baris 102 untuk canonical dan baris 105 untuk pemeriksaan metadata).
- Setiap halaman publik harus memiliki tepat satu JSON-LD yang valid dan berisi data klinik yang sama dengan `js/data/clinic-contact.js`; properti alamat, jam, peta, nomor telepon, email, dan spesialisasi ikut dibandingkan (`scripts/check-pages.mjs`, mulai baris 121).
- `robots.txt` harus ada, mengizinkan crawling root, dan menunjuk sitemap pada domain dasar canonical (`scripts/check-pages.mjs`, mulai baris 48). `sitemap.xml` harus ada dengan tepat 23 URL yang sama dengan `src/routes.js`; URL ekstra seperti 404 akan membuat perbandingan gagal (mulai baris 55).
- Link sweep memeriksa `srcset` selain `href` dan `src`, sehingga file WebP yang dirujuk `<source>` harus benar-benar ada di `dist/` (`scripts/check-pages.mjs`, mulai baris 183).
- `404.html` harus memiliki `noindex, follow` dan tidak boleh memiliki canonical ataupun JSON-LD (baris 208–212).
- Verifikasi: `npm test` berhasil untuk 23 halaman prerender pada build yang tersedia.

### Prioritas 6 — Hosting Hostinger & pasca-deploy 🟡

- Upload **isi** `dist/` ke `public_html/`, lalu upload file `.htaccess` dari root project secara terpisah (README, bagian "Hostinger hPanel").
- File `.htaccess` sudah disiapkan di root project untuk mengalihkan HTTP ke HTTPS dan menampilkan `404.html` saat URL tidak ditemukan:

```apache
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
ErrorDocument 404 /404.html
```

- Pengaturan `ErrorDocument` di atas mengasumsikan website dipasang di document root domain. Sesuaikan path jika situs dipasang di subfolder.
- **Masih perlu dilakukan di akun Hostinger:** aktifkan sertifikat SSL Let's Encrypt dari hPanel, unggah `.htaccess`, lalu verifikasi HTTP dialihkan ke HTTPS dan URL yang tidak ada tetap merespons sebagai 404.
- Verifikasi domain di Google Search Console (DNS TXT) lalu Bing Webmaster Tools, submit `sitemap.xml`,
  jalankan *URL Inspection → Test Live URL* untuk Home dan 2–3 halaman service, request indexing.

---

## Konfigurasi domain

Semua URL absolut (canonical, `og:url`, `og:image`, sitemap) membaca `SITE_URL` saat build:

```powershell
# Windows PowerShell
$env:SITE_URL = 'https://domainklinik.com.au'
npm run build
```

Tidak ada fallback domain: build tanpa `SITE_URL` gagal agar URL placeholder tidak masuk ke output.
Workflow GitHub Pages mengisi `SITE_URL` otomatis; untuk build Hostinger, isi URL publik sebenarnya.

---

## Checklist eksekusi

- [x] P1 robots.txt + sitemap.xml di `scripts/build.mjs`
  - Validasi domain: `scripts/build.mjs` mewajibkan `SITE_URL` di baris 48, memeriksa HTTPS dan kredensial/query/fragment di baris 58, lalu membentuk `siteBaseUrl` di baris 64. URL tersebut juga mempertahankan subpath hosting.
  - `robots.txt`: build menulis aturan `User-agent: *`, `Allow: /`, dan URL sitemap di `scripts/build.mjs` baris 194; berkas ditulis ke `dist/` di baris 195.
  - `sitemap.xml`: daftar `<loc>` dibentuk langsung dari semua route di `src/routes.js` pada `scripts/build.mjs` baris 199 dan ditulis ke `dist/` di baris 200. Ada 23 halaman publik; `/404.html` sengaja tidak dimasukkan.
  - Konfigurasi hosting: `.github/workflows/deploy.yml` memberikan URL publik GitHub Pages melalui `steps.pages.outputs.base_url` di baris 34. Perintah build lokal dengan `SITE_URL` dicantumkan di `README.md` baris 156; petunjuk Hostinger ada di baris 231.
  - Hasil dan batasan: kedua berkas dihasilkan ke `dist/` setiap build. Build tanpa `SITE_URL` akan berhenti dengan pesan error agar URL contoh tidak terbit tanpa sengaja.
- [x] P2 canonical + OG + Twitter Card di `writePage()`
  - Sumber metadata: `writePage()` mengambil `title` dan `description` dari objek route di `scripts/build.mjs` baris 106–107. Canonical dibuat dari `siteBaseUrl` + path halaman di baris 137.
  - Open Graph: setiap halaman publik mendapat `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, dan `og:image` di `scripts/build.mjs` baris 143–149. Gambar bisa ditentukan lewat `ogImage` pada route; jika tidak, dipakai logo klinik (baris 138).
  - Twitter Card: setiap halaman publik mendapat `summary_large_image`, judul, deskripsi, dan gambar halaman di `scripts/build.mjs` baris 150–153.
  - Tag disisipkan saat marker `<!--app-route-->` diganti dalam HTML prerender di `scripts/build.mjs` baris 164. Judul dan deskripsi juga ditulis ke HTML pada baris 167–168, jadi crawler tidak perlu menunggu JavaScript.
  - `/404.html` tidak diberi canonical atau tag sosial; halaman itu hanya mendapat `noindex, follow` agar tidak masuk indeks pencarian (baris 157).
- [x] P3 JSON-LD `MedicalClinic` + spesialisasi fisioterapi di halaman publik
  - Struktur: `scripts/build.mjs` mulai menyusun satu script `application/ld+json` per route publik di baris 110; `@type` kliniknya ditetapkan pada baris 113. Field lainnya meliputi `@id`, nama, URL, logo, telepon, email, alamat, jam buka, peta, dan spesialisasi.
  - Sumber data: `js/data/clinic-contact.js` menyediakan email dan telepon di baris 2–4, alamat terstruktur mulai baris 8, serta jam buka terstruktur mulai baris 15. Jam yang dicantumkan adalah Senin–Jumat 09.00–19.00 dan Minggu 10.00–17.00; `scripts/build.mjs` memasukkannya pada baris 120–125.
  - `Physiotherapy` dipakai sebagai nilai `medicalSpecialty` pada `scripts/build.mjs` baris 126, bukan sebagai `@type`. URL Fresha booking tidak ditambahkan ke `sameAs`, karena tautan yang tersedia adalah alur booking dan bukan profil publik klinik yang terkonfirmasi.
  - 404 tidak mendapat JSON-LD. Pemeriksaan hasil build menemukan tepat satu blok yang dapat diparse pada masing-masing dari 23 halaman publik dan tidak ada blok pada `404.html`.
- [x] P4 WebP galeri (12 foto) + `<picture>`
  - Aset: dibuat 12 varian `.webp` di `assets/gallery/` dengan nama dasar yang sama seperti JPEG. Sisi terpanjang dibatasi hingga 1600 px; setiap WebP berukuran kurang dari 200 KB. JPEG asli tetap disimpan sebagai fallback.
  - Nama varian: `clinic_calm_setting.webp`, `clinic_considered_setting.webp`, `clinic_inside_studio.webp`, `clinic_prepared_visit.webp`, `clinic_private_care.webp`, `clinic_quiet_space.webp`, `clinic_reception.webp`, `clinic_tools.webp`, `clinic_treatment_equipment.webp`, `clinic_treatment_room.webp`, `clinic_treatment_space.webp`, dan `clinic_waiting_lounge.webp`.
  - Hasil kompresi: total JPEG galeri 2.477.469 byte; total WebP 840.294 byte, sekitar 66,1% lebih kecil. WebP terbesar berukuran 113.764 byte (`clinic_prepared_visit.webp`).
  - Galeri klinik: `<picture>` memilih WebP dari nama JPEG di `js/sections/clinic/index.jsx` baris 20–21; `<img src>` JPEG di baris 22 menjadi fallback. Lazy loading dan decoding async tetap dipakai.
  - The InBody Method: foto resepsionis memakai sumber WebP dan JPEG fallback di `js/sections/method/index.jsx` baris 14–16; prioritas pemuatan tinggi tetap pada gambar hero. `js/features/clinic-gallery.js` baris 59 memakai `currentSrc`, sehingga foto yang dibuka di dialog mengikuti format yang dipilih browser.
  - Hasil build: `scripts/build.mjs` menyalin folder `assets/` ke `dist/` pada baris 189. Build berhasil; 13 referensi WebP pada HTML hasil build semuanya memiliki berkas tujuan.
- [x] P5 Pemeriksaan SEO dan aset pada `scripts/check-pages.mjs`
  - Canonical, Open Graph, dan Twitter Card setiap halaman dicocokkan dengan route; canonical harus HTTPS dan tepat pada URL halamannya.
  - JSON-LD harus bisa diparse, hanya satu per halaman publik, cocok dengan data klinik, dan tidak ada pada 404.
  - Keberadaan dan isi `robots.txt`/`sitemap.xml` diperiksa, termasuk pencocokan URL sitemap dengan 23 route dan pengecualian 404.
  - Pemindaian link lokal sekarang memvalidasi URL di `srcset` agar WebP yang dirujuk `<picture>` tidak hilang dari `dist/`.
  - `npm test` telah dijalankan dan lulus: 23 halaman prerender diperiksa bersama metadata SEO, JSON-LD, robots/sitemap, link, dan aset.
- [ ] P6 `.htaccess` HTTPS + 404 (Hostinger), SSL aktif
  - [x] File `.htaccess` sudah dibuat di root project; README menjelaskan untuk mengunggahnya terpisah ke `public_html/` bersama hasil build.
  - [ ] Aktifkan SSL di hPanel, unggah konfigurasi ke hosting, dan verifikasi redirect HTTPS serta 404 setelah deploy.
- [ ] Pasca-deploy: verifikasi Search Console & Bing, submit sitemap, request indexing halaman utama
