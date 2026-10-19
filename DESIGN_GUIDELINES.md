# InBody Clinic — Design Guidelines

Panduan implementasi setelah revisi client 17 Oktober 2026. Website mempertahankan
estetika clean, elegant, boutique clinical dengan pesan yang menekankan assessment,
clinical knowledge, specialised hands-on care, dan personalisation.

## 1. Font dan warna

- Heading: **Cormorant Garamond**, weight 400–700 sesuai komponen `Heading`.
- Body, navigasi, form, label, dan tombol: **Montserrat**, weight 400–700.
- Label pendek memakai uppercase dan letter spacing; paragraf tetap mudah dibaca.
- Headline menggunakan pemenggalan alami yang responsif; jangan menetapkan lebar minimum yang menyebabkan overflow.

| Warna | Hex | Token Tailwind | Penggunaan |
| --- | --- | --- | --- |
| Navy | `#203858` | `clinic-navy` | Heading, body, footer, CTA contact |
| Sage | `#879F9B` | `clinic-sage` | CTA, accent heading, ikon/dekorasi |
| Light Sage | `#D0DCD8` | `clinic-light-sage` | Soft background, lingkaran ikon, Method/assessment |
| Cream | `#F8F6F2` | `clinic-cream` | Background hangat dan section alternatif |
| White | `#FFFFFF` | `clinic-white` | Background utama dan content surface |
| Light Grey | `#E8E9E7` | `clinic-light-grey` | Border dan divider |

Token berada di `css/input.css`. Styling memakai utility Tailwind; build ke `css/output.css`,
jangan menambahkan CSS layout khusus ke input atau mengedit output secara manual.
Teks pertanyaan pada kartu speciality memakai Navy agar terbaca jelas; Sage digunakan sebagai accent.

## 2. Container dan reflow

Gunakan `containerClasses` dari `js/layouts/container.js`:

- Maksimum lebar 1440px, `mx-auto`, `w-full`, dan `min-w-0`.
- Padding 32px di HP dan 80px mulai tablet.
- Tablet: 641px; navbar desktop: 901px; layout wide: 1101px.
- Section background tetap selebar layar; container diterapkan di dalam section.
- Grid menggunakan `minmax(0,1fr)` atau `min-w-0` untuk teks panjang.
- Spasi vertikal umumnya `py-14 tablet:py-20` pada section baru.

Hero lama memakai `fullBleedGridClasses.hero` sehingga foto tetap mencapai tepi layar.
Tiga slide berada pada satu sel grid untuk menjaga tinggi yang konsisten antar-slide.
Periksa reflow, heading panjang, dan jarak kiri/kanan setelah perubahan copy.

## 3. Komponen bersama

`PageLayout` menyediakan skip link, bar kontak, navbar sticky, main selebar halaman,
dan footer. Bar kontak bergulir bersama dokumen. Section tidak menyalin shell.
Shell dipasang sekali; navigasi internal hanya mengganti isi main. Pertahankan elemen
navbar/footer dan perbarui link/menu aktif melalui atribut `data-nav-page` atau
`data-nav-speciality`. Fitur halaman yang memakai listener/timer harus mengembalikan cleanup
dari `page.init(root)` agar layout dapat menghentikannya sebelum mengganti konten.

Gunakan `Heading` untuk heading utama; data `lines`/`segments` menentukan accent.
Heading default memakai Navy, accent Sage, dan pilihan italic. Untuk label kartu speciality
atau langkah klinis yang memakai Montserrat, gunakan override `font-sans!`.

```js
ActionButton({ label: 'Explore our method', href: './pages/the-inbody-method.html' });
ActionButton({ label: 'Ask about an assessment', href: './pages/contact.html#contact-form', variant: 'contact' });
BookingButton('navbar');
```

CTA default berbentuk pill, Sage, White, dengan panah. Varian `contact` memakai Navy
serta teks normal case. Hover dan reduced motion mengikuti komponen yang sama.
`BookingButton` menuju Contact Us; alur booking sudah selesai sesuai konfirmasi pengguna
dan integrasi eksternal tidak diperlukan. Profil kedua tetap menunggu data;
jangan menampilkan slot, credential, atau konfirmasi appointment rekaan.

