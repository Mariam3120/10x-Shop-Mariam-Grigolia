import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser } from "../types/user";

//here we define PROVIDER. provider should know context and should be able to provide context to its children. 
// we also define GUEST, which is a default user object that represents a guest user who is not logged in. 

const GUEST: AuthUser = { username: "", isLoggedIn: false };
//here we also say that GUEST should be of type AuthUser, which means it must have a username and isLoggedIn property.

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(GUEST);
  //state that holds the current user object, initialized to GUEST. setUser is a function that allows us to update the user state.

  function login(username: string) {
    setUser({ username, isLoggedIn: true });
  }
  //here created function that takes username as a parameter(as it should know who logged in by name) and updates the user state to a new object with the provided username and isLoggedIn set to true.

  function logout() {
    setUser(GUEST);
  }
  //logout just cleans the user state by setting it back to GUEST.

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  //AuthContext.Providers is kind of "ANTENA:)" that allows us to pass the user state and the login/logout functions down to any component that needs them. The children prop represents any child components that will be wrapped by this provider, allowing them to access the authentication context.
}