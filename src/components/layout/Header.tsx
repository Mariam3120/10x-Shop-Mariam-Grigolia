import { Link, NavLink, useNavigate } from "react-router";
import { startTransition } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const { user, logout } = useAuth();
  //here we use the useAuth hook to access global authentication
  //only user and logout because header doesn't need login function, it only needs to display the user's name
  // and provide a logout button if the user is logged in.
  const { itemCount } = useCart(); //useCart hook to access the cart state and functions, we only need itemCount for the badge in the header.
  const navigate = useNavigate();
  //useNavigate is a hook from react-router that allows us to programmatically navigate to different routes in our application.

  const handleLogout = () => {
    startTransition(() => {
      logout();
      navigate("/");
    });
  };

  //logout is out state function that will set the user state back to GUEST.
  // After logging out, we navigate the user back to the home page ("/") using the navigate function.
  //startTransition gives both updates the same priority, so React applies them together. ProtectedRoute never gets a moment where you're a guest on /checkout.

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-footer/90 backdrop-blur">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link to="/" className="text-xl font-bold text-accent">
          10X Shop
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-accent" : "transition hover:text-accent-soft"
            }
          >
            Catalog
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-accent" : "transition hover:text-accent-soft"
            }
          >
            Cart
            {itemCount > 0 && (
              <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-on-accent">
                {itemCount}
              </span>
              //if itemCount is greater than 0 show the budge with the number of items in the cart, otherwise don't show anything
            )}
          </NavLink>
          {user.isLoggedIn ? (
            <div className="items-center gap-4 inline-flex">
              <span className="text-muted">{user.username}</span>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                type="button"
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-primary">
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

//isLoggedIn here can be used because we are using useAuth hook, which provides the user state from the AuthContext.
