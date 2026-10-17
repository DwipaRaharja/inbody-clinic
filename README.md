# InBody Clinic

Website multi-halaman berbasis HTML, JavaScript ES modules, dan Tailwind CSS v4.
Halaman Home, About, Our Clinic, Contact Us, dan layanan memakai satu layout bersama.
Phosphor Icons memakai stylesheet Regular versi 2.1.2 dari CDN jsDelivr di semua entry HTML.
Section halaman umum disusun per halaman; halaman layanan memakai satu template
dengan data layanan yang terpisah.

## Menjalankan project

Pasang dependency dengan Node.js dan npm yang tersedia di komputer:

```sh
npm install
npm run build:css
```

Buka folder project melalui static server, misalnya **Live Server** di VS Code,
lalu kunjungi entry HTML melalui URL server, misalnya `index.html`, `pages/about.html`,
`pages/our-clinic.html`, `pages/contact.html`, atau salah satu dari 13 entry layanan pada tabel di bawah.
ES modules perlu dijalankan melalui HTTP, sehingga jangan membuka HTML dengan
protokol `file://`.

Selama mengubah class Tailwind, jalankan watcher di terminal terpisah:

```sh
npm run dev:css
```

Sebelum menyerahkan perubahan, periksa halaman dan buat ulang CSS:

```sh
npm test
npm run build:css
```

Build hanya menghasilkan stylesheet. HTML dan JavaScript tetap dilayani langsung
oleh static server; tidak ada framework atau build HTML tambahan.
`npm test` memeriksa hasil render entry halaman, termasuk descriptor yang dibuat
melalui factory layanan, ID, target aksesibilitas, tautan, aset lokal, dan import
module. Pemeriksaan ini tidak menggantikan
pemeriksaan tampilan dan interaksi di browser.

## Struktur folder

```text
inbody-clinic-v2/
├── index.html                 # Entry Home dan metadata halaman
├── pages/                     # Entry HTML selain Home
│   ├── about.html
│   ├── our-clinic.html
│   ├── contact.html
│   └── services/              # 13 entry layanan sesuai kelompok dropdown
│       ├── pregnancy-postpartum/ # 3 halaman
│       ├── lymphatic-drainage/   # 3 halaman
│       ├── pain-tmj-relief/      # 4 halaman
│       └── body-contouring/     # 3 halaman
├── assets/
│   ├── images/                # Gambar, dikelompokkan per halaman/layanan
│   └── logo/
├── gallery/                   # Foto klinik JPEG dari pengguna; MP4 tidak ditampilkan
├── css/
│   ├── input.css              # Import, sumber class, dan token @theme
│   └── output.css             # Hasil build Tailwind; jangan edit manual
├── js/
│   ├── app.js                 # Entry bersama; memuat descriptor halaman
│   ├── pages/
│   │   ├── home.js
│   │   ├── about.js
│   │   ├── clinic.js
│   │   ├── contact.js
│   │   └── service.js         # Factory descriptor layanan berdasarkan serviceId
│   ├── layouts/
│   │   ├── page-layout.js     # Shell bersama dan lifecycle mount
│   │   ├── service-page.js    # Menyusun enam section template layanan
│   │   └── container.js       # Lebar, padding, dan grid full-bleed bersama
│   ├── components/            # Navbar, footer, heading, button, dan ikon
│   ├── features/              # Controller interaksi, bukan markup halaman
│   │   ├── hero-slider.js
│   │   ├── clinic-gallery.js   # Filter foto dan dialog pembesar
│   │   └── contact-form.js
│   ├── data/                  # Data navigasi, kontak, dan slide
│   │   ├── clinic-gallery.js  # Kategori, caption, dan pemetaan foto galeri
│   │   └── services/
│   │       ├── index.js       # Registry data layanan
│   │       └── <service-id>.js # 13 record; isi dan foto berbeda, template sama
│   └── sections/
│       ├── home/              # Hero, layanan, Difference, testimonial, CTA
│       ├── about/index.js     # Profil, statistik, dan keahlian
│       ├── clinic/index.js    # Pengantar, galeri, dan rencana kunjungan
│       ├── contact/index.js   # Pengantar, kontak, peta, dan form
│       └── service/index.js   # Renderer umum untuk enam section layanan
├── scripts/
│   └── check-pages.mjs        # Pemeriksaan integrasi struktur halaman
├── docs/
│   └── SERVICE_COPY_REVIEW.md # Teks sumber yang menunggu keputusan pengguna
├── Our Service Layout/       # PNG referensi, dikelompokkan sesuai dropdown
├── data_service_inbody_clinic.md # Sumber teks tiga layanan Body Contouring
├── DESIGN_GUIDELINES.md
└── package.json
```

