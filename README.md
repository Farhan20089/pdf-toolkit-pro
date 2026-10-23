# OmniTool Engine — High-Traffic Client-Side Web Utility Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](https://opensource.org/licenses/MIT)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-emerald.svg)](https://pagespeed.web.dev/)
[![Zero Backend Cost](https://img.shields.io/badge/Backend%20Cost-%240.00%2Fmo-blue.svg)](https://omnitoolkit.dev)
[![Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20In--Browser-brightgreen.svg)](https://omnitoolkit.dev)

A production-ready, autonomous, high-traffic Web Utility Toolkit built with **React 18 + Vite + TypeScript + Tailwind CSS**. Engineered for organic search volume (SEO), Google AdSense monetization, and $0 running costs by executing 100% of tasks inside the user's browser.

---

## 🚀 Live Modules Included

### 1. Smart Image Compressor & WebP Converter (`#image-compressor`)
- **Drag-and-Drop & Instant Demo:** Convert PNG, JPG, and WebP images.
- **HTML5 Canvas Downsampling:** Quality slider (10% to 100%), format switching (WebP, JPEG, PNG), and aspect-ratio-locked dimensions with scale presets (25%, 50%, 75%, 1080p).
- **Interactive Visual Comparison:** Split slider to inspect pixel fidelity before vs. after.
- **Live Metrics:** Real-time KB/MB savings and reduction percentages.

### 2. Smart Image to PDF & Document Merger (`#pdf-converter`)
- **Multi-Image Assembly:** Drag & drop multiple PNG, JPG, or WebP receipts/photos.
- **Page Customization:** Standard ISO A4, US Letter, or Fit-to-image dimensions.
- **Print Controls:** Portrait/Landscape orientation, margins (None, 5mm, 10mm, 20mm), and page reordering.
- **Instant Client PDF:** Generated in-memory using `jspdf` with zero cloud uploads.

### 3. Smart QR Code Generator & Stylist (`#qr-generator`)
- **4 Encoding Modes:** Web URLs, Wi-Fi Network auto-connect (`WIFI:S:...`), Plain Text, and Email `mailto:`.
- **Visual Stylist:** Custom foreground and background colors, quiet-zone margins (1-4 blocks), and error correction levels (`L`, `M`, `Q`, `H` 30% recovery).
- **Dual Vector Export:** Instant PNG download (up to 1024px) or vector SVG download with 100% client execution.

### 4. Smart Markdown to HTML & PDF Live Editor (`#markdown-editor`)
- **Dual-Pane Writing:** Live split-screen Markdown authoring with real-time GitHub-Flavored Markdown (GFM) compiler.
- **Content Metrics:** Instant word counter, character counter, and estimated reading time.
- **Export Versatility:** Copy compiled HTML, download `.md` file, or trigger print-formatted PDF export.

### 5. Social & Video Meta Tag / Hashtag Generator (`#social-meta-tags`)
- **High-CTR Titles:** 5 algorithmic titles scored with curiosity hooks across 5 niches (Tech, Finance, Gaming, Lifestyle, Fitness).
- **Platform Constraint Trackers:**
  - **YouTube:** Title limit (< 100 chars), automated description with timestamps, and comma-separated tag block (< 500 chars).
  - **TikTok & Instagram:** Viral captions, hook lines, and tiered hashtag clouds (broad, niche, low-competition).

### 6. Developer & Data Formatter Suite (`#developer-tools`)
- **JSON Validator & Formatter:** 2/4-space indent, 1-line minifier, download `.json`, and syntax error pinpointer (line, column, snippet).
- **Base64 Converter:** UTF-8 safe bidirectional text converter + file-to-Data-URI embedding generator.
- **URL & Query String Parser:** URL encoder/decoder with an interactive key-value query parameters table.
- **Cryptographic Hashes:** Real-time SHA-256, SHA-1, SHA-384, and SHA-512 via `crypto.subtle`.

### 7. Freelancer & Creator Profit Calculator (`#freelance-calculator`)
- **Rate Modes:** Hourly contract vs. fixed-price project milestones.
- **Platform Presets:** Upwork (10%), Fiverr (20%), Stripe (2.9% + $0.30), Direct Invoicing (0%), and Custom % overrides.
- **Effective Rate:** True net take-home pay and real effective hourly rate calculation.
- **Data Export:** Instant Markdown summary copy and downloadable CSV financial report.

---

## 💰 Monetization & AdSense Ready

### Non-Intrusive, Zero-CLS Ad Containers
All ad slots (`ad-slot-header`, `ad-slot-sidebar`, `ad-slot-inline`, `ad-slot-footer`) have fixed responsive minimum heights to guarantee **Cumulative Layout Shift (CLS) < 0.05**:
- `header`: 728x90 Leaderboard responsive container
- `inline`: 300x250 or responsive native in-feed unit
- `footer`: 728x90 Bottom sponsorship unit

To activate your real Google AdSense or Adsterra scripts:
1. Open [`src/components/layout/AdSlot.tsx`](file:///d:/software/pdf%20conversion%20project/src/components/layout/AdSlot.tsx).
2. Replace the demo placeholder with your AdSense snippet:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Affiliate & Creator Support
- **Sticky Tip Jar:** Interactive "Buy Me a Coffee" modal supporting $3, $5, $10, and custom tips.
- **Curated Partner Area:** High-converting developer recommendations (Hosting, VPN, AI coding assistants) with customizable tracking parameters.

---

## 📈 SEO & Growth Engine

- **Dynamic Head & JSON-LD:** Each tool dynamically injects structured Google `FAQPage` and `WebApplication` schema.
- **Crawlable Explanations:** Underneath every canvas, a 3-step usage guide and FAQ section target high-intent search queries.
- **`robots.txt` & `sitemap.xml`:** Pre-rendered inside the `/public` directory covering all canonical hash routes.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/omnitool-engine.git

# Enter project directory
cd omnitool-engine

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```
Generates an optimized, chunked bundle in `/dist` with asset hashes and sub-30KB initial JS footprint.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
This repository includes a production-ready [`vercel.json`](file:///d:/software/pdf%20conversion%20project/vercel.json) configured with:
- Strict security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- Immutable static asset caching (`Cache-Control: public, max-age=31536000, immutable`)
- Single-page application rewrites

```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

---

## 📄 License
Released under the [MIT License](LICENSE). 100% Free for personal and commercial usage.
