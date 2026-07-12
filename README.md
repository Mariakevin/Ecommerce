<a id="top"></a>

<div align="center">

<img src="logo.svg" alt="Chennai Retail Logo" width="100" style="margin-bottom: 16px;">

# Chennai Retail

### Premium eCommerce Web Application

A bold, conversion-focused eCommerce experience built with Headless Commerce architecture,
red/black/white color palette, and modern 2026 CSS design patterns.

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

### Color Palette

<div align="center">

<img src="https://img.shields.io/badge/Primary-DC2626?style=for-the-badge&color=DC2626" alt="Primary">
<img src="https://img.shields.io/badge/Primary_Hover-B91C1C?style=for-the-badge&color=B91C1C" alt="Primary Hover">
<img src="https://img.shields.io/badge/Black-111111?style=for-the-badge&color=111111" alt="Black">
<img src="https://img.shields.io/badge/White-FFFFFF?style=for-the-badge&color=FFFFFF&labelColor=999999" alt="White">

</div>

<br>

### Design Tokens

```css
:root {
  /* Brand */
  --primary: #DC2626;
  --primary-hover: #B91C1C;

  /* Semantic */
  --bg-primary: #FFFFFF;
  --text-primary: #111111;
  --border-default: #E5E7EB;

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.6);
  --glass-blur: 12px;
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
├── styles.css              # 5,200+ line design system
├── app.js                  # UI layer, scroll reveal, micro-interactions
├── favicon.svg
├── logo.svg
├── images/                 # Stock photos, product images
└── src/
    ├── components/
    │   └── ProductCard.js  # Reusable card with quick view
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
