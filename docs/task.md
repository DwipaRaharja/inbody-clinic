# Task revisi website InBody Clinic

**Tanggal:** 17 Oktober 2026  
**Status:** Implementasi utama diterapkan di project lokal; alur booking melalui Contact Us. Profil Beatriz sudah ditambahkan memakai copy dan foto dari pengguna. Pilihan foto hero masih ditunda.
**Sumber:** Brief revisi client pada lampiran `Pasted text.txt`.

Dokumen ini merangkum permintaan client, hasil pencocokan dengan project, usulan
implementasi, dan informasi yang belum tersedia. Checkbox di bawah menunjukkan pekerjaan yang sudah diterapkan. Item yang belum
ditandai merupakan pekerjaan tertunda atau pemeriksaan yang belum dilakukan secara langsung.

## 1. Tujuan utama

Website perlu memperkenalkan InBody Clinic sebagai **specialised boutique clinical
practice** dengan keahlian women's health, advanced lymphatic therapy,
post-surgical recovery, serta skin and tissue health.

Pengunjung harus memahami tiga hal sejak awal:

1. Tim memiliki pengalaman klinis dan pendidikan khusus yang relevan.
2. Perawatan dipersonalisasi melalui The InBody Method™, bukan protokol yang sama
   untuk setiap pasien.
3. Klinik membantu pasien mengenali kebutuhan dan memilih langkah perawatan awal.

Pengetahuan klinis, asesmen individual, dan hands-on therapy menjadi pesan utama.
Teknologi dijelaskan sebagai pendukung **when appropriate**, bukan identitas utama
klinik. Komunikasi tetap hangat, mendengarkan pasien, dan mudah dipahami.

## 2. Kondisi project saat diperiksa

| Area | Kondisi saat ini | Dampak revisi |
| --- | --- | --- |
| Hero | Tiga slide dengan autoplay 5 detik. Headline slide pertama **sudah** berbunyi Women's Health / Advanced Lymphatic Therapy / Specialised Care | Headline pertama dipertahankan; deskripsi, eyebrow, dan copy slide lain perlu disesuaikan |
| Layanan Home | Enam kartu lama, berbeda dari enam specialities pada brief baru | Ganti judul, pertanyaan pembuka, deskripsi, urutan, ikon yang relevan, dan tautan |
| InBody Difference | Memakai "Specialised care. Real results." serta "A healthier you" | Usulan: ganti section ini menjadi pengantar The InBody Method™ |
| About | Baru memperkenalkan Saila Insua López | Tambahkan profil anggota tim kedua dan filosofi bersama |
| Detail layanan | Ada 13 halaman di empat kelompok folder | Usulan: pertahankan sebagai detail pendukung, tambahkan enam halaman speciality |
| Booking | Tombol Book an Appointment menuju Contact Us; form membuka draf email | Belum ada alur booking langsung atau data slot appointment yang terhubung |
| Foto | Ada foto Home, Saila, treatment, dan 12 foto klinik di `assets/images/jpeg/gallery/` dengan varian WebP di `assets/images/webp/gallery/` | Bisa digunakan kembali setelah pemilihan konteks; identitas/foto profil anggota kedua perlu dipastikan |
| Struktur dan komponen | Entry HTML sudah rapi dalam `pages/`; shell, navbar, footer, heading, dan tombol sudah reusable | Gunakan struktur dan komponen yang ada |

Saat ini ada **17 halaman**: Home, About, Our Clinic, Contact Us, dan 13 detail
layanan. Catatan lama pada `docs/SERVICE_COPY_REVIEW.md` masih terbuka; brief baru
tidak otomatis menyelesaikan semua catatan teks tersebut.

## 3. Urutan Home sesuai permintaan client

| Urutan | Section | Rencana |
| --- | --- | --- |
| 1 | Main headline + real clinic/team photograph | Revisi hero dengan pesan klinis dan foto autentik |
| 2 | How Can We Help? | Enam speciality, memakai pertanyaan yang dikenali pasien |
| 3 | The InBody Method™ | Ringkasan pendekatan klinis + tautan ke halaman lengkap |
| 4 | Meet Our Team | Perkenalkan kedua anggota tim secara seimbang |
| 5 | What to Expect | Jelaskan pengalaman asesmen dan personalisasi perawatan |
| 6 | Not Sure What to Book? | Arahkan ke initial assessment and personalised treatment |
| 7 | Contact, location and clinic information | Ringkasan kontak, lokasi, jam klinik, dan akses peta |

