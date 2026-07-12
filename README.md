<div align="center">

# Chennai Retail

### Premium eCommerce Web Application

A bold, conversion-focused eCommerce experience built with Headless Commerce architecture,
red/black/white color palette, and modern 2026 CSS design patterns.

[![GitHub last commit](https://img.shields.io/github/last-commit/Mariakevin/Ecommerce?style=flat-square&color=DC2626)](https://github.com/Mariakevin/Ecommerce)
[![GitHub stars](https://img.shields.io/github/stars/Mariakevin/Ecommerce?style=flat-square&color=111111)](https://github.com/Mariakevin/Ecommerce)

</div>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Semantic HTML5 |
| **Styling** | Custom CSS Design System + Tailwind CSS CDN |
| **Icons** | Material Symbols Outlined |
| **Fonts** | Inter (300–700) |
| **Architecture** | Headless Commerce (Service Layer + Reactive Store + Event Bus) |
| **Images** | Stock photography (Pexels/Unsplash) |

---

## Features

### Architecture
- **Headless Commerce** — Decoupled UI from business logic
- **Service Layer** — AuthService, CartService, OrderService, ProductService
- **Reactive Store** — Cart and wishlist state management
- **Event Bus** — Cross-component communication
- **Component System** — Reusable ProductCard with quick view, stock levels

### Design System
- **Dark Mode** — Full `prefers-color-scheme` support with semantic tokens
- **Fluid Typography** — `clamp()` for responsive text sizing
- **Multi-Speed Transitions** — Instant, fast, normal, slow with spring easing
- **Glassmorphism** — Reusable `.glass` and `.glass-strong` utility classes
- **Container Queries** — Responsive product cards via `container-type: inline-size`
- **Bento Grid** — Flexible layout system with span utilities

### User Experience
- **Product Design Psychology** — 8 chapters applied (signifiers, cognitive load, peak-end rule, goal-gradient, Gestalt proximity, present bias, affective primacy, Hick's law)
- **Shrinking Sticky Header** — 64px → 52px on scroll
- **Mega Menu** — Category navigation with featured products
- **Cart Fly Animation** — Product images animate to cart icon
- **Wishlist Heart Burst** — Particle effect on add
- **Social Proof Ticker** — Real-time purchase notifications
- **Loading Skeletons** — Shimmer placeholders for async content
- **Scroll Reveal** — IntersectionObserver + fallback animations

### Pages
| Page | Description |
|------|-------------|
| `index.html` | Homepage — Split hero, countdown, categories, reviews, newsletter |
| `category.html` | Category — Hero banner, filters, sidebar, grid/list views |
| `product.html` | Product — Gallery, variants, delivery checker, tabs, reviews |
| `cart.html` | Cart — Quantity stepper, coupon, swipe-to-delete, upsell |
| `checkout.html` | Checkout — Progress bar, express checkout, validation |
| `order-success.html` | Order Success — Celebration animation, timeline |
| `wishlist.html` | Wishlist — Action overlay, share buttons |
| `account.html` | Account — Dashboard stats, profile |
| `offer.html` | Offers — Lightning deals, countdown timer |
| `404.html` | 404 — Animated SVG, interactive cursor |

---

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

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mariakevin/Ecommerce.git
   ```

2. **Open in browser**
   ```bash
   # No build step required — pure HTML/CSS/JS
   # Simply open index.html in your browser
   ```

3. **For local development** (optional)
   ```bash
   # Using VS Code Live Server extension
   # Right-click index.html → Open with Live Server
   ```

---

## Design Tokens

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

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome 100+ | Full |
| Firefox 100+ | Full |
| Safari 15+ | Full |
| Edge 100+ | Full |

---

## License

This project is open source and available for educational purposes.

---

<div align="center">

**Built with passion for premium eCommerce experiences**

</div>
