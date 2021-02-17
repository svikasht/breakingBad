import React, { useState } from "react";
import "./Styles/SignUp.css";
import { Link } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const passwordRegex = RegExp(
  /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
);

const formValid = (errors, user) => {
  let valid = true;

  Object.values(errors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  if (Object.values(user).length === 0) {
    valid = false;
  }

  return valid;
};

const SignUp = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(errors, user)) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsRegistered(true);
      console.log("Registration Successful");
    } else {
      let formErrors = {};
      if (!user.firstName) {
        formErrors["firstName"] = "Enter your first name";
      }
      if (!user.lastName) {
        formErrors["lastName"] = "Enter your last name";
      }
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
      case "firstName":
        formErrors["firstName"] =
          value.length < 3 ? "Minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors["lastName"] =
          value.length < 3 ? "Minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors["email"] = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        if (value.length < 6) {
          formErrors["password"] = "Minimum 6 characaters required";
        } else {
          formErrors["password"] = passwordRegex.test(value)
            ? ""
            : "Write a strong password";
        }
        break;
      default:
        break;
    }
    setUser({ ...user, [name]: value });

    setErrors({ ...errors, ...formErrors });
    console.log(formErrors);
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input
              className={errors.firstName?.length > 0 ? "error" : null}
              placeholder="First Name"
              type="text"
              name="firstName"
              noValidate
              onChange={handleChange}
            />
            {errors.firstName?.length > 0 && (
              <span className="errorMessage">{errors.firstName}</span>
            )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input
              className={errors.lastName?.length > 0 ? "error" : null}
              placeholder="Last Name"
              type="text"
              name="lastName"
              noValidate
              onChange={handleChange}
            />
            {errors.lastName?.length > 0 && (
              <span className="errorMessage">{errors.lastName}</span>
            )}
          </div>
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
          {isRegistered && (
            <p style={{ color: "green" }}>Registration successful</p>
          )}
          <div className="createAccount">
            <button type="submit">Create Account</button>
            <Link to="/">
              <p>Already Have an Account? Sign In</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
