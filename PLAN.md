# 10X Shop Project Plan

## 🎯 Project Goals & Scope

**Goal:** Build a fully responsive e-commerce Single Page Application (SPA) using React 19, TypeScript (strict mode), Tailwind CSS v4 and the DummyJSON API. Deployed on Vercel.

**Priority:** CORE functionality first. FULL features only after every CORE item is done and deployed.

### Scope by module

| Module | CORE (pass minimum) | FULL (higher score) |
|---|---|---|
| **React** | Components, props, `children`, `useState`/`useEffect`, `map` + stable `key`, React Router, `AuthContext` + `CartContext`, controlled Login & Checkout forms, loading/error/empty states | Search (debounce), categories, sorting, pagination, URL state, reviews, related products, promo code, Orders, Profile, custom hooks, cart reducer |
| **TypeScript** | `strict: true`, typed props/state/API data, all models in `types/`, no `any`, `npm run typecheck` = 0 errors | Generics, `ApiClient` + `ApiError`, OOP classes (`Cart`, `Order`, `StorageService<T>`), type guards, discriminated unions, utility types |
| **Tailwind CSS** | v4 via `@tailwindcss/vite`, utility styling, flex/grid, mobile-first responsive grid, `hover:`/`focus:`/`disabled:` states | `@theme` design tokens, dark mode, custom utilities/variants |
| **Optimization** | Responsive at 375px & desktop (no horizontal scroll), Error Boundary, `DEBUG-LOG.md` (≥ 3 real bugs), Chrome + Firefox check | Lazy routes, lazy images, memoization (measured), Lighthouse before/after, `COMPATIBILITY.md`, ≥ 5 DEBUG-LOG entries |
| **Process** | Public GitHub repo, meaningful commit history, `PLAN.md`, `README.md` (EN), `REPORT.md`, live Vercel deploy | GitHub Issues/Projects (≥ 20 issues), feature branches + PRs, weekly progress notes, demo video |

---

## 🧱 Work Breakdown Structure (WBS)

Estimates are in hours. **DoD** = Definition of Done. **Status:** ⬜ to do · 🟡 in progress · ✅ done

### Setup & Quality
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 1 | Vite + React + TS project, strict tsconfig, scripts (`dev`, `build`, `preview`, `typecheck`, `lint`) | 2h | 1 | `typecheck` and `build` pass with 0 errors | ✅  |
| 2 | Tailwind v4 + React Router installed | 1h | 1 | A Tailwind class visibly changes the UI | ✅ |
| 3 | ESLint with `no-explicit-any` and react-hooks rules | 1h | 1 | `npm run lint` runs clean | ✅ |
| 4 | Core types (`Product`, `ProductsResponse`, `CartItem`, `CartState`, `AuthUser`, `LoginFormValues`, `CheckoutFormValues`) | 2h | 1 | All models live in `types/`, used by real code | ✅ |
| 5 | Error Boundary | 2h | 3 | A thrown test error shows the fallback, not a blank page | ⬜ |
| 6 | Responsive pass + hover/focus/disabled states | 4h | 3 | All CORE pages work at 375px with no horizontal scroll | ⬜ |
| 7 | Full flow test (guest + logged-in) | 2h | 3 | Catalog → Product → Cart → Login → Checkout → Confirmation works | ⬜ |

### Layout & Routing
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 8 | `Layout` (Header + `Outlet` + Footer), `Header` with NavLinks | 3h | 1 | Header written once, active link highlighted | ✅ |
| 9 | Routes `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*` + NotFound + ScrollToTop | 2h | 1 | All routes open without page reload; unknown URL shows 404 | ✅ |

### Auth
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 10 | `AuthContext` with `login(username)` / `logout()` | 2h | 1 | Header shows username + Log out when logged in | ✅ |
| 11 | Login controlled form + validation | 2h | 1 | Empty fields show exact PRD error texts; no reload on submit | ✅ |
| 12 | Checkout guard (redirect guest → `/login` → back to `/checkout`) | 2h | 1 | Guest round trip works | ✅ |