Navbar, bar kontak, serta footer tetap memakai shell bersama di luar urutan section
utama tersebut.

**Usulan untuk section lama:** InBody Difference diganti dengan Method; CTA lama
diganti dengan initial-assessment CTA. Testimonial tidak dimasukkan sebagai section
terpisah dalam rancangan tujuh section ini. Keputusan mempertahankan atau
memindahkannya ditinjau pada bagian 7; kutipan pasien tidak ditulis ulang.

## 4. Daftar pekerjaan

### R01 — Hero dan pesan utama

- [X] Pertahankan headline pertama yang sudah sesuai brief:

  > Women’s Health.  
  > Advanced Lymphatic Therapy.  
  > Specialised Care.

- [X] Ganti deskripsi slide pertama dengan teks client:

  > Personalised clinical care combining specialised hands-on therapy, extensive clinical experience and advanced technology when appropriate.

- [x] Revisi eyebrow dan headline/deskripsi slide lainnya yang masih generik,
  termasuk "Live Better" dan "A healthier you".
- [x] Pastikan keahlian women's health, lymphatic therapy, post-surgical recovery,
  dan tissue health terbaca jelas dalam keseluruhan pesan Home.
- [ ] Pilih foto klinik/tim/treatment asli dengan komposisi yang tidak terlalu
  menonjolkan mesin sebagai identitas klinik. (Ini perlu saya diskusikan dulu)
- [ ] Pertahankan tampilan elegan dan uji pemenggalan headline yang lebih panjang
  pada mobile, desktop, dan saat zoom.

**Usulan, belum keputusan client:** pertahankan tiga slide dan autoplay 5 detik
yang sudah diminta sebelumnya; perbarui isi ketiganya. Brief baru belum menentukan
apakah hero harus menjadi satu visual statis. Copy pengganti slide kedua dan
ketiga perlu disusun sebagai draft karena belum diberikan secara final.

### R02 — How Can We Help? dan enam specialities

- [x] Gunakan judul dan subjudul berikut:

  > How Can We Help?  
  > Specialised care tailored to your needs.

- [x] Susun kartu dalam urutan berikut, dengan pertanyaan contoh dari client:

| No. | Speciality — nama dari brief | Pertanyaan pembuka |
| --- | --- | --- |
| 1 | Pre & Post-Surgical Recovery | Recovering from surgery? |
| 2 | Clinical Lymphatic Care | Experiencing swelling or heavy legs? |
| 3 | Lipedema, Lymphoedema & Oncology Care | Living with lipedema? |
| 4 | Pregnancy & Postpartum Care | Pregnant or recovering after childbirth? |
| 5 | TMJ, Pain & Stress Care | Struggling with jaw pain or muscular tension? |
| 6 | Skin & Tissue Health | Concerned about cellulite or tissue changes? |

- [x] Tulis ringkasan yang mudah dipindai, dengan cakupan sesuai brief:

| Speciality | Cakupan yang perlu terwakili |
| --- | --- |
| Pre & Post-Surgical Recovery | Persiapan/pemulihan plastic dan reconstructive surgery; liposuction, abdominoplasty, breast surgery, facelifts, serta prosedur lain; swelling, bruising, scar management, fibrosis, tissue restrictions, dan functional recovery |
| Clinical Lymphatic Care | Swelling, fluid retention, heavy legs, dan lymphatic-related symptoms; specialised Manual Lymphatic Drainage, asesmen individual, serta personalised treatment programmes |
| Lipedema, Lymphoedema & Oncology Care | Conservative care untuk lipedema, lymphoedema, dan komplikasi limfatik terkait cancer treatment; symptom management, education, tissue care, dan individualised treatment |
| Pregnancy & Postpartum Care | Pregnancy massage, birth preparation, pelvic/back discomfort, swelling, C-section scar care, abdominal tissue recovery, dan postpartum rehabilitation support |
| TMJ, Pain & Stress Care | Jaw pain, bruxism, muscular-tension headaches, neck discomfort, persistent muscular tension, dan stress-related physical symptoms; manual therapy, myofascial techniques, dan intra-oral treatment when appropriate |
| Skin & Tissue Health | Cellulite, fibrosis, tissue restrictions, skin texture, connective tissue quality, serta perubahan setelah pregnancy, weight loss, atau menopause; jelaskan dermatofunctional expertise dengan bahasa yang mudah dipahami |

