# 10X Shop — Final Report

**Live demo:** https://10x-shop-mariam-grigolia.vercel.app

## Planned vs Delivered

### React
| Requirement | Level | Status |
|---|---|---|
| Components, props, `children`, lists with stable keys | CORE | ✅ |
| `useState` / `useEffect`, loading / error / empty states | CORE | ✅ |
| React Router: layout route, params, 404, protected checkout | CORE | ✅ |
| `AuthContext` and `CartContext` | CORE | ✅ |
| Controlled Login and Checkout forms with validation | CORE | ✅ |
| Add to cart from cards and product page, stock limits | CORE | ✅ |
| Search, categories, sorting, pagination, URL state | FULL | ⬜ not yet |
| Promo code `10X10` with "Invalid promo code" error | FULL | ✅ |
| Reviews, related products | FULL | ⬜ not yet |
| Orders, Profile, cart reducer, custom hooks | FULL | ⬜ not yet |

### TypeScript
| Requirement | Level | Status |
|---|---|---|
| `strict: true`, no `any`, typecheck with 0 errors | CORE | ✅ |
| Typed props, state and API data; models in `types/` | CORE | ✅ |
| Generics (`useState<T>`, `Promise<T>`, `createContext<T>`) | CORE | ✅ |
| Type guards (`getFromPath` for router state) | FULL | ✅ |
| Utility types (`Partial<ShippingInfo>`) | FULL | ✅ |
| `ApiClient` / `ApiError`, OOP classes, discriminated unions | FULL | ⬜ not yet |

### Tailwind CSS
| Requirement | Level | Status |
|---|---|---|
| v4 with `@tailwindcss/vite`, utility styling | CORE | ✅ |
| Flex and grid, mobile-first responsive grid | CORE | ✅ |
| `hover:`, `focus-visible`, `disabled:` states | CORE | ✅ |
| `@theme` design tokens, custom `@utility` classes | FULL | ✅ |
| Dark / light mode toggle | FULL | ⬜ not yet |

### Optimization and Debugging
| Requirement | Level | Status |
|---|---|---|
| Error Boundary with fallback and Reload | CORE | ✅ |
| `DEBUG-LOG.md` with at least 3 real bugs | CORE | ✅ 6 entries |
| Works at 375px with no horizontal scroll, tap targets ≥ 44px | CORE | ✅ |
| Chrome + Firefox check | CORE | ✅ |
| Lazy images (`loading="lazy"`, width and height) | FULL | ✅ |
| Lazy routes, memoization, Lighthouse before / after, `COMPATIBILITY.md` | FULL | ⬜ not yet |

### Process
| Requirement | Level | Status |
|---|---|---|
| Public repo, real commit history, `PLAN.md` before feature code | CORE | ✅ |
| `README.md`, `REPORT.md`, live deploy | CORE | ✅ |
| Feature branches and PRs linked to Issues (≥ 8) | FULL | ✅ 15 merged PRs |
| ≥ 20 Issues, Projects board, weekly progress notes, demo video | FULL | ⬜ not yet |

**Not done yet, and why:** I built CORE first and finished it completely before starting FULL, as planned. I also work a job alongside the project, so the FULL features are the next step after this report.

## Metrics

| Metric | Value |
|---|---|
| Commits on `main` | 66, on 11 different days (Oct 19 – Nov 6) |
| Merged pull requests | 15 |
| Closed Issues | TODO: check the count on GitHub |
| JS bundle | 280.97 kB (87.90 kB gzip) |
| CSS bundle | 25.66 kB (5.54 kB gzip) |
| Lighthouse before / after | Not measured yet (FULL) |

### Hours by epic
Estimates come from `PLAN.md`. TODO: fill in the real hours.

| Epic | Estimated | Real |
|---|---|---|
| Setup & quality | 14h | TODO |
| Layout & routing | 5h | TODO |
| Auth | 6h | TODO |
| Catalog | 7h | TODO |
| Product | 6h | TODO |
| Cart | 6h | TODO |
| Checkout | 5h | TODO |
| Docs & deploy | 8h | TODO |

## 3 Hardest Problems

1. **Logout on Checkout went to Login.** Logging out from `/checkout` landed on `/login`, because React applied the logout before the navigation, and `ProtectedRoute` redirected the "guest" first. I fixed it by putting both updates in one `startTransition`. (DEBUG-LOG #5)
2. **Redirect back after login.** The login page had to send the user back to `/checkout`. React Router types `location.state` as `any`, so I wrote a type guard instead of an `as` cast. On the way I also hit the `window.location` trap. (DEBUG-LOG #4)
3. **Cart logic without mutation.** Adding the same product twice, keeping quantity between 1 and stock, and refusing to go over stock all had to create new arrays with `map`, `filter` and spread. `addItem` returns `true` or `false`, so buttons can show "Added ✓" or "No more in stock".

## What I Would Do Differently

- Create GitHub Issues for every task from the start, including small fixes, to reach the FULL Issue count naturally.
- Commit on more separate days, in smaller steps.
- Check every PRD section again right after building each page. I found two CORE gaps late (the Add to cart button on cards, and the exact Error Boundary text).
- Write DEBUG-LOG entries on the day a bug happens, while the details are fresh.

## AI Usage

TODO: read and adjust these lines so they match your own experience.

- I used Claude (Anthropic) as a mentor: it explained concepts, gave me TODO-style starter code, and reviewed what I wrote. I typed the feature code myself.
- I let it do mechanical work: the named-exports refactor, the design and WoW styling, the first `PLAN.md` draft, and the first drafts of these docs.
- It reproduced the logout bug with a headless Chrome script and suggested the `startTransition` fix, which I tested and committed.
- I made the decisions myself, sometimes against its first idea: no burger menu (the PRD allows a second row), `useState` for the cart before the FULL reducer, and React Router 7 instead of 8 because of my Node version.
- It made mistakes too: it suggested the deprecated `FormEvent` type, and missed two CORE requirements until we re-checked the PRD.
