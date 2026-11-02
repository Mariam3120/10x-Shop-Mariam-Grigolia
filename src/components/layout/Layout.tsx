import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
  const location = useLocation();
  // useLocation gives the current URL and re-renders Layout whenever it changes.
  // key={location.pathname}: a new page means a new key, so React creates a fresh
  // ErrorBoundary with hasError: false. Without it, the fallback stays after navigating.

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="page-width flex-1 py-8">
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