## Cara kerja layout bersama

Setiap entry HTML menyimpan title, meta description, tautan Google Fonts,
Phosphor Icons, dan `css/output.css` sendiri. Body menentukan halaman melalui
`data-page="home"`, `data-page="about"`, `data-page="clinic"`, `data-page="contact"`, atau
`data-page="service"`, menyediakan `#app`, dan memanggil satu module
`js/app.js` dengan path relatif sesuai kedalaman folder. Entry layanan juga menentukan `data-service`.

Home tetap berada di root sebagai `index.html`. Halaman umum berada di `pages/`;
halaman layanan berada di `pages/services/<category>/<service-id>.html`.
Setiap entry di `pages/` memiliki `data-root="../"`, sedangkan entry layanan
memiliki `data-root="../../../"`. Path script dan CSS pada HTML memakai prefix
yang sama. `PageLayout` memakai `data-root` untuk menyesuaikan URL `href`/`src`
yang diawali `./` di komponen, section, dan data. URL tersebut ditulis relatif
terhadap root project agar renderer tetap bisa dipakai dari semua kedalaman.
Anchor lokal seperti `#service-options` tetap menunjuk ke dokumen yang sedang
dibuka. Tidak ada elemen `base`, sehingga skip link dan anchor section tetap benar.
Struktur ini juga mendukung static hosting di subfolder.

`app.js` memuat descriptor halaman dari `js/pages/`. Module halaman dapat
mengekspor object descriptor atau factory yang menerima `{ serviceId }`.
Factory `js/pages/service.js` mengambil data layanan dari registry, lalu memakai
`createServicePage(service)` untuk membuat descriptor. Descriptor menyusun
section serta mengatur inisialisasi fitur yang diperlukan halaman tersebut.
`PageLayout` dan `mountPage` di `js/layouts/page-layout.js` memasang skip link,
bar kontak, navbar sticky, `<main id="main-content">`, dan footer. Navbar serta
fitur halaman diaktifkan setelah markup dipasang. Halaman aktif diteruskan ke
navbar dan footer agar navigasi konsisten. Halaman layanan meneruskan `serviceId`
ke navbar agar tautan dropdown yang sesuai memiliki `aria-current="page"`.
Tautan langsung seperti `/#services` diarahkan ke section setelah halaman
selesai dipasang. Setiap dokumen menjalankan mount satu kali.

Area main tetap selebar layar. Gunakan utility dari `js/layouts/container.js`
di dalam section untuk membatasi konten dan menjaga posisi tengah. Lebar maksimal
konten adalah **1440px**, dengan padding **32px** di HP dan **80px** mulai tablet.
Grid full-bleed memungkinkan foto dan background tetap mencapai tepi layar.

## Menambah halaman

1. Buat entry HTML di `pages/` dengan metadata, `data-page`, dan `data-root="../"`;
   pertahankan font, ikon, `../css/output.css`, `#app`, dan `../js/app.js`.
2. Buat folder `js/sections/nama-halaman/` untuk markup section. Pakai komponen
   bersama di `js/components/` dan utility container di `js/layouts/container.js`.
3. Buat descriptor `js/pages/nama-halaman.js`, mengikuti pola halaman yang ada.
   Susun section dan tetapkan inisialisasi fitur setelah mount bila diperlukan.
4. Daftarkan pemuat descriptor di `js/app.js`, lalu perbarui tautan atau status
   navigasi di `js/data/navigation.js` bila halaman perlu masuk menu.
5. Folder `pages/` dan `js/` sudah termasuk dalam sumber Tailwind di
   `css/input.css`. Jalankan `npm run build:css` setelah mengubah utility.
6. Periksa halaman melalui static server, termasuk navigasi, interaksi,
   perubahan lebar layar, dan reflow teks.

Pertahankan controller yang reusable di `js/features/`, data di `js/data/`, dan
gambar di folder aset yang sesuai. Hindari menyalin shell atau utility spacing
ke halaman baru.

## Menambah halaman layanan

Seluruh **13 layanan dropdown** menggunakan satu template dan record masing-masing
dalam registry `js/data/services/index.js`. Jumlah per kategori: Pregnancy &
Postpartum **3**, Lymphatic Drainage **3**, Pain & TMJ Relief **4**, dan Body
Contouring **3**. Semua item memiliki tautan halaman sendiri dan status aktif.

