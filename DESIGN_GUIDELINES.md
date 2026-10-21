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
Ikon kartu Home memakai frame 42×42px; glyph Phosphor Regular tetap 40px dan
SVG khusus memakai stroke-width 1.2 pada viewBox 24px agar ketebalan garisnya
sebanding. Bentuk/path SVG dan pilihan simbol tetap sama. Penyesuaian stroke
hanya di kartu Home; jangan mengubah default komponen `Icon` yang dipakai bersama.

## 5. Struktur Home

Urutan section Home pada renderer React:

1. `hero`: tiga slide, headline klinis dan foto asli yang sudah ada.
2. `services`: How Can We Help?, panel Start Here, lalu enam speciality.
3. `method`: pengantar The InBody Method™ dan empat tahap.
4. `team`: pengalaman dan filosofi kolektif tim.
5. `expect`: empat langkah pengalaman kunjungan.
6. `home-contact`: kontak, lokasi, jam klinik, dan peta.

Assessment Home berada di dalam Services sebelum kategori, memakai varian embedded
dari `AssessmentCTA`. Jangan menduplikasinya sebagai section setelah What to Expect.
Data copy, durasi 90 menit, label tombol, dan URL booking berasal dari
`js/data/assessment-booking.js`, juga dipakai CTA speciality/Method dan navbar.
Gunakan link Fresha yang diberikan client untuk assessment `sv:29617337`, lokasi
`2731243`. Jangan menggantinya dengan ID layanan lain.

Module Difference, testimonial, dan CTA harbour lama tetap ada tetapi tidak dipasang pada Home baru.
Kutipan pasien tidak diubah. Jangan memasukkan kembali section lama tanpa meninjau urutan brief.

Animasi konten diterapkan pada Home, About, Our Clinic, Contact Us, seluruh service/speciality,
dan The InBody Method™ melalui
`js/features/content-reveal.js`; Home memilih kelompok melalui `js/features/home-reveal.js`.
Teks naik 16px sambil fade-in selama 850ms (`power2.out`); foto dan slider hero Home hanya fade-in.
Kartu serta daftar yang masuk layar bersama memakai stagger 120ms. Tiap target muncul
sekali per kunjungan halaman, tanpa mengulang saat scroll kembali. Pergantian slide dan
animasi header memakai controller masing-masing. Gunakan GSAP CDN yang sudah ada
dan IntersectionObserver; jangan menambahkan ScrollTrigger atau dependency animasi baru.
Reduced motion, fokus pengguna, cleanup route, dan CDN gagal/lambat harus menjaga
konten tetap terlihat. Jangan menyembunyikan konten pada HTML prerender atau CSS awal.
Clinic dan Contact menandai kelompok dengan `data-content-reveal="rise|fade"` dan
`data-content-reveal-group` untuk stagger. Foto galeri beserta caption hanya fade-in;
dialog tetap terpisah dari target animasi. Form Contact menganimasikan seluruh kolom
bersama label, bukan placeholder atau teks ketikan. Latar section pembuka Contact
menggunakan Cream, sama dengan section pembuka speciality di menu Our Services.
`js/features/care-reveal.js` memilih kelompok dari elemen layout yang sudah ada.
Controller service dipasang sekali pada `createServicePage`, speciality pada
`createSpecialityPage`, dan Method pada konfigurasi halamannya. Jangan menyalin layout
per service atau menambahkan wrapper untuk animasi. Foto hanya fade-in; kartu expertise
bergerak sebagai satu kelompok bersama judul dan daftarnya. Posisi sticky foto Method,
grid, urutan section, dan dekorasi konektor MethodSteps harus tetap bekerja.
About memilih elemen layout melalui `js/features/about-reveal.js`. Foto dan caption
memudar bersama; kartu fakta, biografi, keahlian, dan pendekatan muncul sebagai
satu unit per kartu. Section tim serta pengantar/empat langkah Method mengikuti
controller yang sama. Jangan memilih isi kartu sebagai target animasi tambahan
karena target induk dan anak akan membuat gerakan serta opacity bertumpuk.