`js/components/care.js` menyediakan `MethodPreview`, `MethodSteps`, `TeamPreview`,
`WhatToExpect`, dan `AssessmentCTA`. ID heading bisa disesuaikan agar tetap unik.
Copy dinamis pada section baru di-escape melalui `js/utils/html.js`.

## 4. Phosphor Icons dan SVG

Semua entry HTML memuat satu stylesheet berikut:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css" />
```

Gunakan class `ph ph-nama-ikon`, bukan weight Light/Fill dari dependency lokal.
Paket lokal hanya dipakai untuk validasi glyph dalam tes. Ikon dekoratif memakai `aria-hidden="true"`.
SVG khusus tetap berada di `js/components/icons.js` dan memakai `currentColor`.

Kartu speciality menggunakan lingkaran Light Sage ukuran 80/88px dan ikon sekitar 40/42px.
Surgery memakai first-aid-kit; lymphatic memakai leaf; Lipedema memakai SVG body-contour;
pregnancy memakai SVG pregnancy; TMJ memakai heartbeat; skin/tissue memakai SVG skin-health.
SVG kartu memakai stroke-width 0.85 pada viewBox 24px. Jangan mengubah ketebalan SVG
About yang dipakai bersama hanya untuk menyesuaikan kartu Home.

## 5. Struktur Home

Urutan Home di `js/pages/home.js`:

1. `hero`: tiga slide, headline klinis dan foto asli yang sudah ada.
2. `services`: How Can We Help? dengan enam speciality.
3. `method`: pengantar The InBody Method™ dan empat tahap.
4. `team`: pengalaman dan filosofi kolektif tim.
5. `expect`: empat langkah pengalaman kunjungan.
6. `assessment`: Not sure what to book? Start here.
7. `home-contact`: kontak, lokasi, jam klinik, dan peta.

Module Difference, testimonial, dan CTA harbour lama tetap ada tetapi tidak dipasang pada Home baru.
Kutipan pasien tidak diubah. Jangan memasukkan kembali section lama tanpa meninjau urutan brief.

Hero mempertahankan autoplay 5000ms, transisi 700ms, arah masuk dari kanan/keluar ke kiri,
inert/aria-hidden pada slide nonaktif, serta reduced motion. Fokus di dalam hero, visibilitas tab,
dan posisi hero diperhatikan oleh controller. Tidak ada tombol navigasi slider yang ditambahkan.
Ketiga foto hero dipertahankan karena pemilihan foto masih ingin didiskusikan pengguna.

Kartu speciality memakai grid 1/2/3 kolom. Seluruh kartu adalah tautan ke speciality;
panah adalah dekorasi dalam link yang sama. Judul, pertanyaan, dan ringkasan memberi
konteks kebutuhan pasien. Panjang copy berbeda diakomodasi dengan flex dan panah di bawah.

## 6. Halaman speciality dan Method

Katalog ringan `js/data/specialities/catalog.js` menjadi sumber bersama Home dan dropdown.
Konten lengkap berada di `js/data/specialities/index.js`; template terdapat di
`js/sections/speciality/index.js` dan factory `js/pages/speciality.js`.

Setiap speciality memuat hero, kebutuhan/gejala, clinical approach, teknik yang mungkin
sesuai, kapan care relevan, detail treatment terkait, dan assessment enquiry CTA.
Foto di dalam container memakai sudut membulat dan `object-cover`.

The InBody Method™ memakai halaman `pages/the-inbody-method.html` dan data `js/data/method.js`:

- Pengalaman/training dari brief client.
- Lima unsur: individual assessment; hands-on treatment; technology when appropriate;
  self-care advice; ongoing reassessment.
- Empat tahap: Assess → Personalise → Treat → Reassess.
- Sisi manusiawi tim dan keputusan perawatan yang diinformasikan kepada pasien.

Teknologi tidak menjadi pesan pertama. Jangan menambahkan klaim hasil, protokol,
training, atau kualifikasi yang tidak diberikan client. Draft copy dan informasi yang
masih menunggu review dicatat pada `docs/REVISION_IMPLEMENTATION.md`.

## 7. Navigasi dan treatment lama

Dropdown navbar memakai enam speciality dalam grid 1/2/3 kolom, pertanyaan singkat,
dan tautan Method di bawah. Panel mempertahankan animasi, inert, keyboard Escape,
fokus, serta perilaku mobile/hover dari controller sebelumnya.

Speciality aktif memakai `aria-current="page"`. Pada detail treatment, parent speciality
memakai `aria-current="location"`; jangan menandai parent sebagai halaman detail yang sedang dibuka.
`serviceNavigationGroups` tetap menyimpan 13 route lama, tetapi tidak merender dropdown utama.

Tiga belas treatment tetap memakai template `js/sections/service/index.js`. Breadcrumb menuju
speciality induk ditambahkan. Endometriosis tetap ditautkan dari Women's Health pada About,
tanpa menetapkan parent speciality baru. Catatan copy lama tetap terbuka pada `docs/SERVICE_COPY_REVIEW.md`.

Footer memakai Navy, logo, lima navigasi utama, Facebook/TikTok/Envelope/WhatsApp/Instagram,
serta tautan Method. Tagline memakai “Clinical expertise. Personalised care.”.

## 8. About, Contact Us, dan Our Clinic

Layout About sebelumnya dipertahankan sesuai koreksi pengguna. `TherapistProfile`
menampilkan profil di kiri dan foto Saila di kanan; `TherapistCredentials` memakai empat
kartu pada section Sage; `TherapistExpertise` mempertahankan grid expertise 2×2;
`MethodPreview` tetap menjadi pengantar Method. Label pembuka memakai “Meet our team”.
Sesuai izin pengguna, `TeamDetails` ditambahkan setelah expertise dan sebelum Method,
tanpa mengubah tata letak section lama. Section ini memakai informasi kolektif pada
`team.introduction`, `team.philosophy`, dan `team.sharedCare`, foto bersama lokal
`assets/images/about/team.jpg` melalui `team.detailImage`, serta CTA Contact Us.
Profil Saila memakai data yang sudah tersedia; profil kedua masih menunggu identitas,
bio, dan credential pribadi dari klinik. Foto bersama tambahan bukan pengganti profil
individu kedua lengkap. Jangan menambahkan identitas atau kualifikasi rekaan.
Team overview Home menggunakan informasi kolektif client dan foto bersama yang sudah tersedia.

Contact Us memakai data di `js/data/clinic-contact.js`, kartu kontak, Google Maps, dan form email.
Name hanya menerima huruf Unicode/spasi. Form membuka draf email; tidak mengirim melalui server.
CTA assessment menuju `#contact-form` tanpa prefill atau integrasi booking baru.

