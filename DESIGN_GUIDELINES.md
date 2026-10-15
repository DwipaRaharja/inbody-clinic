# InBody Clinic — Design Guidelines

Panduan visual untuk menjaga konsistensi halaman dan komponen InBody Clinic.
Gunakan konfigurasi Tailwind di `css/input.css` sebagai sumber token desain.

## 1. Arah visual

Kesan utama: elegant, editorial, premium, hangat, feminin, dan bersih.
Gunakan ruang kosong yang lega, foto klinik yang relevan, dan hierarki teks yang jelas.
Cream dan White menjadi warna dominan, Sage sebagai accent, dan Navy untuk teks.

## 2. Font

| Kebutuhan | Font | Utility Tailwind |
| --- | --- | --- |
| H1, H2, H3, dan headline utama | Cormorant Garamond | `font-display` |
| Paragraph, navigation, button, form, dan informasi lainnya | Montserrat | `font-sans` |

Font dimuat dari Google Fonts melalui setiap entry HTML, dengan weight 400, 500, 600, dan 700.
Fallback heading adalah `serif`; fallback body adalah `sans-serif`.

## 3. Color palette

| Warna | Hex | Token Tailwind | Penggunaan | Peran visual |
| --- | --- | --- | --- | --- |
| Navy | `#203858` | `clinic-navy` | Heading, teks utama, ikon, footer | Authority, sophistication, readability |
| Sage | `#879F9B` | `clinic-sage` | CTA, accent, bar kontak | Calm, wellness, premium |
| Light Sage | `#D0DCD8` | `clinic-light-sage` | Background section dan accent lembut | Gentle transition, visual relief |
| Cream | `#F8F6F2` | `clinic-cream` | Background utama halaman | Warm, feminine, editorial |
| White | `#FFFFFF` | `clinic-white` | Area konten, navbar, background putih | Clean, clinical, spacious |
| Light Grey | `#E8E9E7` | `clinic-light-grey` | Border dan divider | Struktur tanpa terlihat berat |

Contoh utility:

```html
<body class="bg-clinic-cream font-sans text-clinic-navy">
<section class="bg-clinic-white">...</section>
<section class="bg-clinic-light-sage">...</section>
<div class="border border-clinic-light-grey">...</div>
<footer class="bg-clinic-navy text-clinic-white">...</footer>
```

Light Sage dan Light Grey sudah tersedia sebagai token untuk section berikutnya.
Hindari menambahkan warna hex baru pada komponen jika sudah ada token yang sesuai.
Warna di dalam foto dan logo mengikuti aset aslinya.

## 4. Typography

| Elemen | Ukuran pada komponen | Weight | Gaya |
| --- | --- | --- | --- |
| H1 / hero headline | Responsive, sekitar 40–72px | 700 | Besar, editorial, Navy |
| H2 / section headline | Responsive, 32–48px | 600 | Cormorant Garamond, Navy |
| H3 / subheading | Responsive, 24–32px | 600 | Cormorant Garamond, Navy |
| Body paragraph | 13–16px | 400 | Montserrat, bersih dan ringkas |
| Navigation | 12–14px pada desktop | 500 | Montserrat |
| Eyebrow / section label | 9–13px | 500 | Uppercase, letter spacing 0.17–0.2em |

Gunakan label seperti `OUR SERVICES` dan `THE INBODY DIFFERENCE` di atas headline.
Accent pada sebagian headline boleh menggunakan Sage dan italic.
Gunakan satu H1 untuk judul utama halaman, H2 untuk section, dan H3 untuk subbagian.

Komponen `Heading` mengatur ukuran berdasarkan `level`:

```js
Heading({
  eyebrow: 'Our Services',
  level: 2,
  lines: [
    { text: 'Comprehensive care for every stage of' },
    { text: 'your journey.', accent: true },
  ],
});
```

## 5. Button / CTA

CTA utama: **BOOK AN APPOINTMENT →**

- Background: Sage `#879F9B`.
- Teks: White `#FFFFFF`, font Montserrat, weight 500, uppercase.
- Bentuk: pill dengan `rounded-full`.
- Letter spacing: 0.045em.
- Tombol hero: tinggi sekitar 46px, ukuran teks 12px di HP dan 14px mulai tablet.
- Tombol navbar desktop: lebih ringkas, tinggi sekitar 38px dan teks 10–12px.
- Hover: sedikit lebih gelap melalui `brightness-95`, dengan gerakan naik 1px.
- Fokus keyboard: outline Navy; gerakan mengikuti preferensi reduced motion.