Kolom slug di bawah sekaligus menjadi nama file data
`js/data/services/<slug>.js`, nama file entry `<slug>.html`, dan nilai
`data-service` pada body. Entry dan tautan dropdown memakai
`pages/services/<category>/<slug>.html`. Folder kategori adalah
`pregnancy-postpartum`, `lymphatic-drainage`, `pain-tmj-relief`, dan `body-contouring`.

| Kelompok | Menu dropdown | Slug |
| --- | --- | --- |
| Pregnancy & Postpartum | Pregnancy Massage & Circulation Support | `pregnancy-massage-circulation-support` |
| Pregnancy & Postpartum | Recovery & Core Restoration | `recovery-core-restoration` |
| Pregnancy & Postpartum | Postnatal Lymphatic Drainage | `postnatal-lymphatic-drainage` |
| Lymphatic Drainage | Post-Surgical Recovery | `post-surgical-recovery` |
| Lymphatic Drainage | Clinical Lymphatic Drainage Sydney | `clinical-lymphatic-drainage-sydney` |
| Lymphatic Drainage | Lipedema & Inflammatory Leg Care | `lipedema-inflammatory-leg-care` |
| Pain & TMJ Relief | TMJ, Jaw & Headache Treatment | `tmj-jaw-headache-treatment` |
| Pain & TMJ Relief | Chronic Pain, Stress & Inflammation | `chronic-pain-stress-inflammation` |
| Pain & TMJ Relief | Clinical Therapeutic Massage & Injury Recovery | `clinical-therapeutic-massage-injury-recovery` |
| Pain & TMJ Relief | Endometriosis & Pelvic Pain Support | `endometriosis-pelvic-pain-support` |
| Body Contouring | Clinical Cellulite Remodelling | `clinical-cellulite-remodelling` |
| Body Contouring | Lymphatic Reset & Fluid Retention Treatment | `lymphatic-reset-fluid-retention-treatment` |
| Body Contouring | Hormonal Skin Tightening & Firmness Treatment | `hormonal-skin-tightening-firmness-treatment` |

Sepuluh layanan Pregnancy, Lymphatic, dan Pain memakai teks dari PNG masing-masing
dalam `Our Service Layout/`. Tiga Body Contouring memprioritaskan teks
`data_service_inbody_clinic.md`, sedangkan PNG menentukan komposisi visual dan
pemetaan foto. Ini merupakan aturan sumber saat implementasi, bukan persetujuan
atas kesalahan atau perbedaan wording yang masih menunggu review.

Teks sumber yang berulang atau perlu dipastikan tetap dipertahankan sampai
pengguna memutuskan isinya. Review dan pemetaan sumber tersedia di
[docs/SERVICE_COPY_REVIEW.md](docs/SERVICE_COPY_REVIEW.md).
File sumber `data_service_inbody_clinic.md`, PNG, dan foto asli tidak diedit.

1. Buat data lengkap di `js/data/services/nama-layanan.js`, mengikuti bentuk data
   layanan yang ada. Isi judul, deskripsi, gambar, pilihan perawatan, tahap
   pemulihan, dua panel informasi, kutipan, dan CTA sesuai layanan tersebut.
2. Daftarkan data di `js/data/services/index.js` dengan ID layanan yang unik.
3. Buat entry HTML di `pages/services/<category>/nama-layanan.html` dengan metadata,
   font/ikon, `../../../css/output.css`, `#app`, dan script `../../../js/app.js`.
   Tetapkan `data-page="service"`, `data-service="nama-layanan"`, dan
   `data-root="../../../"` pada body.
4. Perbarui item yang sesuai di `serviceNavigationGroups` pada
   `js/data/navigation.js` menjadi object dengan `id`, `label`, dan `href` ke
   entry HTML baru.
5. Folder `pages/` otomatis dibaca Tailwind. Jalankan `npm test` dan
   `npm run build:css`; tes memeriksa tautan pada hosting root maupun subfolder.
6. Periksa isi layanan, navigasi dropdown, gambar, anchor, tombol, dan tampilan
   pada layar kecil maupun besar melalui static server.

`js/layouts/service-page.js` menentukan susunan enam section: hero, pilihan
perawatan, tahap pemulihan, pendekatan dan hasil yang diharapkan, kutipan, serta
CTA kontak. Renderer berada di `js/sections/service/index.js`. Ubah renderer
hanya ketika pola tampilan bersama perlu berubah; variasi isi berada di data.

Heading mendukung `lines[].segments` untuk accent pada sebagian baris.
`hero.subEyebrow` menentukan label di bawah H1 secara terpisah dari eyebrow di
atas H1. `expertise.description` menyediakan paragraf opsional sebelum kedua
panel, misalnya keterangan program **6–8 sesi** pada Hormonal. Panel default
memakai `items` berupa string dan nomor berurutan. Clinical Cellulite memakai
`variant: 'icon-blocks'` pada panel kanan, dengan item `{ icon, title,
description }`, sehingga tetap menggunakan renderer bersama tanpa menyalin
section layanan.

