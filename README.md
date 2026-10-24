# InBody Clinic

Website klinik menggunakan **React, Vite, React Router, dan Tailwind CSS v4**.
Build menghasilkan 23 halaman HTML berisi konten (prerender), lalu React mengaktifkan
interaksi di browser melalui hydration. Navbar dan footer tetap terpasang selama navigasi
internal; konten utama, URL, metadata, dan menu aktif mengikuti halaman tujuan.

Website memuat enam speciality dan 12 treatment aktif, menggunakan desain, copy,
dan foto asli yang telah disetujui.
Animasi masuk header memakai GSAP core dari dependency npm yang dibundel Vite: latar bar kontak terbuka dari atas
ke bawah, lalu lokasi/email/telepon dan menu navbar memudar masuk. Logo tetap statis.
Animasi hanya berjalan sekali setiap dokumen dibuka, menghormati reduced motion,
dan dihentikan saat pengguna mulai berinteraksi. Navigasi React tidak mengulanginya.
GSAP tersedia lokal tanpa permintaan CDN. Konten tetap terlihat pada HTML awal,
dan reduced motion menonaktifkan animasi.

Home, Our Clinic, Contact Us, seluruh service/speciality, dan The InBody Method™ memakai
`js/features/content-reveal.js` untuk animasi sekali saat tiap
kelompok konten masuk layar: teks naik 16px sambil fade-in, foto hanya fade-in,
dan kartu/daftar memakai jeda 120ms. Durasi 850ms dengan easing `power2.out`.
Hero memudar masuk sebagai satu kelompok; pergantian slide tetap memakai controller
slider. Fitur memakai dependency GSAP lokal yang sama dan IntersectionObserver, tanpa ScrollTrigger.
Reduced motion menonaktifkannya; konten tetap terbaca sebelum JavaScript berjalan.
Home memilih kelompok melalui `js/features/home-reveal.js`; Clinic dan Contact memakai
atribut `data-content-reveal` (`rise`/`fade`) dan `data-content-reveal-group` untuk stagger.
`js/features/care-reveal.js` memilih elemen yang sudah ada pada layout service,
template speciality, dan halaman Method. Inisialisasi dipasang pada factory layout
agar semua 12 service dan enam speciality mengikuti perilaku yang sama tanpa mengubah
struktur HTML atau class layout. Foto Method hanya fade-in agar posisi sticky tetap utuh.
Foto galeri memudar bersama keterangannya; dialog galeri tetap langsung terbuka.
Kolom form Contact muncul bersama labelnya dan langsung terlihat saat mendapat fokus.
Latar pembuka Contact memakai Cream yang sama dengan pembuka halaman speciality Our Services.

## Deskripsi project

InBody Clinic adalah situs web untuk klinik terapi klinis di **Double Bay, Sydney**, yang berfokus pada
*Women's Health & Advanced Lymphatic Therapy* — meliputi drainage limfatik lanjutan, pemulihan pascaoperasi,
care kehamilan & postpartum, perawatan lipedema/limfoedema, remodeling selulit & jaringan, serta care TMJ,
nyeri & stres. Situs ini bersifat informasional dengan pemesanan langsung melalui **Fresha**; pemilihan
layanan, slot, dan pembayaran terjadi di Fresha, sehingga website tidak menyimpan data booking.

Secara teknis, project ini adalah **generator situs statis** berbasis
**React 19 + Vite 8 + React Router 7 + Tailwind CSS v4**: build menghasilkan **23 halaman HTML** yang sudah
berisi konten penuh (SEO-friendly, tanpa JavaScript tetap terbaca), lalu React melakukan *hydration* untuk
mengaktifkan interaksi (slider hero, dropdown, galeri, form, animasi GSAP). Navigasi internal berperilaku
seperti SPA — navbar/footer tetap terpasang, URL/metadata/scroll/fokus diperbarui — namun setiap URL tetap
memiliki file HTML sendiri sehingga link langsung dan refresh bekerja di static hosting mana pun.

**Fitur utama:**

