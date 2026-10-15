# InBody Clinic

Website multi-halaman berbasis HTML, JavaScript ES modules, dan Tailwind CSS v4.
Halaman Home, About, Contact Us, dan layanan memakai satu layout bersama.
Section halaman umum disusun per halaman; halaman layanan memakai satu template
dengan data layanan yang terpisah.

## Menjalankan project

Pasang dependency dengan Node.js dan npm yang tersedia di komputer:

```sh
npm install
npm run build:css
```

Buka folder project melalui static server, misalnya **Live Server** di VS Code,
lalu kunjungi entry HTML melalui URL server, misalnya `index.html`, `about.html`,
`contact.html`, atau `pregnancy-massage-circulation-support.html`.
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
├── about.html                 # Entry About dan metadata halaman
├── contact.html               # Entry Contact Us dan metadata halaman
├── pregnancy-massage-circulation-support.html # Entry layanan pertama
├── assets/
│   ├── images/                # Gambar, dikelompokkan per halaman/layanan
│   └── logo/
├── css/
│   ├── input.css              # Import, sumber class, dan token @theme
│   └── output.css             # Hasil build Tailwind; jangan edit manual
├── js/
│   ├── app.js                 # Entry bersama; memuat descriptor halaman
│   ├── pages/
│   │   ├── home.js
│   │   ├── about.js
│   │   ├── contact.js
│   │   └── service.js         # Factory descriptor layanan berdasarkan serviceId
│   ├── layouts/
│   │   ├── page-layout.js     # Shell bersama dan lifecycle mount
│   │   ├── service-page.js    # Menyusun enam section template layanan
│   │   └── container.js       # Lebar, padding, dan grid full-bleed bersama
│   ├── components/            # Navbar, footer, heading, button, dan ikon
│   ├── features/              # Controller interaksi, bukan markup halaman
│   │   ├── hero-slider.js
│   │   └── contact-form.js
│   ├── data/                  # Data navigasi, kontak, dan slide
│   │   └── services/
│   │       ├── index.js       # Registry data layanan
│   │       └── pregnancy-massage-circulation-support.js
│   └── sections/
│       ├── home/              # Hero, layanan, Difference, testimonial, CTA
│       ├── about/index.js     # Profil, statistik, dan keahlian
│       ├── contact/index.js   # Pengantar, kontak, peta, dan form
│       └── service/index.js   # Renderer umum untuk enam section layanan
├── scripts/
│   └── check-pages.mjs        # Pemeriksaan integrasi struktur halaman
├── DESIGN_GUIDELINES.md
└── package.json
```

## Cara kerja layout bersama

Setiap entry HTML menyimpan title, meta description, tautan Google Fonts,
Phosphor Icons, dan `css/output.css` sendiri. Body menentukan halaman melalui
`data-page="home"`, `data-page="about"`, `data-page="contact"`, atau
`data-page="service"`, menyediakan `#app`, dan memanggil satu module
`./js/app.js`. Entry layanan juga menentukan `data-service`.

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

1. Buat entry HTML root dengan metadata dan `data-page` yang sesuai; pertahankan
   pemanggilan font, ikon, output CSS, `#app`, dan `./js/app.js`.
2. Buat folder `js/sections/nama-halaman/` untuk markup section. Pakai komponen
   bersama di `js/components/` dan utility container di `js/layouts/container.js`.
3. Buat descriptor `js/pages/nama-halaman.js`, mengikuti pola halaman yang ada.
   Susun section dan tetapkan inisialisasi fitur setelah mount bila diperlukan.
4. Daftarkan pemuat descriptor di `js/app.js`, lalu perbarui tautan atau status
   navigasi di `js/data/navigation.js` bila halaman perlu masuk menu.
5. Tambahkan entry HTML ke `@source` di `css/input.css`. Class lengkap di bawah
   `js/` sudah termasuk dalam sumber Tailwind. Jalankan `npm run build:css`.
6. Periksa halaman melalui static server, termasuk navigasi, interaksi,
   perubahan lebar layar, dan reflow teks.

Pertahankan controller yang reusable di `js/features/`, data di `js/data/`, dan
gambar di folder aset yang sesuai. Hindari menyalin shell atau utility spacing
ke halaman baru.

## Menambah halaman layanan

Halaman layanan pertama tersedia di
`pregnancy-massage-circulation-support.html`. Layout mengikuti referensi pengguna,
sedangkan teks membahas **Pregnancy Massage & Circulation Support**.
Template ini dapat dipakai untuk layanan berikutnya tanpa menyalin markup
section atau kerangka halaman.

1. Buat data lengkap di `js/data/services/nama-layanan.js`, mengikuti bentuk data
   layanan pertama. Isi judul, deskripsi, gambar, pilihan perawatan, tahap
   pemulihan, dua panel informasi, kutipan, dan CTA sesuai layanan tersebut.
2. Daftarkan data di `js/data/services/index.js` dengan ID layanan yang unik.
3. Buat entry HTML root dengan title dan meta description khusus, pemanggilan
   font/ikon/CSS yang sama, `#app`, dan script `./js/app.js`. Tetapkan
   `data-page="service"` serta `data-service="nama-layanan"` pada body.
4. Perbarui item yang sesuai di `serviceNavigationGroups` pada
   `js/data/navigation.js` menjadi object dengan `id`, `label`, dan `href` ke
   entry HTML baru. Item tanpa halaman tetap memakai enquiry email.
5. Tambahkan entry HTML ke sumber Tailwind di `css/input.css`, lalu jalankan
   `npm test` dan `npm run build:css`.
6. Periksa isi layanan, navigasi dropdown, gambar, anchor, tombol, dan tampilan
   pada layar kecil maupun besar melalui static server.

`js/layouts/service-page.js` menentukan susunan enam section: hero, pilihan
perawatan, tahap pemulihan, pendekatan dan hasil yang diharapkan, kutipan, serta
CTA kontak. Renderer berada di `js/sections/service/index.js`. Ubah renderer
hanya ketika pola tampilan bersama perlu berubah; variasi isi berada di data.

Foto layanan pertama memakai dua JPEG yang sudah tersedia dalam folder
`assets/images/services/Pregnancy & Postpartum/POSTNATAL LYMPHATIC DRAINAGE/`.
Referensi isi layanan: [halaman resmi klinik](https://inbodyclinic.com/pregnancy-massage-circulation-support/).

## Perilaku yang dipertahankan

- Home memiliki tiga slide hero, berganti otomatis setiap 5 detik setelah
  transisi selesai, dengan animasi masuk dari kanan dan keluar ke kiri selama
  700ms. Autoplay memperhatikan fokus, visibilitas, dan reduced motion.
- Bar kontak bergulir bersama halaman; navbar tetap sticky di bagian atas.
  Navbar dan footer memakai satu sumber navigasi bersama.
- Contact Us memuat kartu kontak, iframe Google Maps, serta tautan peta.
  Form membuka draf email di aplikasi pengguna; belum mengirim langsung melalui
  backend. Kolom Name hanya menerima huruf Unicode dan spasi.
- CTA booking dan enquiry layanan memakai kontak email klinik sampai tautan
  booking atau endpoint form tersedia. Item dropdown Pregnancy Massage &
  Circulation Support membuka halaman layanan; CTA kontak halaman tersebut
  menuju Contact Us.

Token warna, font, breakpoint, komponen, dan detail tampilan tercatat di
[DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md). Styling menggunakan utility Tailwind;
ubah sumbernya, lalu build ulang `css/output.css`.