### Catalog
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 13 | Fetch products (`useEffect`), loading/error/empty states | 3h | 1 | All three states can be triggered and are visible | ✅ |
| 14 | `ProductCard` + `ProductGrid` (discount price, rating, stock badge) | 4h | 1 | Grid 1 → 2 → 4 columns; card opens details | ✅ |
| 15 | *(FULL)* Search, category, sort, pagination, URL state | 8h | 3 | Filters combine per PRD P2.4–P2.8; refresh keeps state | ⬜ |

### Product
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 16 | Product Details (`useParams`, `[id]` dependency) | 3h | 2 | `/products/1` loads; `/products/abc` and `/999999` show NotFound | ✅ |
| 17 | Image picker + quantity stepper + Add to cart | 3h | 2 | Qty stays within 1…stock; out-of-stock disables button | ✅ |
| 18 | *(FULL)* Reviews + Related products | 5h | 3 | Review survives reload; related link loads new product | ⬜ |

### Cart
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 19 | `CartContext` (add/remove/setQuantity, immutable) + `shop_cart` | 3h | 2 | Badge updates instantly; no mutation; cart survives reload | ✅ |
| 20 | Cart page (lines, totals, empty state, clear cart) | 3h | 2 | Totals update on every change; empty cart looks intentional | ✅ |
| 21 | *(FULL)* Promo code `10X10` | 2h | 3 | `10X10` gives −10%; `abc` shows "Invalid promo code" | ⬜ |

### Checkout
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 22 | Controlled form (Full name, Email, Address, City) + validation | 3h | 2 | Invalid form never submits; errors next to fields | ✅ |
| 23 | Local order confirmation + clear cart | 2h | 2 | "Thank you!" shown, badge back to 0 | ✅ |

### Orders *(FULL)*
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 24 | Orders list + details + status simulation + Reorder | 6h | 3 | New order shows Processing → Shipped in ~1 min without reload | ⬜ |

### Profile *(FULL)*
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 25 | Profile form + theme toggle + clear local data | 4h | 3 | Changes show in Header; theme survives reload | ⬜ |

### Docs & Deploy
| # | Task | Est. | Week | DoD | Status |
|---|---|---|---|---|---|
| 26 | First Vercel deploy + SPA rewrite (`vercel.json`) | 1h | 2 | `/products/5` opens directly and survives refresh | 🟡 |
| 27 | `DEBUG-LOG.md` — log real bugs as they happen | 2h | 1–3 | ≥ 3 entries in PRD format (symptom → repro → tool → cause → fix → lesson) | ⬜ |
| 28 | `README.md` (EN) + `REPORT.md` | 4h | 3 | All PRD D3 sections present, live link at top | ⬜ |
| 29 | Final QA: fresh clone → `npm install && npm run typecheck && npm run build` | 1h | 3 | Passes with 0 errors; repo submitted before Nov 6, 23:59 | ⬜ |

**Total:** ~57h CORE · ~25h FULL

---

## 📅 Timeline

| Week | Dates | Focus |
|---|---|---|
| 1 | Oct 17 – Oct 23 | Setup, types, layout & routing, Auth, Catalog |
| 2 | Oct 24 – Oct 30 | Product, Cart, Checkout, first deploy |
| 3 | Oct 31 – Nov 6 | Responsive, states, Error Boundary, docs, final deploy, FULL features if CORE is complete |

Key dates: theory test **Nov 5** · submission **Nov 6, 23:59** · defense **Nov 7–8**.

---

## 🛡️ Risks & Mitigations

1. **API downtime or slow responses** → Clear loading and error states with fallback messages; app never crashes.
2. **404 on refresh after deploy** → Add `vercel.json` rewrite in the first deploy (week 2), not at the end.
3. **TypeScript strict errors pile up** → Strict mode from day one; run `npm run typecheck` before every commit.
4. **TypeScript and Tailwind are new to me** → Learn in small steps while building; keep a note of new concepts for the defense and theory test.
5. **Limited time (working alongside the project)** → CORE first; FULL only after CORE is deployed; use lighter days for docs and DEBUG-LOG.
