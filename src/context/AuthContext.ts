import { createContext  } from "react";
import type { AuthUser } from "../types/user";

//here we create a CONTEXT!! which provider will use to pass down the authentication state and functions to log in and log out.

export interface AuthContextValue {
  user: AuthUser;
  login: (username: string) => void;
  logout: () => void;
}

//So here we create a context that will hold the authentication state and functions to log in and log out. 
//user must be of type AuthUser, and login and logout are functions that take a username and return void!! respectively.
// AuthUser is imported from user.ts, which defines the shape of the user object. 
// The context is initialized with a null value, which will be replaced with an actual value when the AuthProvider component is used.

export const AuthContext = createContext<AuthContextValue | null>(null);
//AuthContex is a context that is an instrument from which we can use to pass data through the component tree without having to pass props down manually at every level.
//AuthContextValue is the type of the VALUE that will be provided by the context. 
//null>(null) is generic type parameter that specifies the type of the context value. In this case, it is either AuthContextValue or null.


//Why import type? my tsconfig has verbatimModuleSyntax, which means anything that's only a type must be imported with import type. Otherwise TS shows an error.