Our Clinic tetap memakai 12 JPEG asli pada `gallery/`, filter kategori, grid 1/2/3 kolom,
thumbnail 4:3, dan dialog `object-contain`. Dialog mendukung close/Escape, scroll lock,
serta pengembalian fokus. MP4 belum dipakai.

## 9. Entry HTML dan pemeriksaan

Hanya `index.html` berada di root. Entry umum berada di `pages/`, speciality di
`pages/specialities/`, dan treatment di `pages/services/<category>/`.

| Kedalaman | `data-root` dan prefix script/CSS |
| --- | --- |
| Root | `./` |
| `pages/` | `../` |
| `pages/specialities/` | `../../` |
| `pages/services/<category>/` | `../../../` |

Komponen/data menulis URL `./...` relatif terhadap root project. `PageLayout` menyesuaikan
`href`/`src` berdasarkan prefix entry untuk render statis. Pada browser, `navigation.js`
memakai prefix root dari URL modul aplikasi agar aset/link tidak bergeser saat `pushState`.
Anchor lokal tetap lokal; jangan memakai elemen `base`.
Font/CDN, title, dan meta description tetap berada pada entry HTML masing-masing.
Navigasi membaca metadata dari entry tujuan. Semua file `.html` tetap tersedia untuk
link langsung/refresh di GitHub Pages; jangan menggantinya dengan route tanpa file HTML.

Tailwind membaca `index.html`, `pages/`, dan `js/`. Jalankan `npm test` dan `npm run build:css`.
Tes mencakup 24 halaman, enam speciality, 13 treatment, metadata, route/anchor, ARIA, glyph,
aset, import, urutan Home, dan hosting root/subfolder. Periksa visual serta interaksi di browser
setelah perubahan yang memengaruhi layout; hasil tes teknis bukan persetujuan copy client.
