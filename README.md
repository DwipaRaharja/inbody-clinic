# InBody Clinic

Website multi-halaman dengan HTML, ES modules, Tailwind CSS v4, dan komponen layout bersama.
Revisi 17 Oktober 2026 memperkenalkan enam speciality berdasarkan kebutuhan pasien serta The InBody Method™.

## Menjalankan project

```sh
npm install
npm run build:css
```

Layani folder project melalui static server, misalnya Live Server di VS Code, lalu buka `index.html`.
ES modules memerlukan HTTP; jangan membuka HTML dengan `file://`.

```sh
npm run dev:css
npm test
npm run build:css
```

`dev:css` hanya menjalankan watcher Tailwind. Project tidak memerlukan framework atau build HTML.
Phosphor Icons Regular 2.1.2 dimuat dari CDN jsDelivr pada setiap entry HTML.
Paket ikon lokal tetap tersedia untuk memeriksa nama glyph secara offline dalam tes.

## Struktur folder

```text
index.html
pages/
├── about.html
├── contact.html
├── our-clinic.html
├── the-inbody-method.html
├── specialities/                    # 6 halaman kelompok kebutuhan pasien
└── services/                       # 13 halaman detail treatment lama
    ├── pregnancy-postpartum/
    ├── lymphatic-drainage/
    ├── pain-tmj-relief/
    └── body-contouring/
js/
├── app.js
├── pages/                          # Descriptor / factory halaman
├── layouts/                        # PageLayout, template lama, container
├── components/
│   ├── care.js                     # Method, team intro, visit steps, assessment CTA
│   ├── heading.js
│   ├── button.js
│   ├── navbar.js
│   ├── footer.js
│   └── icons.js
├── sections/
│   ├── home/
│   ├── speciality/
│   ├── method/
│   ├── service/                    # Renderer 13 detail treatment
│   ├── about/
│   ├── contact/
│   └── clinic/
├── data/
│   ├── specialities/catalog.js     # Enam nama, pertanyaan, ringkasan, route, relasi
│   ├── specialities/index.js       # Konten lengkap dan foto tiap speciality
│   ├── method.js                   # Lima unsur, empat tahap, pengalaman kunjungan
│   ├── team.js                     # Pengantar pengalaman dan filosofi bersama
│   ├── services/                   # 13 record treatment yang dipertahankan
│   ├── hero-slides.js
│   ├── navigation.js
│   ├── clinic-contact.js
│   └── clinic-gallery.js
├── features/                       # Slider, form email, dan galeri
└── utils/html.js
assets/                             # Foto dan logo asli
gallery/                           # 12 JPEG klinik; MP4 belum dipakai
css/
├── input.css
└── output.css
scripts/check-pages.mjs
```

## Home dan halaman baru

Home mengikuti tujuh section dari brief:

1. Hero: headline klinis dengan tiga foto yang sudah ada dan autoplay 5 detik.
2. How Can We Help?: enam speciality dengan pertanyaan yang dikenali pasien.
3. The InBody Method™: ringkasan pendekatan, empat tahap, dan tautan detail.
4. Meet Our Team: pengantar pengalaman dan filosofi bersama dari brief.
5. What to Expect: gambaran asesmen, rencana, perawatan, dan reassessment.
6. Not sure what to book? Start here.: informasi initial assessment dan CTA Contact Us.
7. Kontak, alamat, jam klinik, serta Google Maps.

InBody Difference, testimonial, dan CTA harbour lama tidak lagi dipasang pada Home.
Module dan aset lamanya tetap dipertahankan; kutipan pasien tidak ditulis ulang.
Foto hero tidak diganti karena pengguna masih ingin mendiskusikan pilihannya.

| Speciality | Entry HTML | Detail treatment terkait |
| --- | --- | --- |
| Pre & Post-Surgical Recovery | `pages/specialities/pre-post-surgical-recovery.html` | Post-Surgical Recovery |
| Clinical Lymphatic Care | `pages/specialities/clinical-lymphatic-care.html` | Clinical Lymphatic Drainage Sydney; Lymphatic Reset & Fluid Retention Treatment |
| Lipedema, Lymphoedema & Oncology Care | `pages/specialities/lipedema-lymphoedema-oncology-care.html` | Lipedema & Inflammatory Leg Care |
| Pregnancy & Postpartum Care | `pages/specialities/pregnancy-postpartum-care.html` | Pregnancy Massage & Circulation Support; Recovery & Core Restoration; Postnatal Lymphatic Drainage |
| TMJ, Pain & Stress Care | `pages/specialities/tmj-pain-stress-care.html` | TMJ, Jaw & Headache Treatment; Chronic Pain, Stress & Inflammation; Clinical Therapeutic Massage & Injury Recovery |
| Skin & Tissue Health | `pages/specialities/skin-tissue-health.html` | Clinical Cellulite Remodelling; Hormonal Skin Tightening & Firmness Treatment |

Endometriosis & Pelvic Pain Support tetap tersedia melalui tautan Women's Health pada About;
layanan ini belum ditetapkan sebagai anak salah satu speciality baru.

`pages/the-inbody-method.html` memuat latar pendekatan, lima unsur klinis, siklus
Assess → Personalise → Treat → Reassess, serta filosofi personal care.

Total saat ini **24 halaman**: empat halaman umum lama, 13 detail treatment,
enam speciality, dan satu halaman Method.

