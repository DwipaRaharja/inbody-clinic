# Catatan review teks layanan

> Update 17 Oktober 2026: enam halaman speciality dan The InBody Method™ ditambahkan dari brief
> revisi client. Catatan di bawah tetap berlaku untuk 13 detail treatment lama dan belum otomatis
> ditutup. Status draft baru serta penundaan profil kedua/booking tercatat pada
> [REVISION_IMPLEMENTATION.md](REVISION_IMPLEMENTATION.md).

Dokumen ini mencatat teks yang berulang, berbeda antar-sumber, atau perlu
dipastikan oleh pemilik konten. Catatan ini bukan keputusan penggantian teks.
Isi sumber tetap dipertahankan sampai pengguna menentukan revisinya.

## Sumber dan lingkup implementasi

- **Pregnancy & Postpartum:** tiga layanan memakai teks dan susunan dari PNG
  masing-masing di `Our Service Layout/Pregnancy & Postpartum/`. Ketiganya
  memakai template layanan bersama dengan data serta foto yang berbeda.
- **Lymphatic Drainage dan Pain & TMJ Relief:** tujuh layanan sudah dibuat
  memakai teks PNG, sesuai pilihan pengguna, dengan template bersama.
- **Body Contouring:** tiga layanan memiliki teks pada
  [`../data_service_inbody_clinic.md`](../data_service_inbody_clinic.md) dan desain
  PNG di `Our Service Layout/Body Countoring/`. Ketiganya sudah dibuat dengan
  Markdown sebagai sumber teks utama dan PNG sebagai referensi susunan visual
  serta foto. Perbedaan sumber tetap dicatat dan belum mendapat keputusan
  konten final; prioritas sumber untuk implementasi tidak berarti kesalahannya
  sudah disetujui atau diperbaiki.
- `data_service_inbody_clinic.md`, gambar desain, dan file foto asli tidak
  diubah oleh pekerjaan ini.

Seluruh catatan masih **belum dikonfirmasi**. Pengguna dapat mengisi keputusan
langsung pada kolom terakhir, termasuk jika ingin mempertahankan teks asli.
Setelah keputusan tersedia, perubahan cukup diterapkan pada data layanan yang
bersangkutan; struktur template tetap digunakan bersama.

Seluruh **13 halaman layanan** tersedia: Pregnancy & Postpartum **3**, Lymphatic
Drainage **3**, Pain & TMJ Relief **4**, dan Body Contouring **3**. Sepuluh halaman
pertama memakai teks PNG; tiga Body Contouring memprioritaskan Markdown.
Status implementasi halaman tidak menutup review isi. Dokumen ini tidak
menyatakan verifikasi visual browser baru.

## Pregnancy & Postpartum — tiga halaman sudah diterapkan

Ketiga halaman mengikuti PNG masing-masing. Teks yang ditandai di bawah tetap
ditampilkan sesuai sumber agar pengguna dapat meninjau isi yang nyata pada
halamannya.

| ID | Layanan / section | Teks asli pada PNG | Hal yang perlu dipastikan | Keputusan pengguna |
| --- | --- | --- | --- | --- |
| P01 | Pregnancy Massage & Circulation Support / daftar “Care that meets you where you are” | **03** “Rib restriction and breathing fatigue”; **04** “Rib restriction and breathing fatigue” | Item 03 dan 04 identik. Apakah keduanya dipertahankan atau item 04 memiliki teks lain? | Belum dikonfirmasi |
| P02 | Pregnancy Massage & Circulation Support / panel “What You Can Expect” | “Many Patient Notice :” | Bentuk kata pada subjudul perlu dipastikan. Belum dinormalisasi atau diganti. | Belum dikonfirmasi |
| P03 | Recovery & Core Restoration / CTA penutup | “Ask about support for swelling, fluid retention and heavy legs” | Isi CTA menekankan swelling dan heavy legs, sementara halaman menekankan pemulihan core dan abdominal wall. Pastikan apakah CTA umum ini memang berlaku. | Belum dikonfirmasi |
| P04 | Postnatal Lymphatic Drainage / panel “Treatment Approaches” | “Swollen legs, ankles, or feet”; “Abdominal fluid retention or bloating”; “A sensation of heavy or tired legs”; “General tissue congestion after birth” | Daftar berisi keluhan atau indikasi, sementara judul panel menyebut pendekatan treatment. Pastikan apakah judul atau daftar memang dimaksudkan demikian. | Belum dikonfirmasi |
| P05 | Postnatal Lymphatic Drainage / daftar “Every recovery has its own rhythm” | **03** “Heavy ortired legs” | Pada PNG, “or” dan “tired” tertulis menyatu. Perlu keputusan apakah ditulis ulang menjadi dua kata. | Belum dikonfirmasi |
| P06 | Recovery & Core Restoration / eyebrow tiga kartu | “A guide restoration framework” | Wording eyebrow perlu dipastikan. Belum diganti menjadi bentuk kata lain. | Belum dikonfirmasi |
| P07 | Recovery & Core Restoration / panel “What You Can Expect”, item 02 | “Abdominal wall support & posture functional stability” | Hubungan kata “posture” dan “functional stability” perlu dipastikan. Teks tetap mengikuti PNG. | Belum dikonfirmasi |
| P08 | Pregnancy Massage & Circulation Support / kartu “Fluid & Swelling Relief” | “Reduce fluid retention and swelling, especially for leg swelling and fluid retention during pregnancy.” | Frasa fluid retention dan swelling diulang pada deskripsi yang sama. Teks tetap mengikuti PNG. | Belum dikonfirmasi |

