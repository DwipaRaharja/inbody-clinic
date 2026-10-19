# InBody Clinic

Website klinik menggunakan **React, Vite, React Router, dan Tailwind CSS v4**.
Build menghasilkan 24 halaman HTML berisi konten (prerender), lalu React mengaktifkan
interaksi di browser melalui hydration. Navbar dan footer tetap terpasang selama navigasi
internal; konten utama, URL, metadata, dan menu aktif mengikuti halaman tujuan.

Desain, copy, foto asli, enam speciality, 13 treatment, dan URL `.html` dipertahankan.
Migrasi ini tidak menambahkan animasi GSAP baru. Animasi navbar/heading akan dikerjakan terpisah.

## Menjalankan project

Gunakan Node.js yang memenuhi versi pada `package.json`, lalu:

```sh
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite. Edit komponen `.jsx`, data, atau CSS untuk melihat
perubahan melalui development server. Jangan menggunakan Live Server sebagai pengganti Vite
atau membuka `index.html` dengan `file://`.

```sh
npm run build
npm run preview
```

`build` membuat folder `dist/` untuk hosting pada root domain. `preview` menyajikan hasil
build tersebut secara lokal. Folder `dist/` adalah keluaran build; jangan mengedit isinya
secara manual. Jalankan build lagi setelah mengubah source.

## Struktur folder

```text
src/
├── App.jsx                         # Layout React, routing, metadata, fokus, scroll
└── routes.js                       # 24 alamat publik dan metadata setiap halaman
js/
├── components/*.jsx                # Navbar, footer, Heading, tombol, ikon, shared care
├── sections/                       # Section React untuk Home, About, Clinic, Contact,
│                                   # Method, speciality, dan treatment
├── data/                           # Konten klinik, tim, kontak, galeri, layanan
├── features/                       # Controller slider, form email, dan galeri
└── layouts/                        # Token container dan layout
assets/                             # Foto dan logo asli
gallery/                            # 12 JPEG klinik; MP4 belum dipakai
css/input.css                       # Tailwind dan design tokens
scripts/
├── build.mjs                       # Vite build dan prerender semua route
├── check-pages.mjs                 # Validasi output HTML/aset/tautan
└── check-navigation.mjs            # Tes browser pada hasil build
dist/                               # Output untuk GitHub Pages atau Hostinger
```

`src/routes.js` adalah sumber alamat, ID halaman, judul, serta deskripsi. Build membuat
`dist/index.html`, empat halaman umum di `dist/pages/`, enam speciality di
`dist/pages/specialities/`, dan 13 treatment di `dist/pages/services/<category>/`.
File HTML halaman bukan lagi source yang perlu disalin atau dipelihara satu per satu.

## GitHub Pages

GitHub Pages menyajikan folder hasil build. Pada repository GitHub, pilih
**Settings → Pages → Build and deployment → Source: GitHub Actions**. Workflow Pages
`.github/workflows/deploy.yml` berjalan saat push ke `development` atau dijalankan manual
melalui Actions. Workflow memasang dependency, membaca base dari konfigurasi GitHub Pages
(termasuk custom domain), membuat build dengan base tersebut,
memvalidasi output, lalu mengunggah `dist/` sebagai artifact Pages. Menjalankan build
lokal saja belum memublikasikan situs.

Untuk preview lokal dengan base project Pages:

```sh
npm run build:pages
npm run preview
```

`preview` membaca base dari hasil build. Default `build:pages` memakai `/inbody-clinic/`.
Gunakan base yang sama dengan bagian path
alamat Pages yang sebenarnya. Contoh untuk repository `inbody-clinic-v2`:

```sh
npm run build -- --base /inbody-clinic-v2/
```

Repository `username.github.io` atau Pages yang memakai custom domain pada root memakai `/`.
Base memengaruhi URL bundle, font ikon, foto, dan navigasi, sehingga hasil build untuk satu base
harus digunakan pada lokasi hosting yang sesuai. Jangan mengubahnya hanya pada HTML output.

Semua 24 alamat `.html` memiliki file HTML sendiri. Link langsung dan refresh bekerja pada
GitHub Pages tanpa `HashRouter`, trik `404.html`, atau rewrite server ke halaman Home.

## Hostinger hPanel

Untuk website pada root domain, buat build baru:

```sh
npm run build
npm test
```

Upload **isi** `dist/` ke folder document root website di File Manager hPanel, biasanya
`public_html/`. `index.html`, `pages/`, bundle, foto, logo, dan galeri harus berada pada
posisi relatif yang dihasilkan build. Untuk subfolder domain, buat build dengan
`npm run build -- --base /nama-subfolder/` sebelum upload.

Hosting hanya perlu menyajikan file statis. Node.js diperlukan saat development/build,
dan tidak perlu berjalan sebagai server produksi. Routing langsung ditangani oleh file
HTML hasil prerender; tidak diperlukan aturan `.htaccess` yang mengarahkan semua URL ke Home.

## Navigasi dan fitur

