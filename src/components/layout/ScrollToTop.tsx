import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default ScrollToTop;


//[pathname] means the effect re-runs every time the URL path changes, which is exactly when we want to scroll up.
//[] would run it only once, on the first load. After that, changing pages would never scroll to the top.