Gunakan komponen bersama, bukan menyalin style button:

```js
BookingButton();         // CTA hero
BookingButton('navbar'); // CTA navbar
ActionButton({ label: 'View services', href: './#services', variant: 'services' });
ActionButton({ label: 'Learn more', href: '#service-options' });
ActionButton({ label: 'Contact the Clinic', href: './contact.html', variant: 'contact' });
```

Learn More memakai varian default `hero`: pill Sage dengan teks uppercase dan
panah menuju `#service-options`. Varian `contact` memakai pill Navy dengan teks sesuai kapitalisasi
label, untuk CTA kontak di atas footer. Keduanya tetap memakai `ActionButton`
agar hover, fokus keyboard, dan reduced motion mengikuti komponen bersama.

Tujuan CTA saat ini masih email klinik. Ubah `bookingHref` di
`js/components/button.js` ketika URL booking tersedia.

## 6. Layout dan spacing

- Lebar maksimal konten adalah **1440px**, terpusat dengan `mx-auto`.
  Gunakan `pageWidthClasses` untuk wrapper tanpa padding, atau
  `containerClasses` untuk wrapper yang memiliki padding konten.
- Padding konten kiri dan kanan di dalam container: **80px**, menggunakan `tablet:px-20`.
- Pada HP: **32px**, menggunakan `px-8`.
- Gunakan `pagePaddingClasses` untuk padding bersama pada kolom teks section;
  jarak internal antara teks dan foto tetap mengikuti komposisi masing-masing.
- Gunakan `containerClasses` dari `js/layouts/container.js` agar navbar,
  bar kontak, dan konten section sejajar.
- Background dan foto section mencapai tepi layar. Batas 1440px hanya berlaku
  pada jalur konten teks, bukan wrapper yang membatasi seluruh foto.
- Hero, Difference, testimonial, dan CTA memakai `fullBleedGridClasses` dari
  `js/layouts/container.js`: dua jalur tengah membatasi konten hingga 1440px,
  sedangkan dua jalur luar membagi ruang tambahan secara simetris.
  Foto membentang ke jalur luar agar tidak muncul celah di tepi halaman.
- Heading memakai ukuran `rem` per breakpoint, bukan ukuran font berbasis `vw`.
  Zoom tetap dapat memperbesar teks dan membuat baris atau kolom menyesuaikan.
- Desktop: teks hero di kiri, foto di kanan, dengan transisi gradasi putih.
- HP: teks di atas, foto di bawah, dan navigasi berubah menjadi menu mobile.
- Bar kontak memakai `ContactBar()` di luar header sticky sehingga ikut bergulir
  bersama halaman. Hanya navbar yang memakai `sticky top-0` dan tetap di atas layar.
  Keduanya berada dalam alur layout sehingga `main` tidak membutuhkan padding atas
  pengganti header. Scroll padding pada `html` mengikuti tinggi navbar agar target
  anchor tidak tertutup: 72px di HP, 76px mulai tablet, 72px mulai `nav:`, dan 76px
  mulai `wide:`. Menu mobile dapat di-scroll jika tinggi layar terbatas.
- Link menu navbar memakai teks Sage saat hover atau fokus keyboard. Garis bawah setebal 2px
  memakai `currentColor`, muncul dari kiri ke kanan dengan `scale-x-0` menuju
  `scale-x-100`, `origin-left`, dan durasi 300ms. Preferensi reduced motion
  menonaktifkan transisinya.

Breakpoint project:

| Variant | Mulai pada lebar | Kebutuhan |
| --- | --- | --- |
| `tablet:` | 641px | Padding 80px dan grid layanan dua kolom |
| `nav:` | 901px | Navigasi desktop |
| `wide:` | 1101px | Hero, Difference, dan testimonial dua kolom; layanan tiga kolom |

## 7. Ikon hero

Gunakan Phosphor Icons dari dependency `@phosphor-icons/web`, weight **Light**:

