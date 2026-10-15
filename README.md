# InBody Clinic

Website multi-halaman berbasis HTML, JavaScript ES modules, dan Tailwind CSS v4.
Halaman Home, About, dan Contact Us memakai satu layout bersama dan section
yang disusun khusus untuk setiap halaman.

## Menjalankan project

Pasang dependency dengan Node.js dan npm yang tersedia di komputer:

```sh
npm install
npm run build:css
```

Buka folder project melalui static server, misalnya **Live Server** di VS Code,
lalu kunjungi `index.html`, `about.html`, atau `contact.html` melalui URL server.
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
`npm test` memeriksa hasil render ketiga halaman, ID, target aksesibilitas,
tautan, aset lokal, dan import module. Pemeriksaan ini tidak menggantikan
pemeriksaan tampilan dan interaksi di browser.

## Struktur folder

```text
inbody-clinic-v2/
├── index.html                 # Entry Home dan metadata halaman
├── about.html                 # Entry About dan metadata halaman
├── contact.html               # Entry Contact Us dan metadata halaman
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
│   │   └── contact.js
│   ├── layouts/
│   │   ├── page-layout.js     # Shell bersama dan lifecycle mount
│   │   └── container.js       # Lebar, padding, dan grid full-bleed bersama
│   ├── components/            # Navbar, footer, heading, button, dan ikon
│   ├── features/              # Controller interaksi, bukan markup halaman
│   │   ├── hero-slider.js
│   │   └── contact-form.js
│   ├── data/                  # Data navigasi, kontak, dan slide
│   └── sections/
│       ├── home/              # Hero, layanan, Difference, testimonial, CTA
│       ├── about/index.js     # Profil, statistik, dan keahlian
│       └── contact/index.js   # Pengantar, kontak, peta, dan form
├── scripts/
│   └── check-pages.mjs        # Pemeriksaan integrasi struktur halaman
├── DESIGN_GUIDELINES.md
└── package.json
```

## Cara kerja layout bersama

Setiap entry HTML menyimpan title, meta description, tautan Google Fonts,
Phosphor Icons, dan `css/output.css` sendiri. Body menentukan halaman melalui
`data-page="home"`, `data-page="about"`, atau `data-page="contact"`, menyediakan
`#app`, dan memanggil satu module `./js/app.js`.

`app.js` memuat descriptor halaman dari `js/pages/`. Descriptor menyusun section
serta mengatur inisialisasi fitur yang diperlukan halaman tersebut.
`PageLayout` dan `mountPage` di `js/layouts/page-layout.js` memasang skip link,
bar kontak, navbar sticky, `<main id="main-content">`, dan footer. Navbar serta
fitur halaman diaktifkan setelah markup dipasang. Halaman aktif diteruskan ke
navbar dan footer agar navigasi konsisten.
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
  booking atau endpoint form tersedia.

Token warna, font, breakpoint, komponen, dan detail tampilan tercatat di
[DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md). Styling menggunakan utility Tailwind;
ubah sumbernya, lalu build ulang `css/output.css`.