- [x] Gunakan ringkasan pendek di kartu; tempatkan penjelasan lengkap pada halaman
  speciality agar Home tidak terlalu padat.
- [x] Tinjau ikon keenam kartu sesuai kategori baru; gunakan Phosphor CDN atau SVG
  yang sudah tersedia jika bentuknya relevan.
- [x] Arahkan setiap kartu ke halaman speciality yang sesuai, bukan langsung ke
  salah satu treatment detail lama.
- [x] Tinjau wording pertanyaan kartu ketiga: contoh client hanya menyebut
  lipedema, sementara speciality juga mencakup lymphoedema dan oncology care.
  Jangan mempersempit cakupan judul atau mengganti contoh tanpa review copy.

### R03 — Enam halaman speciality dan pemetaan layanan lama

- [x] Buat satu template speciality yang reusable, dengan data terpisah per halaman.
- [x] Setiap halaman menjelaskan: siapa yang dibantu; gejala/masalah; clinical
  approach; teknik yang mungkin digunakan; kapan treatment sesuai; serta
  appointment dan booking options.
- [x] Tekankan asesmen individual dan pemilihan treatment sesuai kondisi pasien.
  Hindari daftar teknik panjang tanpa konteks kebutuhan pasien.
- [x] Masukkan aspek pre-surgical care pada halaman surgery; kebutuhan baru ini
  lebih luas daripada halaman Post-Surgical Recovery yang sudah ada.
- [x] Susun konten lymphoedema dan oncology care dari brief serta informasi klinik
  yang dikonfirmasi. Detail protokol, keahlian khusus, atau hasil tidak boleh
  diasumsikan dari halaman Lipedema lama.
- [x] Tampilkan pilihan booking yang nyata. Jam buka bukan bukti ketersediaan slot
  appointment; slot hanya ditampilkan jika sumber booking tersedia.
- [x] Pertahankan 13 halaman lama sebagai detail pendukung selama belum ada
  keputusan penggabungan atau penghapusan.

**Pemetaan yang diterapkan, untuk review:**

| Halaman speciality baru | Detail layanan lama yang relevan |
| --- | --- |
| Pre & Post-Surgical Recovery | Post-Surgical Recovery |
| Clinical Lymphatic Care | Clinical Lymphatic Drainage Sydney; Lymphatic Reset & Fluid Retention Treatment |
| Lipedema, Lymphoedema & Oncology Care | Lipedema & Inflammatory Leg Care; konten lymphoedema/oncology merupakan tambahan |
| Pregnancy & Postpartum Care | Pregnancy Massage & Circulation Support; Recovery & Core Restoration; Postnatal Lymphatic Drainage |
| TMJ, Pain & Stress Care | TMJ, Jaw & Headache Treatment; Chronic Pain, Stress & Inflammation; Clinical Therapeutic Massage & Injury Recovery |
| Skin & Tissue Health | Clinical Cellulite Remodelling; Hormonal Skin Tightening & Firmness Treatment |

**Endometriosis & Pelvic Pain Support** tetap dipertahankan sebagai detail layanan.
Pemetaan utamanya perlu dipastikan client karena belum disebut secara eksplisit
dalam enam speciality baru; jangan otomatis memasukkannya ke Pregnancy atau TMJ.
Satu treatment juga dapat ditautkan dari lebih dari satu speciality bila konteksnya
sesuai, tanpa menggandakan halaman.

### R04 — The InBody Method™ di Home dan halaman khusus

- [x] Ganti pengantar InBody Difference dengan section bernama **The InBody Method™**.
- [x] Jelaskan bahwa metode menyatukan pengalaman lebih dari 20 tahun dalam
  physiotherapy dan specialised clinical training di Europe dan Chile, sesuai brief.
- [x] Jelaskan bahwa keahlian tidak terbatas pada lymphatic drainage; asesmen
  mempertimbangkan kondisi, gejala, tissue quality, dan tahap pemulihan.
- [x] Tampilkan lima unsur pendekatan client:
  - Individual clinical assessment.
  - Specialised hands-on treatment.
  - Advanced therapeutic technology when appropriate.
  - Personalised recovery and self-care advice.
  - Ongoing reassessment and adaptation.
- [x] Visualisasikan urutan **ASSESS → PERSONALISE → TREAT → REASSESS**.
- [x] Tambahkan sisi manusiawi: tim adalah women and mothers yang memahami
  pentingnya pasien didengarkan, dirawat, dan didukung di berbagai tahap kehidupan.