| Benefit | Ikon | Class |
| --- | --- | --- |
| Evidence-Based Care | Leaf | `ph-light ph-leaf` |
| Personalised Treatment | Heart | `ph-light ph-heart` |
| A Holistic Approach | Users Three | `ph-light ph-users-three` |

Stylesheet resmi weight Light dimuat di setiap entry HTML dari dependency lokal.
Jalankan `npm install` untuk menyediakan dependency ketika menyiapkan project.
Ukuran ikon: 32px di HP dan 38px mulai tablet, dengan warna Navy.
Ikon bersifat dekoratif dan memakai `aria-hidden="true"` karena label sudah tersedia.

## 8. Implementasi Tailwind

- Tulis styling dengan utility Tailwind di HTML atau template komponen JS.
- `css/input.css` hanya berisi import, sumber class, dan konfigurasi `@theme`.
- `css/output.css` adalah hasil build; jangan diedit manual.
- Muat `output.css` sekali melalui `<link>` di setiap halaman HTML utama.
  Komponen JS di halaman tersebut otomatis memakai stylesheet yang sama.
- Gunakan nama class lengkap dalam kode agar terbaca oleh compiler Tailwind.
- Pakai ulang `Navbar`, `Heading`, `BookingButton`, `ActionButton`, dan `containerClasses`.

Build CSS setelah mengubah utility atau token:

```sh
npm run build:css
```

Untuk memperbarui CSS otomatis selama pengembangan:

```sh
npm run dev:css
```

## 9. Section halaman utama

Urutan halaman: Hero, Our Services, The InBody Difference, Testimonial, CTA,
lalu Footer.

| Section | Modul | Aset / ikon |
| --- | --- | --- |
| Hero | `js/sections/home/hero.js` | Tiga foto dan komposisi dari `js/data/hero-slides.js` |
| Our Services | `js/sections/home/services.js` | Phosphor Light leaf dan flower-lotus; SVG tubuh, kehamilan, wajah, dan pelvic health |
| The InBody Difference | `js/sections/home/difference.js` | `assets/images/home/difference.jpg`; graduation cap, users, shield check |
| Testimonial | `js/sections/home/testimonials.js` | `assets/images/home/testimonial.jpg`; kutipan dari referensi pengguna |
| CTA | `js/sections/home/booking.js` | `assets/images/home/cta.jpg`; memakai `BookingButton()` |

Our Services memakai tiga kolom mulai 1101px, dua kolom mulai 641px, dan satu kolom
di HP. Nama layanan memakai Montserrat sebagai label kartu. Panah layanan
menuju halaman layanan melalui URL dari `serviceNavigationGroups`.
Ikon memakai Navy di atas lingkaran Light Sage. Leaf dan lotus memakai Phosphor
Light; ikon tubuh Lipedema, kehamilan, wajah, dan pelvic health memakai SVG
`currentColor` dari `js/components/icons.js`, mengikuti referensi pengguna.
SVG di kartu berukuran 42px dengan ketebalan garis 0.85 pada viewBox 24px;
override ini hanya berlaku pada ikon kartu, termasuk SVG pregnancy yang dipakai
kembali dari halaman About. Ikon dekoratif memakai `aria-hidden="true"`.

Difference memakai layout foto dan teks dua kolom di desktop, lalu bertumpuk
di bawah 1101px. Quote pada foto memakai Cormorant Garamond italic.

Testimonial menampilkan satu kutipan yang disediakan pengguna. Tiga titik di
bawahnya merupakan elemen visual sesuai referensi, bukan kontrol carousel.

Komponen `Heading` mendukung `size: 'section'`, `'compact'`, dan `'cta'` untuk H2.
Gunakan `accentItalic: false` untuk accent Sage tegak seperti heading layanan.

## 10. Footer

Gunakan komponen `Footer` dari `js/components/footer.js`.
Background Navy, teks dan ikon White, dengan logo asli klinik.
Desktop lebar memakai tiga kolom: logo dan copyright, navigasi dan ikon,
lalu lokasi serta tagline dengan divider vertikal. Layout bertumpuk pada HP.
Margin mengikuti `containerClasses` yang sama dengan navbar dan section.

Urutan ikon Phosphor Fill: Facebook, TikTok, Envelope (email), WhatsApp,
dan Instagram. Email memakai kontak klinik dan WhatsApp memakai nomor telepon
klinik yang ada. Sesuai arahan pengguna, Facebook, TikTok, dan Instagram
sementara mengarah ke situs utama aplikasi masing-masing. Ganti URL pada
`footerSocialLinks` ketika tautan profil klinik tersedia.

