# Rencana perbaikan performa (Lighthouse) — InBody Clinic

**Tanggal:** 26 Oktober 2026
**Status:** Analisis selesai ✅; pekerjaan belum dikerjakan.
**Sumber laporan:** Performance Analysis pada `localhost:5173`, skor **52** (Performance) dengan temuan LCP 428 ms, INP 89 ms, reflow 136 ms, dan 107,6 kB gambar terbuang. Laporan itu dibuat dari trace di DevTools; dokumen ini menyaring ulang setiap temuan agar cocok dengan kode project saat ini.

Struktur dokumen: (1) konteks pengukuran, (2) pemetaan temuan ke kode sumber, (3) analisis akar masalah + saran perbaikan yang diadaptasi ke stack project (React + Vite + Tailwind v4 + GSAP + prerender buatan sendiri), (4) daftar tugas berurutan, (5) tabel pembandingan hasil, (6) lampiran batas lingkup.

---

## 1. Konteks pengukuran — angka `localhost:5173` harus dibaca ulang dulu

Pengukuran dilakukan pada **`npm run dev` (Vite dev server, port 5173)**, bukan pada build produksi. Dua perbedaan besar membuat sebagian angka tidak merepresentasikan kondisi produksi:

1. **Dev server tidak menjalankan prerender.** Lihat `index.html` baris 25: `<div id="app"><!--app-html--></div>`. Pada dev, Vite menyajikan template itu apa adanya — `#app` kosong, dan seluruh halaman baru muncul setelah React memuat serta merender di klien. Ini persis temuan laporan: LCP berupa node teks (`span.block`) dengan *element render delay* 423 ms, karena LCP baru ada setelah render React klien. Di produksi (`dist/`), HTML hero sudah di-prerender oleh `scripts/build/prerender.mjs`, sehingga teks hero terlihat jauh sebelum hidrasi selesai.
2. **Dev memakai React development build + ESM per-file tanpa minify.** Long task `performUnitOfWork` dan kelompok task `NAVIGATION_1` (85 ms) pada trace berasal dari mode development: React dev-mode jauh lebih lambat dari build produksi yang sudah diminify dan dikemas sebagai satu chunk 517 kB (gzip 156 kB).

Kesimpulan: skor 52 adalah angka mode dev. **Semua perbaikan di dokumen ini divalidasi pada build produksi** (T0), bukan pada dev server. Temuan yang tetap valid di kedua mode: forced reflow (§3.1), pemuatan font Google (§3.2), dan format gambar (§3.4).

Cara mengukur baseline produksi:

```powershell
$env:SITE_URL = 'https://example.test'   # wajib untuk build (sitemap/robots); nilai dummy boleh untuk uji lokal
npm run build
npm run preview                          # dist/ disajikan di http://127.0.0.1:4173/
```

