import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();
  //here we use the useAuth hook to access global authentication 
  //only user and logout because header doesn't need login function, it only needs to display the user's name 
  // and provide a logout button if the user is logged in.
  const navigate = useNavigate();
  //useNavigate is a hook from react-router that allows us to programmatically navigate to different routes in our application.

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  //logout is out state function that will set the user state back to GUEST. 
  // After logging out, we navigate the user back to the home page ("/") using the navigate function.

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
        {user.isLoggedIn ? (
          <div className="items-center gap-4 inline-flex">
            <span>{user.username}</span>
            <button
              onClick={handleLogout}
              className="cursor-pointer"
              type="button"
            >
              Log out
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-bold underline" : ""
            }
          >
            Log in
          </NavLink>
        )}
      </nav>
    </header>
  );
}


//isLoggedIn here can be used because we are using useAuth hook, which provides the user state from the AuthContext.