- 23 halaman prerender: Home, About, Contact, Our Clinic, The InBody Method™, 6 halaman speciality, dan 12 halaman treatment (`404.html` ikut dibuat).
- Konten klinik terpusat sebagai data modul ES (`js/data/`), terpisah dari tampilan.
- Booking Fresha per kategori speciality dan per treatment (URL `sv:` spesifik), dikelola dalam satu sumber.
- Hero slider (3 foto, autoplay 5 detik), galeri klinik 12 foto dengan filter + dialog, form kontak yang membuka draf email.
- Animasi GSAP lokal sekali-per-tampil (header entrance, content reveal, stagger 120 ms) dengan dukungan reduced motion.
- Aksesibilitas: skip link, `aria-current`, live region navigasi, pemulihan fokus & scroll pada navigasi, dialog galeri yang mengembalikan fokus.
- Kualitas: validasi output build (`npm test`) dan tes browser Playwright (`test:navigation`, `test:header`, `test:home-reveal`).

## Workflow antar file dan folder

### 1. Alur build — static generation (SSG)

```text
index.html (shell + placeholder)
        │
scripts/build.mjs
        ├── ① Vite build client   → dist/ (index.html + bundle JS/CSS)
        ├── ② Vite build SSR      → .build/ssr/entry-server.js
        ├── ③ src/entry-server.jsx  render(path) untuk setiap route
        │       └── src/routes.js ── sumber tunggal 23 URL + title + description
        │       └── src/pages.jsx   → js/pages/*.jsx → sections + init()
        ├── ④ template dist/index.html diisi: <!--app-html-->,
        │       <meta app-route>, <title>, <meta description>,
        │       class <html>/<body> (src/theme.js), data-page/service/speciality
        ├── ⑤ tulis dist/<path> untuk tiap route + /404.html
        └── ⑥ salin assets/ ke dist/, tulis .nojekyll
```

Definisi `pageId` pada `src/routes.js` menentukan factory yang dipakai: `home/about/contact/clinic`
memakai definisi langsung di `js/pages/*.jsx`, sedangkan `service` dan `speciality` memakai factory
`js/layouts/service-page.jsx` (dan padanan speciality) sehingga 12 treatment dan 6 speciality berbagi
layout identik — hanya data yang berbeda.

### 2. Alur runtime — hydration & navigasi SPA

```text
dist/<halaman>.html dibuka browser
        │
src/entry-client.jsx
        ├── baca <meta app-route> + BASE_URL (js/utils/urls.js)
        ├── HTML cocok dengan path? → hydrateRoot : createRoot
        └── BrowserRouter (basePath) → src/App.jsx
                ├── shell tetap: ContactBar → Navbar → <main> → Footer
                ├── getRoute(path) → getPage(pageId) → sections dirender
                │       └── js/sections/* → js/components/* + js/data/*
                ├── page.init(main) dipasang via useLayoutEffect
                │       └── js/features/*.js (slider, reveal, galeri, form)
                │           mengembalikan fungsi cleanup → dipanggil saat pindah halaman
                └── efek dokumen: title/description/body dataset,
                    fokus ke <main>, scroll ke atas/anchor, pulihkan scroll Back/Forward
```

Klik pada link internal dicegat di level `document` oleh `App.jsx`; hanya URL yang dikenali
`getRoute()` yang di-*prevent* dan direspons React Router. Link eksternal, `mailto:`, `tel:`,
download, `target="_blank"`, dan link ber-atribut `data-full-reload` mengikuti perilaku browser normal.

### 3. Alur data & booking

```text
js/data/
├── services/          12 modul per treatment + index.js (gabung) + booking.js (URL Fresha)
│       └── js/pages/service.jsx → js/layouts/service-page.jsx → js/sections/service/*
├── specialities/      catalog.js (ringan: nama, ikon, serviceIds) + index.js
│       (konten lengkap) + booking.js → js/pages/speciality.jsx + navbar
├── navigation.js → js/components/navbar.jsx + footer.jsx
├── team.js / method.js / hero-slides.js / clinic-gallery.js / clinic-contact.js
│       └── js/sections/{about,method,home,clinic,contact}/*
└── assessment-booking.js → panel Start Here + BookingButton (js/components/button.jsx)
```

Booking di-**join** saat runtime modul: `services/index.js` menempelkan `serviceBookings[id]`
ke tiap objek service; `specialities/catalog.js` menempelkan `specialityBookingLinks`.
URL Fresha bersama untuk tombol umum berada di `bookingHref` pada `js/components/button.jsx`.

### 4. Ringkasan tanggung jawab folder

