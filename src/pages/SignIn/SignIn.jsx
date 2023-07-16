import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "./SignIn.css";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleEmail = (e) => {
    setemail(e.target.value);
  };

  const validatePassword = () => {
    if (password.length < 1) setIsPasswordValid(false);
    else setIsPasswordValid(true);
  };

  const validateEmail = () => {
    // TODO: Change to just any email
    if (!email.endsWith("csun.edu")) setIsEmailValid(false);
    else setIsEmailValid(true);
  };

  useEffect(() => {
    if (!isPasswordValid) validatePassword();
  }, [password]);

  useEffect(() => {
    if (!isEmailValid) validateEmail();
  }, [email]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  // Stop the form from submitting.
  // TODO: Change after backend inplemented signin url
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail()
    validatePassword()
    setIsSigningIn(true);
    // Sign In to Backend
    setIsSigningIn(false);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin box-shadow-equal">
        <div className="signin__signup-invite">
          <h3>New Here?</h3>
          <p>
            Sign up today to enjoy hassle-free booking and convenient
            reservation management.
          </p>
          <Link to="/signup" className="signin__signup-btn">
            Sign Up
          </Link>
        </div>
        <form className="signin__form" onSubmit={handleSubmit}>
          <div className="signin__hotel-logo">HOTEL LOGO</div>
          <h1>Welcome Back</h1>
          <h2>Sign in to your account</h2>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              onBlur={validateEmail}
            />
          </div>
          <span
            className={
              isEmailValid
                ? "signin__invalid-field"
                : "signin__invalid-field show"
            }
          >
            Please enter a valid email address
            <i className="bx bx-error-circle signin__err" />
          </span>
          <div className="signin__password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              onBlur={validatePassword}
            />
            <button
              type="button"
              className="signin__icon clickable"
              onClick={togglePasswordHide}
            >
              <i className={showPassword ? "bx bx-hide" : "bx bx-show"} />
            </button>
            <span
              className={
                isPasswordValid
                  ? "signin__invalid-field"
                  : "signin__invalid-field show"
              }
            >
              Please enter a password
              <i className="bx bx-error-circle signin__err" />
            </span>
          </div>

          <input className="clickable" type="submit" value={isSigningIn ? "Signing In" : "Sign In"} />
          <Link to="/resetpassword" className="signin__forgot-password">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
}
