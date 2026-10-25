import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//we create this hook to avoid importing useContext and AuthContext in every component 
// that needs to access the authentication state and functions.

export function useAuth() {
  const context = useContext(AuthContext);
  //useContext is a react hook that allows us to access the value of a context. 
  // In this case, we are accessing the value of the AuthContext, which is provided by the AuthProvider component.
  //  The context variable will hold the current value of the AuthContext, 
  // which includes the user state and the login/logout functions.

  if(context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  //here we check if the context is null, which means that the useAuth hook is being used outside of the AuthProvider component.

  return context;
  //if the context is not null, we return the context value, which includes the user state and the login/logout functions.
}
