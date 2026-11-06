# 10X Shop

**Live demo:** https://10x-shop-mariam-grigolia.vercel.app

## About

10X Shop is a single-page online shop built with React, TypeScript and Tailwind CSS. Users can browse products from the DummyJSON API, open product details, manage a cart that survives a reload, and place an order after a simple login. The design uses a dark purple and gold theme inspired by World of Warcraft.

## Features

### CORE
- Catalog loaded from DummyJSON, with loading, error and empty states
- Product cards: discounted price, crossed-out old price, discount badge, rating, stock status and **Add to cart**
- Responsive product grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Product details: image gallery, quantity stepper (1 to stock), stock text, rating and Add to cart
- Invalid or missing product (`/products/abc`, `/products/999999`) shows the Not Found page
- Cart with quantity changes, remove, clear cart, subtotal and total; saved in `localStorage` (`shop_cart`)
- Adding to the cart never goes over the available stock
- Header with active links and a cart badge (total quantity)
- Simple login with a controlled form and validation, stored in React Context
- Protected checkout: guests are sent to `/login` and returned to `/checkout` after logging in
- Checkout form (full name, email, address, city) with validation and an order confirmation
- Error Boundary with a "Something went wrong." fallback and a Reload button
- 404 page, scroll to top on route change, SPA rewrite for Vercel

### FULL
- Design tokens in Tailwind `@theme`, custom utilities (`btn-primary`, `field`, `page-width`)
- WoW inspired details: Cinzel font, gold borders, rarity colors for product titles and short game phrases
- Promo code `10X10` (any letter case): −10% in the cart and at checkout, saved in `shop_cart` so it survives a reload
- Planned next: search, categories, sorting, pagination, reviews, related products, orders, profile and light theme

## Tech Stack

- React 19 + TypeScript 6 (strict mode)
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router 7
- DummyJSON API
- ESLint with `react-hooks` rules and `no-explicit-any`
- Deployed on Vercel

## Architecture

```
src/
  api/          products.api.ts — fetch functions for DummyJSON
  components/
    cart/       CartLine
    layout/     Layout, Header, Footer, ScrollToTop, ErrorBoundary
    product/    ProductCard, ProductGrid, ProductGallery, QuantityStepper
  context/      AuthContext + AuthProvider, CartContext + CartProvider
  hooks/        useAuth, useCart
  pages/        Catalog, Product, Cart, Checkout, Login, NotFound
  routes/       AppRoutes, ProtectedRoute
  types/        product, cart, user, order
  utils/        format (prices), cart (subtotal), stock, rarity
```

**Data flow:** Pages load data from the API in `useEffect` and keep it in local state, showing loading, error or empty states while they wait. Shared data lives in two contexts: `AuthContext` for the logged-in user and `CartContext` for cart items. Components never change the cart directly: they call context functions like `addItem` or `updateQuantity`, which create a new array (immutable update), and React re-renders everything that uses the cart. The cart is written to `localStorage` on every change and read back when the app starts.

## How to Run

Requires Node.js 22 or newer.

```bash
git clone https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia.git
cd 10x-Shop-Mariam-Grigolia
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Typechecks and builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run typecheck` | Runs TypeScript (`tsc -b --noEmit`) |
| `npm run lint` | Runs ESLint |

## Test Account

Login is a local simulation, so no real account is needed. Any username with a password of at least 6 characters works, for example:

- **Username:** `emilys`
- **Password:** `emilyspass`

## Credits

- Product data: [DummyJSON](https://dummyjson.com)
- Fonts: Cinzel and Poppins from Google Fonts
- Game phrases are short references to World of Warcraft by Blizzard Entertainment. This project is not affiliated with Blizzard.
- Claude (Anthropic) was used as an AI mentor. See the AI section in [REPORT.md](REPORT.md).
- TODO: add your lecturer, classmates or anyone else who helped you.
