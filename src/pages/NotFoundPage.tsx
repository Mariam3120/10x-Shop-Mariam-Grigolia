import { Link } from "react-router";

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go to catalog</Link>
    </>
  );
}
export default NotFoundPage;
