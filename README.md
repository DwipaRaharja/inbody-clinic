# InBody Clinic

Website klinik menggunakan **React, Vite, React Router, dan Tailwind CSS v4**.
Build menghasilkan 23 halaman HTML berisi konten (prerender), lalu React mengaktifkan
interaksi di browser melalui hydration. Navbar dan footer tetap terpasang selama navigasi
internal; konten utama, URL, metadata, dan menu aktif mengikuti halaman tujuan.

Website memuat enam speciality dan 12 treatment aktif, menggunakan desain, copy,
dan foto asli yang telah disetujui.
Animasi masuk header memakai GSAP core dari CDN: latar bar kontak terbuka dari atas
ke bawah, lalu lokasi/email/telepon dan menu navbar memudar masuk. Logo tetap statis.
Animasi hanya berjalan sekali setiap dokumen dibuka, menghormati reduced motion,
dan dihentikan saat pengguna mulai berinteraksi. Navigasi React tidak mengulanginya.
CDN tidak ditambahkan sebagai dependency npm. Konten tetap terlihat jika CDN gagal
atau belum siap dalam satu detik.

Home, Our Clinic, Contact Us, seluruh service/speciality, dan The InBody Method™ memakai
`js/features/content-reveal.js` untuk animasi sekali saat tiap
kelompok konten masuk layar: teks naik 16px sambil fade-in, foto hanya fade-in,
dan kartu/daftar memakai jeda 120ms. Durasi 850ms dengan easing `power2.out`.
Hero memudar masuk sebagai satu kelompok; pergantian slide tetap memakai controller
slider. Fitur memakai GSAP CDN yang sama dan IntersectionObserver, tanpa ScrollTrigger.
Reduced motion menonaktifkannya; konten tetap terbaca jika CDN gagal atau terlambat.
Home memilih kelompok melalui `js/features/home-reveal.js`; Clinic dan Contact memakai
atribut `data-content-reveal` (`rise`/`fade`) dan `data-content-reveal-group` untuk stagger.
`js/features/care-reveal.js` memilih elemen yang sudah ada pada layout service,
template speciality, dan halaman Method. Inisialisasi dipasang pada factory layout
agar semua 12 service dan enam speciality mengikuti perilaku yang sama tanpa mengubah
struktur HTML atau class layout. Foto Method hanya fade-in agar posisi sticky tetap utuh.
Foto galeri memudar bersama keterangannya; dialog galeri tetap langsung terbuka.
Kolom form Contact muncul bersama labelnya dan langsung terlihat saat mendapat fokus.
Latar pembuka Contact memakai Cream yang sama dengan pembuka halaman speciality Our Services.

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
└── routes.js                       # 23 alamat publik dan metadata setiap halaman
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
`dist/pages/specialities/`, dan 12 treatment di `dist/pages/services/<category>/`.
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

Semua 23 alamat `.html` memiliki file HTML sendiri. Link langsung dan refresh bekerja pada
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
Efek muncul sekali per kunjungan, dengan cleanup route dan fallback reduced motion/CDN.

## Verifikasi

```sh
npm run build
npm test
npm run test:home-reveal
npm run test:navigation
```

`npm run test:header` memeriksa urutan latar dan fade teks menggunakan GSAP CDN asli,
logo/judul yang tetap statis, satu animasi per dokumen, menu mobile, reduced motion,
serta fallback CDN gagal/lambat. Tes ini memerlukan koneksi CDN dan Playwright;
respons GSAP hanya disimpan di memori selama tes.

`npm run test:home-reveal` memeriksa kelompok Home/Clinic/Contact, stagger, animasi sekali,
fokus keyboard, cleanup, reduced motion, serta fallback CDN gagal/lambat tanpa jaringan.

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