| Folder        | Tanggung jawab |
| ------------- | -------------- |
| `src/`        | Kernel aplikasi: shell `App.jsx`, daftar route + metadata, peta pageId → page, entry server/client, token tema |
| `js/pages/`   | Definisi halaman: daftar section (`id`, `className`, `labelledBy`, `render`) + `init()` dengan cleanup |
| `js/layouts/` | Factory komposisi halaman agar semua service/speciality memakai layout bersama |
| `js/sections/`| Komponen per bagian halaman (hero, services, method, team, CTA, dsb.) |
| `js/components/` | Komponen lintas halaman: navbar, footer, heading, tombol/BookingButton, ikon, kartu care |
| `js/data/`    | Seluruh konten klinik & URL booking; satu-satunya tempat mengubah copy konten |
| `js/features/`| Controller imperatif (GSAP, slider, galeri, form) yang dipasang via `init()` dan dibersihkan saat navigasi |
| `js/utils/`   | Helper URL sadar-base (`siteUrl`, `stripBase`) |
| `css/`        | `input.css` — Tailwind v4 + design tokens (`clinic-*`) |
| `scripts/`    | `build.mjs` entry point, `build/` pipeline modules, `check/` output dan tes browser |
| `assets/` | Aset asli klinik, termasuk foto `assets/gallery/`, yang disalin ke `dist/` saat build |
| `.github/`    | Workflow deploy GitHub Pages (`deploy.yml`) |

## Menjalankan project

Gunakan Node.js yang memenuhi versi pada `package.json`, lalu:

```sh
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite. Edit komponen `.jsx`, data, atau CSS untuk melihat
perubahan melalui development server. Jangan menggunakan Live Server sebagai pengganti Vite
atau membuka `index.html` dengan `file://`.

```powershell
$env:SITE_URL = 'https://example.test' # ganti dengan URL publik yang sebenarnya
npm run build
npm run preview
```

`build` membuat folder `dist/` untuk hosting pada root domain. `preview` menyajikan hasil
build tersebut secara lokal. `SITE_URL` wajib diisi karena build juga menghasilkan sitemap
dan robots dengan URL absolut. Folder `dist/` adalah keluaran build; jangan mengedit isinya
secara manual. Jalankan build lagi setelah mengubah source.

## Struktur folder

```text
src/
├── App.jsx                         # Layout React, routing, metadata, fokus, scroll
└── routes.js                       # 23 alamat publik dan metadata setiap halaman
js/
├── components/*.jsx                # Navbar, footer, Heading, tombol, ikon, shared care
├── sections/                       # Section React untuk Home, About, Clinic, Contact,
│                                   # Method, speciality, dan treatment
├── data/                           # Konten klinik, tim, kontak, galeri, layanan
├── features/                       # Controller slider, form email, dan galeri
└── layouts/                        # Token container dan layout
assets/                             # Foto, logo, dan assets/gallery/ berisi 12 foto klinik
css/input.css                       # Tailwind dan design tokens
scripts/
├── build.mjs                       # Entry point pipeline build
├── build/                          # Config, Vite/SSR, SEO, HTML, prerender, output statis
└── check/                          # Pemeriksaan HTML/SEO dan tes browser
dist/                               # Output untuk GitHub Pages atau Hostinger
```

`src/routes.js` adalah sumber alamat, ID halaman, judul, serta deskripsi. Build membuat
`dist/index.html`, empat halaman umum di `dist/pages/`, enam speciality di
`dist/pages/specialities/`, dan 12 treatment di `dist/pages/services/<category>/`.
File HTML halaman bukan lagi source yang perlu disalin atau dipelihara satu per satu.

## GitHub Pages

GitHub Pages menyajikan folder hasil build. Pada repository GitHub, pilih
**Settings → Pages → Build and deployment → Source: GitHub Actions**. Workflow Pages
`.github/workflows/deploy.yml` berjalan saat push ke `development` atau dijalankan manual
melalui Actions. Workflow memasang dependency, membaca base dari konfigurasi GitHub Pages
(termasuk custom domain), membuat build dengan base tersebut,
memvalidasi output, lalu mengunggah `dist/` sebagai artifact Pages. Menjalankan build
lokal saja belum memublikasikan situs. Workflow juga memberikan URL publik Pages sebagai
`SITE_URL` untuk sitemap dan robots.

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

Semua 23 alamat `.html` memiliki file HTML sendiri. Link langsung dan refresh bekerja pada
GitHub Pages tanpa `HashRouter`, trik `404.html`, atau rewrite server ke halaman Home.

## Hostinger hPanel

Untuk website pada root domain, buat build baru:

```powershell
$env:SITE_URL = 'https://domain-publik-anda' # isi URL publik sebenarnya, termasuk subpath jika ada
npm run build
npm test
```

