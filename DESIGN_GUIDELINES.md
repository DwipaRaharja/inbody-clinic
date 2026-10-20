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

Token berada di `css/input.css`. Styling memakai utility Tailwind dan diproses melalui Vite;
jangan mengedit CSS hasil build pada `dist/` secara manual.
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

Layout React pada `src/App.jsx` menyediakan skip link, bar kontak, navbar sticky,
main selebar halaman, dan footer. Bar kontak bergulir bersama dokumen. Section tidak menyalin shell.
Shell dipasang sekali; React Router mengganti konten main saat navigasi internal.
Pertahankan elemen navbar/footer/main dan penanda `data-nav-page` atau `data-nav-speciality`.
Controller yang memasang listener/timer diaktifkan melalui effect React dan harus
mengembalikan cleanup untuk dijalankan saat halaman dilepas. Jangan memasang listener
saat render atau mengganti DOM yang dimiliki React menggunakan `innerHTML`.

Gunakan `Heading` untuk heading utama; data `lines`/`segments` menentukan accent.
Heading default memakai Navy, accent Sage, dan pilihan italic. Untuk label kartu speciality
atau langkah klinis yang memakai Montserrat, gunakan override `font-sans!`.

```jsx
<ActionButton label="Explore our method" href="./pages/the-inbody-method.html" />
<ActionButton label="Ask about an assessment" href="./pages/contact.html#contact-form" variant="contact" />
<BookingButton variant="navbar" />
```

CTA default berbentuk pill, Sage, White, dengan panah. Varian `contact` memakai Navy
serta teks normal case. Hover dan reduced motion mengikuti komponen yang sama.
`BookingButton` menuju Contact Us; alur booking sudah selesai sesuai konfirmasi pengguna
dan integrasi eksternal tidak diperlukan. Gunakan credential tiap anggota tim yang
diberikan pengguna; jangan menampilkan slot atau konfirmasi appointment rekaan.

`js/components/care.jsx` menyediakan `MethodPreview`, `MethodSteps`, `TeamPreview`,
`WhatToExpect`, dan `AssessmentCTA`. ID heading bisa disesuaikan agar tetap unik.
Render copy dinamis sebagai JSX agar React melakukan escaping. Untuk markup inline
yang memang didukung data, gunakan helper bersama dengan daftar tag terbatas.
Jangan merender HTML mentah dari sumber yang tidak dipercaya.

## 4. Phosphor Icons dan SVG

Stylesheet `@phosphor-icons/web/regular` diimpor melalui entry Vite,
lalu CSS dan font ikon dibundel sebagai aset lokal. Jangan menambahkan kembali stylesheet
ikon CDN pada setiap halaman. Gunakan class `ph ph-nama-ikon`, bukan weight Light/Fill.
Tes memeriksa glyph terhadap dependency lokal. Ikon dekoratif memakai `aria-hidden="true"`.
SVG khusus berada di `js/components/icons.jsx` dan memakai `currentColor`.

Kartu speciality menggunakan lingkaran Light Sage ukuran 80/88px dan ikon sekitar 40/42px.
Surgery memakai first-aid-kit; lymphatic memakai leaf; Lipedema memakai SVG body-contour;
pregnancy memakai SVG pregnancy; TMJ memakai heartbeat; skin/tissue memakai SVG skin-health.
SVG kartu memakai stroke-width 0.85 pada viewBox 24px. Jangan mengubah ketebalan SVG
About yang dipakai bersama hanya untuk menyesuaikan kartu Home.

## 5. Struktur Home

Urutan section Home pada renderer React:

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
dan posisi hero diperhatikan oleh controller. Tiga tombol titik di tengah bawah hero memilih slide
dan menandai slide aktif; navigasi slider tidak memakai panah atau ikon caret.
Slide ketiga hero memakai foto tim terbaru yang diberikan pengguna pada `assets/images/home/hero-3.jpg`.
Foto slide pertama dan kedua tetap mengikuti aset yang sudah dipilih.

Kartu speciality memakai grid 1/2/3 kolom. Seluruh kartu adalah tautan ke speciality;
panah adalah dekorasi dalam link yang sama. Judul, pertanyaan, dan ringkasan memberi
konteks kebutuhan pasien. Panjang copy berbeda diakomodasi dengan flex dan panah di bawah.

## 6. Halaman speciality dan Method

Katalog ringan `js/data/specialities/catalog.js` menjadi sumber bersama Home dan dropdown.
Konten lengkap berada di `js/data/specialities/index.js`; template terdapat di
`js/sections/speciality/index.jsx`; route dan metadata berada di `src/routes.js`.

Setiap speciality memuat hero, kebutuhan/gejala, clinical approach, teknik yang mungkin
sesuai, kapan care relevan, detail treatment terkait, dan assessment enquiry CTA.
Foto di dalam container memakai sudut membulat dan `object-cover`.

Halaman Skin & Tissue Health memakai copy Cellulite & Tissue Remodelling dan foto
yang diberikan client pada `assets/images/specialities/skin-tissue-health/hero.jpg`.
Template speciality tetap sama, dengan tujuh kebutuhan, enam teknik, dan dua kartu:
Cellulite & Tissue Remodelling serta Support for Skin Firmness & Hormonal Body Changes.
Revisi ini hanya berlaku pada halaman speciality;
konten dan URL halaman detail treatment lama tetap tersedia.

Clinical Lymphatic Care menampilkan sembilan kebutuhan dari brief client dan satu kartu
Advanced Lymphatic Therapy, menggantikan dua kartu sebelumnya. Kartu tersebut menuju URL
detail `pages/services/lymphatic-drainage/clinical-lymphatic-drainage-sydney.html`.
Detail memakai template service bersama, dengan hero, sembilan indikasi, dan lima teknik
dari brief terbaru. Tiga kartu manfaat, kutipan, CTA kontak, dan foto lama dipertahankan
sesuai pilihan pengguna. URL Lymphatic Reset lama tetap tersedia tanpa kartu pada speciality ini.

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

