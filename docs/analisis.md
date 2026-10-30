### Performance Analysis: InBody Clinic Production Baseline (Github Pages Mobile)

## Performance Analysis: InBody Clinic Production Baseline

**Context**
Comprehensive performance analysis of the production build for `inbody-clinic-v2` (hosted on GitHub Pages). The goal was to establish baseline metrics for Core Web Vitals and identify resource bottlenecks before implementing optimizations.

**Diagnostics**
The following performance metrics and resource distributions were captured during the production audit:

| Metric                             | Desktop (Median) | Mobile (Estimated) |
| :--------------------------------- | :--------------- | :----------------- |
| **Performance Score**              | 77               | 45–55              |
| **First Contentful Paint (FCP)**   | 3.8 s            | > 7.0 s            |
| **Largest Contentful Paint (LCP)** | 6.3 s            | ~12.5 s            |
| **Total Blocking Time (TBT)**      | 1,130 ms         | ~2,500 ms          |
| **Cumulative Layout Shift (CLS)**  | 0                | 0.02               |
| **Speed Index**                    | 3.8 s            | ~8.0 s             |

**Network Transfer Breakdown**
Total Data Transferred: **1.05 MB** (12 requests)

| Resource Type  | Transferred Size | Key Host(s)         |
| :------------- | :--------------- | :------------------ |
| **HTML (Doc)** | 4.8 kB           | GitHub Pages        |
| **CSS**        | 23.3 kB          | `index-*.css`       |
| **JavaScript** | 156.8 kB         | `index-*.js`        |
| **Fonts**      | 370.0 kB         | `fonts.gstatic.com` |
| **Images**     | 495.0 kB         | GitHub Pages        |

**Actionable Findings**

- **LCP Bottleneck:** The Largest Contentful Paint is triggered by the Hero Slider Image (`img.absolute`). While TTFB is low (40ms), the render delay exceeds 6 seconds due to render-blocking resources and main-thread congestion.
- **Render-Blocking Resources:** Two primary resources delay the initial paint:
  - `fonts.googleapis.com/...`: 790 ms duration.
  - `index-DMVc8jj_.css`: 300 ms duration.
- **Image Inefficiency:** The `home_slider_1.jpg` is oversized (1306x1014 actual vs 611x400 displayed) and uses a legacy format. Implementing WebP/AVIF and responsive sizing could save ~168 KiB.
- **Main-Thread Execution:** The browser spent 5.4s on main-thread work, with 697ms specifically on **Style & Layout**. One specific layout task recorded a 140ms self-time, exceeding the recommended 50ms limit for interactivity.

**Code Fix Guidance**
The following changes are identified as potential optimizations for the source code:

```html
<!-- Potential Fix: Preconnect to font origins to reduce discovery delay -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Potential Fix: Optimize Hero Image using modern formats and priority loading -->
<img
  src="assets/images/webp/home/home_slider_1-1440.webp"
  fetchpriority="high"
  loading="eager"
  width="611"
  height="400"
  alt="Clinic Hero Image"
/>
```

_Note: The presence of external Google Fonts was confirmed in the HTML build. Self-hosting these fonts or inlining critical CSS is recommended to eliminate the identified render-blocking delays._

_Note: The code fixes and findings above were identified on a live page in DevTools. When applying them to your codebase, please adapt them to your project's specific technical stack (e.g., Tailwind CSS classes, CSS modules, framework components) rather than applying them as literal CSS overrides._

### Performance Analysis: InBody Clinic Production Baseline (NPM Run Preview Mobile)

## Performance Analysis: InBody Clinic Production Baseline

**Context**
Baseline performance analysis of the InBody Clinic V2 production build (`dist`) running on a local preview server (`:4173`). The goal is to identify bottlenecks in Core Web Vitals and resource delivery prior to optimization.

**Diagnostics**
The initial desktop Lighthouse audit yielded a Performance score of **73**. The primary bottlenecks are external render-blocking resources and unoptimized image assets.

| Metric                             | Value  |
| :--------------------------------- | :----- |
| **First Contentful Paint (FCP)**   | 3.5 s  |
| **Largest Contentful Paint (LCP)** | 5.3 s  |
| **Total Blocking Time (TBT)**      | 250 ms |
| **Cumulative Layout Shift (CLS)**  | 0.00   |
| **Speed Index**                    | 3.5 s  |

**Network & Resource Breakdown**
The page initiates 7 requests totaling approximately 517 KB transferred.

| Resource Type       | Transferred Size | Key Findings                                        |
| :------------------ | :--------------- | :-------------------------------------------------- |
| **Document (HTML)** | 1.7 KB           | Standard                                            |
| **JS**              | 155.4 KB         | `index-CFKIsciO.js` contains ~74 KB of unused code. |
| **CSS**             | 24.3 KB          | Includes render-blocking Google Fonts CSS.          |
| **Fonts**           | 125.7 KB         | Mixed hosts: `fonts.gstatic.com` and `localhost`.   |
| **Images**          | 209.8 KB         | `home_slider_1.jpg` is the primary LCP element.     |

**Actionable Findings**

- **Render-Blocking Resources:** External calls to `fonts.googleapis.com` (800ms) and the main `index.css` (306ms) significantly delay FCP.
- **Image Optimization:** The hero image (`home_slider_1.jpg`) is oversized (1306x1014 vs. 611x400 displayed) and uses legacy JPEG format. Switching to WebP/AVIF and implementing proper sizing would save ~157 KiB.
- **Main Thread Activity:** Significant time (160ms) is spent on `Layout` tasks, likely exacerbated by late font swapping and CSS evaluation.
- **Accessibility:** Identified low contrast ratios (2.81:1) on hero text and navigation elements (`#879f9b` on white/white on `#879f9b`), failing the 4.5:1 requirement.

**Code Fix Guidance**
The following changes are identified as potential optimizations for the source code:

```html
<!-- Potential Fix: Replace remote Google Fonts with local self-hosted fonts 
     to eliminate external render-blocking requests -->
<link
  rel="preload"
  href="/fonts/montserrat.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Potential Fix: Use modern formats and responsive sizing for hero images -->
<picture>
  <source srcset="assets/images/webp/home/home_slider_1-1440.webp" type="image/webp" />
  <img
    src="assets/images/jpeg/home/home_slider_1.jpg"
    width="611"
    height="400"
    alt="INDIBA treatment"
    fetchpriority="high"
  />
</picture>
```

_Note: The code fixes and findings above were identified on a live page in DevTools. When applying them to your codebase, please adapt them to your project's specific technical stack (e.g., Tailwind CSS classes, CSS modules, framework components) rather than applying them as literal CSS overrides._