- [x] Tambahkan tautan ke halaman detail The InBody Method™.
- [x] Susun halaman detail dengan penjelasan pendekatan, personalisasi, evaluasi
  berkelanjutan, filosofi tim, dan langkah awal assessment.

### R05 — Meet Our Team dan About

- [x] Pertahankan layout About sebelumnya sesuai koreksi pengguna: profil kiri/foto
  kanan, empat kartu credential pada section Sage, expertise 2×2, dan pengantar Method.
  Label pembuka menjadi “Meet our team”.
- [x] Tambahkan satu section detail tim setelah expertise dan sebelum Method sesuai
  izin pengguna, tanpa mengubah layout section lama. Gunakan informasi kolektif dari
  brief, foto bersama `assets/images/jpeg/about/about_team_profile.jpg`, serta CTA Contact Us.
- [ ] Tambahkan section Meet Our Team pada Home, memperkenalkan dua anggota tim
  secara seimbang, bukan hanya satu figur utama.
- [x] Perbarui halaman About yang sudah ada untuk menampilkan dua profil lengkap:
  nama, foto asli, latar pendidikan, qualifications, training, pengalaman,
  keahlian, dan filosofi perawatan bersama.
- [x] Jelaskan latar internationally trained physiotherapists dan bahwa keduanya
  bekerja sesuai respective professional scopes in Australia, mengikuti informasi
  yang dikonfirmasi client.
- [x] Hubungkan kepercayaan kepada kedua anggota tim dengan The InBody Method™.
- [x] Tempatkan pernyataan pengalaman/training pada individu yang benar; jangan
  otomatis menyalin seluruh credential Saila ke anggota tim kedua.
- [x] Gunakan nada empatik dan profesional; hindari gelar, status registrasi,
  afiliasi, atau keahlian tambahan yang belum diberikan.

Pengguna kini memberikan nama Beatriz, foto asli, latar pendidikan Chile, peran
Australian Remedial Massage Therapist, pengalaman 22+ tahun, lima area expertise,
dan pendekatan perawatannya. Profil individu ditambahkan setelah expertise Saila
dan sebelum detail tim kolektif, dengan data di `js/data/team.js` dan foto
`assets/images/jpeg/about/about_beatriz_profile.jpg`. Nama belakang atau credential tambahan tidak dibuat.
Pengantar kolektif Meet Our Team pada Home tetap memakai data tim bersama.

### R06 — What to Expect

- [x] Tambahkan section khusus yang menjelaskan pengalaman kunjungan pasien,
  bukan mengulang daftar layanan.
- [x] Jelaskan secara berurutan: mendengarkan kebutuhan; asesmen kondisi/gejala,
  tissue quality, dan stage of recovery; menyusun perawatan individual;
  hands-on therapy dan teknologi jika sesuai; serta advice dan reassessment.
- [x] Bedakan fungsi section ini dari Method: Method menjelaskan filosofi klinis;
  What to Expect menjelaskan apa yang dialami pasien saat datang.
- [x] Jangan menetapkan durasi, jumlah sesi, biaya, atau prosedur kunjungan yang
  belum dikonfirmasi klinik.

### R07 — Initial assessment dan pengalaman booking

- [x] Gunakan pengantar **“Not sure what to book? Start here.”**.
- [x] Jelaskan bahwa pasien bisa memulai dengan **initial assessment and
  personalised treatment session**, tanpa harus menentukan teknik sendiri.
- [x] Arahkan tombol assessment ke Contact Us untuk mendiskusikan appointment.
- [x] Pastikan alurnya konsisten dari Home, navbar, halaman Method, dan halaman
  speciality; pilihan praktisi tidak boleh membuat salah satu anggota tim
  terlihat kurang dipercaya.
- [x] Gunakan Contact Us sebagai tujuan final semua tombol booking, sesuai
  konfirmasi pengguna; integrasi platform booking eksternal tidak diperlukan.
- [x] Pertahankan alur enquiry melalui Contact Us tanpa prefill baru; pengiriman
  enquiry bukan konfirmasi appointment.
- [x] Pertahankan keterangan bahwa form Contact Us membuka aplikasi email jika
  mekanisme itu masih dipakai; jangan menampilkan pesan seolah appointment sudah
  dipesan atau email telah terkirim otomatis.