## 11. Zoom, reflow, dan slider hero

Hero, layanan, Difference, testimonial, dan CTA memiliki `data-section-frame` untuk
memeriksa layout. Frame layanan dibatasi 1440px. Frame section bergambar tetap
selebar halaman, dengan dua jalur konten tengah maksimal 1440px. Gunakan
`data-section-copy` dan `data-section-media` untuk memeriksa posisi teks serta
tepi foto. Gunakan `min-w-0` pada grid dan sel agar isi tidak memaksa kolom melebar.

Hero, Difference, testimonial, dan CTA memakai satu kolom sampai ruang cukup untuk
dua kolom (1101px). Foto berada di sel grid yang membentang sampai tepi halaman;
absolute positioning hanya digunakan untuk mengisi sel foto. Hindari `100vw`
karena lebar scrollbar dapat menimbulkan overflow horizontal.
CTA memakai foto di kiri dan teks di kanan pada
desktop, lalu teks di atas dan foto di bawah pada lebar di bawah 1101px.
Teks CTA memiliki lebar maksimal 390px dan memakai `BookingButton()` yang sama.

Data tiga slide hero berada di `js/data/hero-slides.js`. Fungsi `HeroSlide` pada
`js/sections/home/hero.js` merender teks, CTA, benefit, dan foto untuk tiap komposisi:

| Slide | Komposisi desktop | Foto |
| --- | --- | --- |
| Women's Health. Lymphatic Health. Expert Care. | Teks kiri, foto kanan | `hero.jpg` |
| Move Better. Feel Lighter. Live Better. | Foto kiri, teks kanan | `hero-2.jpg` |
| Care Designed Around You. | Teks atas kiri, benefit vertikal di kanan, foto di bawah | `hero-3.jpg` |

Ketiganya menggunakan `BookingButton()` dan ikon Leaf, Heart, serta Users Three
yang sama. Ukuran headline memakai `Heading({ size: 'hero' })`; opsi `inline`
menyambungkan bagian headline slide ketiga dengan accent Sage tegak.

Wrapper memiliki `data-hero-slider`; tiap slide memiliki `data-hero-slide`.
Controller `initHeroSlider` di `js/features/hero-slider.js` dipanggil setelah
render. Slide ditumpuk pada satu sel grid agar tinggi hero tetap stabil ketika
berganti. Foto tetap mencapai tepi layar dan teks mengikuti jalur konten tengah.

Pergantian otomatis berjalan setiap **5000ms (5 detik)** setelah transisi selesai. Animasi
**700ms** membawa slide baru dari kanan ke tengah dan slide lama keluar ke kiri,
termasuk ketika kembali dari slide ketiga ke slide pertama. Hero tidak menampilkan
kontrol navigasi titik maupun tombol pause/play; pergantian berjalan otomatis.

Autoplay tetap berjalan ketika pointer berada di hero. Autoplay berhenti sementara
ketika fokus keyboard berada di hero, hero di luar layar, atau tab browser tidak
terlihat. Preferensi `prefers-reduced-motion`
menonaktifkan autoplay awal dan animasi pergeseran. Slide nonaktif memakai
`inert` dan `aria-hidden` agar link serta isinya tidak menerima fokus.

Verifikasi layout sebelumnya dilakukan pada lebar efektif yang mewakili viewport setelah zoom,
termasuk 3840, 2560, 1920, 1536, 1440, 1200, 1101, 674, dan 320px. Ini merupakan
pengujian reflow viewport, bukan bukti pengujian kontrol zoom browser langsung
atau verifikasi visual baru setelah perubahan struktur folder.

## 12. Halaman About

Halaman `about.html` memakai `data-page="about"`; `js/app.js` memuat descriptor
`js/pages/about.js` dan section dari `js/sections/about/index.js`. Kontennya mengikuti referensi
About: profil Saila Insua López, empat ringkasan latar belakang, lalu bagian
Experience & expertise dengan empat kartu keahlian. Foto profil memakai
`assets/images/about/saila.jpg`.

