import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormValues } from "../types/user";

interface LoginErrors {
  username?: string;
  password?: string;
}
//? means optional, when form is loaded it can be empty for the first time

function getFromPath(state: unknown): string {
  //here state is variable name that location.state used which protectedRoute used (unknown in TS is that we don;t know what it is -obj, null, string, number...)
  //last :string means doesn't matter what path the function goes return STRING 
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string"
  ) {
    return state.from;
  }
  //first we check if it is object at all and if state !== null (coz in js null is obj)
  //then we check if obj has "from", and we check that this from is really a text, after TS allows to return state.from

  return "/";
  //if mistake then traightforward to main pg
}


function LoginPage() {
  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  //we use here generic- that tells TS that it is strictly determined the structure
  //for the first it is empty

  const [errors, setErrors] = useState<LoginErrors>({});
  //create errors state - for first it is also empty, there are no errors when user enters the app first time

  const { login } = useAuth();
  //we used global value that is accesible by hook, we need just to login(isLoggedIn: true)
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //ChangeEvent<HTMLInputElement> it is generic that tells TS (changeEvent tells that something is changing),
    //so <HTMLInputElement> means that change is made on input
    const { name, value } = e.target;
    //destructuring name(input's name) and value (user typing). e.target is that specific element on which the action is happening
    setValues({ ...values, [name]: value });
    //spread operator, we keep old things and also take what we need now
    //[] this is computed property name - so when user types in username field it becomes: usernaem: "someName"
    //when user types in password, [name] becomes password="somePassw12"
    setErrors({ ...errors, [name]: undefined });
    //here we say take/spread old errors that we have and leave it still on power:) 
    //[name] to understand where the user is typing if he types in username name will become username. if passwrd -> psswrd then
    //undefined thells: make that error undefined-so clean it (gaxade am eroris mnishvneloba undefined)
  }

  function validate(): LoginErrors {
    const newErrors: LoginErrors = {};

    if (!values.username.trim()) {
      newErrors.username = "Username is required";
    }
    //if username doesn't exist or there is just empty space, write an error message
    //newErrors.username - here means I called: 'username' for to easily see on which component to write the line (matching)
    //newErrors is an object that's why we can write with dot notation

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  }
  //so in validate function we say to TS by writing validate(): LoginErrors that it should return same type of values as LoginErrors(so errors object)
  //after we again create new errors value that is empty for first coz we don;t know if user will have some errors or no 
  //and this new errors are the type of LoginErrors

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    //we say to TS that that event is connecting to submit 
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    //again after clicked on login we say to check if there are errors, which comes as an object 
    //and validate checks and assigns to newErrors value name 
    //then we set it, if errors appear we put it in setErrors to see red messages on inputs 

    if (Object.keys(newErrors).length === 0) {
      login(values.username.trim());
      navigate(getFromPath(location.state), { replace: true });
    }
    //Object.keys(newErrors) takes newErrors object and puts its keys inside an array
    //if obj is {} empty array will be as well, if there are mistakes in username array will be [username]
    //when all good we log in globally which is given name and trim 
    //navigate to our helper func, which takes param what protectedRoute delivered(this:return <Navigate to="/login" replace state={{ from: location.pathname }} />)
    //replace:true means - don;t write it as new page history just change current (login) to checkout
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-3 rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <h1 className="text-3xl font-bold">Log in</h1>
      <p className="wow-phrase">You are not prepared!</p>

      <label htmlFor="username" className="text-sm font-medium">Username</label>
      <input
        id="username"
        name="username"
        className="field"
        value={values.username}
        onChange={handleChange}
      />
      {errors.username && (
        <p className="text-sm text-danger">{errors.username}</p>
      )}

      <label htmlFor="password" className="text-sm font-medium">Password</label>
      <input
        id="password"
        name="password"
        className="field"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && (
        <p className="text-sm text-danger">{errors.password}</p>
      )}

      <button type="submit" className="btn-primary mt-2 w-full">Log In</button>

      <Link to="/" className="text-center text-sm text-muted transition hover:text-accent">
        ← Back to catalog
      </Link>
    </form>
  );
}
export default LoginPage;
