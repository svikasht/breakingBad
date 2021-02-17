import React, { useState } from "react";
import "./Styles/SignIn.css";
import { Link } from "react-router-dom";
import { useHistory, withRouter } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = (user) => {
  let valid = true;

  if (!user.email) {
    valid = false;
  }
  if (!user.password) {
    valid = false;
  }

  return valid;
};

const SignIn = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(user)) {
      let userData = JSON.parse(localStorage.getItem("user"));
      if (
        userData.email === user.email &&
        userData.password === user.password
      ) {
        history.push("/characters");
      } else {
        let formErrors = {};
        formErrors["invalid"] = "Invalid email-id or password";
        setErrors({ ...errors, ...formErrors });
        console.log("Invalid email-id or password");
      }
    } else {
      let formErrors = {};
      if (!user.email) {
        formErrors["email"] = "Enter your email-id";
      }
      if (!user.password) {
        formErrors["password"] = "Enter your password";
      }
      setErrors({ ...errors, ...formErrors });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = {};
    switch (name) {
      case "email":
        if (!value) {
          formErrors["email"] = "Required";
        } else {
          formErrors["email"] = emailRegex.test(value)
            ? ""
            : "Invalid email address";
        }
        break;
      case "password":
        formErrors["password"] = value ? "" : "Required";
        break;
      default:
        break;
    }
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, ...formErrors });
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              className={errors.email?.length > 0 ? "error" : null}
              placeholder="Email"
              type="email"
              name="email"
              noValidate
              onChange={handleChange}
            />
            {errors.email?.length > 0 && (
              <span className="errorMessage">{errors.email}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              className={errors.password?.length > 0 ? "error" : null}
              placeholder="Password"
              type="password"
              name="password"
              noValidate
              onChange={handleChange}
            />
            {errors.password?.length > 0 && (
              <span className="errorMessage">{errors.password}</span>
            )}
          </div>
          {errors.invalid?.length > 0 && (
            <span className="errorMessage">{errors.invalid}</span>
          )}
          <div className="createAccount">
            <button type="submit">Sign In</button>
            <Link to="/forgotpassword">
              <p>Forgot password?</p>
            </Link>
            <Link to="/signup">
              <p>Don't have an Account? Sign up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
