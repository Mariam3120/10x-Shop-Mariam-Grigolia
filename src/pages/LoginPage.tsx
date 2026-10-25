import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormValues } from "../types/user";

interface LoginErrors {
  username?: string;
  password?: string;
}
//? means optional, when form is loaded it can be empty for the first time

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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //ChangeEvent<HTMLInputElement> it is generic that tells TS (changeEvent tells that something is changing),
    //so <HTMLInputElement> means that change is made on input
    const { name, value } = e.target;
    //destructuring name(input's name) and value (user typing). e.target is that specific element on which the action is happening
    setValues({ ...values, [name]: value });
    //spread operator, we keep old things and also take what we need now
    //[] this is computed property name - so when user types in username field it becomes: usernaem: "someName"
    //when user types in password, [name] becomes password="somePassw12"
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
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(values.username.trim());
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={values.username}
        onChange={handleChange}
      />
      {errors.username && (
        <p className="mt-1 text-sm text-red-600">{errors.username}</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
      )}

      <button type="submit">Log In</button>

      <Link to="/">← Back to catalog</Link>
    </form>
  );
}
export default LoginPage;