Gunakan kembali `ContactBar()`, `Navbar({ currentPage: 'about' })`, `Heading()`,
dan `Footer({ currentPage: 'about' })`. `Heading({ size: 'profile' })` mengatur H1
profil. Tombol View Services memakai `ActionButton` varian `services` dengan
sudut rounded-lg, sedangkan CTA booking tetap memakai `BookingButton()` berbentuk pill.

Ikon memakai Phosphor Light: flower tulip, waves, drop, envelope,
caret right, stethoscope, dan plant. Kartu Women's life stages memakai SVG ibu hamil
yang digambar mengikuti referensi pengguna melalui `icon('pregnancy')` di
`js/components/icons.js`. SVG memakai `currentColor` dengan `text-clinic-sage`,
ukuran 32px, serta `aria-hidden` karena judul kartu sudah menjadi label.
Kontak Saila membuka email
klinik; tautan layanan kembali ke `./#services`.

Navbar dan footer memakai data navigasi yang sama di `js/data/navigation.js`.
Tautan Home dan logo klinik menuju `./` tanpa hash atau ID section.
Tautan About menuju `./about.html`; tautan Our Clinic pada navbar dan footer
menuju `./our-clinic.html`. Our Services di navbar membuka dropdown;
tautan Our Service di footer kembali ke section layanan Home. Halaman aktif memakai `aria-current`.

Padding mengikuti `containerClasses`: 32px di HP dan 80px mulai tablet, dengan
lebar maksimum 1440px. Profil dan bagian keahlian memakai dua kolom mulai 1101px;
di layar kecil keduanya bertumpuk. Statistik memakai dua kolom di layar kecil dan
empat kolom mulai 1101px. Kartu keahlian memakai satu kolom di HP dan dua kolom
mulai tablet. Warna section: Cream untuk profil, Sage untuk statistik, White untuk
keahlian, serta footer Navy yang sama dengan Home.

## 13. Halaman Contact Us

Halaman `contact.html` memakai `data-page="contact"`; `js/app.js` memuat descriptor
`js/pages/contact.js` dan section dari `js/sections/contact/index.js`. Layout memakai kembali
`ContactBar`, `Navbar({ currentPage: 'contact' })`, `Heading`, `ActionButton`,
serta `Footer({ currentPage: 'contact' })`. Menu Contact Us di semua halaman
menuju `./contact.html`; Home tetap menuju `./` tanpa hash.

Bagian pembuka memakai Light Sage dan teks terpusat. Bagian utama memakai White:
detail kontak dan peta di kiri, form di kanan mulai 1101px. Di layar kecil kedua
kolom bertumpuk. Kartu kontak memakai Cream dan ikon Phosphor Light phone,
envelope, map-pin, serta clock. Padding tetap 32px di HP dan 80px mulai tablet.

