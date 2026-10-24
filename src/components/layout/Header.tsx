import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header>
      <Link to="/" className="font-bold text-xl">
        10X Shop
      </Link>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "font-bold underline" : "")}
        >
          Catalog
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "font-bold underline" : "")}
        >
          Cart
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "font-bold underline" : "")}
        >
          Log in
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