Setiap data treatment di `js/data/services/` menyimpan `summary` singkat yang menjelaskan
fokus perawatan. Kartu Related treatment information menampilkan nama, ringkasan, dan
tautan View treatment details menuju halaman layanan yang sama. Semua 13 data treatment
memiliki ringkasan; 12 treatment saat ini ditampilkan melalui enam speciality.

## Routing dan layout bersama

Setiap entry HTML menyimpan metadata, font, CDN ikon, stylesheet, `#app`, serta satu script `js/app.js`.
Body memakai `data-page`; detail treatment juga memakai `data-service`, sedangkan speciality memakai `data-speciality`.
`app.js` meneruskan ID ke factory halaman, lalu memasang descriptor melalui `PageLayout`.

- Home di root memakai prefix `./`.
- Halaman umum di `pages/` memakai `data-root="../"`.
- Speciality di `pages/specialities/` memakai `data-root="../../"`.
- Detail treatment di `pages/services/<category>/` memakai `data-root="../../../"`.

Script/CSS HTML memakai prefix yang sama. Tulis `href` dan `src` pada komponen/data
relatif terhadap root project, misalnya `./pages/contact.html` atau `./assets/logo/logo.png`.
`PageLayout` menyesuaikannya saat mount. Anchor `#...` tetap menunjuk ke dokumen yang sedang dibuka;
jangan memakai elemen `base`. Routing juga bekerja jika project dipasang di subfolder hosting.

Navbar menampilkan enam speciality melalui `specialityNavigationLinks`.
`serviceNavigationGroups` masih menjadi daftar route 13 treatment lama, tetapi tidak lagi
merender dropdown empat kelompok. Speciality aktif memakai `aria-current="page"`;
pada detail treatment, speciality induknya memakai `aria-current="location"`.
Tautan Method tersedia pada dropdown, section Home/About, speciality, dan footer.

## Booking dan profil tim

Profil anggota tim kedua masih ditunda sesuai arahan pengguna.
Pengantar tim hanya memakai informasi kolektif yang diberikan client. About tetap menampilkan
profil Saila yang sudah tersedia; tidak ada nama, credential, atau foto profil kedua rekaan.
Layout About sebelumnya dipertahankan sesuai koreksi pengguna: profil di kiri dan foto
Saila di kanan, empat kartu credential pada section Sage, expertise dalam grid 2×2,
serta pengantar Method. Label pembuka menjadi “Meet our team”. Sesuai izin pengguna,
satu section detail tim ditambahkan setelah expertise dan sebelum Method, tanpa
mengubah layout section lama. Section ini memakai informasi kolektif dari brief,
foto bersama `assets/images/about/team.jpg`, dan CTA Contact Us. Foto tambahan ini
bukan profil individu kedua lengkap; nama, bio, dan credential pribadinya masih
menunggu data klinik.

Pengguna mengonfirmasi alur booking selesai: semua tombol appointment dan assessment
membuka Contact Us. Integrasi platform booking eksternal tidak diperlukan. Tidak ada slot, pembayaran,
booking otomatis, ataupun prefill form baru. Form Contact Us tetap memvalidasi nama huruf/spasi,
kemudian membuka draf email di aplikasi pengguna. Tombol Send Message tidak mengirim langsung melalui server.

## Menambah speciality

1. Tambahkan ringkasan/route unik pada `js/data/specialities/catalog.js`.
2. Tambahkan isi lengkap pada `js/data/specialities/index.js`, termasuk keluhan, pendekatan,
   teknik, waktu perawatan yang sesuai, foto, dan relasi treatment.
3. Buat entry di `pages/specialities/` dengan metadata dan `data-page="speciality"`,
   `data-speciality="id"`, serta `data-root="../../"`.
4. Gunakan factory/renderer bersama; kartu Home dan dropdown mengambil katalog yang sama.
5. Jalankan pemeriksaan halaman dan build Tailwind, lalu periksa browser.

Untuk treatment baru, gunakan registry `js/data/services/index.js`, factory `js/pages/service.js`,
serta entry pada kategori yang sesuai di `pages/services/`. Pertahankan data dan renderer terpisah.
Folder `pages/` dan `js/` sudah dibaca oleh Tailwind melalui `css/input.css`.

## Galeri, sumber copy, dan verifikasi

Our Clinic memakai 12 JPEG dari `gallery/`, dengan filter, jumlah foto, dan dialog foto besar.
Controller mengembalikan fokus dan scroll state setelah dialog ditutup. Foto asli tidak dipindah.

`npm test` memeriksa 24 entry, metadata, import, ID, target aksesibilitas, enam speciality,
13 route treatment, hubungan treatment/induk, urutan Home, glyph Regular, aset, serta URL root/subfolder.
Tes struktur tidak menggantikan pemeriksaan visual atau persetujuan copy oleh client.

- [task.md](task.md): status pekerjaan dan bagian yang ditunda.
- [docs/REVISION_IMPLEMENTATION.md](docs/REVISION_IMPLEMENTATION.md): penerapan, draft copy, dan batas verifikasi.
- [docs/SERVICE_COPY_REVIEW.md](docs/SERVICE_COPY_REVIEW.md): catatan lama pada 13 treatment yang masih terbuka.
- [DESIGN_GUIDELINES.md](DESIGN_GUIDELINES.md): token, komponen, dan pola layout.
