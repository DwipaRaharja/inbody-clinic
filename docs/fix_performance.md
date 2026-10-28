# Rencana perbaikan performa (Lighthouse) — InBody Clinic

**Tanggal:** 26 Oktober 2026
**Status:** Analisis selesai ✅; baseline produksi (T0) terukur — kolom "Sebelum" tabel §5 terisi; pengerjaan T1–T5 belum dimulai.
**Sumber laporan:** (1) Performance Analysis dev `localhost:5173` — skor **52** dengan LCP 428 ms (teks, render delay 423 ms), INP 89 ms, reflow 136 ms, 107,6 kB gambar terbuang; (2) baseline produksi T0 yang tersimpan mentah di `docs/analisis.md` — dua run Desktop: build lokal `npm run preview` (`:4173`, skor 73) dan situs langsung GitHub Pages (skor 77, median). Keduanya diukur **tanpa mode incognito**; angka Mobile pada run GitHub Pages hanya estimasi — lihat caveat §5.

Struktur dokumen: (1) konteks pengukuran, (2) pemetaan temuan ke kode sumber, (3) analisis akar masalah + saran perbaikan yang diadaptasi ke stack project (React + Vite + Tailwind v4 + GSAP + prerender buatan sendiri), (4) daftar tugas berurutan, (5) tabel pembandingan hasil, (6) lampiran batas lingkup.

---

## 1. Konteks pengukuran — angka `localhost:5173` harus dibaca ulang dulu

Pengukuran dilakukan pada **`npm run dev` (Vite dev server, port 5173)**, bukan pada build produksi. Dua perbedaan besar membuat sebagian angka tidak merepresentasikan kondisi produksi:

1. **Dev server tidak menjalankan prerender.** Lihat `index.html` baris 25: `<div id="app"><!--app-html--></div>`. Pada dev, Vite menyajikan template itu apa adanya — `#app` kosong, dan seluruh halaman baru muncul setelah React memuat serta merender di klien. Ini persis temuan laporan: LCP berupa node teks (`span.block`) dengan _element render delay_ 423 ms, karena LCP baru ada setelah render React klien. Di produksi (`dist/`), HTML hero sudah di-prerender oleh `scripts/build/prerender.mjs`, sehingga teks hero terlihat jauh sebelum hidrasi selesai.
2. **Dev memakai React development build + ESM per-file tanpa minify.** Long task `performUnitOfWork` dan kelompok task `NAVIGATION_1` (85 ms) pada trace berasal dari mode development: React dev-mode jauh lebih lambat dari build produksi yang sudah diminify dan dikemas sebagai satu chunk 517 kB (gzip 156 kB).

Kesimpulan: skor 52 adalah angka mode dev. **Semua perbaikan di dokumen ini divalidasi pada build produksi** (T0), bukan pada dev server. Temuan yang tetap valid di kedua mode: forced reflow (§3.1), pemuatan font Google (§3.2), dan format gambar (§3.4).

Cara mengukur baseline produksi:

```powershell
$env:SITE_URL = 'https://example.test'   # wajib untuk build (sitemap/robots); nilai dummy boleh untuk uji lokal
npm run build
npm run preview                          # dist/ disajikan di http://127.0.0.1:4173/
```

Kemudian jalankan Lighthouse (DevTools → tab Lighthouse, atau CLI `npx lighthouse http://127.0.0.1:4173/`) pada preview tersebut. **Jangan** menyimpulkan performa produksi dari `localhost:5173`.

---

## 2. Pemetaan temuan → kondisi kode aktual

| #   | Temuan di laporan                                                                                  | Status saat dicek ke kode                                                                                                                                                                                                                                                                                                                                                                                                                                  | Bukti di kode                                                                    | Berlaku di produksi?                                                 |
| --- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | Forced reflow oleh GSAP (`_tick`, `_getComputedProperty`) serta `header-entrance.js` dan `App.jsx` | **Sebagian valid.** `App.jsx` tidak membaca geometry (`offsetWidth` dkk.) — hanya membaca `scrollX/scrollY` pada listener scroll pasif (`App.jsx:42, 97`). Yang membaca layout: `header-entrance.js:18–20` (`getClientRects()` per elemen) dan GSAP internal saat tween berjalan, akibat pola `gsap.set` + `clearProps` di `content-reveal.js:49, 63–72, 82`.                                                                                              | `js/features/header-entrance.js`, `js/features/content-reveal.js`, `src/App.jsx` | Ya — terukur nyata di prod: main-thread 5,4 s dengan Style & Layout 697 ms dan satu task layout 140 ms (run GitHub Pages, §5).           |
| 2   | LCP 428 ms, render delay 98,7% (teks `span.block`)                                                 | **Valid, dengan pemisahan penyebab.** Delay render mayor adalah artefak dev (tidak ada prerender). Komponen font tetap valid: stylesheet Google Fonts bersifat render-blocking di `<head>` (`index.html:16–21`), dan LCP element adalah baris pertama `<h1>` hero (`js/components/heading.jsx:23` → `<span class="block">`) memakai Cormorant Garamond **700** (`heading.jsx:9`, token `--font-display` di `css/input.css:16`).                            | `index.html`, `js/components/heading.jsx`, `css/input.css`                       | Ya, tetapi elemennya berganti: di prod LCP element adalah **gambar hero slider** (`img.absolute`), bukan teks — render-blocking fonts.googleapis ≈790–800 ms + index.css ≈300 ms tetap menahan paint awal (FCP 3,5–3,8 s). |
| 3   | INP 89 ms; input delay 62 ms dari long task `NAVIGATION_1` (85 ms) dan `performUnitOfWork`         | **Bukan hanya artefak dev.** React dev memang berlebihan (hidrasi tanpa minify), tetapi angka prod membuktikan blokir utama yang nyata (lihat kolom terakhir). Pola runtime JS sendiri sudah ringan: delegasi klik satu listener di `document` (`App.jsx:65`), listener scroll pasif (`App.jsx:66`), controller hero sudah memakai double `requestAnimationFrame` (`js/features/hero-slider.js:106–107`).                                                                                                                                                | `src/App.jsx`, `js/features/*.js`                                                | Ya — valid di prod: TBT Desktop 250 ms (preview lokal) hingga 1.130 ms (GitHub Pages). Dugaan awal "kecil kemungkinan melewati 200 ms" terlalu optimis.   |
| 4   | Gambar 107,6 kB terbuang (format legacy)                                                           | **Valid penuh.** Tiga gambar hero hanya JPEG: `home_slider_1.jpg` 189 kB, `home_slider_2.jpg` 131 kB, `home_slider_3.jpg` 147 kB (467 kB total). Galeri klinik sudah memakai `<picture>` + WebP (`js/sections/clinic/index.jsx:20–22`, `js/sections/method/index.jsx:14–16`), tetapi hero/about/speciality masih `<img>` JPEG tanpa sumber WebP (`js/sections/home/hero.jsx:20`, `js/sections/about/index.jsx:46`, `js/sections/speciality/index.jsx:19`). | `assets/images/home/*.jpg`, section components                                   | Ya — prod live mengirim 495 kB gambar (12 request) vs 209,8 kB di preview lokal (7 request); wasted terukur ~157–168 KiB.                       |

