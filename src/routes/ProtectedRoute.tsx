import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { user } = useAuth();
  //we call global value, to see if someone is logged in at all, we only take user from obj

  const location = useLocation();
  //useLocation is react-router isntrument that tells exactly where the user is (e.g if user is tying to reach checkout page)

  if(!user.isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  //when user is not logged in we return him back to login page 
  //replace deletes from history the current page user is 
  //from: location.pathname - by that we say, let him login but also remember from which path he came :))so if user logins 
  //successfully redirected to that page automatically :D

  return <Outlet />
  //if user saccessfully logged in then we allow checkout or whtvr page to appear 
}