Pengguna mengonfirmasi bahwa booking sudah selesai karena seluruh tombol akan
mengarah ke Contact Us. URL/platform booking, slot appointment, durasi, biaya,
dan prefill form tidak diperlukan untuk lingkup ini.

### R08 — Contact, location, dan informasi klinik di Home

- [x] Tambahkan section terakhir Home dengan kontak, alamat Double Bay, jam buka,
  akses lokasi Google Maps, dan tautan Contact Us/Our Clinic yang relevan.
- [x] Gunakan kembali `js/data/clinic-contact.js` sebagai sumber data bersama.
- [x] Gunakan foto ruangan asli bila diperlukan; tetap pisahkan informasi praktis
  dari narasi marketing.
- [x] Pertahankan halaman Contact Us dan Our Clinic yang sudah berfungsi, dengan
  revisi copy yang diperlukan agar konsisten dengan positioning baru.

### R09 — Copy, fotografi, dan konsistensi visual

- [x] Pertahankan palet Navy, Sage, Light Sage, Cream, White, dan Light Grey.
- [x] Pertahankan Cormorant Garamond untuk heading, Montserrat untuk body, serta
  shell, spacing, tombol, dan utility Tailwind yang sudah dipakai.
- [x] Prioritaskan foto asli tim, klinik, dan treatment yang tersedia. Catat
  kebutuhan foto tambahan setelah pemetaan; jangan mengganti profil dengan foto
  generik atau membuat identitas anggota tim.
- [x] Tinjau foto detail tubuh dan harbour pada section lama agar visual utama
  mendukung pesan klinis, tim, serta perawatan autentik.
- [x] Audit frasa generik pada hero, Difference, CTA, footer, dan halaman terkait,
  termasuk “Live Better”, “A Healthier You”, dan “Real Results”. Ganti dengan
  penjelasan spesifik tentang expertise, assessment, recovery, atau patient needs.
- [x] Pertahankan istilah treatment yang memang diminta, seperti pregnancy
  massage; positioning baru tidak berarti menghapus seluruh penyebutan massage.
- [x] Jangan mengubah kutipan pasien untuk menyesuaikan marketing. Penempatan
  testimonial ditentukan terpisah.
- [ ] Susun copy yang belum ditulis lengkap oleh client sebagai draft untuk
  review, terutama detail enam speciality, profil tim kedua, dan slide tambahan.
- [x] Cocokkan revisi dengan `docs/SERVICE_COPY_REVIEW.md`; biarkan catatan lama
  tetap terbuka jika belum diselesaikan oleh sumber baru.

### R10 — Navigasi, struktur kode, dan pemeriksaan setelah implementasi

- [x] Usulan navigasi utama layanan: tampilkan enam speciality sebagai pintu
  masuk; detail treatment lama diakses melalui halaman speciality terkait.
  Ini usulan penyederhanaan dropdown, bukan instruksi eksplisit client.
- [x] Gunakan kembali `PageLayout`, `Heading`, `ActionButton`, navbar, footer,
  serta pengaturan `data-root` untuk entry dalam subfolder.
- [x] Pisahkan data speciality, data tim, dan Method dari renderer agar konten
  mudah diperbarui tanpa menyalin layout.
- [x] Perbarui tautan kartu, dropdown, CTA, About, dan footer sesuai halaman baru.
- [x] Perbarui title/meta description, hierarki heading, alt text, serta nama
  aksesibel tombol sesuai isi yang benar-benar tampil.
- [x] Sesuaikan pemeriksaan route: enam speciality dan 13 detail treatment tidak
  lagi harus sama-sama menjadi item dropdown utama.
- [x] Jalankan pemeriksaan halaman/import/aset/anchor dan build Tailwind.
- [x] Periksa mobile, tablet, desktop, zoom/reflow, menu keyboard, slider bila
  dipertahankan, dan alur CTA/booking di browser.
- [x] Verifikasi tautan ketika project dilayani dari root maupun subfolder.
- [x] Perbarui README, design guidelines, serta catatan review copy setelah
  implementasi disepakati.

## 5. Usulan struktur halaman tambahan

Struktur berikut sudah diterapkan:

```text
pages/
├── about.html                        # Profil Saila dan Beatriz; pengantar tim bersama
├── the-inbody-method.html            # Halaman Method baru
└── specialities/
    ├── pre-post-surgical-recovery.html
    ├── clinical-lymphatic-care.html
    ├── lipedema-lymphoedema-oncology-care.html
    ├── pregnancy-postpartum-care.html
    ├── tmj-pain-stress-care.html
    └── skin-tissue-health.html
```

