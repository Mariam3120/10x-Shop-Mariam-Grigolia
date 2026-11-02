import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h1 className="mb-3 text-3xl font-bold">Page not found</h1>
      <p className="mb-6 text-muted">The page you are looking for does not exist.</p>

      <Link to="/" className="btn-primary">
        Go to catalog
      </Link>
    </div>
  );
}
export default NotFoundPage;