### Pemetaan foto Pregnancy & Postpartum

Foto dipilih berdasarkan kecocokan isi dengan PNG. Nama folder tidak selalu
sama dengan layanan tempat foto itu tampil.

| Layanan | Lokasi foto | Catatan |
| --- | --- | --- |
| Pregnancy Massage & Circulation Support | `assets/images/services/Pregnancy & Postpartum/Pregnancy Massage & Circulation Support/` | Memakai pasangan foto yang sesuai PNG terbaru, menggantikan pilihan Postnatal dari instruksi sebelum koleksi desain baru tersedia. |
| Recovery & Core Restoration | `assets/images/services/Pregnancy & Postpartum/Recovery & Core Restoration/` | Dua foto yang sesuai PNG dipakai; foto alternatif tidak otomatis menjadi section tambahan. |
| Postnatal Lymphatic Drainage | Folder `assets/images/services/Pregnancy & Postpartum/POSTNATAL LYMPHATIC DRAINAGE/` | Hero `postnatal_lymphatic_drainage_hero.jpeg` dan treatment `postnatal_lymphatic_drainage_treatment.jpeg` memakai nama file yang mengikuti halaman dan section. |

## Review terbuka — 10 layanan lainnya sudah diterapkan

Bagian ini membawa temuan analisis sebelumnya dan hasil pencocokan sumber saat
implementasi. Kesepuluh halaman telah memakai data masing-masing pada template
bersama; catatan isi tetap terbuka. Teks yang ditandai dipertahankan menurut
sumber utama, dengan pengecualian penomoran otomatis yang dijelaskan pada T02.