Folder `pages/services/` beserta 13 detail layanan dipertahankan. Istilah
`specialities/` membedakan halaman kelompok kebutuhan pasien dari detail treatment.
Folder data/renderer mengikuti pola project, misalnya `js/data/specialities/`,
`js/sections/speciality/`, dan factory `js/pages/speciality.js`.

About tetap memakai URL yang sama. Total saat ini adalah
**24 halaman**: 17 yang ada + 6 speciality + 1 Method. Tidak diperlukan halaman
profil baru terpisah hanya untuk memenuhi pengenalan kedua anggota tim.

## 6. Urutan implementasi

1. Finalisasi keputusan di bagian 7, pemetaan layanan, dan data yang tersedia.
2. Susun draft copy dan pemetaan foto dengan brief sebagai sumber utama.
3. Buat data/template enam speciality serta halaman Method.
4. Revisi Home mengikuti tujuh section dan perbarui About untuk kedua anggota tim.
5. Hubungkan navigasi, halaman lama, contact/location, dan jalur initial assessment.
6. Audit wording dan visual lintas halaman, lalu jalankan pemeriksaan teknis dan
   verifikasi browser.
7. Serahkan hasil yang bisa ditinjau beserta catatan copy/data yang masih menunggu
   keputusan, tanpa mengklaim semuanya sudah disetujui client.

Informasi yang belum lengkap tidak menghalangi pekerjaan independen, tetapi tidak
boleh diganti dengan credential, URL booking, jadwal, atau klaim layanan rekaan.

## 7. Keputusan dan informasi untuk review pengguna/client

| ID | Hal yang perlu ditentukan | Usulan / kondisi saat ini | Keputusan pengguna/client |
| --- | --- | --- | --- |
| D01 | Hero tetap tiga slide atau satu hero statis? | Pertahankan tiga slide/5 detik; revisi semua copy agar klinis. Brief tidak meminta slider dihapus | Diterapkan: tetap tiga slide/5 detik; foto tidak diganti |
| D02 | Enam speciality di dropdown dan 13 detail lama tetap tersedia? | Enam speciality sebagai navigasi utama; detail lama ditautkan dari halaman yang relevan | Diterapkan: enam speciality di dropdown; 13 detail treatment tetap tersedia |
| D03 | Tujuan initial-assessment CTA dan booking options | Semua tombol appointment dan assessment menuju Contact Us | Selesai sesuai konfirmasi pengguna; tidak memerlukan integrasi booking eksternal, slot, atau prefill baru |
| D04 | Data anggota tim kedua dan profil keduanya | Pengguna telah memberikan copy dan foto Beatriz beserta latar pendidikan, peran Australia, pengalaman, expertise dan pendekatan | Diterapkan pada section profil Beatriz di About; credential tiap anggota tetap terpisah |
| D05 | Cakupan konten baru lymphoedema/oncology dan pre-surgical care | Pakai cakupan brief; minta konfirmasi rincian layanan dan training sebelum memperluas klaim | Konten baru dibatasi cakupan brief; detail protokol/training tambahan tidak dibuat |
| D06 | Pemetaan Endometriosis & Pelvic Pain Support | Pertahankan URL/detail; speciality induk belum jelas dari brief | URL tetap tersedia melalui Women’s Health pada About; belum menetapkan speciality induk |
| D07 | Testimonial lama | Tidak menjadi section tersendiri dalam urutan Home baru; opsi dipertahankan di lokasi lain jika diminta | Tidak dirender pada Home baru; module dan kutipan lama dipertahankan |
| D08 | Foto asli pilihan dan foto tambahan tim | Gunakan aset project; perlu pemetaan foto masing-masing anggota dan konfirmasi foto utama | Foto hero dipertahankan sesuai catatan pengguna; foto project yang ada dipakai pada section lain |
| D09 | Copy pengganti yang belum diberikan kata per kata | Buat draft English, terutama slide 2/3, detail speciality, Method, What to Expect, dan bio tim | Draft baru sudah diterapkan; Method dan profil Beatriz kini memakai copy pengganti dari pengguna |

**Batas tahap saat ini:** profil Beatriz tersedia sesuai materi pengguna. Booking
menggunakan tujuan Contact Us; integrasi eksternal
tidak termasuk lingkup. Pilihan foto hero tetap menunggu diskusi sesuai catatan pengguna.


