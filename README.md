<a id="top"></a>

<div align="center">

<img src="logo.svg" alt="Chennai Retail Logo" width="100" style="margin-bottom: 16px;">

# Chennai Retail

### Premium eCommerce Web Application

A bold, conversion-focused eCommerce experience built with Headless Commerce architecture,
Red/Stone Warm design system, PWA capabilities, and modern 2026 CSS design patterns.

<br>

[![GitHub last commit](https://img.shields.io/github/last-commit/Mariakevin/Ecommerce?style=for-the-badge&logo=github&color=DC2626)](https://github.com/Mariakevin/Ecommerce)
[![GitHub stars](https://img.shields.io/github/stars/Mariakevin/Ecommerce?style=for-the-badge&logo=github&color=111111)](https://github.com/Mariakevin/Ecommerce)
[![GitHub forks](https://img.shields.io/github/forks/Mariakevin/Ecommerce?style=for-the-badge&logo=github&color=6B7280)](https://github.com/Mariakevin/Ecommerce)

<br>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">

</div>

---

<br>

<div align="center">

### Quick Links

[Home](#home) • [Features](#features) • [Pages](#pages) • [Design System](#design-system) • [Getting Started](#getting-started)

</div>

---

<br>

## Tech Stack

<div align="center">

| Layer | Technology |
|:-----:|:----------:|
| **Markup** | Semantic HTML5 |
| **Styling** | Custom CSS Design System + Tailwind CSS CDN |
| **Icons** | Material Symbols Outlined |
| **Fonts** | Inter (300–700) |
| **Architecture** | Headless Commerce (Service Layer + Reactive Store + Event Bus) |
| **PWA** | Service Worker + Web App Manifest |
| **Analytics** | GA4 Ecommerce + Consent Mode V2 |
| **SEO** | JSON-LD Structured Data + Open Graph |
| **Security** | CSP + HSTS + .htaccess Headers |
| **Images** | Stock photography (Pexels/Unsplash) |

</div>

---

<br>

<a id="features"></a>

## Features

<br>

### Architecture

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Headless Commerce** | Decoupled UI from business logic |
| **Service Layer** | AuthService, CartService, OrderService, ProductService |
| **Reactive Store** | Cart and wishlist state management |
| **Event Bus** | Cross-component communication |
| **Component System** | Reusable ProductCard with quick view, stock levels |

</div>

<br>

### Design System

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Dark Mode** | Full `prefers-color-scheme` support with semantic tokens |
| **Fluid Typography** | `clamp()` for responsive text sizing |
| **Multi-Speed Transitions** | Instant, fast, normal, slow with spring easing |
| **Glassmorphism** | Reusable `.glass` and `.glass-strong` utility classes |
| **Container Queries** | Responsive product cards via `container-type: inline-size` |
| **Bento Grid** | Flexible layout system with span utilities |

</div>

<br>

### User Experience

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Product Design Psychology** | 8 chapters applied (signifiers, cognitive load, peak-end rule, goal-gradient, Gestalt proximity, present bias, affective primacy, Hick's law) |
| **Shrinking Sticky Header** | 64px → 52px on scroll |
| **Mega Menu** | Category navigation with featured products |
| **Cart Fly Animation** | Product images animate to cart icon |
| **Wishlist Heart Burst** | Particle effect on add |
| **Social Proof Ticker** | Real-time purchase notifications |
| **Loading Skeletons** | Shimmer placeholders for async content |
| **Scroll Reveal** | IntersectionObserver + fallback animations |

</div>

<br>

### Accessibility (WCAG 2.2)

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Skip-to-Content** | Skip navigation link for keyboard users |
| **ARIA Live Regions** | Screen reader announcements for dynamic content |
| **Focus-Visible** | 3px outline indicators for keyboard navigation |
| **High Contrast** | Forced-colors (Windows High Contrast) support |
| **Reduced Motion** | `prefers-reduced-motion` media query support |
| **Touch Targets** | 44px minimum for all interactive elements |
| **Form Labels** | Proper `aria-describedby` associations |

</div>

<br>

### Performance & Core Web Vitals

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Resource Hints** | Preconnect, dns-prefetch, preload for critical assets |
| **Critical CSS** | Inlined above-the-fold rendering styles |
| **CSS Containment** | `contain: layout style paint` for isolation |
| **Content Visibility** | `content-visibility: auto` for below-fold sections |
| **Lazy Loading** | `loading="lazy"` + `fetchpriority` + `decoding="async"` |
| **Font Display** | `swap` strategy to prevent CLS |

</div>

<br>

### SEO & Structured Data

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **JSON-LD** | Organization, BreadcrumbList, Product schemas |
| **Open Graph** | Social sharing cards on all pages |
| **Twitter Cards** | Twitter/X optimized meta tags |
| **Canonical URLs** | Duplicate content prevention |
| **Dynamic Titles** | Per-page `<title>` tags |

</div>

<br>

### Mobile UX

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Bottom Navigation** | Thumb-zone reachable mobile nav |
| **Touch Targets** | 44px+ for all interactive elements |
| **Bottom-Sheet Filters** | Mobile-native filter pattern |
| **Safe Area Insets** | iPhone notch handling |
| **Touch Action** | `manipulation` for tap optimization |

</div>

<br>

### Progressive Web App (PWA)

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Service Worker** | Cache-first / stale-while-revalidate strategies |
| **Web App Manifest** | "Add to Home Screen" capability |
| **Offline Fallback** | Branded offline page when network unavailable |

</div>

<br>

### Analytics & Privacy

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **GA4 Tracking** | Ecommerce events: view_item, add_to_cart, begin_checkout, purchase |
| **Consent Mode V2** | GDPR compliance with user consent |
| **Cookie Consent** | Banner with accept/decline options |

</div>

<br>

### Cart Abandonment Recovery

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Exit-Intent** | Desktop + mobile detection triggers recovery modal |
| **Inactivity Detection** | 5-minute timeout triggers reminder |
| **Auto-Save Cart** | localStorage persistence with 7-day TTL |
| **Recovery Modal** | Coupon offer (COMEBACK10) to complete purchase |

</div>

<br>

### Security

<div align="center">

| Feature | Description |
|:-------:|:------------|
| **Content Security Policy** | XSS prevention via CSP headers |
| **X-Frame-Options** | Clickjacking protection |
| **X-Content-Type-Options** | MIME sniffing prevention |
| **HSTS** | HTTP Strict Transport Security |
| **Referrer-Policy** | Controls referrer information leakage |
| **Permissions-Policy** | Restricts browser feature access |
| **GZIP Compression** | Server-side asset compression |
| **Browser Caching** | Optimized cache-control headers |

</div>

---

<br>

<a id="pages"></a>

## Pages

<br>

<div align="center">

| Page | Description |
|:----:|:------------|
| **Home** | Split hero, countdown, categories, reviews, newsletter |
| **Category** | Hero banner, filters, sidebar, grid/list views |
| **Product** | Gallery, variants, delivery checker, tabs, reviews |
| **Cart** | Quantity stepper, coupon, swipe-to-delete, upsell |
| **Checkout** | Progress bar, express checkout, validation |
| **Order Success** | Celebration animation, timeline |
| **Wishlist** | Action overlay, share buttons |
| **Account** | Dashboard stats, profile |
| **Offers** | Lightning deals, countdown timer |
| **404** | Animated SVG, interactive cursor |

</div>

---

<br>

<a id="design-system"></a>

## Design System

<br>

### Color Palette (Red/Stone Warm)

<div align="center">

<img src="https://img.shields.io/badge/Primary-DC2626?style=for-the-badge&color=DC2626" alt="Primary">
<img src="https://img.shields.io/badge/Primary_Hover-B91C1C?style=for-the-badge&color=B91C1C" alt="Primary Hover">
<img src="https://img.shields.io/badge/Warm_Ivory-FFFBF5?style=for-the-badge&color=FFFBF5&labelColor=999999" alt="Warm Ivory">
<img src="https://img.shields.io/badge/Warm_Charcoal-292524?style=for-the-badge&color=292524" alt="Warm Charcoal">
<img src="https://img.shields.io/badge/Stone_400-A8A29E?style=for-the-badge&color=A8A29E" alt="Stone 400">
<img src="https://img.shields.io/badge/Stone_200-E7E5E4?style=for-the-badge&color=E7E5E4&labelColor=999999" alt="Stone 200">

</div>

<br>

### Design Tokens

```css
:root {
  /* Brand */
  --primary: #DC2626;
  --primary-hover: #B91C1C;

  /* Warm Palette */
  --warm-ivory: #FFFBF5;
  --warm-charcoal: #292524;
  --stone-100: #F5F5F4;
  --stone-200: #E7E5E4;
  --stone-400: #A8A29E;
  --stone-600: #57534E;

  /* Semantic */
  --bg-primary: #FFFBF5;
  --bg-surface: #FFFFFF;
  --text-primary: #292524;
  --text-secondary: #57534E;
  --border-default: #E7E5E4;

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Glass */
  --glass-bg: rgba(255, 251, 245, 0.6);
  --glass-blur: 12px;

  /* Spacing (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Z-Index */
  --z-header: 100;
  --z-modal: 200;
  --z-toast: 300;
}
```

---

<br>

## Project Structure

```
Ecommerce/
├── index.html
├── category.html
├── product.html
├── cart.html
├── checkout.html
├── order-success.html
├── wishlist.html
├── account.html
├── offer.html
├── 404.html
├── offline.html             # PWA offline fallback page
├── styles.css               # 5,636+ line design system
├── app.js                   # 592+ lines — UI layer, scroll reveal, micro-interactions
├── analytics.js             # GA4 ecommerce tracking + GDPR consent
├── cart-recovery.js         # Cart abandonment recovery system
├── sw.js                    # Service Worker (PWA offline support)
├── manifest.json            # PWA Web App Manifest
├── sitemap.xml              # SEO sitemap
├── robots.txt               # Crawler directives
├── .htaccess                # Security headers + GZIP + caching
├── favicon.svg
├── logo.svg
├── images/                  # Stock photos, product images
└── src/
    ├── components/
    │   └── ProductCard.js   # Reusable card with quick view
    ├── services/
    │   ├── AuthService.js
    │   ├── CartService.js
    │   ├── OrderService.js
    │   └── ProductService.js
    ├── store/
    │   ├── cartStore.js
    │   └── wishlistStore.js
    ├── utils/
    │   ├── constants.js
    │   ├── EventBus.js
    │   └── format.js
    └── data/
        └── products.json
```

---

<br>

<a id="getting-started"></a>

## Getting Started

<br>

### 1. Clone the repository

```bash
git clone https://github.com/Mariakevin/Ecommerce.git
```

### 2. Open in browser

```bash
# No build step required — pure HTML/CSS/JS
# Simply open index.html in your browser
```

### 3. For local development (optional)

```bash
# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

<br>

## Browser Support

<div align="center">

| Browser | Status |
|:-------:|:------:|
| Chrome 100+ | Full |
| Firefox 100+ | Full |
| Safari 15+ | Full |
| Edge 100+ | Full |

</div>

---

<br>

## License

<div align="center">

This project is open source and available for educational purposes.

</div>

---

<br>

<div align="center">

### Made with passion for premium eCommerce

<img src="https://img.shields.io/badge/Chennai_Retail-DC2626?style=for-the-badge&logo=shopify&logoColor=white" alt="Chennai Retail">

<br>

**[Back to Top](#top)**

</div>