Angka "107,6 kB wasted" konsisten dengan kondisi di atas: pada viewport yang diuji, gambar yang relevan adalah slide hero pertama (JPEG 189 kB). Konversi WebP pada kualitas setara biasanya memangkas 40–60% ukuran — sekitar 80–110 kB terselamatkan untuk slide pertama, ditambah ±300 kB untuk dua slide lain dan gambar route lain. Audit prod T0 bahkan mengukur wasted **~157 KiB (preview lokal) hingga ~168 KiB (live)** hanya untuk slider pertama — sebanding dengan estimasi ini.

---

## 3. Analisis per masalah & saran perbaikan

### 3.1 Forced reflow & layout thrashing

**Apa yang terjadi.** Browser menghitung ulang layout setiap kali kode membaca geometry (`getClientRects`, `offsetWidth`, `getComputedStyle`) setelah DOM/style berubah. GSAP membaca ini secara internal: setiap awal tween `gsap.to(...)` membaca computed style properti target (`_getComputedProperty`), dan `clearProps` membaca ulang nilai akhir untuk memulihkan inline style. Nama `_tick` dan `_getComputedProperty` di trace adalah fungsi internal GSAP — artinya **pola tween kita yang memaksa GSAP membaca layout**, bukan pemanggilan GSAP pada momen yang salah.

**Lokasi konkret di project:**

1. `js/features/header-entrance.js:18–20` — filter elemen terlihat lewat `element.getClientRects().length > 0` untuk `[data-contact-item]` dan `[data-nav-intro]`. Pembacaan dilakukan di satu batch sebelum penulisan (`gsap.set` baris 26) — jadi _satu_ forced reflow, bukan thrashing. Namun ia berjalan di dalam `useLayoutEffect` (`src/App.jsx:75`) tepat setelah commit hidrasi React, sehingga reflow itu menumpuk di frame pertama.
2. `js/features/content-reveal.js:63–72` — inisialisasi menyembunyikan seluruh target dengan `gsap.set(element, { opacity: 0, y: 16 })` (batch tulis dalam satu `gsap.context` — pola yang baik). Masalahnya di tahap berikutnya: tiap grup direveal dengan `gsap.to(batch, ...)` (baris 43–53) yang membaca computed style saat tween mulai, lalu `clearProps` (baris 49 dan 82) membaca ulang saat tween selesai. Pola _set → to → clearProps_ adalah sumber utama `_getComputedProperty` di trace.
3. Yang **tidak** bermasalah dan tidak perlu disentuh:
   - `src/App.jsx` — hanya `scrollX/scrollY` pada listener pasif dan penulisan `title/dataset/className`; tidak ada pembacaan geometry.
   - `hero-slider.js` — pergantian slide murni atribut `data-position` + transisi CSS; penjadwalannya sudah rapi (double rAF, baris 106–107).
   - `hero.jsx` — tidak membaca layout sama sekali.

**Saran perbaikan (diadaptasi ke stack project — sesuai catatan laporan bahwa saran generik harus diadaptasi, bukan diterapkan sebagaimana adanya):**

