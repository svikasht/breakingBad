import React, { useState } from "react";
import "./Styles/ForgotPassword.css";
import { Link } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = (user) => {
  let valid = true;
  if (!user.email) {
    valid = false;
  }
  if (!user.newPassword) {
    valid = false;
  }
  if (!user.reNewPassword) {
    valid = false;
  }

  return valid;
};

const ForgotPassword = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [reset, setReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(user)) {
      let userData = JSON.parse(localStorage.getItem("user"));
      if (userData.email !== user.email) {
        let formErrors = {};
        formErrors["invalid"] = "User does not exist!";
        setErrors({ ...errors, ...formErrors });
      } else if (user.newPassword !== user.reNewPassword) {
        let formErrors = {};
        formErrors["invalid"] =
          "New password and re enter new password must match";
        setErrors({ ...errors, ...formErrors });
      } else {
        userData["password"] = user.newPassword;
        localStorage.setItem("user", JSON.stringify(userData));
        setReset(true);
      }
    } else {
      let formErrors = {};
      if (!user.email) {
        formErrors["email"] = "Enter your email-id";
      }
      if (!user.newPassword) {
        formErrors["newPassword"] = "Enter your new password";
      }
      if (!user.reNewPassword) {
        formErrors["reNewPassword"] = "Re enter your new password";
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
          formErrors["newPassword"] = "Required";
        } else {
          formErrors["newPassword"] = emailRegex.test(value)
            ? ""
            : "Invalid email address";
        }
        break;
      case "newPassword":
        formErrors["newPassword"] = value ? "" : "Required";
        break;
      case "reNewPassword":
        formErrors["reNewPassword"] = value ? "" : "Required";
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
        <h1>Forgot Password?</h1>
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
            {errors.email && (
              <span className="errorMessage">{errors.email}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">New Password</label>
            <input
              className={errors.newPassword?.length > 0 ? "error" : null}
              placeholder="New Password"
              type="password"
              name="newPassword"
              noValidate
              onChange={handleChange}
            />
            {errors.newPassword && (
              <span className="errorMessage">{errors.newPassword}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Re-enter new password</label>
            <input
              className={errors.reNewPassword?.length > 0 ? "error" : null}
              placeholder="Re enter new password"
              type="password"
              name="reNewPassword"
              noValidate
              onChange={handleChange}
            />
            {errors.reNewPassword && (
              <span className="errorMessage">{errors.reNewPassword}</span>
            )}
          </div>
          {errors.invalid?.length > 0 && (
            <span className="errorMessage">{errors.invalid}</span>
          )}
          {reset && (
            <p style={{ color: "green" }}>Password changed successfully</p>
          )}
          <div className="createAccount">
            <button type="submit">Reset Password</button>
            <Link to="/">
              <p>Sign In</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