Tiga belas treatment tetap memakai template `js/sections/service/index.jsx`. Breadcrumb menuju
speciality induk ditambahkan. Endometriosis tetap ditautkan dari Women's Health pada About,
tanpa menetapkan parent speciality baru. Catatan copy lama tetap terbuka pada `docs/SERVICE_COPY_REVIEW.md`.

Clinical Cellulite Remodelling memakai `hero-treatment.jpg` untuk hero dan `tissue-treatment.jpg`
untuk Ideal If You Notice, keduanya dari foto client di folder aset treatment tersebut.
Kedua kartu The Treatment & What to Expect memakai `ServiceExpertiseList` yang sama:
daftar bernomor dengan latar abu-abu, tanpa varian khusus ikon pada kartu kanan.

Footer memakai Navy, logo, lima navigasi utama, Facebook/TikTok/Envelope/WhatsApp/Instagram,
serta tautan Method. Tagline memakai “Clinical expertise. Personalised care.”.

## 8. About, Contact Us, dan Our Clinic

Layout About sebelumnya dipertahankan sesuai koreksi pengguna. `TherapistProfile`
menampilkan profil di kiri dan foto Saila di kanan; `TherapistCredentials` memakai empat
kartu pada section Sage; `TherapistExpertise` mempertahankan grid expertise 2×2;
`MethodPreview` tetap menjadi pengantar Method. Label pembuka memakai “Meet our team”.
`BeatrizProfile` ditambahkan setelah expertise Saila, sebelum `TeamDetails` dan Method.
Section memakai nama, foto asli, pengalaman 22+ tahun, lima area expertise, serta
filosofi perawatan yang diberikan pengguna melalui data `beatriz` di `js/data/team.js`.
Judul profesi membedakan latar pendidikan Chile dan peran Remedial Massage Therapist di Australia.
Foto `assets/images/about/beatriz.jpg` dipertahankan utuh, dengan layout satu kolom di HP
dan foto di kiri/teks di kanan pada desktop. Gunakan H2 agar halaman tetap memiliki satu H1.
`TeamDetails` memakai informasi kolektif pada
`team.introduction`, `team.philosophy`, dan `team.sharedCare`, foto bersama lokal
`assets/images/about/team.jpg` melalui `team.detailImage`, serta CTA Contact Us.
Profil Saila dan Beatriz memakai data masing-masing; jangan menambahkan nama belakang,
identitas, atau kualifikasi yang belum diberikan. Foto bersama mendukung pengantar kolektif.
Team overview Home menggunakan informasi kolektif client dan foto bersama yang sudah tersedia.

Contact Us memakai data di `js/data/clinic-contact.js`, kartu kontak, Google Maps, dan form email.
Name hanya menerima huruf Unicode/spasi. Form membuka draf email; tidak mengirim melalui server.
CTA assessment menuju `#contact-form` tanpa prefill atau integrasi booking baru.

Our Clinic tetap memakai 12 JPEG asli pada `gallery/`, filter kategori, grid 1/2/3 kolom,
thumbnail 4:3, dan dialog `object-contain`. Dialog mendukung close/Escape, scroll lock,
serta pengembalian fokus. MP4 belum dipakai.

## 9. Build, HTML statis, dan pemeriksaan

Source memakai React dan Vite. `src/routes.js` menyimpan 24 path, ID, judul, dan deskripsi.
`npm run build` menghasilkan HTML berisi konten pada `dist/index.html`, `dist/pages/`,
`dist/pages/specialities/`, serta `dist/pages/services/<category>/`. File entry halaman
dibuat oleh prerender saat build; jangan menambah atau mengedit file HTML keluaran secara manual.
React melakukan hydration pada markup yang sama dan mempertahankan shell saat navigasi.

Komponen/data tetap menulis URL `./...` relatif terhadap root project. Helper URL React
menambahkan base Vite untuk aset dan link agar lokasi tidak bergeser ketika URL berubah.
Anchor lokal tetap lokal; jangan memakai elemen `base`. Build root domain menggunakan `/`;
GitHub Pages project menggunakan base repository seperti `/inbody-clinic/`.
Semua alamat `.html` tetap dipertahankan untuk link langsung dan refresh tanpa rewrite server.

Tailwind membaca source React dan data project. Jalankan `npm run build`, `npm test`,
dan `npm run test:navigation`. Ulangi dengan `npm run build:pages` untuk base subfolder.
Tes struktur memeriksa 24 HTML prerender beserta metadata, route/anchor, ARIA, glyph,
aset, urutan Home, enam speciality, dan 13 treatment. Tes browser memeriksa hydration,
navigasi tanpa reload, shell, cleanup, history, mobile, dan konten tanpa JavaScript.
Periksa visual serta interaksi setelah perubahan layout; hasil tes teknis bukan persetujuan copy client.

Animasi masuk header memakai GSAP core dari CDN melalui `js/features/header-entrance.js`.
Latar bar kontak terbuka dari atas ke bawah terlebih dahulu, lalu lokasi, email, telepon,
dan menu navbar memudar masuk. Logo, container navbar, dan judul halaman tetap statis.
Effect dipasang sekali pada layout App; perpindahan route tidak mengulang animasi.
Reduced motion dan interaksi pengguna menghentikan animasi serta memulihkan style.
Konten tetap terlihat jika CDN gagal atau terlambat. Jangan mengaktifkan animasi seluruh teks.