Hero mempertahankan autoplay 5000ms, transisi 700ms, arah masuk dari kanan/keluar ke kiri,
inert/aria-hidden pada slide nonaktif, serta reduced motion. Fokus di dalam hero, visibilitas tab,
dan posisi hero diperhatikan oleh controller. Tiga tombol titik di tengah bawah hero memilih slide
dan menandai slide aktif; navigasi slider tidak memakai panah atau ikon caret.
Slide ketiga hero memakai foto tim terbaru yang diberikan pengguna pada `assets/images/home/hero-3.jpg`.
Foto slide pertama tetap memakai aset yang sudah dipilih (1024×670).
Slide kedua memakai foto asli 1600×1066 pada `assets/images/home/hero-2.jpg`, menggantikan
crop 530×588 yang diperbesar. Posisi crop 75% menjaga kedua wajah tetap terlihat.

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

Dropdown navbar dimulai dengan tautan ringkas Start Here untuk assessment 90 menit,
lalu enam speciality dalam grid 1/2/3 kolom, pertanyaan singkat,
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

About mengikuti referensi `InBody-Clinic-About-Us-2-Therapists.jpg`: hero bertekstur
grid ringan, H1 “One shared philosophy. Personalised care. The InBody Method™.”,
dan panel pengalaman gabungan 42+ tahun dengan `team.summary`.
Urutan section: hero, profil Saila, profil Beatriz, The team behind InBody Clinic,
Our clinical approach — The InBody
Method™, lalu footer. Section Method memakai `MethodPreview`
yang sama dengan Home, termasuk copy, CTA, empat langkah, dan latar light sage.
`TeamDetails` memakai foto bersama di kiri dan panel teks putih di kanan mulai
901px, dengan kedua kartu sama lebar dan tinggi; bertumpuk pada layar kecil.
Border sage tipis dan radius 22px mengikuti kartu profil. Foto mengisi tinggi
kartu secara responsif. Copy tiga paragraf memakai `team.introduction`,
`team.philosophy`, dan `team.sharedCare`; foto memakai `team.detailImage`.
`ClinicianSection` menggunakan komponen kartu biografi, foto, fakta, dan keahlian
yang sama. Foto Saila di kiri, Beatriz di kanan mulai 901px; pada layar kecil
foto lebih dahulu lalu konten, dengan grid kartu satu kolom sebelum 641px.
Foto asli memakai rasio 9:10 dan caption navy. Empat kartu fakta merangkum
informasi masing-masing terapis. Panel utama putih, kartu keahlian cream, dan
Her Approach Beatriz navy. Corner radius 16–22px dan divider sage tipis.
Nama tiap anggota memakai H2 di bawah H1 bersama. Pengalaman Saila 20+ tahun dan
Beatriz 22+ tahun; profesi Beatriz membedakan pendidikan Chile dan peran Australia.
Copy tetap berasal dari `saila` dan `beatriz` di `js/data/team.js`. Saila memakai
intro, tiga speciality, pendekatan, dan empat area clinical focus sebelumnya.
Beatriz menampilkan tiga paragraf biografi, lima keahlian beserta deskripsi,
tiga paragraf pendekatan. Section kalimat penutup filosofi bersama sudah dihapus.
Jangan mengganti paragraf lengkap dengan summary atau menambahkan nama belakang,
identitas, atau kualifikasi yang belum diberikan. Navbar/footer tidak disalin
ke halaman About; gunakan shell dan tombol bersama yang sudah ada.
Team overview Home menggunakan informasi kolektif client dan foto bersama yang sudah tersedia.

Contact Us memakai data di `js/data/clinic-contact.js`, kartu kontak, Google Maps, dan form email.
Name hanya menerima huruf Unicode/spasi. Form membuka draf email; tidak mengirim melalui server.
CTA assessment menuju Fresha melalui data booking bersama; CTA appointment umum
tetap menuju Contact Us. Form email tidak berubah menjadi form booking.

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
dan menu navbar memudar masuk. Logo dan container navbar tetap statis.
Effect dipasang sekali pada layout App; perpindahan route tidak mengulang animasi.
Reduced motion dan interaksi pengguna menghentikan animasi serta memulihkan style.
Konten tetap terlihat jika CDN gagal atau terlambat. Jangan mengaktifkan animasi seluruh teks.