Navbar/footer memakai layout React bersama. React Router menangani perpindahan halaman
tanpa memuat ulang dokumen. URL, judul, deskripsi, dataset halaman, dan `aria-current`
diperbarui bersama konten. Back/Forward memulihkan halaman dan scroll; navigasi baru
memindahkan fokus ke `<main>` dan scroll ke atas atau anchor tujuan.

Tulis URL konten relatif terhadap root project, misalnya `./pages/contact.html` atau
`./assets/logo/logo.png`. Helper URL React menambahkan base build secara konsisten.
Anchor `#...` tetap lokal. Link eksternal, email, telepon, download, modifier click,
dan `target="_blank"` mengikuti perilaku browser. `data-full-reload` dapat dipakai
pada link yang memang membutuhkan perpindahan dokumen penuh.

Controller fitur yang memasang listener/timer diaktifkan melalui effect React dan
dibersihkan ketika halaman dilepas. Jangan menambahkan listener saat render atau
mengubah struktur DOM yang dimiliki React melalui `innerHTML`.

Phosphor Icons Regular dibundel bersama CSS/font lokal. Google Fonts tetap dimuat
untuk Cormorant Garamond dan Montserrat. Konten utama sudah tersedia sebelum
JavaScript aktif; slider, dropdown, dialog galeri, dan validasi form memerlukan JavaScript.

Home mempertahankan urutan hero, services, method, team, expect, assessment, dan home-contact.
Hero menggunakan tiga foto asli dan autoplay lima detik. Our Clinic memakai 12 JPEG,
filter, jumlah foto, serta dialog foto besar yang mengembalikan fokus dan scroll state.

## Konten klinik dan penambahan halaman

Data speciality ringan berada di `js/data/specialities/catalog.js` dan konten lengkapnya
di `js/data/specialities/index.js`. Treatment menggunakan `js/data/services/index.js`.
Untuk menambahkan halaman, lengkapi data dan komponen yang sesuai, lalu daftarkan path unik,
ID, judul, dan deskripsinya pada `src/routes.js`. Build akan membuat HTML tujuan.
Perbarui pemeriksaan jumlah route jika penambahan halaman sudah disetujui.

Navbar menampilkan enam speciality. Speciality aktif memakai `aria-current="page"`;
pada detail treatment, parent memakai `aria-current="location"`. Endometriosis tetap
ditautkan dari Women's Health pada About tanpa menetapkan parent speciality baru.

Semua tombol appointment/assessment menuju Contact Us. Form memvalidasi nama berupa
huruf Unicode/spasi dan membuka draf email di aplikasi pengguna. Tidak ada pengiriman
email melalui server, booking otomatis, slot, pembayaran, atau integrasi booking eksternal.

About mempertahankan profil Saila, credential, expertise, dan detail tim kolektif dengan
foto `assets/images/about/team.jpg`. Profil individu kedua masih menunggu data klinik;
jangan menambahkan nama, bio, atau credential rekaan. Copy tetap memerlukan review klinik.

## Verifikasi

```sh
npm run build
npm test
npm run test:navigation
```

`npm test` memvalidasi **hasil build yang sudah ada di `dist/`**: 24 HTML prerender,
metadata, satu H1/main, shell, ARIA, ID unik, seluruh route/anchor, parent speciality,
urutan Home, glyph Regular, serta aset yang ikut diterbitkan. Build harus dijalankan
lagi sebelum tes setelah perubahan source.

`test:navigation` menggunakan Playwright untuk memeriksa hydration, 24 route dalam satu
dokumen, shell yang menetap, metadata, cleanup fitur, klik cepat, Back/Forward/scroll,
anchor, link langsung/refresh, perilaku link native, menu mobile, dan konten tanpa JavaScript.
Tes membaca base dari `dist/index.html`; jalankan kembali setelah `build:pages` untuk
memverifikasi hosting dalam subfolder. Server tes hanya menyajikan file `dist/` dan
tidak memberikan fallback SPA.

Playwright diperlukan untuk tes browser opsional ini:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run test:navigation
```

Di Windows, Edge yang sudah terpasang dapat dipakai dengan
`$env:PLAYWRIGHT_CHANNEL = 'msedge'`. Runtime desktop juga dapat memasok
`PLAYWRIGHT_MODULE_PATH` ke `playwright/index.mjs`. Tes menggantikan request pihak ketiga
agar tidak bergantung pada jaringan dan tidak mengubah situs yang sudah dipublikasikan.
Pemeriksaan teknis tetap perlu dilengkapi pemeriksaan visual dan persetujuan copy klinik.

- [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md): token, komponen, dan pola layout.
- [task.md](task.md): status pekerjaan dan bagian yang ditunda.
- [docs/REVISION_IMPLEMENTATION.md](docs/REVISION_IMPLEMENTATION.md): draft copy dan batas verifikasi.
- [docs/SERVICE_COPY_REVIEW.md](docs/SERVICE_COPY_REVIEW.md): catatan copy 13 treatment.