Kemudian jalankan Lighthouse (DevTools → tab Lighthouse, atau `npx lighthouse http://127.0.0.1:4173/) pada preview tersebut. **Jangan** menyimpulkan performa produksi dari `localhost:5173`.

---

## 2. Pemetaan temuan → kondisi kode aktual

| # | Temuan di laporan | Status saat dicek ke kode | Bukti di kode | Berlaku di produksi? |
| --- | --- | --- | --- | --- |
| 1 | Forced reflow oleh GSAP (`_tick`, `_getComputedProperty`) serta `header-entrance.js` dan `App.jsx` | **Sebagian valid.** `App.jsx` tidak membaca geometry (`offsetWidth` dkk.) — hanya membaca `scrollX/scrollY` pada listener scroll pasif (`App.jsx:42, 97`). Yang membaca layout: `header-entrance.js:18–20` (`getClientRects()` per elemen) dan GSAP internal saat tween berjalan, akibat pola `gsap.set` + `clearProps` di `content-reveal.js:49, 63–72, 82`. | `js/features/header-entrance.js`, `js/features/content-reveal.js`, `src/App.jsx` | Ya, scale-nya kecil dan tidak bersarang (baca–tulis–baca). |
| 2 | LCP 428 ms, render delay 98,7% (teks `span.block`) | **Valid, dengan pemisahan penyebab.** Delay render mayor adalah artefak dev (tidak ada prerender). Komponen font tetap valid: stylesheet Google Fonts bersifat render-blocking di `<head>` (`index.html:16–21`), dan LCP element adalah baris pertama `<h1>` hero (`js/components/heading.jsx:23` → `<span class="block">`) memakai Cormorant Garamond **700** (`heading.jsx:9`, token `--font-display` di `css/input.css:16`). | `index.html`, `js/components/heading.jsx`, `css/input.css` | Komponen font: ya. Delay render mayor: tidak (prod sudah prerender). |
| 3 | INP 89 ms; input delay 62 ms dari long task `NAVIGATION_1` (85 ms) dan `performUnitOfWork` | **Dominan artefak dev.** React dev + hidrasi penuh tanpa minify. Pola runtime JS sendiri sudah ringan: delegasi klik satu listener di `document` (`App.jsx:65`), listener scroll pasif (`App.jsx:66`), controller hero sudah memakai double `requestAnimationFrame` (`js/features/hero-slider.js:106–107`). | `src/App.jsx`, `js/features/*.js` | Perlu pengukuran prod (T0); kecil kemungkinan INP melewati 200 ms. |
| 4 | Gambar 107,6 kB terbuang (format legacy) | **Valid penuh.** Tiga gambar hero hanya JPEG: `home_slider_1.jpg` 189 kB, `home_slider_2.jpg` 131 kB, `home_slider_3.jpg` 147 kB (467 kB total). Galeri klinik sudah memakai `<picture>` + WebP (`js/sections/clinic/index.jsx:20–22`, `js/sections/method/index.jsx:14–16`), tetapi hero/about/speciality masih `<img>` JPEG tanpa sumber WebP (`js/sections/home/hero.jsx:20`, `js/sections/about/index.jsx:46`, `js/sections/speciality/index.jsx:19`). | `assets/images/home/*.jpg`, section components | Ya — dan terasa lebih berat di jaringan nyata. |

Angka "107,6 kB wasted" konsisten dengan kondisi di atas: pada viewport yang diuji, gambar yang relevan adalah slide hero pertama (JPEG 189 kB). Konversi WebP pada kualitas setara biasanya memangkas 40–60% ukuran — sekitar 80–110 kB terselamatkan untuk slide pertama, ditambah ±300 kB untuk dua slide lain dan gambar route lain.

---

## 3. Analisis per masalah & saran perbaikan

### 3.1 Forced reflow & layout thrashing

**Apa yang terjadi.** Browser menghitung ulang layout setiap kali kode membaca geometry (`getClientRects`, `offsetWidth`, `getComputedStyle`) setelah DOM/style berubah. GSAP membaca ini secara internal: setiap awal tween `gsap.to(...)` membaca computed style properti target (`_getComputedProperty`), dan `clearProps` membaca ulang nilai akhir untuk memulihkan inline style. Nama `_tick` dan `_getComputedProperty` di trace adalah fungsi internal GSAP — artinya **pola tween kita yang memaksa GSAP membaca layout**, bukan pemanggilan GSAP pada momen yang salah.

**Lokasi konkret di project:**

1. `js/features/header-entrance.js:18–20` — filter elemen terlihat lewat `element.getClientRects().length > 0` untuk `[data-contact-item]` dan `[data-nav-intro]`. Pembacaan dilakukan di satu batch sebelum penulisan (`gsap.set` baris 26) — jadi *satu* forced reflow, bukan thrashing. Namun ia berjalan di dalam `useLayoutEffect` (`src/App.jsx:75`) tepat setelah commit hidrasi React, sehingga reflow itu menumpuk di frame pertama.
2. `js/features/content-reveal.js:63–72` — inisialisasi menyembunyikan seluruh target dengan `gsap.set(element, { opacity: 0, y: 16 })` (batch tulis dalam satu `gsap.context` — pola yang baik). Masalahnya di tahap berikutnya: tiap grup direveal dengan `gsap.to(batch, ...)` (baris 43–53) yang membaca computed style saat tween mulai, lalu `clearProps` (baris 49 dan 82) membaca ulang saat tween selesai. Pola *set → to → clearProps* adalah sumber utama `_getComputedProperty` di trace.
3. Yang **tidak** bermasalah dan tidak perlu disentuh:
   - `src/App.jsx` — hanya `scrollX/scrollY` pada listener pasif dan penulisan `title/dataset/className`; tidak ada pembacaan geometry.
   - `hero-slider.js` — pergantian slide murni atribut `data-position` + transisi CSS; penjadwalannya sudah rapi (double rAF, baris 106–107).
   - `hero.jsx` — tidak membaca layout sama sekali.

**Saran perbaikan (diadaptasi ke stack project, sesuai catatan laporan bahwa saran generik jangan diterapkan lake as CSS literal):**

1. **Tunda `start()` header-entrance sampai setelah paint pertama.** Saat ini `start()` dipanggil langsung dari layout effect (`header-entrance.js:44`). Gunakan double `requestAnimationFrame` — pola yang sudah dipakai `hero-slider.js:106–107`, jadi konsisten dengan kodebase:

   ```js
   // js/features/header-entrance.js
   let frame;
   function stop() {
     stopped = true;
     if (frame) cancelAnimationFrame(frame); frame = undefined;
     context?.revert();
   }
   function schedule() {
     // Dua frame: mulai setelah paint pertama, bukan di tengah commit hidrasi.
     frame = requestAnimationFrame(() => { frame = requestAnimationFrame(start); });
   }
   // Ganti pemanggilan `start();` (baris 44) menjadi `schedule();`
   ```

   Pembacaan `getClientRects()` boleh tetap ada (perlu untuk deteksi visibilitas) — kini berjalan setelah paint dan tidak menumpuk dengan commit React. Trade-off: entrance mulai ±2 frame lebih lambat; tidak terlihat mengingat total durasi ~0,8 s.

2. **Hindari pembacaan computed saat reveal: `gsap.to` → `gsap.fromTo`.** Di `content-reveal.js`, nilai awal sudah pasti (diset saat `start()`), jadi tween reveal bisa memberi nilai awal eksplisit sehingga GSAP tidak perlu membaca computed style:

   ```js
   // Sebelum (GSAP membaca computed saat tween mulai):
   gsap.to(batch, { opacity: 1, ...(group.fade ? {} : { y: 0 }), ... });
   // Sesudah (nilai awal eksplisit, tanpa baca layout):
   gsap.fromTo(batch,
     { opacity: 0, ...(group.fade ? {} : { y: 16 }) },
     { opacity: 1, ...(group.fade ? {} : { y: 0 }),
       duration: 0.85, ease: 'power2.out', stagger: 0.12,
       clearProps: group.fade ? 'opacity' : 'opacity,transform',
       onComplete: () => { ... } });
   ```

   Konsekuensi: mock GSAP di `scripts/check/check-home-reveal.mjs` perlu ditambah metode `fromTo` (fixture saat ini hanya punya `set`, `to`, `killTweensOf`). Lihat T1.
   `gsap.set` awal di `start()` (baris 68) tetap dipertahankan: penyembunyian sebelum-intersection tetap wajib, dan pindah penyembunyian ke CSS statis (`opacity-0` Tailwind) **terlarang** karena konten akan hilang permanen saat JavaScript gagal — desain sekarang sudah benar: sembunyi hanya ketika JS + GSAP aktif.

3. **Sisakan `clearProps`.** Menghapusnya meninggalkan inline style permanen dan menyulitkan `context.revert()`. Dampaknya cuma satu read kecil per elemen per batch — tidak layak dihilangkan dengan risiko fungsional.

4. **(Opsional) `will-change` hanya pada elemen yang dianimasikan di area pertama layar**, dan hanya jika trace produksi masih menunjukkan paint di tengah animasi:

   ```jsx
   // js/sections/home/hero.jsx — slide memakai transisi translate:
   <article className="... motion-safe:will-change-transform ...">
   ```

   Jangan menyebarkan `will-change` ke semua kartu reveal — biaya memori layer melebihi manfaat.

**Yang dilarang dari saran generik laporan:** penyembunyian konten via CSS statis, dan `force3D: true` global (GSAP sudah otomatis menerjemahkan animasi transform; opacity tidak membutuhkan itu).

### 3.2 LCP & pemuatan font

**Apa yang terjadi.** LCP element adalah teks: `<h1 class="font-display font-bold">` hero — baris pertama `<span class="block">Women's Health.</span>` (`heading.jsx:20–27`). Font untuk paint-nya adalah **Cormorant Garamond 700** (token `--font-display`, `css/input.css:16`; class `font-bold` di `heading.jsx:9`). Saat ini font diambil dari pihak ketiga:

- `index.html:16–21` — `preconnect` ke `fonts.googleapis.com`/`fonts.gstatic.com` + satu **stylesheet render-blocking**: `css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap`.
- Rantainya: HTML → CSS Google → daftar `@font-face` ber-`unicode-range` (banyak berkas) → woff2 per subset. Semua origin ketiga; di jaringan nyata ini 2–3 hop sebelum objek font LCP terunduh.
- `display=swap` sudah tercantum di URL (baik): teks memakai fallback lalu swap. Jadi di produksi (HTML prerender) LCP terpental cepat dengan fallback; pekerjaan kita adalah **melepas origin ketiga dan membuat font final tiba cepat pula**.
- Di dev, delay render mayor berasal dari §1 (tidak ada prerender) — bukan font semata.

**Saran perbaikan: self-host font via Fontsource (rekomendasi utama).**

Font tidak butuh jaringan runtime; Vite akan mengemitter berkas woff2 sebagai asset lokal yang ter-bundle bersama stylesheet (satu origin, satu hop, cacheable). CSS Fontsource sudah `font-display: swap`, dan subsets latin/latin-ext ikut otomatis via `unicode-range`.

Langkah:

1. **Audit bobot yang benar-benar terpakai** sebelum memilih berkas, agar tidak menambah beban sia-sia:
   ```powershell
   Select-String -Path js\components\*.jsx,js\sections\**\*.jsx,js\layouts\*.js,src\*.jsx,js\pages\*.jsx -Pattern 'font-(light|normal|medium|semibold|bold)|italic' -AllMatches
   ```
   Perkiraan awal dari token dan class yang terlihat di kode: Cormorant Garamond **600 (section/profile heading) + 700 (hero h1) + italic 600/700** (aksen italic pada Heading: `text-clinic-sage italic`), Montserrat **300/400/500/600/700**.
2. Pasang Fontsource untuk kombinasi itu saja:
   ```powershell
   npm i @fontsource/cormorant-garamond @fontsource/montserrat
   ```
   lalu impor di `src/entry-client.jsx` (bersebelahan dengan `import { gsap } from 'gsap'`):
   ```js
   import '@fontsource/cormorant-garamond/600.css';
   import '@fontsource/cormorant-garamond/700.css';
   import '@fontsource/cormorant-garamond/600-italic.css';
   import '@fontsource/cormorant-garamond/700-italic.css';
   import '@fontsource/montserrat/300.css';
   import '@fontsource/montserrat/400.css';
   import '@fontsource/montserrat/500.css';
   import '@fontsource/montserrat/600.css';
   import '@fontsource/montserrat/700.css';
   ```
   Token Tailwind tidak diubah: `--font-display: "Cormorant Garamond"` dan `--font-sans: "Montserrat"` sama dengan nama family Fontsource.
3. Hapus `preconnect` + stylesheet Google dari `index.html:16–21`.
4. `npm run build`; catat woff2 yang di-emitter di `dist/assets/` dan pastikan bereferensi dalam stylesheet ter-bundle (cek cepat: preview lalu tab Network filter Font).
5. (Opsional, hanya bila terukur perlu) **Preload font LCP (Cormorant 700 latin).** Karena Vite meng-hash nama berkas, ini butuh salah satu dari: link preload yang dituliskan langkah build pasca tahu URL ter-hash, atau plugin/static-copy dengan nama stabil (perhatikan `vite.config.js` memakai `publicDir: false`, jadi file statis dengan nama stabil bukan jalur bawaan). Lakukan hanya jika Lighthouse prod masih menandai "font swap meleset dari LCP" — tanpa bukti itu tapi kompleksitas tidak sepadan.
6. Alternatif *minimum* apabila self-host ditunda: biarkan stylesheet Google tetapi pastikan `preconnect` tersisa (sudah ada). Ini memangkas sebagian waterfall namun tetap bergantung origin ketiga — simpang kode terakhir yang tidak disarankan.

Adaptasi snipet laporan (`rel="preload"` + `font-display: swap`): `font-display` sudah ditangani Fontsource/`display=swap`, sehingga pekerjaan nyatanya adalah langkah 1–3 di atas.

### 3.3 Long task & INP

**Apa yang terjadi.** INP 89 ms masih dalam kategori baik (ambang "good" < 200 ms), tetapi input delay 62 ms menunjukkan frame tersumbat task panjang saat hidrasi. Di trace dev, task itu adalah React `performUnitOfWork` (render halaman penuh dalam satu pass) plus eksekusi modul — keduanya jauh lebih murah di produksi (§1). Kondisi produksi: satu chunk 517 kB (gzip 156 kB) berisi React + GSAP + seluruh halaman.

**Saran perbaikan (valid lintas mode, tanpa refactoring arsitektur):**

1. **Utamakan pengukuran produksi** (T0). Jangan mengoptimasi dari angka dev.
2. **Pecah vendor GSAP ke chunk terpisah** untuk keuntungan cache jangka panjang. Opsi yang persis direkomendasikan output build untuk stack ini (Vite 8/Rolldown):
   ```js
   // vite.config.js
   build: {
     outDir: 'dist',
     rolldownOptions: { output: { codeSplitting: true } },
   },
   ```
   Efek: chunk GSAP menjadi berkas stabil yang tidak perlu divalidasi ulang saat deploy konten baru.
3. **Jangan pindah inisialisasi controller ke `setTimeout(0)`** seperti saran generik laporan. `page.init()` dipasang di `useLayoutEffect` (`App.jsx:74`) justru agar tidak flicker; setTimeout memperkenalkan race visual tanpa bukti kebutuhan di produksi. Satu-satunya penjadwalan ulang yang dianjurkan adalah §3.1 langkah 1 (double rAF pada entrance — supaya tidak menumpuk commit hidrasi).
4. Listener scroll `rememberScroll` (`App.jsx:66`) sudah pasif dan murah (menyimpan pasangan angka ke `Map`); tidak perlu debounce.
5. Lahap jangan: memecah halaman per-section dengan `React.lazy`. Hidrasi tetap membutuhkan semua section, jadi split tambahan hanya menambah waterfall tanpa mengurangi pekerjaan first load. Chunking vendor (poin 2) cukup.

### 3.4 Gambar: format & ukuran

**Kondisi di kode (bukan hanya di laporan):**

- **Hero (Home):** `<img src={assetUrl(slide.image.src)} fetchPriority="high">` (`js/sections/home/hero.jsx:19–21`), sumber JPEG murni dari `js/data/hero-slides.js:19, 36, 54`. Ukuran: 189 / 131 / 147 kB. Skala `width/height` sudah lengkap (anti CLS) — hanya formatnya yang belakangan.
- **Galeri klinik:** sudah pola terbaik — `<picture>` + `<source type="image/webp">` + JPEG fallback + `loading="lazy"` + `decoding="async"` (`js/sections/clinic/index.jsx:20–22`); Method juga `<picture>` (`js/sections/method/index.jsx:14–16`).
- **About / Service / Speciality:** masih `<img>` JPEG. `about/index.jsx:46` (profil `loading="eager"`, `fetchPriority="high"` untuk indeks 0), `speciality/index.jsx:19` (hero, `fetchPriority="high"`), `js/sections/service/index.jsx:15` (hero detail service, `fetchPriority="high"`) — hotspot JPEG yang sama seperti hero Home.
- Fallback JPEG galeri tidak dibatasi ukurannya: `clinic_waiting_lounge.jpeg` **1,18 MB** dari total 36 berkas JPEG 5,4 MB. Browser modern mengunduh varian WebP-nya, jadi fallback ini jarang diambil — tetapi menyembul besar ke repo/dist.

**Saran perbaikan:**

1. **Konversi tiga gambar hero ke WebP (dengan fallback JPEG):**
   - Pengukuran mikrot target: varian `w=900` dan `w=1600` per slide, `q≈78–82`; fallback tetap `.jpg` yang ada. Estimasi: slide 1 dari 189 kB menjadi sekitar 90–110 kB; slide 2/3 sekitar separuhnya.
   - Tambahkan field data di `js/data/hero-slides.js`, misalnya `image.webpSources: [{ src: '…-1600.webp' }, { src: '…-900.webp' }]`.
   - Ubah `HeroImage` (`js/sections/home/hero.jsx:19–21`) menjadi `<picture>`:
     ```jsx
     function HeroImage({ slide, primary, className }) {
       const fallback = <img className={`absolute inset-0 block size-full object-cover ${className}`}
         src={assetUrl(slide.image.src)} alt={slide.image.alt}
         width={slide.image.width} height={slide.image.height}
         fetchPriority={primary ? "high" : undefined} decoding={primary ? undefined : "async"} />;
       if (!slide.image.webpSources?.length) return fallback;
       const widths = slide.image.webpSources.map(s => assetUrl(s.src)).join(', ');
       return <picture className="absolute inset-0 block size-full">
         <source type="image/webp" srcSet={widths} fetchPriority={primary ? "high" : undefined} />
         {fallback}
       </picture>;
     }
     ```
     (Pastikan atribut `fetchPriority`/param lewat ketangkasan: atribut React dinamai `fetchPriority`; pada `<source>` gunakan bila didukung, atau biarkan fallback `<img>` saja memakai hint — praktik aman.)
   - `sizes` referensi untuk hero (dari grid `hero.jsx`: mobile full-width, `wide:` dua kolom): `"(min-width: 68.8125rem) 78vw, 100vw"` — verifikasi visual saat implementasi.
   - **`scripts/check/check-pages.mjs` menyapu seluruh `srcset`** dan menuntut berkas target ada di `dist/` — tes ini otomatis menjadi pengaman agar varian WebP tidak berujung link mati.
2. **Konversi gambar hero route lain** (yang `fetchPriority="high"`): profil Saila (`about/index.jsx:46`), speciality hero (`speciality/index.jsx:19`), service hero (`service/index.jsx:15`). Gunakan pola `<picture>` yang sama dengan data per komponen.
3. **Prioritas rendah:** kompres ulang fallback JPEG galeri ke `q≈80` mulai dari yang terbesar (`clinic_waiting_lounge.jpeg` 1,18 MB). Dampak skor kecil (browser modern ambil WebP), manfaatnya di repo/dist dan pengguna browser lama.
4. **AVIF tidak wajib.** Pilih WebP agar pipeline konversi sederhana; pertimbangkan AVIF hanya bila hasil WebP pada q80 masih melebihi ~100 kB per gambar utama.
5. Alat konversi bebas (squoosh/cwebp/sharp-cli); dokumen ini sengaja tidak mengikat tool spesifik.

**Yang tidak perlu dari saran generik:** `srcset` untuk logo PNG kecil (16 kB — biarkan), atau memaksa AVIF untuk semua.

### 4. Daftar tugas (urutan mengikuti urutan masalah)

> Setiap tugas punya kriteria selesai dan pengukurannya. Semua pekerjaan T1–T4 dikerjakan **setelah** baseline produksi T0 disimpan, dan dibandingkan pada T5 agar perbandingan sehat.

### T0 — Baseline produksi (prasyarat)
- [ ] Jalankan `$env:SITE_URL='https://example.test'; npm run build; npm run preview`.
- [ ] Jalankan Lighthouse (desktop & mobile) pada `http://127.0.0.1:4173/`; simpan: Performance/LCP/INP/TBT, keluhan utama, transfer CSS/JS/IMG.
- [ ] Isi kolom "Sebelum (prod)" pada tabel §5.
**Selesai bila:** angka baseline tercantum di dokumen; `npm test` dan `npm run test:home-reveal` hijau.
**Catatan:** angka dev (`localhost:5173`) dipertahankan hanya sebagai data laporan awal, bukan dasar keputusan.

### T1 — Ruang reflow (urutan masalah 1)
- [ ] `header-entrance.js`: callback `start()` ke double `requestAnimationFrame` (§3.1 langkah 1) dan batalkan frame pada `stop()`.
- [ ] `content-reveal.js`: tween reveal menjadi `gsap.fromTo` (§3.1 langkah 2).
- [ ] Tambah `fromTo` ke mock GSAP di `scripts/check/check-home-reveal.mjs` agar skenario stagger/reveal tetap menguji jalur yang sama.
- [ ] `npm run test:home-reveal`, `npm test` (output HTML tidak boleh berubah: asertia `data-content-reveal-state`, timing, dan cleanup harus tetap lulus).
- [ ] (Opsional, hanya bila trace prod menunjuk paint) `motion-safe:will-change-transform` pada elemen hero.
**Selesai bila:** Entrance tidak lagi memaksa reflow di tengah commit hidrasi; semua tes hijau.
**Estimasi dampak prod:** kecil–sedang; dibayar murah, dilakukan lebih dahulu karena menyentuh jalur first paint.

### T2 — Font self-host (urutan masalah 2)
- [ ] Audit bobot terpakai (perintah §3.2 langkah 1) dan finalisasi daftar berkas.
- [ ] `npm i @fontsource/cormorant-garamond @fontsource/montserrat`, impor CSS per-weight di `src/entry-client.jsx` (§3.2 langkah 2); lepas impor weight yang ternyata tidak dipakai.
- [ ] Hapus `preconnect` + stylesheet Google `index.html:16–21`.
- [ ] `npm run build`: verifikasi tanda `dist/assets/*.woff2` di-emitter dan direferensikan stylesheet ter-bundle; `npm test` harus tetap hijau.
**Selesai bila:** Lighthouse prod tidak lagi menandai fonts.googleapis.com/gstatic; heading tetap di-render Cormorant/Montserrat visual sama.
**Estimasi dampak:** menghapus satu origin pihak ketiga + stylesheet render-blocking remote; terasa di jaringan nyata (dev localhost hampir tidak menunjukkan selisihnya).

### T3 — Long task & chunk vendor (urutan masalah 3)
- [ ] `vite.config.js`: tambah `rolldownOptions.output.codeSplitting: true` (§3.3 langkah 2).
- [ ] `npm run build`: catat daftar berkas `dist/assets/` baru (chunk GSAP terpisah) di kolom sesudah tabel §5.
- [ ] `npm test`, `npm run test:home-reveal`.
- [ ] Larangan (lihat §3.3 langkah 5): tanpa `React.lazy` per-section, tanpa service worker.
**Selesai bila:** warning chunk >500 kB hilang; hydration sama perilakunya (tes hijau).
**Estimasi:** cache jangka panjang untuk vendor; skor naik kecil, TBT prod turun sedikit.

### T4 — Gambar (urutan masalah 4) — dampak terbesar di jaringan nyata
- [ ] Konversi `home_slider_{1,2,3}.jpg` → WebP `w=900` + `w=1600` `q≈80` ke `assets/images/home/` (`*-900.webp`, `*-1600.webp`; simpan fallback `.jpg`).
- [ ] Field WebP di `js/data/hero-slides.js` + ubah `HeroImage` menjadi `<picture>` + `sizes` (§3.4 langkah 1).
- [ ] Konversi gambar hero route lain (`about` indeks 0, `speciality` hero, `service` hero) dengan pola `<picture>` yang sama.
- [ ] (Rendah) kompres ulang fallback JPEG galeri mulai dari `clinic_waiting_lounge.jpeg` (1,18 MB).
- [ ] `npm run build` + `npm test` — link sweep menjaga semua target `srcset` benar ada.
**Selesai bila:** Lighthouse prod kategori "Serve images in modern formats" hilang; transfer gambar Home turun dari ±467 kB hero ke ~250 kB.
**Estimasi dampak:** menghilangkan 107,6 kB wasted pada temuan awal dan mengurangi ±200–300 kB transfer nyata di Home + route lain.

### T5 — Verifikasi akhir & pembandingan
- [ ] Ulangi Lighthouse prod (prosedur T0) setelah T1–T4.
- [ ] Isi kolom "Sesudah (prod)" di §5.
- [ ] Regresi fungsi/aksesibilitas: `npm test`, `npm run test:home-reveal`; bila Playwright tersedia (lokal/CI): `npm run test:navigation`, `npm run test:header`.
- [ ] Pastikan skor Accessibility & SEO tidak turun (perubahan di atas seharusnya tidak menyentuh keduanya).

---

## 5. Tabel pembandingan hasil (diisi dari T0/T5)

| Metrik | Sebelum (dev `:5173`, laporan awal) | Sebelum (prod `:4173`, T0) | Sesudah (T5) |
| --- | --- | --- | --- |
| Performance score | 52 | — | — |
| LCP | 428 ms (render delay 423 ms) | — | — |
| INP | 89 ms | — | — |
| Layout / forced reflow | 136 ms | — | — |
| "Serve images in modern formats" | 107,6 kB wasted | — | — |
| Transfer JS pertama (gzip) | n/a (dev) | — | — |
| Transfer gambar hero Home | JPEG 189 kB (slide 1) | — | — |
| Font origin | Google (remote) | — | lokal |

---

## 6. Lampiran — batas lingkup dan catatan samping

**Catatan samping (tidak masuk daftar tugas karena bukan temuan Lighthouse):**
- `dist/assets/Phosphor-*.svg` sebesar **2,99 MB** adalah fallback format font SVG dari `@phosphor-icons/web` yang hampir tak pernah diunduh browser modern, tetapi ikut terkirim ke dist. Bisa dipertimbangkan sebagai tugas pembersihan dist belakangan.
- Chunk utama 517 kB (156 kB gzip) memuat GSAP bersama React (`entry-client.jsx` mengimpor `gsap`). Penanganan yang diambil dalam lingkup ini hanya `codeSplitting` (T3); lazy GSAP tidak disarankan karena entrance membutuhkannya pada frame pertama.

**Yang sengaja TIDAK dianjuran (anti over-engineering):**
- Menyembunyikan konten reveal lewat CSS statis (merusak progressive enhancement yang sudah dibangun dengan baik).
- `React.lazy` per section, virtualization, dan service worker untuk situs statis seukuran ini.
- Menjadikan Lighthouse pada dev server sebagai dasar keputusan performa.