Data kontak dan URL peta berada di `js/data/clinic-contact.js`. Alamat tujuan:
Level 1, 336 New South Head Road, Double Bay NSW 2028. Peta Google Maps ditanam
melalui iframe responsif dengan tautan Open in Google Maps sebagai akses langsung.
Tautan peta memakai Maps URLs dengan `api=1` dan query nama klinik beserta alamat.
Alamat dan jam klinik cocok dengan [halaman kontak resmi](https://inbodyclinic.com/contact/);
format tautan mengikuti [dokumentasi Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started).

Form berisi Name, Email, Subject, dan Message, semuanya wajib diisi. Name hanya
menerima huruf Unicode dan spasi, termasuk huruf beraksen seperti López; angka
dan simbol dibersihkan saat mengetik maupun paste. Email memakai validasi bawaan
browser. `buildContactMailto` dan `initContactForm` berada di
`js/features/contact-form.js`; tombol Send Message membuka draf email pengguna
ke email klinik, dengan subject dan body yang di-encode. Form mempertahankan isi
pesan dan tidak menampilkan klaim pesan sudah terkirim. Teks bantuan pada halaman
menjelaskan bahwa aplikasi email akan terbuka. Pengiriman langsung melalui server
dapat dihubungkan ketika endpoint form tersedia.

`ActionButton` merender link ketika `href` diberikan, atau elemen button ketika
tanpa `href`, termasuk `type: 'submit'` untuk form Contact Us. `BookingButton`
tetap memakai link email booking yang sama seperti sebelumnya.

## 14. Dropdown Our Services

Navbar memakai tombol disclosure Our Services dengan empat kategori di
`serviceNavigationGroups` pada `js/data/navigation.js`. Panel mengikuti referensi
pengguna: background White, teks Navy, sudut 20px, border tipis, heading
Cormorant Garamond, serta divider Light Grey di antara layanan.
Judul Pregnancy & Postpartum tetap satu baris, dengan kolom pertama lebih lebar.
Panel memakai empat kolom mulai 1101px, dua kolom mulai 641px, dan satu kolom di HP.
Pada desktop panel dibatasi 1120px dan terpusat di bawah navbar; pada HP/tablet
panel berada di dalam navigasi hamburger yang bisa digulir.

Panel terbuka melalui reveal dari atas ke bawah selama 360ms. Saat ditutup,
panel hanya memudar selama 140ms, lalu ruangnya dirapatkan. Reduced motion
menonaktifkan transisi. Hover mouse membuka panel pada desktop, klik/ketuk
mengaktifkan tombol pada semua perangkat. Escape menutup dropdown dan
mengembalikan fokus ke tombol; klik di luar serta perpindahan fokus keluar
dropdown juga menutupnya. Panel tertutup memakai `inert` dan `aria-hidden`.

Item layanan disimpan sebagai object pada `serviceNavigationGroups`, dengan
`label`, `id`, dan `href` menuju entry HTML layanan masing-masing. Seluruh
**13 item** sudah memiliki halaman: Pregnancy & Postpartum **3**, Lymphatic
Drainage **3**, Pain & TMJ Relief **4**, dan Body Contouring **3**. Contohnya,
Pregnancy Massage & Circulation Support menuju
`./pregnancy-massage-circulation-support.html`. Daftar lengkap menu dan slug
tersedia di `README.md`.
`serviceId` dari descriptor halaman diteruskan melalui `PageLayout` ke navbar
untuk memberi `aria-current="page"` pada tautan layanan yang sedang dibuka.

## 15. Layout bersama dan struktur halaman

Entry Home, About, Our Clinic, Contact Us, dan setiap layanan tetap memiliki URL,
title, meta description, pemanggilan font, Phosphor Icons, dan `css/output.css`
masing-masing. Entry menyediakan `#app`, atribut `data-page` pada body,
serta satu entry module `js/app.js`. Tidak ada framework atau proses build HTML.

`js/app.js` memilih dan memuat descriptor dari `js/pages/` sesuai `data-page`.
Module halaman dapat mengekspor object descriptor atau factory yang menerima
`{ serviceId }`. Descriptor menentukan section dan inisialisasi interaksi khusus
halaman. Entry layanan memakai `data-page="service"` dan `data-service` untuk
memilih data melalui factory `js/pages/service.js`.
`js/layouts/page-layout.js` menyediakan `PageLayout` dan `mountPage` untuk shell
bersama: skip link menuju `#main-content`, bar kontak, navbar sticky, main
selebar halaman, serta footer. `mountPage` memasang class global Tailwind,
menjalankan `initNavbar`, lalu inisialisasi fitur halaman setelah konten terpasang.

Container berada di `js/layouts/container.js`. Batas lebar konten diterapkan di
dalam section agar background dan foto tetap dapat mencapai tepi layar.
Section Home dikelompokkan di `js/sections/home/`, About di
`js/sections/about/`, Our Clinic di `js/sections/clinic/`, dan Contact Us di
`js/sections/contact/`. Komponen visual bersama berada di `js/components/`;
controller slider, galeri, dan form berada di `js/features/`; data navigasi,
kontak, slide, serta galeri berada di `js/data/`.

Saat menambah halaman, buat entry HTML beserta descriptor di `js/pages/`,
kelompokkan section halaman di `js/sections/`, lalu daftarkan pemuat descriptor
di `js/app.js`. Perbarui `js/data/navigation.js` dan sumber Tailwind bila perlu.
Gunakan shell dan container yang sama; jangan menyalin navbar atau footer ke
section. Langkah pengembangan lengkap ada di `README.md`.

## 16. Template halaman layanan

Halaman `pregnancy-massage-circulation-support.html` memakai
`data-page="service"` dan
`data-service="pregnancy-massage-circulation-support"`. `js/pages/service.js`
mencari data pada registry `js/data/services/index.js`, lalu memanggil
`createServicePage(service)` dari `js/layouts/service-page.js`. Descriptor yang
dihasilkan tetap dipasang melalui `PageLayout` dan `mountPage` yang sama dengan
halaman lain.

Renderer umum berada di `js/sections/service/index.js`. Urutan template:

| Section | Komposisi |
| --- | --- |
| Hero | Eyebrow, H1 dua warna, sub-eyebrow bila ada, deskripsi, tombol Learn More dan tiga benefit di kiri; foto di kanan |
| Pilihan perawatan | Foto di kiri; eyebrow, H2, paragraf dan daftar bernomor di kanan |
| Tahap pemulihan | Background Light Grey; heading terpusat dan tiga kartu White bernomor |
| Pendekatan dan hasil | Heading terpusat, paragraf opsional, lalu dua panel dengan daftar bernomor atau blok ikon |
| Kutipan | Teks singkat terpusat dengan ruang vertikal lega |
| CTA kontak | Background Light Sage; judul dan deskripsi di kiri, tombol Navy di kanan |

Pada layar kecil, pasangan kolom bertumpuk dan kartu menyesuaikan lebar.
Konten mengikuti `containerClasses`; background section tetap selebar layar.
Heading memakai Cormorant Garamond dengan accent Sage dan italic. Body, label,
nomor, serta tombol memakai Montserrat. Gunakan ikon Phosphor Light untuk benefit.
Foto berada di dalam container dengan sudut membulat, mengikuti referensi
halaman layanan; foto tidak memakai grid full-bleed hero Home.

Seluruh 13 layanan memakai record di `js/data/services/<service-id>.js` dan
entry root `<service-id>.html`. Hero, pilihan perawatan, tiga kartu, panel,
kutipan, dan CTA mengambil isi serta foto dari record yang sama. Perbedaan
layanan ditempatkan pada data, bukan dengan menyalin markup section.

Sepuluh layanan Pregnancy, Lymphatic, dan Pain mengambil teks dari PNG
masing-masing dalam `Our Service Layout/`. Tiga Body Contouring mengutamakan
teks `data_service_inbody_clinic.md` dan memakai PNG di folder
`Our Service Layout/Body Countoring/` untuk komposisi visual. Ejaan folder
referensi asli dipertahankan. Perbedaan Markdown dan PNG serta teks yang
berulang atau tercampur dicatat pada `docs/SERVICE_COPY_REVIEW.md`; teks
tersebut belum direvisi atau dianggap telah disetujui pemilik konten.

Foto Pregnancy Massage kini memakai pasangan foto dalam folder
`assets/images/services/Pregnancy & Postpartum/Pregnancy Massage & Circulation Support/`
yang sesuai PNG layanannya. Recovery memakai dua foto dari folder Recovery.
Hero Postnatal memakai `WhatsApp Image 2026-10-02 at 10.33.06 (1).jpeg` di folder
Lipedema & Inflammatory Leg Care karena cocok dengan PNG Postnatal; foto
treatment memakai `WhatsApp Image 2026-10-02 at 10.33.09.jpeg` di folder
Postnatal. Pemetaan lintas folder ini disengaja dan tidak memindahkan aset asli.

Variasi yang tetap ditangani renderer bersama:

- `lines[].segments` mengatur accent Sage pada sebagian baris headline tanpa
  memasukkan HTML ke data. Accent dan pemenggalan baris mengikuti PNG.
- `hero.eyebrow` berada di atas H1 dan `hero.subEyebrow` berada di bawahnya;
  setiap layanan menentukan urutan label sesuai desainnya.
- `expertise.description` menampilkan paragraf opsional di antara heading dan
  dua panel, misalnya keterangan program **6–8 sesi** pada Hormonal.
- Panel default memakai daftar string bernomor. Panel kanan Clinical Cellulite
  memakai `variant: 'icon-blocks'` dengan item `{ icon, title, description }`;
  ikon Phosphor Light target, heartbeat, dan check-circle mengikuti jenis
  simbol pada desain. Label sumber “Headline”, “Deskripsi”, dan “Hasil” tetap
  ditampilkan sambil menunggu review isi.
- Nomor daftar dihasilkan renderer secara berurutan. Panel kanan Endometriosis
  menampilkan **01, 02, 03**, sementara PNG bertuliskan **01, 02, 02**. Isi item
  mengikuti sumber; perbedaan nomor tercatat sebagai T02 pada dokumen review.

Tombol Learn More menuju `#service-options`; CTA Contact the Clinic menuju
`./contact.html#contact-form`. Semua halaman memakai komponen tombol, shell,
container, serta status menu aktif yang sama.

Untuk layanan berikutnya, tambahkan satu data lengkap ke registry, entry HTML
dengan metadata serta `data-service` yang sesuai, tautan dropdown, dan sumber
Tailwind. Pakai renderer yang sama agar perubahan layout berlaku konsisten.
Jangan menyalin section atau shell untuk setiap layanan. Jalankan pemeriksaan
struktur halaman dan build CSS, lalu periksa hasil visual di browser; pemeriksaan
struktur saja tidak membuktikan kesesuaian visual. Dokumentasi implementasi ini
tidak menyatakan bahwa pemeriksaan visual browser baru telah dilakukan.

## 17. Halaman Our Clinic

Halaman `our-clinic.html` memakai `data-page="clinic"`; descriptor
`js/pages/clinic.js` menyusun tiga section dari `js/sections/clinic/index.js`
melalui shell bersama. Menu Our Clinic pada navbar dan footer menuju
`./our-clinic.html`, dengan `aria-current="page"` ketika halaman ini aktif.

Pengantar terpusat memakai background Light Sage lembut, eyebrow
`INBODY CLINIC · DOUBLE BAY`, serta H1 `A space to / feel at ease` dari komponen
`Heading` ukuran `profile`. Accent baris kedua memakai Sage italic. Deskripsi
berfokus pada ruang dan kunjungan klinik; tidak memakai copy Pregnancy dari
referensi galeri.

Bagian Inside InBody Clinic memakai background White dengan heading dan filter
yang dapat membungkus ke beberapa baris. Filter aktif berbentuk pill Sage
dengan teks White; filter lain memakai Cream dengan teks Navy. Kelompok filter
memakai `role="group"`, tombol memiliki `aria-pressed`, dan jumlah foto memiliki
status `aria-live="polite"`.

Grid foto seragam memakai satu kolom pada HP, dua mulai 641px, dan tiga mulai
1101px. Jarak antarkolom 24px dan antarbaris 40px, dengan gambar rasio 4:3,
`object-cover`, dan sudut 12px. Susunan ini menjaga keseimbangan ruang tanpa
kolom masonry atau area kosong besar dari referensi. Caption memakai eyebrow
uppercase kecil, judul Cormorant Garamond 26–28px, serta deskripsi Montserrat
13px. Semua konten mengikuti `containerClasses` 1440px dengan padding 32/80px.

Pemetaan foto dan filter berada di `js/data/clinic-gallery.js`. Foto berasal
dari 12 JPEG pada folder root `gallery/` milik pengguna. MP4 pada folder sumber
tidak ditampilkan. Record menyimpan caption, alt text, dimensi asli, dan array
kategori; satu foto dapat masuk kategori `treatment-rooms`, `equipment`, dan/atau
`details`. Pertahankan kategori sesuai isi foto saat menambah atau mengganti
aset.

Tombol foto memiliki nama aksesibel dan ikon Phosphor Light `arrows-out`.
Hover memperbesar foto secara halus; reduced motion menonaktifkan gerakan.
Pembesaran memakai elemen `dialog` native, bukan halaman baru. Foto ditampilkan
dengan `object-contain`, judul dan deskripsi tersedia di bawahnya, serta tombol
close memakai ikon `x`. `js/features/clinic-gallery.js` menangani filter,
pembukaan dialog, penutupan dengan tombol atau Escape, dan pengembalian fokus
ke tombol foto yang membuka dialog.

Bagian Plan Your Visit memakai Cream dengan dua kolom mulai 1101px: teks
pengantar di kiri dan kartu White berisi alamat serta jam klinik di kanan.
Bagian ini tidak mengulang foto galeri. Ikon Phosphor Light `map-pin` dan
`clock` mendampingi detail dari `js/data/clinic-contact.js`. Tombol Find the
Clinic memakai `ActionButton` dengan URL Google Maps yang sama dengan halaman
Contact Us, dan tautan Contact Us menuju `./contact.html`. Di layar kecil
kedua kolom bertumpuk.