| ID | Layanan / section | Teks atau bagian sumber | Hal yang perlu dipastikan | Keputusan pengguna |
| --- | --- | --- | --- | --- |
| L01 | Clinical Lymphatic Drainage Sydney / daftar keluhan | “Back and pelvic discomfort” dan “Rib restriction and breathing fatigue” | Keluhan serupa muncul pada desain Pregnancy. Pastikan daftar yang dimaksud untuk layanan Clinical Lymphatic. | Belum dikonfirmasi |
| L02 | Lipedema & Inflammatory Leg Care / paragraf pengantar | Paragraf tentang pregnancy, childbirth, dan C-section | Paragraf berfokus pada pemulihan setelah kehamilan, sementara heading membahas gejala Lipedema. Pastikan kecocokan paragraf dengan layanan. | Belum dikonfirmasi |
| L03 | Post-Surgical Recovery; Clinical Lymphatic Drainage Sydney; Lipedema & Inflammatory Leg Care / subjudul panel | “Many Patient Notice :” | Bentuk kata pada ketiga PNG dipertahankan di data layanan. Pastikan wording final yang diinginkan. | Belum dikonfirmasi |
| L04 | Clinical Lymphatic Drainage Sydney / heading tiga kartu | “Benefit of Lymphatic Drainage” | Kata “Benefit” berbentuk tunggal, sementara section berisi tiga manfaat. Wording asli dipertahankan. | Belum dikonfirmasi |
| L05 | Lipedema & Inflammatory Leg Care / judul dan isi | Judul memakai “Lipedema”; deskripsi kartu dan panel memakai “lipoedema” | Kedua varian ejaan mengikuti PNG. Pastikan apakah akan diseragamkan. | Belum dikonfirmasi |
| T01 | Chronic Pain, Stress & Inflammation / daftar dan tiga kartu | Pengulangan fatigue / poor sleep; kartu berisi masalah yang dirasakan | Pastikan apakah pengulangan memang diinginkan. Judul mengarah pada care atau manfaat, tetapi isi kartu menjelaskan masalah. | Belum dikonfirmasi |
| T02 | Endometriosis & Pelvic Pain Support / panel kanan | PNG memuat penomoran **01, 02, 02** | Web memakai nomor otomatis dari renderer bersama sehingga tampil **01, 02, 03**. Isi ketiga item tetap sama dengan PNG. Pastikan apakah nomor berulang pada desain memang disengaja. | Belum dikonfirmasi |
| T03 | TMJ, Jaw & Headache Treatment; Chronic Pain, Stress & Inflammation; Clinical Therapeutic Massage & Injury Recovery; Endometriosis & Pelvic Pain Support / CTA | “Ask about support for swelling, fluid retention and heavy legs” | CTA empat desain Pain memakai isi tentang swelling, fluid retention, dan heavy legs. Pastikan apakah akan memakai CTA umum atau teks khusus setiap layanan. | Belum dikonfirmasi |
| B01 | Clinical Cellulite Remodelling / “Different Types of Cellulite We Address” | **Edematous:** “Never intended to be painful, ensuring maximum comfort during your recovery.” **Fibrous:** “Carefully adapted to your specific surgery, individual needs, and healing stage.” **Hormonal:** “Safely supports tissue recovery while respecting your surgical structures.” | Deskripsi ketiga jenis membahas recovery atau surgery. Temuan muncul pada Markdown dan PNG; bukan sekadar perbedaan transkripsi. | Belum dikonfirmasi |
| B02 | Clinical Cellulite Remodelling / panel “Treatment Approaches” | Label “Headline”, “Deskripsi”, dan “Hasil”; isi “Restoring Tissue Health” dan dua paragraf hasil | Label tercetak pada PNG dan juga ada pada Markdown. Pastikan apakah label tersebut ikut ditampilkan kepada pengunjung atau hanya penanda struktur konten. | Belum dikonfirmasi |
| B03 | Lymphatic Reset & Fluid Retention Treatment / “The Protocol Integrates” | **02** “Personalised clinical electrotherapy A natural reduction in collagen production affects firmness and structural support.” **03** “Personalised clinical electrotherapy to support lymphatic stimulation and tissue metabolism” | Kedua item menyebut electrotherapy; item 02 tersambung dengan deskripsi collagen decline yang juga ada pada layanan Hormonal. Pastikan isi masing-masing item. | Belum dikonfirmasi |
| B04 | Hormonal Skin Tightening & Firmness Treatment / subjudul panel | “Treatment May Includes:” dan “Many Patient Notice:” | Tata bahasa kedua label perlu dipastikan. Belum dinormalisasi atau diganti. | Belum dikonfirmasi |
| B05 | Body Contouring / poin hero dan variasi wording lainnya | Markdown “Care built around you”; PNG “Care shaped around you” | Implementasi tiga Body Contouring memprioritaskan Markdown untuk teks, sedangkan PNG menentukan susunan visual. Karena itu Cellulite dan Hormonal menampilkan “Care built around you”. Prioritas ini belum merupakan keputusan final atas perbedaan wording; konfirmasi teks yang akan dipakai. | Belum dikonfirmasi |
| B06 | Hormonal Skin Tightening & Firmness Treatment / paragraf “Understanding Changes in Your Skin” | Markdown “skin tone, elasticity, and firmness”; PNG “skin tone, density, and firmness” | Web memakai “elasticity” mengikuti Markdown. Pastikan apakah teks final menggunakan elasticity atau density. | Belum dikonfirmasi |
| B07 | Clinical Cellulite Remodelling / subjudul panel “Treatment Approaches” | Markdown “Treatment Outcome & Process:”; PNG “Treatment Outcome & Focus :” | Web memakai “Process” mengikuti Markdown. Pastikan kata yang diinginkan; varian panel ikon dan isi di bawahnya tetap mengikuti komposisi PNG. | Belum dikonfirmasi |

**Post-Surgical Recovery** sudah diterapkan. Catatan subjudulnya tercantum pada
L03; isi lain mengikuti PNG tanpa revisi editorial. Nomor urut pada seluruh
daftar web dihasilkan renderer, sedangkan judul dan isi tersimpan di data.

## Catatan penamaan sumber

Catatan berikut membantu menemukan sumber. Ini bukan instruksi mengubah nama
layanan pada produk secara otomatis.

| Sumber | Penamaan yang ditemukan | Pemetaan |
| --- | --- | --- |
| Dropdown | “Chronic Pain, Stress & Inflammation” | PNG dan folder menambahkan “Therapy”. Nama menu belum diganti tanpa keputusan pengguna. |
| Folder desain | `Body Countoring` | Berisi tiga desain kategori **Body Contouring**. Ejaan folder asli dipertahankan. |
| File PNG Pain | “Ease the tension…feel more at ease-tamplate-1” | Desain untuk **TMJ, Jaw & Headache Treatment**, berdasarkan judul dan isi desain. Nama file tidak menjadi judul layanan baru. |

## Cara menandai keputusan

Isi kolom **Keputusan pengguna** dengan teks final, “Pertahankan sumber”, atau
rujukan teks pengganti yang jelas. Cantumkan ID catatan jika mengirim keputusan
melalui chat. Contoh: `P01 — item 04 menjadi: [teks final]`.

Keputusan konten belum dianggap selesai hanya karena halaman sudah dibuat.
Pemeriksaan struktur, tautan, atau build CSS juga tidak membuktikan bahwa teks
yang ditandai sudah disetujui.
