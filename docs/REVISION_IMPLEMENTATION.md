# Implementasi revisi client — 17 Oktober 2026

## Lingkup yang diterapkan

- Home memakai urutan tujuh section dari brief client.
- Enam speciality memiliki halaman sendiri dengan renderer dan data bersama.
- The InBody Method™ memiliki ringkasan Home/About dan halaman detail.
- Dropdown menampilkan speciality; 13 treatment lama tetap tersedia sebagai detail.
- Pengantar tim menggunakan informasi kolektif dari brief. Tidak ada profil individu kedua yang dibuat.
- Copy hero, footer, dan CTA Home menekankan asesmen, hands-on treatment, pengalaman, dan personalisasi.
- Warna, font, container, margin, komponen tombol, Phosphor CDN, dan gallery yang ada tetap digunakan.

## Arahan pengguna yang membatasi pekerjaan

Profil anggota tim kedua masih ditunda. About tetap memakai profil Saila yang sudah ada.
Pengguna mengonfirmasi alur booking sudah selesai: semua tombol appointment dan assessment
menuju Contact Us. Integrasi platform booking eksternal tidak diperlukan.
CTA assessment bersifat enquiry melalui Contact Us, tanpa prefill, slot, atau konfirmasi booking.

Catatan pengguna pada `task.md` juga menyatakan pemilihan foto hero perlu didiskusikan.
Ketiga sumber gambar hero dipertahankan; tidak ada aset asli yang diganti, dipindah, atau diedit.
Foto team overview memakai foto asli beresolusi 1600×1066 dari folder Clinical Cellulite
Remodelling, yang menampilkan kedua praktisi meninjau tablet. Foto yang sama digunakan
pada speciality Skin & Tissue Health sebagai visual asesmen; ilustrasi abdomen pada detail
Cellulite lama tidak dipakai sebagai foto utama speciality baru. Speciality TMJ memakai foto
hands-on treatment dari aset lama. Halaman Method memakai foto reception di `gallery/`.

## Sumber dan status copy

Headline utama serta deskripsi hero pertama mengikuti teks client. Enam nama speciality dan
pertanyaan pembukanya mengikuti brief. Penjelasan tambahan disusun sebagai draft English
berdasarkan cakupan brief dan informasi yang sudah ada, bukan kutipan langsung dari client.

| Area | Status / isi yang perlu review |
| --- | --- |
| Slide 2 | “Understand Your Needs. Personalise Your Care.”; ringkasan lymphatic symptoms dan post-surgical recovery |
| Slide 3 | “Clinical Knowledge. Individual Care.”; ringkasan women’s health, recovery, tissue health, dan teknologi when appropriate |
| Enam speciality | Intro, keluhan, pendekatan, teknik, timing, dan related treatment disusun dari cakupan client; tidak menetapkan durasi, biaya, jumlah sesi, atau hasil |
| Lymphoedema/oncology | Konten dibatasi pada conservative care, lymphatic complications associated with cancer treatment, symptom management, education, dan tissue care dari brief; tidak menambahkan credential/protokol khusus |
| Pertanyaan kartu ketiga | “Living with lipedema?” tetap mengikuti contoh client; judul dan ringkasan tetap mencakup lymphoedema/oncology |
| Method | Pengalaman lebih dari 20 tahun, training Europe/Chile, lima unsur, empat tahap, dan sisi women/mothers berasal dari brief; detail kalimat disusun untuk web |
| Tim | Pernyataan kolektif memakai brief. Tidak mengatribusikan seluruh credential Saila kepada orang lain atau mengklaim registrasi profesional Australia |
| What to Expect | Menguraikan proses kunjungan berdasarkan assessment/personalisation/reassessment dari brief; tidak menjanjikan jadwal atau prosedur spesifik yang belum diberikan |
| Assessment CTA | “Ask about an assessment” membuka Contact Us, sesuai alur enquiry yang sudah tersedia |
| Testimonial | Tidak dirender pada Home baru; module, foto, dan kutipan asli tetap dipertahankan |

## Pemetaan treatment yang dipertahankan

Katalog speciality mengaitkan 12 treatment lama dengan enam kelompok baru. Endometriosis & Pelvic Pain Support
tetap tersedia pada URL lama dan melalui tautan Women's Health di About, tanpa menetapkan
induk baru yang belum disebut client. Tidak ada treatment atau URL detail lama yang dihapus.

Catatan `SERVICE_COPY_REVIEW.md` masih terbuka. Penerapan brief baru tidak otomatis menyetujui,
menormalisasi, atau memperbaiki seluruh teks pada 13 detail treatment lama.

## Pemeriksaan

- `npm test`: 24 halaman, enam speciality, 13 treatment; route, parent link, incoming link,
  metadata, asset, glyph, import, ID/ARIA, urutan Home, dan tautan root/subfolder.
- `npm run build:css`: build Tailwind berhasil.
- Home: reflow diperiksa pada viewport 320, 375, 768, 901, 1024, 1101, 1200, 1440, dan 2560px;
  tidak ada overflow horizontal pada ukuran tersebut.
- Navigasi nyata: dropdown desktop menuju speciality surgery, speciality menuju Method,
  dropdown mobile menuju speciality Lipedema/Lymphoedema/Oncology, dan CTA assessment menuju Contact Us.
- Method dan speciality dengan judul panjang diperiksa pada 320px tanpa overflow heading.
- Escape menutup dropdown dan mengembalikan fokus; Escape berikutnya menutup navigasi mobile.
- CTA assessment mencapai `contact-form`; form tetap kosong tanpa prefill dan tidak disubmit saat pengujian.

Pengujian lebar viewport membuktikan reflow pada ukuran tersebut, bukan pengujian tombol zoom browser
secara langsung. Pemeriksaan ini juga bukan persetujuan klinis atau editorial final oleh client.