Upload **isi** `dist/` ke folder document root website di File Manager hPanel, biasanya
`public_html/`. `index.html`, `pages/`, bundle, foto, logo, dan galeri harus berada pada
posisi relatif yang dihasilkan build. Upload juga file `.htaccess` dari root repository
secara terpisah ke `public_html/`; file itu mengalihkan HTTP ke HTTPS dan memakai
`404.html` hasil build untuk URL yang tidak tersedia. Sertifikat SSL harus aktif lebih
dulu di hPanel agar redirect HTTPS dapat digunakan. Aturan `ErrorDocument` mengasumsikan
situs dipasang di document root domain; sesuaikan path jika situs dipasang di subfolder.

Semua halaman sudah menjadi file HTML prerender, jadi jangan menambahkan rewrite SPA yang
mengalihkan setiap URL ke Home. Untuk subfolder domain, buat build dengan
`npm run build -- --base /nama-subfolder/` sebelum upload.

Hosting hanya perlu menyajikan file statis. Node.js diperlukan saat development/build,
dan tidak perlu berjalan sebagai server produksi. Routing langsung ditangani oleh file
HTML hasil prerender.

## Navigasi dan fitur

Navbar/footer memakai layout React bersama. React Router menangani perpindahan halaman
tanpa memuat ulang dokumen. URL, judul, deskripsi, dataset halaman, dan `aria-current`
diperbarui bersama konten. Back/Forward memulihkan halaman dan scroll; navigasi baru
memindahkan fokus ke `<main>` dan scroll ke atas atau anchor tujuan.

Tulis URL konten relatif terhadap root project, misalnya `./pages/contact.html` atau
`./assets/logo/site_logo.png`. Helper URL React menambahkan base build secara konsisten.
Anchor `#...` tetap lokal. Link eksternal, email, telepon, download, modifier click,
dan `target="_blank"` mengikuti perilaku browser. `data-full-reload` dapat dipakai
pada link yang memang membutuhkan perpindahan dokumen penuh.

Controller fitur yang memasang listener/timer diaktifkan melalui effect React dan
dibersihkan ketika halaman dilepas. Jangan menambahkan listener saat render atau
mengubah struktur DOM yang dimiliki React melalui `innerHTML`.

Phosphor Icons Regular dibundel bersama CSS/font lokal. Google Fonts tetap dimuat
untuk Cormorant Garamond dan Montserrat. Konten utama sudah tersedia sebelum
JavaScript aktif; slider, dropdown, dialog galeri, dan validasi form memerlukan JavaScript.

Home memakai urutan hero, services, method, team, expect, dan home-contact.
Services menampilkan panel Start Here sebelum enam kategori speciality; CTA assessment
lama di bagian bawah Home dipindahkan ke panel ini.
Hero menggunakan tiga foto asli dan autoplay lima detik. Our Clinic memakai 12 JPEG,
filter, jumlah foto, serta dialog foto besar yang mengembalikan fokus dan scroll state.

## Konten klinik dan penambahan halaman

Data speciality ringan berada di `js/data/specialities/catalog.js` dan konten lengkapnya
di `js/data/specialities/index.js`. Treatment menggunakan `js/data/services/index.js`.
Untuk menambahkan halaman, lengkapi data dan komponen yang sesuai, lalu daftarkan path unik,
ID, judul, dan deskripsinya pada `src/routes.js`. Build akan membuat HTML tujuan.
Perbarui pemeriksaan jumlah route jika penambahan halaman sudah disetujui.

Navbar menampilkan Start Here terlebih dahulu, lalu enam speciality. Speciality aktif memakai `aria-current="page"`;
pada detail treatment, parent memakai `aria-current="location"`. Endometriosis tetap
ditautkan dari Women's Health pada About tanpa menetapkan parent speciality baru.

