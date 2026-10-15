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

Font dimuat dari Google Fonts melalui `index.html`, dengan weight 400, 500, 600, dan 700.
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
```

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
- Gunakan `containerClasses` dari `js/components/layout.js` agar navbar,
  bar kontak, dan konten section sejajar.
- Background dan foto section mencapai tepi layar. Batas 1440px hanya berlaku
  pada jalur konten teks, bukan wrapper yang membatasi seluruh foto.
- Hero, Difference, testimonial, dan CTA memakai `fullBleedGridClasses` dari
  `js/components/layout.js`: dua jalur tengah membatasi konten hingga 1440px,
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

Stylesheet resmi weight Light dimuat di `index.html` dari dependency lokal.
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
- Pakai ulang `Navbar`, `Heading`, `BookingButton`, dan `containerClasses`.

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
| Our Services | `js/sections/services.js` | Enam layanan; semua memakai `ph-light ph-leaf` sementara |
| The InBody Difference | `js/sections/difference.js` | `assets/images/home/difference.jpg`; graduation cap, users, shield check |
| Testimonial | `js/sections/testimonials.js` | `assets/images/home/testimonial.jpg`; kutipan dari referensi pengguna |
| CTA | `js/sections/booking.js` | `assets/images/home/cta.jpg`; memakai `BookingButton()` |

Our Services memakai tiga kolom mulai 1101px, dua kolom mulai 641px, dan satu kolom
di HP. Nama layanan memakai Montserrat sebagai label kartu. Panah layanan
sementara membuka draft email berisi pertanyaan tentang layanan yang dipilih.

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

Urutan ikon Phosphor Light: Facebook, TikTok, Envelope (email), WhatsApp,
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
`js/sections/hero.js` merender teks, CTA, benefit, dan foto untuk tiap komposisi:

| Slide | Komposisi desktop | Foto |
| --- | --- | --- |
| Women's Health. Lymphatic Health. Expert Care. | Teks kiri, foto kanan | `hero.jpg` |
| Move Better. Feel Lighter. Live Better. | Foto kiri, teks kanan | `hero-2.jpg` |
| Care Designed Around You. | Teks atas kiri, benefit vertikal di kanan, foto di bawah | `hero-3.jpg` |

Ketiganya menggunakan `BookingButton()` dan ikon Leaf, Heart, serta Users Three
yang sama. Ukuran headline memakai `Heading({ size: 'hero' })`; opsi `inline`
menyambungkan bagian headline slide ketiga dengan accent Sage tegak.

Wrapper memiliki `data-hero-slider`; tiap slide memiliki `data-hero-slide`.
Controller `initHeroSlider` di `js/components/hero-slider.js` dipanggil setelah
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

Verifikasi dilakukan pada lebar efektif yang mewakili viewport setelah zoom,
termasuk 3840, 2560, 1920, 1536, 1440, 1200, 1101, 674, dan 320px. Ini merupakan
pengujian reflow viewport, bukan bukti pengujian kontrol zoom browser langsung.
