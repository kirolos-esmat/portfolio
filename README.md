# 🚀 Kirolos Esmat - Portfolio

A modern, responsive portfolio website showcasing my work as a DevOps Engineer and Full-Stack Developer. Built with clean HTML, CSS, and vanilla JavaScript with a focus on performance and user experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## ✨ Features

### 🎨 Modern Design

- **Glassmorphic UI** with backdrop blur effects
- **Dark/Light theme** toggle with smooth transitions
- **Responsive design** optimized for mobile, tablet, and desktop
- **Smooth animations** with CSS keyframes and transitions
- **Modern hover effects** with soft glows and subtle lifts

### 📱 Mobile-First

- **Touch-optimized** interactions with 44px minimum tap targets
- **Vertical layouts** on mobile that adapt to horizontal on desktop
- **Click-based dropdowns** for mobile, hover for desktop
- **Performance optimized** - heavy effects disabled on small screens
- **Floating avatar animation** across all devices

### 🪪 3D Interactive Physics ID Badge (WebGL)

- **Verlet Rope & Ribbon Physics**: Dynamic cloth/strap simulation powered by Three.js with realistic pendulum swing, drag-and-throw velocity momentum, and damped settling.
- **Physical Hardware Detailing**: 3D extruded rounded card chassis, satin-titanium grommet ring, carabiner loop, swivel collar, and ribbon crimp clamp.
- **Dual-Sided High-DPI Textures**: 1280×2048 canvas with 16x anisotropic filtering featuring crystal-clear portrait photo, bold typography, tech stack badges, satin gold EMV microchip, security barcode, and flip-side QR code with KE pulse logo.
- **Click-to-Inspect Modal**: Seamlessly glides to center screen with frosted glass backdrop blur, full 3D turntable rotation, and tap-to-flip interaction.
- **Mobile Responsive & Bilingual**: Custom mobile scaling (hangs clear of hero text, expands to 85% width in inspect mode, single-line hint pill) with auto-mirrored anchor coordinates for RTL Arabic mode.

### 🎮 Interactive Elements

- **3D Lanyard Name Tag**: Draggable, throwable, and clickable physical ID badge.
- **Snake game background**: Retro arcade easter egg with persistent high score and top-centered score HUD.
- **Dynamic typewriter**: Cyclic action verb animation with multi-word cycling.
- **Animated skill badges**: Responsive pill badges with hover states.
- **Interactive navigation**: Multi-tier dropdown menus and direct links.
- **Copy email**: Non-blocking clipboard action with animated toast notifications.

### 🌐 Internationalization & Localization (i18n)

- **Default English Experience**: Loads English by default on first visit and direct page navigation
- **Full Arabic Localization (العربية)**: Native translation with full right-to-left (RTL) layout support
- **Cairo Typography**: Styled with Google Fonts "Cairo" for Arabic scripts and clean letter-spacing
- **Bidirectional UI**: Mirrored controls, navigation buttons, back arrows, and badge indicators
- **Multilingual SEO**: Comprehensive `hreflang` tags (`en`, `ar`, `x-default`) and sitemap indexing

### 🏗️ Technical Highlights

- **Pure vanilla JavaScript & Three.js** - zero heavy frameworks, WebGL hardware-accelerated 3D physics
- **Verlet Numerical Integration** - realistic multi-segment rope and cloth ribbon dynamics
- **High-DPI Dynamic Texturing** - crisp 1280×2048 2D canvas dynamically rendered onto 3D geometry
- **CSS Variables** for consistent theming and micro-interactions
- **Mobile-first CSS** with responsive breakpoints and bidirectional RTL support
- **Optimized animations** with `requestAnimationFrame` and sub-stepped physics
- **Semantic HTML5** for superior SEO, accessibility, and performance

## 🗂️ Project Structure

```
portfolio/
├── index.html               # Default Homepage (English)
├── ar/                      # Arabic Localized Version (RTL)
│   ├── index.html           # Arabic Homepage
│   └── pages/               # Localized Arabic Subpages
│       ├── projects.html    # Arabic Projects
│       ├── experience.html  # Arabic Experience
│       ├── skills.html      # Arabic Skills
│       └── certificates.html# Arabic Certificates
├── css/
│   └── style.css            # Main stylesheet (mobile-first & RTL support)
├── js/
│   ├── badge.js             # 3D interactive physics lanyard ID badge & inspect mode
│   ├── three.min.js         # Three.js 3D library bundle
│   ├── main.js              # Core JavaScript (theme, marquee, typing, language)
│   └── terminal.js          # Interactive terminal logic
├── images/                  # Image assets (photo, logo, og-image)
├── pages/                   # English Subpages
│   ├── projects.html        # Projects showcase
│   ├── experience.html      # Work experience timeline
│   ├── skills.html          # Technical skills
│   ├── certificates.html    # Certifications
│   └── terminal.html        # Interactive terminal easter egg
├── Screw-landing-page/      # Featured project landing page
├── robots.txt               # Crawler rules
└── sitemap.xml              # Search engine sitemap (bilingual URLs)
```

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Open in browser**

   **Option A: Direct file**

   ```bash
   open index.html
   # or just double-click index.html
   ```

   **Option B: Using Python (recommended)**

   ```bash
   # Python 3
   python -m http.server 8000

   # Then visit http://localhost:8000
   ```

   **Option C: Using Node.js**

   ```bash
   npx http-server -p 8000

   # Then visit http://localhost:8000
   ```

3. **Start exploring!** 🎉

## 🎯 Responsive Breakpoints

The website uses a mobile-first approach with three breakpoints:

| Breakpoint  | Screen Size    | Layout                                 |
| ----------- | -------------- | -------------------------------------- |
| **Mobile**  | < 768px        | Vertical stacking, full-width buttons  |
| **Tablet**  | 768px - 1023px | Semi-optimized layouts, mixed features |
| **Desktop** | ≥ 1024px       | Full effects, hover interactions       |

## 🎨 Customization

### Update Personal Information

1. **Bio & Content**: Edit `index.html` and page-specific HTML files
2. **Skills**: Update the `homeLines` array in `js/main.js`
3. **Projects**: Modify `pages/projects.html`
4. **Experience**: Update `pages/experience.html`

### Change Theme Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  /* Light theme */
  --bg: #ffffff;
  --surface: #fafafa;
  --text-primary: #1a1a1a;
  /* ... */
}

[data-theme="dark"] {
  /* Dark theme */
  --bg: #0a0a0a;
  --surface: #151515;
  --text-primary: #e0e0e0;
  /* ... */
}
```

### Modify Animations

Adjust animation parameters in `css/style.css`:

```css
/* Speed up/slow down animations */
--transition: all 0.2s ease; /* Change timing */

/* Modify hover effects */
.detail-card:hover {
  transform: translateY(-8px) scale(1.005); /* Adjust values */
}
```

## 🔧 Browser Support

| Browser | Version   |
| ------- | --------- |
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ 14+    |
| Edge    | ✅ Latest |

**Note**: The website uses modern CSS features like `backdrop-filter` and CSS Grid. Older browsers may have limited support.

## 📊 Performance

- ⚡ **Lightweight**: ~84KB total CSS/JS (unminified, zero dependencies)
- 🎯 **Optimized animations**: Uses GPU-accelerated transforms
- 📱 **Mobile-friendly**: Heavy effects (snake game, background text) disabled on small screens and subpages
- 🌓 **No flash**: Theme is applied before first paint
- 🚫 **No dependencies**: Zero external libraries

## 📝 License

This project is licensed under the **MIT License with Attribution Requirement**.

### ⚠️ Attribution Required

If you use, modify, or distribute this code, you **must** include attribution to:

**Kirolos Esmat**

- Portfolio: [kirolos-esmat.github.io/portfolio](https://kirolos-esmat.github.io/portfolio)
- GitHub: [@kirolos-esmat](https://github.com/kirolos-esmat)
- Email: kirolos.esmat10@gmail.com

Attribution can be provided in:

- Website footer
- README or documentation
- Source code comments

See the [LICENSE](LICENSE) file for full details.

## 📧 Contact

**Kirolos Esmat**

- Email: kirolos.esmat10@gmail.com
- LinkedIn: [linkedin.com/in/kirolos-esmat](https://www.linkedin.com/in/kirolos-esmat/)
- GitHub: [@kirolosesmat](https://github.com/kirolosesmat)

## 📝 Changelog

### v5

- **3D Interactive Physics Lanyard ID Badge**: Integrated WebGL/Three.js physical ID badge with Verlet multi-segment rope simulation, dynamic drop-in entrance, realistic pendulum oscillation, pointer dragging, and momentum throw physics.
- **Cinematic Click-to-Inspect Mode**: Smooth ease-in-out transition from hanging state to viewport center, featuring a frosted glass backdrop blur, 3D turntable mouse/touch orbit, tap-to-flip dual-sided inspection, and seamless lanyard retraction.
- **High-DPI Dual-Sided Visual Craft**: High-resolution 1280×2048 canvas textures with 16x anisotropic filtering, featuring crystal-clear portrait rendering with zero glare/vignette haze, bold typography, tech badges, satin gold EMV microchip, security barcode, and flip-side QR code with KE pulse logo.
- **Mobile-First Responsive Dynamics**: Custom mobile rope geometry preventing overlap with hero titles and bio copy, enlarged 85%-width inspect view, and uncollapsed single-line interaction hint pill.
- **Bilingual Mirrored Physics (LTR/RTL)**: Automatic physical anchor coordinate mirroring between English (top-left) and Arabic (top-right), accompanied by localized Arabic interaction guidance.
- **Top-Centered Snake Score HUD**: Repositioned score indicator to top-center with responsive shake animations and zero lanyard obstruction.
- **Standardized Credentials**: Aligned university location to Alexandria, EG across badge faces and metadata.

### v4

- **English Default**: Ensured the English version is the strict default landing experience for all visitors without forced redirection.
- **Arabic Localization (العربية)**: Complete native Arabic translations across Homepage, Projects, Experience, Skills, and Certificates (`ar/`).
- **RTL Design System**: Full Right-to-Left (RTL) layout with mirrored navigation, back buttons, status indicators, and custom Cairo typography.
- **Cursive Script Optimization**: Word-level animation wrapping in background text marquee to preserve Arabic cursive ligature connectivity.
- **Multilingual SEO**: Added alternate `hreflang` tags (`en`, `ar`, `x-default`) on every page and updated `sitemap.xml` with all localized URLs.
- **Interactive Language Toggle**: Smooth one-click language switching between English and Arabic with state persistence.

### v3

- Fixed dark-mode flash — theme now applies before first paint
- Theme toggle is now a real `<button>` (keyboard accessible)
- Copy-email works on non-HTTPS with fallback + failure feedback
- Snake game & background text disabled on subpages and touch devices
- Deduplicated background marquee data (~330 lines removed from main.js)
- Added SEO: canonical URLs, Open Graph/Twitter cards, og-image, robots.txt, sitemap.xml
- Removed broken Download CV button (returning in a future release)

### v2

- Mobile optimization, tablet support, terminal page, live badge redesign

## 🙏 Acknowledgment

- Special thanks: [Mitch Koko](https://github.com/mitchkoko/mitchkokoapp) for design inspiration

⭐ If you found this portfolio helpful, please consider giving it a star!

**Built with ❤️ by Kirolos Esmat**