Panel assessment Home/Method dan pilihan Start Here di navbar memakai data
bersama `js/data/assessment-booking.js`: Initial Assessment & Treatment selama 90 menit,
dengan tombol BOOK YOUR FIRST APPOINTMENT. Link yang diberikan client menargetkan
layanan Fresha `sv:29617337` pada lokasi `2731243`.
Enam halaman speciality memakai `SpecialityBookingCTA` dengan judul Discuss your …,
penjelasan sesuai kategori, dan tombol Book an Appointment menuju URL Fresha kategori
yang sama dengan dropdown. Kartu Related treatment information membuka halaman detail
treatment internal; tombol Book an Appointment di halaman detail memakai URL Fresha
spesifik yang langsung memilih treatment yang sesuai.
Sumber URL bersama berada di `js/data/specialities/booking.js`, diteruskan melalui
`bookingHref` pada katalog; `href` katalog tetap menuju halaman penjelasan internal
untuk kartu Our Specialities di Home. Halaman detail treatment lama tetap tersedia.
Halaman service diakhiri dengan `ServiceCTA` melalui `js/layouts/service-page.jsx`.
Tombol pada section tersebut memakai `BookingButton` berlabel Book an Appointment,
dengan `href` dari `service.booking`. Pemetaan 12 halaman ke layanan Fresha disimpan
di `js/data/services/booking.js`; setiap URL memakai `offerItems=sv:<ID>` dan tidak
menyimpan `cartId` pengunjung. Core Restoration/Postnatal Drainage berbagi Postpartum
Recovery, dan dua halaman lymphatic berbagi Advanced Lymphatic Therapy. Catatan
verifikasi dan nama layanan tersedia di `docs/FRESHA_BOOKING.md`.
Section Start Here terpisah tidak dipasang pada halaman service.
Tombol Book an Appointment di navbar dan hero Home memakai `BookingButton`, dengan
link Fresha bersama pada `bookingHref` di `js/components/button.jsx`. Form memvalidasi nama berupa
huruf Unicode/spasi dan membuka draf email di aplikasi pengguna. Pemilihan layanan,
slot, dan penyelesaian booking dilakukan di Fresha; website tidak menyimpan booking.

About mengikuti referensi dua terapis: hero “One shared philosophy” dengan panel
pengalaman gabungan 42+ tahun, kemudian profil Saila dan Beatriz secara bergantian.
Foto berada di kiri untuk Saila dan kanan untuk Beatriz mulai 901px;
pada layar kecil foto dan kartu konten bertumpuk.
Beatriz memakai copy serta foto yang diberikan pengguna (`assets/images/about/beatriz.jpg`),
dengan latar Chilean-trained physiotherapist dan peran Australian Remedial Massage Therapist.
Data profil berada di `js/data/team.js`; jangan menyalin credential antaranggota tim.
Copy lama Saila serta biografi, lima rincian keahlian, dan tiga paragraf pendekatan
Beatriz ditampilkan lengkap. Setiap profil memakai kartu biografi,
keahlian bernomor, foto dengan caption navy, dan empat kartu fakta.
Pendekatan Beatriz memakai panel navy. The team behind InBody Clinic muncul setelah
profil Beatriz: foto bersama dan kartu putih berisi tiga paragraf nilai bersama.
Kartu 42+ di hero memakai ringkasan singkat agar pengantar tidak berulang.
Section Our clinical approach — The InBody Method™ memakai `MethodPreview` setelah
section tim, termasuk empat
langkah dan tautan Method. Footer langsung mengikuti section Method.
Navbar, footer, dan komponen tombol tetap menggunakan komponen bersama.
Animasi About memakai `js/features/about-reveal.js` dan controller GSAP bersama:
foto fade-in, konten naik 16px selama 850ms, dan kartu memakai stagger 120ms.
Efek muncul sekali per kunjungan, dengan cleanup route dan dukungan reduced motion.

## Verifikasi

```sh
npm run build
npm test
npm run test:home-reveal
npm run test:navigation
```

`npm run test:header` memeriksa urutan latar dan fade teks menggunakan GSAP lokal dari build,
logo/judul yang tetap statis, satu animasi per dokumen, menu mobile, reduced motion,
serta tidak adanya script GSAP CDN di HTML build. Tes ini memerlukan Playwright,
tetapi tidak memerlukan koneksi CDN untuk GSAP.

`npm run test:home-reveal` memeriksa kelompok Home/Clinic/Contact, stagger, animasi sekali,
fokus keyboard, cleanup, dan reduced motion menggunakan mock GSAP tanpa browser.

`npm test` memvalidasi **hasil build yang sudah ada di `dist/`**: 23 HTML prerender,
metadata, satu H1/main, shell, ARIA, ID unik, seluruh route/anchor, parent speciality,
urutan Home, glyph Regular, serta aset yang ikut diterbitkan. Build harus dijalankan
lagi sebelum tes setelah perubahan source.

`test:navigation` menggunakan Playwright untuk memeriksa hydration, 23 route dalam satu
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