1. **Tunda `start()` header-entrance sampai setelah paint pertama.** Saat ini `start()` dipanggil langsung dari layout effect (`header-entrance.js:44`). Gunakan double `requestAnimationFrame` — pola yang sudah dipakai `hero-slider.js:106–107`, jadi konsisten dengan kodebase:

   ```js
   // js/features/header-entrance.js
   let frame;
   function stop() {
     stopped = true;
     if (frame !== undefined) {
       cancelAnimationFrame(frame);
       frame = undefined;
     }
     context?.revert();
   }
   function schedule() {
     // Dua frame: mulai setelah paint pertama, bukan di tengah commit hidrasi.
     frame = requestAnimationFrame(() => {
       frame = requestAnimationFrame(start);
     });
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
- **Hasil prod (T0)** mengonfirmasi: stylesheet Google terukur render-blocking **~790–800 ms** pada kedua run, dan total transfer font 125,7 kB (preview lokal, campuran gstatic + localhost[Phosphor]) hingga **370 kB** (GitHub Pages, murni gstatic) — di live berarti hampir tiga kali lipat. FCP 3,5–3,8 s terjebak di belakang rantai ini.
- Di **produksi** LCP element bergeser ke **gambar hero slider** (`img.absolute`, detail di §3.4) karena HTML sudah ter-prerender. Peran font di prod tetap: menahan FCP sebagai stylesheet render-blocking dan memperlambat swap ke font final.

**Saran perbaikan: self-host font via Fontsource (rekomendasi utama).**

Font tidak butuh jaringan runtime; Vite akan meng-emit berkas woff2 sebagai asset lokal yang ter-bundle bersama stylesheet (satu origin, satu hop, cacheable). CSS Fontsource sudah `font-display: swap`, dan subsets latin/latin-ext ikut otomatis via `unicode-range`.

Langkah:

1. **Audit bobot yang benar-benar terpakai** sebelum memilih berkas, agar tidak menambah beban sia-sia:
   ```powershell
   Get-ChildItem -Path js, src -Recurse -Include *.jsx, *.js | Select-String -Pattern 'font-(light|normal|medium|semibold|bold)|italic' -AllMatches
   ```
   Perkiraan awal dari token dan class yang terlihat di kode: Cormorant Garamond **600 (section/profile heading) + 700 (hero h1) + italic 600/700** (aksen italic pada Heading: `text-clinic-sage italic`), Montserrat **300/400/500/600/700**.
2. Pasang Fontsource untuk kombinasi itu saja:
   ```powershell
   npm i @fontsource/cormorant-garamond @fontsource/montserrat
   ```
   lalu impor di `src/entry-client.jsx` (bersebelahan dengan `import { gsap } from 'gsap'`):
   ```js
   import "@fontsource/cormorant-garamond/600.css";
   import "@fontsource/cormorant-garamond/700.css";
   import "@fontsource/cormorant-garamond/600-italic.css";
   import "@fontsource/cormorant-garamond/700-italic.css";
   import "@fontsource/montserrat/300.css";
   import "@fontsource/montserrat/400.css";
   import "@fontsource/montserrat/500.css";
   import "@fontsource/montserrat/600.css";
   import "@fontsource/montserrat/700.css";
   ```
   Token Tailwind tidak diubah: `--font-display: "Cormorant Garamond"` dan `--font-sans: "Montserrat"` sama dengan nama family Fontsource.
3. Hapus `preconnect` + stylesheet Google dari `index.html:16–21`.
4. `npm run build`; catat woff2 yang di-emit di `dist/assets/` dan pastikan tereferensi dalam stylesheet ter-bundle (cek cepat: preview lalu tab Network dengan filter Font).
5. (Opsional, hanya bila terukur perlu) **Preload font LCP (Cormorant 700 latin).** Karena Vite meng-hash nama berkas, ini butuh salah satu dari: link preload yang ditulis oleh langkah build setelah URL ter-hash diketahui, atau plugin/static-copy dengan nama berkas stabil (catatan: `vite.config.js` memakai `publicDir: false`, jadi file statis bernama stabil bukan jalur bawaan). Lakukan hanya jika Lighthouse prod masih menandai "font swap meleset dari LCP" — tanpa bukti itu, kompleksitas tambahan tidak sepadan.
6. Alternatif _minimum_ apabila self-host ditunda: biarkan stylesheet Google tetap ada dengan `preconnect` (sudah terpasang). Ini memangkas sebagian waterfall, namun tetap bergantung pada origin ketiga — cukup sebagai jembatan sementara, bukan tujuan akhir.

Adaptasi snipet laporan (`rel="preload"` + `font-display: swap`): `font-display` sudah ditangani Fontsource/`display=swap`, sehingga pekerjaan nyatanya adalah langkah 1–3 di atas.

### 3.3 Long task & INP

**Apa yang terjadi.** Di trace dev, task panjangnya adalah React `performUnitOfWork` (render halaman penuh dalam satu pass) plus eksekusi modul — keduanya jauh lebih murah di produksi (§1). Namun T0 membuktikan masalahnya **nyata di produksi juga**: TBT 250 ms (preview lokal) hingga 1.130 ms (live) — task terbesar yang tercatat adalah satu task layout 140 ms dan Style & Layout total 697 ms. Kondisi produksi: satu chunk 517 kB (gzip ~156 kB) berisi React + GSAP + seluruh halaman, dieksekusi sebagai blok besar saat hidrasi.

**Saran perbaikan (valid lintas mode, tanpa refactoring arsitektur):**

1. **Utamakan pengukuran produksi** (T0). Jangan mengoptimasi dari angka dev.
2. **Pecah vendor GSAP ke chunk terpisah** untuk keuntungan cache jangka panjang. Opsi yang persis direkomendasikan output build untuk stack ini (Vite 8/Rolldown):
   ```js
   // vite.config.js
   build: {
     outDir: 'dist',
     rolldownOptions: {
       output: {
         advancedChunks: {
           groups: [
             { name: 'gsap', priority: 10, test: /[\\/]node_modules[\\/]gsap[\\/]/ },
             { name: 'vendor', priority: 5, test: /[\\/]node_modules[\\/]/ },
           ],
         },
       },
     },
   },
   ```
   Efek: chunk GSAP menjadi berkas stabil yang tidak perlu divalidasi ulang saat deploy konten baru.
   **Catatan hasil eksekusi (T3):** `codeSplitting: true` saja _tidak_ membelah graf import statis dari satu entry (build tetap satu chunk 520 kB) — yang benar-benar bekerja pada stack ini adalah `advancedChunks`. Angka terverifikasi: `gsap-*` 69,6 kB (gzip 27,3), `vendor-*` 257,0 kB (gzip 81,5), entry `index-*` 192,4 kB (gzip 48,0), runtime 0,6 kB; warning chunk >500 kB hilang, total transfer tetap ~155 kB gzip.
3. **Jangan pindah inisialisasi controller ke `setTimeout(0)`** seperti saran generik laporan. `page.init()` dipasang di `useLayoutEffect` (`App.jsx:74`) justru agar tidak flicker; setTimeout memperkenalkan race visual tanpa bukti kebutuhan di produksi. Satu-satunya penjadwalan ulang yang dianjurkan adalah §3.1 langkah 1 (double rAF pada entrance — supaya tidak menumpuk commit hidrasi).
4. Listener scroll `rememberScroll` (`App.jsx:66`) sudah pasif dan murah (menyimpan pasangan angka ke `Map`); tidak perlu debounce.
5. Yang harus dihindari: memecah halaman per-section dengan `React.lazy`. Hidrasi tetap membutuhkan semua section, sehingga split tambahan hanya menambah waterfall tanpa mengurangi pekerjaan first load. Chunking vendor (poin 2) sudah cukup.

### 3.4 Gambar: format & ukuran

**Kondisi di kode (bukan hanya di laporan):**

- **Hero (Home):** `<img src={assetUrl(slide.image.src)} fetchPriority="high">` (`js/sections/home/hero.jsx:19–21`), sumber JPEG murni dari `js/data/hero-slides.js:19, 36, 54`. Ukuran: 189 / 131 / 147 kB. Atribut `width/height` sudah lengkap (anti CLS) — yang belum ada hanya sumber WebP-nya.
- **Prod (T0): elemen LCP = gambar hero ini.** TTFB 40 ms (cepat), tetapi render delay >6 s di run live — unitnya tertahan oleh font + CSS render-blocking dan main-thread yang padat; audit mencatat ukuran asli **1306×1014 vs tampil 611×400** (wasted ~157 KiB lokal / ~168 KiB live). Jadi perbaikan gambar §3.4 = perbaikan LCP langsung.
- **Semua 3 slide diunduh sejak awal** (tak ada `loading="lazy"` pada slide non-aktif): transfer gambar Home 495 kB di run live (≈ tiga slider JPG terunduh) versus 209,8 kB di preview lokal — slide 2/3 baru terambil ketika autoplay berganti sebelum audit selesai.
- **Galeri klinik:** sudah pola terbaik — `<picture>` + `<source type="image/webp">` + JPEG fallback + `loading="lazy"` + `decoding="async"` (`js/sections/clinic/index.jsx:20–22`); Method juga `<picture>` (`js/sections/method/index.jsx:14–16`).
- **About / Service / Speciality:** masih `<img>` JPEG. `about/index.jsx:46` (profil `loading="eager"`, `fetchPriority="high"` untuk indeks 0), `speciality/index.jsx:19` (hero, `fetchPriority="high"`), `js/sections/service/index.jsx:15` (hero detail service, `fetchPriority="high"`) — hotspot JPEG yang sama seperti hero Home.
- Fallback JPEG galeri tidak dibatasi ukurannya: `clinic_waiting_lounge.jpeg` **1,18 MB** dari total 36 berkas JPEG 5,4 MB. Browser modern mengunduh varian WebP-nya, jadi fallback ini jarang diambil — tetapi menyembul besar ke repo/dist.

**Saran perbaikan:**

1. **Konversi tiga gambar hero ke WebP (dengan fallback JPEG):**
   - Spesifikasi target: varian `w=720` + `w=1440` per slide, `q≈78–82`; fallback tetap `.jpg` yang ada. Justifikasi lebar: audit prod mencatat ukuran tampil hero **611×400**, jadi 1× = 720 dan 2× DPR = 1440 sudah cukup; target `w=900/1600` versi awal dokumen ini melebihi kebutuhan. Estimasi: slide 1 dari 189 kB menjadi ±80–100 kB; slide 2/3 sekitar separuhnya.
   - Tambahkan field data di `js/data/hero-slides.js`, misalnya `image.webpSources: [{ src: '…-1440.webp' }, { src: '…-720.webp' }]`.
   - Ubah `HeroImage` (`js/sections/home/hero.jsx:19–21`) menjadi `<picture>`:
     ```jsx
     function HeroImage({ slide, primary, className }) {
       const fallback = (
         <img
           className={`absolute inset-0 block size-full object-cover ${className}`}
           src={assetUrl(slide.image.src)}
           alt={slide.image.alt}
           width={slide.image.width}
           height={slide.image.height}
           fetchPriority={primary ? "high" : undefined}
           decoding={primary ? undefined : "async"}
         />
       );
       if (!slide.image.webpSources?.length) return fallback;
       const widths = slide.image.webpSources
         .map((s) => assetUrl(s.src))
         .join(", ");
       return (
         <picture className="absolute inset-0 block size-full">
           <source
             type="image/webp"
             srcSet={widths}
             fetchPriority={primary ? "high" : undefined}
           />
           {fallback}
         </picture>
       );
     }
     ```
     (Catatan: React memakai nama prop `fetchPriority`. Pada `<source>` dukungannya bisa berbeda antar versi React — paling aman, hint prioritas cukup dipasang pada `<img>` fallback seperti sekarang, dan `<source>` cukup membawa `type` + `srcSet`.)
   - `sizes` referensi untuk hero (dari grid `hero.jsx`: mobile full-width, `wide:` dua kolom): `"(min-width: 68.8125rem) 78vw, 100vw"` — verifikasi visual saat implementasi.
   - **`scripts/check/check-pages.mjs` menyapu seluruh `srcset`** dan menuntut berkas target ada di `dist/` — tes ini otomatis menjadi pengaman agar varian WebP tidak berujung link mati.
2. **Konversi gambar hero route lain** (yang `fetchPriority="high"`): profil Saila (`about/index.jsx:46`), speciality hero (`speciality/index.jsx:19`), service hero (`service/index.jsx:15`). Gunakan pola `<picture>` yang sama dengan data per komponen.
3. **Prioritas rendah:** kompres ulang fallback JPEG galeri ke `q≈80` mulai dari yang terbesar (`clinic_waiting_lounge.jpeg` 1,18 MB). Dampak skor kecil (browser modern ambil WebP), manfaatnya di repo/dist dan pengguna browser lama.
4. **AVIF tidak wajib.** Pilih WebP agar pipeline konversi sederhana; pertimbangkan AVIF hanya bila hasil WebP pada q80 masih melebihi ~100 kB per gambar utama.
5. Alat konversi bebas (squoosh/cwebp/sharp-cli); dokumen ini sengaja tidak mengikat tool spesifik.

**Yang tidak perlu dari saran generik:** `srcset` untuk logo PNG kecil (16 kB — biarkan), atau memaksa AVIF untuk semua.

## 4. Daftar tugas (urutan mengikuti urutan masalah)

> Setiap tugas punya kriteria selesai dan pengukurannya. Semua pekerjaan T1–T4 dikerjakan **setelah** baseline produksi T0 disimpan, dan dibandingkan pada T5 agar perbandingan sehat.

### T0 — Baseline produksi (prasyarat)

- [X] Jalankan `$env:SITE_URL='https://example.test'; npm run build; npm run preview`.
- [X] Jalankan Lighthouse Desktop pada build preview `:4173` (skor 73) + run situs langsung GitHub Pages (skor 77, median); detail lengkap tersimpan di `docs/analisis.md`.
- [X] Isi kolom "Sebelum (prod)" pada tabel §5.
      **Selesai bila:** angka baseline tercantum di dokumen; `npm test` dan `npm run test:home-reveal` hijau. — Tercapai untuk sisi pengukuran.
      **Catatan:** (1) angka dev (`localhost:5173`) dipertahankan hanya sebagai data laporan awal, bukan dasar keputusan; (2) semua baseline diukur **Desktop tanpa mode incognito** dan Mobile di run live hanyalah estimasi — T5 wajib mengukur ulang (termasuk Mobile asli) sebagai perbandingan yang adil.

### T1 — Ruang reflow (urutan masalah 1)

- [X] `header-entrance.js`: jadwalkan `start()` lewat double `requestAnimationFrame` (§3.1 langkah 1) dan batalkan frame yang menggantung pada `stop()`.
- [X] `content-reveal.js`: tween reveal menjadi `gsap.fromTo` (§3.1 langkah 2).
- [X] Tambah `fromTo` ke mock GSAP di `scripts/check/check-home-reveal.mjs` agar skenario stagger/reveal tetap menguji jalur yang sama (dengan iterasi elemen batch di sisi fixture).
- [X] `npm run test:home-reveal`, `npm test` (output HTML tidak boleh berubah: asersi `data-content-reveal-state`, timing, dan cleanup harus tetap lulus).
- [ ] (Opsional, hanya bila trace prod menunjuk paint) `motion-safe:will-change-transform` pada elemen hero.
      **Selesai bila:** entrance tidak lagi memaksa reflow di tengah commit hidrasi; semua tes hijau. — Terpenuhi: tes hijau, diimplementasi di commit `c25c094`.
      **Estimasi dampak prod:** kecil–sedang; biayanya murah, dikerjakan lebih dulu karena menyentuh jalur first paint.

### T2 — Font self-host (urutan masalah 2)

- [X] Audit bobot terpakai (perintah §3.2 langkah 1) dan finalisasi daftar berkas. — Hasil: `font-light`/`font-medium`/`font-semibold`/`font-bold` serta italic pada aksen Heading terpakai; bobot final **Cormorant 400/500/600/700 + italic 600/700, Montserrat 300/400/500/600/700**.
- [X] `npm i @fontsource/cormorant-garamond @fontsource/montserrat`, impor CSS per-weight di `src/entry-client.jsx` (§3.2 langkah 2); lepas impor weight yang ternyata tidak dipakai. — Pakai berkas `latin-*` (subset latin saja; cyrillic/vietnam tidak diimpor) supaya dist tetap ramping.
- [X] Hapus `preconnect` + stylesheet Google `index.html:16–21`. — Verifikasi: `dist/index.html` kini 0 referensi `fonts.googleapis`/`fonts.gstatic`.
- [X] Konsolidasi variable font (lanjutan T2): `@fontsource-variable/{cormorant-garamond,montserrat}` diedeklarasikan langsung di `css/fonts.css` (subset latin saja, tanpa mengimpor CSS paket yang membawa subset cyrillic/vietnamese; tanpa face italic Montserrat — sesuai audit, sans-italic tetap disintesis browser). Token `--font-sans`/`--font-display` kini memakai nama family `* Variable`; paket `@fontsource/*` statis dilepas. — Hasil build: **10 woff2 (~218 kB) → 3 woff2 (~115 kB)**; Cormorant normal 37,6 kB, Cormorant italic 39,3 kB, Montserrat 38,0 kB; request font teks maksimal 3 per halaman (+ woff2 Phosphor untuk ikon).
- [X] 27 Okt — **revert konsolidasi variable** (`5bced7f`, kembali ke `@fontsource/*` static `latin-*` persis seperti `cb13800`): alasan — brand/visual menuntut render glif **identik dengan build sebelum konsolidasi**; instancing variable membawa beda tipis metrik/kerning + kilas FOUT yang terasa. Trade-off tercatat: woff2 kembali per-weight (maksimal ~10 berkas unik per halaman, hanya face yang cocok unicode-range yang diunduh browser); penghematan 10→3 dibatalkan demi fidelitas visual.
- [X] 27 Okt — **italic fontsource di-drop** (import `latin-600-italic`/`latin-700-italic` di `src/entry-client.jsx` dihapus): audit menemukan URL Google Fonts original meminta **hanya axis weight tanpa italic**, jadi semua span `italic` di situs original digambar browser sebagai **shear/oblique sintesis dari glif tegak**; kehadiran face italic asli mengubah wujud huruf accent (kursif khas Cormorant) dan terbaca "italic hilang". Dengan ini rendering span italic kembali **identik ke original** (glif tegak yang dipiringkan browser). Bonus: −2 woff2 (~46 kB) pada rute yang memakai italic (home/speciality/service) dan `@font-face` total 12→10 (0 italic-face). Kelas-markup tidak berubah apa pun (heading accent, h3 service, counter about tetap `italic` — shear terjadi di layer rendering).
- [X] **Preload 3 wajah inti** di head hasil prerender (`scripts/build/prerender.mjs` + `scripts/build/html.mjs`): `<link rel="preload" as="font" type="font/woff2" crossorigin>` untuk **Cormorant 700 (h1) + Cormorant 600 (h2/h3) + Montserrat 400 (body)** — nama berkas hash disarik dari `dist/assets` berdasarkan pola, dan base prefix diambil dari href stylesheet pada template agar tetap benar saat `VITE_BASE_PATH` kustom. — Verifikasi build: **86/86 berkas HTML di dist memuat tepat 3 tag preload**; tujuannya memangkas kilas FOUT pada hard refresh/kunjungan perdana (unduhan font mulai bersama parse HTML, biasanya selesai sebelum first paint).
- [X] `npm run build`: verifikasi woff2 di-emit ke `dist/assets/` dan tereferensi dari stylesheet ter-bundle; `npm test` harus tetap hijau. — Montserrat woff2 ±18,7 kB per bobot, Cormorant woff2 ±22–24 kB per bobot; browser tetap hanya mengunduh berkas yang cocok `unicode-range`; `@font-face` ikut chunk `vendor-*.css` (cache-stable). *(Setelah konsolidasi variable, 3 face sisa tinggal tergantung jumlah stylesheet yang diemitt — dibereskan bersama `cssCodeSplit` pada T2-susulan.)*
      **Selesai bila:** Lighthouse prod tidak lagi menandai fonts.googleapis.com/gstatic; tampilan heading tetap sama (Cormorant/Montserrat). — Sisi kode/build telah terpenuhi (commit `cb13800`); konfirmasi akhir menunggu ukuran ulang T5.
      **Estimasi dampak:** menghapus satu origin pihak ketiga + stylesheet render-blocking remote; terasa di jaringan nyata (dev localhost hampir tidak menunjukkan selisihnya).

### T3 — Long task & chunk vendor (urutan masalah 3)

- [X] `vite.config.js`: vendor GSAP dipisah lewat `rolldownOptions.output.advancedChunks` — `codeSplitting: true` semata ternyata tidak membelah graf import statis satu entry (lihat catatan §3.3 langkah 2).
- [X] 28 Okt — **trial inline critical CSS (beasties) dibatalkan** (`1560a09` dicoba tuntas lalu di-revert `660a324`): eksekusi dan verifikasinya sukses (critical CSS inline per halaman + link swap-lazy + semua `@font-face` ter-pin di head, 24/24 berkas, gates hijau), tetapi laporan skor di tangan pengguna pada state **sebelum** beasties sudah **konsisten 86–92** — dinilai cukup, sehingga biaya tambahannya tidak dibayar: HTML tiap halaman membesar (critical inline), CSS sisa tetap harus diunduh pasca-paint, dan re-serialization DOM-nya menuntut penyesuaian test. Keputusan final render-blocking = **Opsi C**: satu stylesheet render-blocking ukuran wajar (gzip ±22,6 kB) + 3 preload font, tanpa inline critical. Trial tersimpan di riwayat git (`1560a09`) bila suatu saat mau dihidupkan ulang.
- [ ] (Pra-pemecahan) Selidiki ~74 kB JS tak terpakai di dalam `index-*.js` (temuan run lokal: total 155,4 kB) supaya vendor chunk tidak mengangkut kode mati — gratis dilakukan sebelum T3.
- [X] `npm run build`: chunk tercatat — `gsap-*` 69,6 kB (gzip 27,3), `vendor-*` 257,0 kB (gzip 81,5), entry `index-*` 192,4 kB (gzip 48,0) (angka lengkap di §3.3 langkah 2).
- [X] `npm test`, `npm run test:home-reveal`.
- [X] Larangan (lihat §3.3 langkah 5): tanpa `React.lazy` per-section, tanpa service worker.
      **Selesai bila:** warning chunk >500 kB hilang (atau menyusut terukur; catat angka baru); perilaku hidrasi tidak berubah (tes hijau). — Terpenuhi: chunk terbesar kini 257 kB, tes hijau.
      **Estimasi:** cache jangka panjang untuk vendor; skor naik kecil, TBT prod turun sedikit.

### T4 — Gambar (urutan masalah 4) — dampak terbesar di jaringan nyata

- [X] Konversi `home_slider_{1,2,3}.jpg` → WebP `w=720` + `w=1440` `q≈80` ke `assets/images/home/` (`*-720.webp`, `*-1440.webp`; simpan fallback `.jpg`). — Hasil: slider 1 **28,0 kB@720 / 70,5 kB@1440** (dari JPEG 189 kB), slider 2 24,0/64,4, slider 3 31,9/76,0; total 3 slide ~294 kB vs 467 kB JPEG master.
- [X] Field WebP di `js/data/hero-slides.js` + ubah `HeroImage` menjadi `<picture>` + `sizes` (§3.4 langkah 1). — Direalisasi lewat komponen bersama `js/components/hero-picture.jsx` (`<picture>` kelas layout + `<img>` kelas fit, fallback `.jpg` tetap di `src`); `sizes` slide 1/2 `(min-width: 68.8125rem) min(50vw, 720px), 100vw` (grid `fullBleedGridClasses.hero` membatasi media pada `min(50%,720px)`), slide 3 editorial `100vw`.
- [X] (Opsional, putuskan setelah hasil WebP terlihat) `loading="lazy"` untuk slide 2/3 — bukti: transfer 495 kB di run live terjadi karena semua slide eager. Trade-off: gambar baru diambil saat transisi → risiko pop-in di jaringan lambat; alternatif aman: tetap eager, karena selisihnya kecil setelah menjadi WebP (±40–80 kB/slide). — **Diterapkan** pada slide 2/3 (plus `decoding="async"`); **temuan penting**: injector preload otomatis rolldown-vite ternyata hanya membaca `<img src>` polos — setelah gambar berada di dalam `<picture>`, ketiga preload slider menghilang dari head (hanya preload logo tersisa; perilaku "skip lazy" tidak sempat teruji). Jadi LCP image kehilangan preload hint-nya; ukur efeknya di T5 sebelum memutuskan perlu preload manual atau tidak.
- [X] Konversi gambar hero route lain (`about` indeks 0, `speciality` hero, `service` hero) dengan pola `<picture>` yang sama. — Selesai dalam dua bentuk: **Saila** (`about_saila_profile` 27,2/66,6 kB; field `webp` baru di `js/data/team.js`) dan **3 hero detail speciality** (`pre_post_surgical_recovery` 18,4/51,7 kB, `pregnancy_postpartum_care` 32,1/51,8 kB dengan varian kedua diklem ke `w=1024` sesuai lebar natural portrait, `skin_tissue_health` 22,4/68,7 kB — lewat `HeroPicture` di section speciality + data `js/data/specialities/index.js`); **hero service** ternyata **sudah WebP** di data (gambar master `.webp` per service), jadi cukup Polos lewat jalur fallback `HeroPicture` tanpa perubahan data. Preload otomatis Saila pun menghilang dari head (perilaku injector skip `<picture>` yang sama) — efek diukur di T5; `team.detailImage` & `about_beatriz` (lazy) sengaja tidak dikonversi.
- [ ] (Rendah) kompres ulang fallback JPEG galeri mulai dari `clinic_waiting_lounge.jpeg` (1,18 MB).
- [X] `npm run build` + `npm test` — link sweep otomatis menjamin semua target `srcset` ada di `dist/`. — Hijau setelah T4a dan T4b (`check-pages` memvalidasi target srcset webp).
      **Selesai bila:** Lighthouse prod kategori "Serve images in modern formats" hilang; transfer gambar Home turun dari **495 kB (live) / 209,8 kB (lokal)** menjadi **~150–200 kB**.
      **Estimasi dampak:** menghilangkan wasted terukur ~157 KiB (lokal)–168 KiB (live) dan memangkas ±300 kB transfer nyata di Home + route lain.

### T5 — Verifikasi akhir & pembandingan

- [ ] Ulangi Lighthouse prod (prosedur T0) setelah T1–T4.
- [ ] Isi kolom "Sesudah (prod)" di §5.
- [ ] Regresi fungsi/aksesibilitas: `npm test`, `npm run test:home-reveal`; bila Playwright tersedia (lokal/CI): `npm run test:navigation`, `npm run test:header`.
- [ ] Pastikan skor Accessibility & SEO tidak turun (perubahan di atas seharusnya tidak menyentuh keduanya).

---

## 5. Tabel pembandingan hasil (T0 terisi; T5 mengisi "Sesudah")

| Metrik                | Sebelum (dev `:5173`, laporan awal) | Sebelum (prod preview `:4173`, T0) | Sebelum (prod live GitHub Pages, T0)                        | Sesudah (T5) |
| --------------------- | ----------------------------------- | ---------------------------------- | ----------------------------------------------------------- | ------------ |
| Performance score     | 52                                  | 73                                 | 77 (median); Mobile estimasi 45–55                          | —            |
| FCP                   | —                                   | 3,5 s                              | 3,8 s                                                       | —            |
| LCP (element)         | 428 ms — teks `span.block`          | 5,3 s — gambar hero                | 6,3 s — gambar hero (Mobile est. ~12,5 s)                   | —            |
| TBT                   | n/a (trace: INP 89 ms)              | 250 ms                             | 1.130 ms (Mobile est. ~2.500 ms)                            | —            |
| CLS                   | —                                   | 0,00                               | 0 (Mobile est. 0,02)                                        | —            |
| Speed Index           | —                                   | 3,5 s                              | 3,8 s                                                       | —            |
| Transfer JS           | n/a (dev)                           | 155,4 kB (~74 kB tak terpakai)     | 156,8 kB                                                    | —            |
| Transfer CSS          | n/a (dev)                           | 24,3 kB                            | 23,3 kB                                                     | —            |
| Transfer font         | Google (remote)                     | 125,7 kB (gstatic + localhost)     | 370 kB (murni gstatic)                                      | lokal        |
| Transfer gambar       | JPEG 189 kB (slide 1)               | 209,8 kB                           | 495 kB (semua 3 slide eager)                                | —            |
| Render-blocking       | n/a                                 | fonts.googleapis 800 ms + index.css 306 ms | fonts.googleapis 790 ms + index.css 300 ms          | —            |
| Main-thread           | layout 136 ms                       | layout 160 ms                      | total 5,4 s; Style & Layout 697 ms; satu task layout 140 ms | —            |
| Total transfer / file | n/a                                 | ~517 kB / 7 request                | 1,05 MB / 12 request                                        | —            |

**Caveat baseline (penting sebelum menyimpulkan):**

1. Kedua baseline prod itu diukur pada mode **Desktop** dan **bukan incognito** — ada risiko ekstensi/tab ikut memengaruhi trace. Saat T5, jalankan metode yang sama di Incognito dan bandingkan ke kolom ini.
2. Angka Mobile pada run GitHub Pages hanyalah **estimasi dari Lighthouse** (skor 45–55, LCP ~12,5 s, TBT ~2.500 ms) — bukan pengukuran tunggal. T5 wajib mencatat Mobile yang terukur sungguhan.
3. Selisih skor 73 (lokal) vs 77 (live) tidak perlu diselidiki: perangkat, jaringan, dan kondisi pengukuran tidak identik; gunakan keduanya sebagai rentang "Sebelum".
4. CLS 0 di kedua run adalah kabar baik — atribut `width/height` gambar dan pengaman hero sudah bekerja; jangan sampai T1–T4 merusaknya.
5. Run diagnostik pasca-T1–T3 di preview `:4173` (26 Okt 2026): skor **67** terekam dari run mode **Mobile** (tab Lighthouse default, throttling simulasi aktif) — sementara 73/77 adalah baseline mode **Desktop**. Jadi selisih "76 → 67" adalah perbandingan lintas mode, bukan degradasi akibat T1–T3. Trace Desktop tanpa throttle pada build yang sama memperlihatkan metrik sehat: FCP 67 ms, LCP 251 ms, CLS 0,00, TBT ~148 ms, 14 request (1 HTML + 2 CSS render-blocking + 1 JS + 10 woff2). Angka "render-blocking 2000 ms++" pada laporan simulasi Mobile adalah estimasi model (4G + CPU 4×), bukan biaya nyata — buktinya: biaya aktual kedua CSS itu = FCP 67 ms. Titik data lanjutan 27 Okt sesudah T1–T4 (build masih memakai font variable): skor **78** di mode Mobile-sim, **satu run** — bukan protokol formal 3× median Incognito, jadi T5 tetap menggantinya.

---

## 6. Lampiran — batas lingkup dan catatan samping

**Catatan samping (tidak masuk daftar tugas karena bukan temuan Lighthouse):**

- `dist/assets/Phosphor-*.svg` sebesar **2,99 MB** adalah fallback format font SVG dari `@phosphor-icons/web` yang hampir tak pernah diunduh browser modern, tetapi ikut terkirim ke dist. Bisa dipertimbangkan sebagai tugas pembersihan dist belakangan.
- **Temuan aksesibilitas dari audit prod (di luar lingkup performa):** kontras **2,81:1** pada teks sage `#879f9b` terhadap latar putih (hero + navigasi) — di bawah ambang WCAG AA 4,5:1. Bukan bagian T1–T5, tapi jangan sampai perubahan dokumen ini menutupi temuan itu; catat untuk tugas aksesibilitas terpisah.
- Chunk utama 517 kB (156 kB gzip) memuat GSAP bersama React (`entry-client.jsx` mengimpor `gsap`). Penanganan yang diambil dalam lingkup ini hanya `codeSplitting` (T3); lazy GSAP tidak disarankan karena entrance membutuhkannya pada frame pertama.

**Yang sengaja TIDAK dianjuran (anti over-engineering):**

- Menyembunyikan konten reveal lewat CSS statis (merusak progressive enhancement yang sudah dibangun dengan baik).
- `React.lazy` per section, virtualization, dan service worker untuk situs statis seukuran ini.
- Menjadikan Lighthouse pada dev server sebagai dasar keputusan performa.
