# Debug Log

Real bugs I found while building 10X Shop. Each entry follows the PRD O2 format:
symptom → reproduction → tool → root cause → fix → lesson.

---

## 1. `npm install` failed with ERESOLVE right after setup

- **Symptom:** The fresh Vite project would not install. npm stopped with an `ERESOLVE` dependency conflict.
- **Reproduction:**
  1. `npm create vite@latest . -- --template react-ts` (create-vite 9.3)
  2. `npm install`
- **Tool:** npm error output. It showed that `typescript-eslint` needs `typescript >=4.8.4 <6.1.0`, but the template asked for TypeScript 7.
- **Root cause:** The template shipped a TypeScript version that was newer than what the ESLint plugin supports.
- **Fix:** Pinned `"typescript": "~6.0.3"` in `package.json`.
  [7e56182](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/7e561823bfcc3cfbc28e134186879eab46a45b3b)
- **Lesson:** The newest version is not always compatible. Peer dependency ranges in the error message tell you exactly which version to use.

---

## 2. `tsc --noEmit` reported 0 errors but checked nothing

- **Symptom:** The typecheck command always passed, even when a file had an obvious type error.
- **Reproduction:**
  1. Add a wrong type on purpose, e.g. `const n: number = "text";`
  2. Run `tsc --noEmit`: exit code 0, no errors.
  3. Run `tsc -b --noEmit`: the error is reported.
- **Tool:** The TypeScript compiler itself, comparing the two commands.
- **Root cause:** Vite's root `tsconfig.json` has `"files": []` and only points to other configs through `references`. Plain `tsc` checks the root config, which contains no files. `-b` (build mode) follows the references.
- **Fix:** Set the `typecheck` script to `tsc -b --noEmit`.
  [7ccbf04](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/7ccbf04d258ad8b81a60a8c252fac3ee335cf38a)
- **Lesson:** A check that never fails is not a check. Test your tools by breaking something on purpose.

---

## 3. TypeScript caught a missing `discountPercentage` in the cart

- **Symptom:** A red line in `CartProvider.tsx` and a typecheck error:
  `TS2741: Property 'discountPercentage' is missing in type ... but required in type 'CartItem'`.
- **Reproduction:** Build a new `CartItem` in `addItem` without the `discountPercentage` field, then run `npm run typecheck`.
- **Tool:** TypeScript compiler (`npm run typecheck`) and the editor's red underline.
- **Root cause:** I copied the product fields by hand and forgot one. Without it, the cart could not calculate the sale price, so cart totals would have been wrong at runtime.
- **Fix:** Added `discountPercentage: product.discountPercentage` to the new cart item.
  [1ce65b1](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/1ce65b1f1e4b21a58ec57541ee086b295abf0e0e)
- **Lesson:** This is a runtime bug that TypeScript stopped before it reached the browser. Strict types on shared models like `CartItem` are worth it.

---

## 4. `location` silently used the browser's `window.location`

- **Symptom:** In `LoginPage`, the redirect back to `/checkout` after logging in did not work. Later, the same mistake appeared in `Layout`, where the Error Boundary `key` used `location.pathname`.
- **Reproduction:**
  1. Use `location.state` or `location.pathname` in a component without calling `useLocation()`.
  2. Run `npm run typecheck`: no error.
- **Tool:** Code review. TypeScript and ESLint could not catch it, because `location` is a valid global variable.
- **Root cause:** Without `const location = useLocation();`, the name `location` refers to `window.location`. React Router's `state` is not there, and React does not re-render when it changes.
- **Fix:** Added `useLocation()` in both components.
  [b3e168c](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/b3e168c9700d3d60b0d93c225989a270f2ecc544) (LoginPage),
  [cf225c6](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/cf225c6b40bf71a66d2f71b7ab57decaf3f593dd) (Layout)
- **Lesson:** A passing typecheck does not prove the right variable is used. Globals with common names (`location`, `name`, `status`) are a trap.

---

## 5. Logging out on `/checkout` landed on `/login` instead of the catalog

- **Symptom:** During the full flow test, clicking **Log out** on the Checkout page opened the Login page. From other pages it correctly went to the catalog.
- **Reproduction:**
  1. Log in, add a product, go to `/checkout`.
  2. Click **Log out** in the Header.
  3. Expected `/`, got `/login`.
- **Tool:** Manual flow test, then reproduced with a small automated script in headless Chrome that logged in, logged out and printed the URL: `/login -> /checkout -> /login`.
- **Root cause:** `logout()` and `navigate("/")` were applied with different priorities. React Router runs navigation as a low-priority transition, so the logout update was rendered first. While still on `/checkout`, `ProtectedRoute` saw a guest and redirected to `/login`, which won over my navigation.
- **Fix:** Wrapped both calls in `startTransition`, so React applies them together.
  [7d4c0a9](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/7d4c0a9d1b093224ebb614fef05a96cafe759028)
- **Lesson:** Two state updates in one click do not always land at the same moment. Protected routes need to be tested from inside the protected page too.

---

## 6. Out-of-stock product showed quantity 1

- **Symptom:** On `/products/132` (stock 0) the stepper buttons were disabled, but the quantity still showed **1**.
- **Reproduction:** Open `/products/132` and look at the quantity stepper.
- **Tool:** Manual testing in the browser.
- **Root cause:** The stepper displayed the `quantity` state, which always starts at 1. The stock was never part of what was displayed.
- **Fix:** Pass `quantity={product.stock === 0 ? 0 : quantity}` to the stepper.
  [4cef7f1](https://github.com/Mariam3120/10x-Shop-Mariam-Grigolia/commit/4cef7f1938f53568228db87a52d5c3b4dadfffa6)
- **Lesson:** Disabled controls must also show a value that makes sense. Test edge cases like stock 0 and stock 1, not only normal products.