## 8. Ringkasan hasil implementasi

- [x] Home memakai tujuh section sesuai urutan brief.
- [x] Enam halaman speciality dan halaman The InBody Method™ dibuat; total 24 halaman.
- [x] Dropdown, kartu, parent treatment, CTA, About, dan footer terhubung.
- [x] Semua 13 treatment lama dipertahankan dan memiliki tautan masuk.
- [x] Pengantar tim memakai informasi kolektif dari client; profil individu Beatriz memakai copy dan foto tersendiri dari pengguna.
- [x] What to Expect, assessment enquiry CTA, kontak, lokasi, dan peta tersedia.
- [x] Pemeriksaan route/aset/ARIA/import/ikon dan build Tailwind berhasil.
- [x] Home diuji pada viewport 320–2560px tanpa overflow horizontal; speciality dan Method diuji pada mobile/desktop.
- [x] Dropdown mobile/desktop, Escape/fokus, serta CTA Contact Us diuji di browser.
- [ ] Pengujian kontrol zoom browser secara langsung; yang dilakukan adalah uji reflow viewport.
- [x] Profil Beatriz, foto asli, latar Chile/Australia, pengalaman 22+ tahun, expertise, dan pendekatan tersedia pada About.
- [x] Booking dan assessment menuju Contact Us — selesai sesuai konfirmasi pengguna.
- [ ] Pemilihan foto hero baru — menunggu diskusi sesuai catatan pengguna.

Copy baru adalah draft berdasarkan brief, belum dinyatakan sebagai persetujuan
editorial/klinis final client. Lihat [docs/REVISION_IMPLEMENTATION.md](docs/REVISION_IMPLEMENTATION.md).

---

# Task konsistensi data konten (copy & struktur data)

**Tanggal:** 23 Oktober 2026
**Status:** Audit selesai; perbaikan belum diterapkan.
**Lingkup:** 12 file `js/data/services/*.js`, `js/data/specialities/index.js`, dan terkait
`js/data/hero-slides.js`. Hasil audit ini menggantikan pesan yang terpotong
("pengecekan mendalam untuk di …") dengan daftar temuan lengkap di bawah.

## T01 — Kapitalisasi judul (`hero.lines`, `recovery.steps`) — perlu keputusan

Gaya kapital campur dalam satu property yang sama:

- Sentence case: `Feel lighter / Move freely`, `Rebuild your / inner strength`
  (Postnatal, Recovery Core, Pregnancy Massage).
- Title Case tiap kata: `Ease The Tension / Feel More At Ease`, `Move More Freely`,
  `Feel More Restored`, `Body’s Recovery` (TMJ, Therapeutic Massage, Chronic Pain,
  Endometriosis, Post-Surgical, sebagian Cellulite).
- Campur dalam satu file (Post-Surgical): `Healing Takes / Thoughtful Support`
  berdampingan dengan `Gentle, Tailored Care / for Every Step`.
- `recovery.steps` juga campur: `Circulation & Oxygen Support` (Title) vs
  `Ease jaw tension` (Sentence).

- [ ] **Keputusan:** pilih satu standar — Sentence case (usulan) atau Title Case — lalu
      terapkan pada semua file service.
- [ ] Terapkan standar yang dipilih.
- [ ] ⚠️ Karena mengubah copy, konfirmasikan ke client apakah copy masih draft.

## T02 — Eyebrow dan subEyebrow tidak konsisten

- [ ] Hapus trailing space: `'TMJ, Jaw & Headache Treatment '`,
      `'Chronic Pain, Stress & Inflammation Therapy '`.
- [ ] `'Post - Surgical Recovery'` → `'Post-Surgical Recovery'`.
- [ ] Samakan `subEyebrow`: Postnatal tidak punya `subEyebrow` (dua file lain punya
      `InBody Clinic · <kategori>`); TMJ memakai `TMJ & Jaw Care`, Chronic
      `Women’s Pain Support`, Endometriosis `Pelvic Pain Care` — tidak cocok
      dengan nama kategorinya.

## T03 — Tanda petik/apostrof

- [ ] `hero-slides.js` line 13: `"Women's Health."` memakai apostrof lurus;
      standardkan ke tipografis `’` seperti seluruh file data lain.

## T04 — Tanda titik-dua (`:`) pada subtitle kolom

Campur tiga gaya antar file:

- `'Treatment May Include :'` (dengan spasi) vs `'Treatment May Include:'` (tanpa) vs
  `'The treatment combines:'`.
