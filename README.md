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

### 🎮 Interactive Elements
- **Snake game** background (desktop only)
- **Dynamic typewriter** effect for DevOps actions
- **Animated skill badges** with hover states
- **Interactive navigation** with dropdown menus
- **Copy email** functionality with toast notifications

### 🏗️ Technical Highlights
- **Pure vanilla JavaScript** - no frameworks or dependencies
- **CSS Variables** for consistent theming
- **Mobile-first CSS** with three responsive breakpoints
- **Optimized animations** with `requestAnimationFrame`
- **Semantic HTML5** for better SEO and accessibility

## 🗂️ Project Structure

```
app-main/
├── index.html              # Homepage
├── css/
│   └── style.css          # Main stylesheet (mobile-first)
├── js/
│   └── main.js            # Core JavaScript functions
├── images/                # Image assets
├── pages/
│   ├── projects.html      # Projects showcase
│   ├── experience.html    # Work experience timeline
│   ├── skills.html        # Technical skills
│   └── certificates.html  # Certifications
└── Screw-landing-page/    # Featured project landing page
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

| Breakpoint | Screen Size | Layout |
|------------|-------------|--------|
| **Mobile** | < 768px | Vertical stacking, full-width buttons |
| **Tablet** | 768px - 1023px | Semi-optimized layouts, mixed features |
| **Desktop** | ≥ 1024px | Full effects, hover interactions |

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
--transition: all 0.2s ease;  /* Change timing */

/* Modify hover effects */
.detail-card:hover {
  transform: translateY(-8px) scale(1.005);  /* Adjust values */
}
```

## 🔧 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ 14+ |
| Edge | ✅ Latest |

**Note**: The website uses modern CSS features like `backdrop-filter` and CSS Grid. Older browsers may have limited support.

## 📊 Performance

- ⚡ **Lightweight**: ~30KB total CSS/JS (unminified)
- 🎯 **Optimized animations**: Uses GPU-accelerated transforms
- 📱 **Mobile-friendly**: Heavy effects disabled on small screens
- 🚫 **No dependencies**: Zero external libraries

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
- GitHub: [@kirolosesmat](https://github.com/yourusername)

## 🙏 Acknowledgment

- Special thanks: [Mitch Koko](https://github.com/mitchkoko/mitchkokoapp) for design inspiration

⭐ If you found this portfolio helpful, please consider giving it a star!

**Built with ❤️ by Kirolos Esmat**