Foto Pregnancy Massage dan Recovery berada dalam folder layanan masing-masing
di `assets/images/services/Pregnancy & Postpartum/`. Hero Postnatal memakai foto
dalam folder Lipedema & Inflammatory Leg Care karena cocok dengan PNG Postnatal;
foto treatment berada dalam folder Postnatal. Pemetaan lintas folder ini
disengaja, tanpa memindahkan aset asli.

Untuk layanan berikutnya, cocokkan dahulu PNG, data teks, dan foto yang tersedia.
Catat perbedaan sumber di dokumen review; jangan menulis ulang teks yang ditandai
hanya untuk membuatnya tampak konsisten. Penomoran daftar web dihasilkan oleh
renderer, sehingga panel Endometriosis tampil **01, 02, 03**, sementara PNG
memuat **01, 02, 02**; isi ketiga item tetap mengikuti sumber. Pemeriksaan visual
browser tetap perlu dilakukan terpisah dari `npm test` dan build Tailwind.

## Perilaku yang dipertahankan

- Home memiliki tiga slide hero, berganti otomatis setiap 5 detik setelah
  transisi selesai, dengan animasi masuk dari kanan dan keluar ke kiri selama
  700ms. Autoplay memperhatikan fokus, visibilitas, dan reduced motion.
- Bar kontak bergulir bersama halaman; navbar tetap sticky di bagian atas.
  Navbar dan footer memakai satu sumber navigasi bersama.
- Our Clinic pada navbar dan footer menuju `./pages/our-clinic.html`, dengan status
  halaman aktif yang sama seperti Home, About, dan Contact Us.
- Contact Us memuat kartu kontak, iframe Google Maps, serta tautan peta.
  Form membuka draf email di aplikasi pengguna; belum mengirim langsung melalui
  backend. Kolom Name hanya menerima huruf Unicode dan spasi.
- CTA Book an Appointment pada navbar, hero slider, dan section CTA Home menuju `./pages/contact.html`.
  Seluruh 13 item dropdown membuka halaman layanan masing-masing; CTA kontak
  halaman layanan menuju `./pages/contact.html#contact-form`.

## Galeri Our Clinic

Entry `pages/our-clinic.html` memakai `data-page="clinic"`. `js/app.js` memuat
descriptor `js/pages/clinic.js`, lalu memasang pengantar, galeri, dan bagian
Plan Your Visit dari `js/sections/clinic/index.js` melalui layout bersama.

Foto mengambil 12 JPEG dari folder root `gallery/` yang disediakan pengguna.
Video MP4 di folder yang sama belum ditampilkan pada halaman. Folder sumber
dipertahankan; jangan mengganti foto klinik dengan foto perawatan layanan
sebagai pengisi galeri. Data caption, alt text, dimensi, dan kategori berada di
`js/data/clinic-gallery.js`.

`clinicGalleryFilters` berisi `{ id, label }`. Setiap record
`clinicGalleryPhotos` berisi `{ id, eyebrow, title, description, src, alt,
width, height, categories }`. Nilai `categories` berupa array dan boleh memuat
lebih dari satu kategori: `treatment-rooms`, `equipment`, atau `details`.
Filter `all` menampilkan semua foto.

Grid memakai satu kolom di HP, dua mulai tablet, dan tiga mulai 1101px. Kartu
memakai rasio foto 4:3 dan caption dengan tinggi alami agar susunannya rapi.
Filter berupa tombol pill yang membungkus ke baris berikutnya, disertai jumlah
foto yang tampil. Klik foto membuka elemen `dialog` native dengan foto lebih
besar, judul, dan deskripsi. Controller `js/features/clinic-gallery.js`
mengatur filter, dialog, penutupan dengan tombol atau Escape, serta pengembalian
fokus ke foto pembuka.

Bagian Plan Your Visit memakai background Cream dan kartu alamat/jam klinik
tanpa mengulang foto galeri. Detailnya berasal dari `js/data/clinic-contact.js`;
tombol Find the Clinic memakai `ActionButton` bersama menuju Google Maps,
sedangkan tautan Contact Us menuju `./pages/contact.html`.

Token warna, font, breakpoint, komponen, dan detail tampilan tercatat di
[DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md). Styling menggunakan utility Tailwind;
ubah sumbernya, lalu build ulang `css/output.css`.