- `[ ] Samakan satu gaya (usulan: tanpa spasi sebelum `:`).`
- [ ] Grammar: `Many Patient Notice` → `Many Patients Notice` (4 file).

## T05 — 🚨 Bug copy-paste konten (prioritas)

| # | File | Bug | Perbaikan usulan |
| --- | --- | --- | --- |
| 1 | `clinical-cellulite-remodelling.js` `recovery.steps` | Ketiga description salinan halaman post-surgical (`Never intended to be painful…surgical structures`) | Tulis description per jenis cellulite |
| 2 | `lymphatic-reset-fluid-retention-treatment.js` `recovery.steps` | `Personalised clinical electrotherapy` muncul 2×; salah satu description berisi copy lama (collagen) | Ganti step kedua dengan therapy lain yang benar |
| 3 | `lipedema-inflammatory-leg-care.js` `options.paragraphs` | Teks milik Postnatal (`After pregnancy and childbirth…C-section…`) | Tulis pengantar lipedema |
| 4 | 4 file Pain & TMJ (`cta.description`) | `Ask about support for swelling, fluid retention and heavy legs` salah konteks untuk jaw/pelvic/pain | Samakan dengan `booking.description` per treatment |
| 5 | `pregnancy-massage-circulation-support.js` `options.items` | `Rib restriction and breathing fatigue` dobel | Ganti item kedua |
| 6 | `postnatal-lymphatic-drainage.js` `options.items` | Typo `Heavy ortired legs` | `Heavy or tired legs` |
| 7 | `chronic-pain-stress-inflammation.js` `expertise.columns[1].items` | `Fatigue and poor sleep linked to stress` duplikat dgn item persisten | Gabungkan hapus duplikat |

- [ ] Perbaiki #1–#7.
- [ ] Konfirmasi: `postnatal.expertise.items` ≈ duplikat `options.items` (dengan
      variasi koma) — apakah disengaja untuk panel beda, atau dirapikan?

## T06 — Ejaan dan tanda baca lintas file

- [ ] `lipedema` vs `lipoedema` campur dalam file Lipedema — pilih satu ejaan.
- [ ] Oxford comma tidak konsisten (`heaviness in the legs, abdomen, and face` vs
      `swelling, fluid retention and heavy legs`) — pilih satu.
- [ ] Titik akhir kalimat: summary Clinical Lymphatic tanpa titik; `cta.description`
      tanpa titik sementara `booking.description` speciality ber-titik — samakan.

## T07 — `quote` generik dipakai 6 service

- [ ] `The treatment is gentle, rhythmic, and highly specific…` dipakai
      Postnatal, Recovery Core, Pregnancy Massage, Clinical Lymphatic, Lipedema,
      dan Post-Surgical; sisanya punya quote spesifik. Tentukan: quote spesifik
      per treatment (usulan) atau quote generik memang disengaja.

## T08 — Speciality — kapitalisasi daftar

- [ ] `clinical-lymphatic-care.needs` memakai Title Case
      (`General Swelling & Fluid Retention`) sementara 5 speciality lain sentence
      case — samakan.
- [ ] `techniques` Pre-Post & Clinical Lymphatic Title Case vs lain sentence — samakan.

## Keputusan yang menunggu (melanjutkan tabel bagian 7)

| ID | Hal yang perlu ditentukan | Usulan | Keputusan |
| --- | --- | --- | --- |
| R01 | Standar kapital judul (T01) | Sentence case | — |
| R02 | Bug copy-paste T05 boleh diperbaiki semua? | Ya, minimal #1–#5 | — |
| R03 | Gaya `:` dan `Many patients notice:` (T04) | Tanpa spasi | — |
| R04 | Ejaan lipedema/lipoedema & Oxford comma (T06) | `lipedema`; tanpa Oxford comma konsisten dgn mayoritas | — |
| R05 | Lingkup perbaikan lain terpotong dari instruksi | Konfirmasi area tambahan yang diminta | — |

## Verifikasi setelah implementasi

```sh
npm run build
npm test
```

Tes `check-pages.mjs` memvalidasi 23 HTML prerender, metadata, dan aset; perubahan
copy publik juga perlu review visual cepat pada halaman detail that berubah
(cellulite, lymphatic reset, lipedema, pregnancy massage, postnatal, post-surgical,
TMJ, chronic pain, therapeutic massage, endometriosis).
