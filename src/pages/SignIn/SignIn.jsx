import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "./SignIn.css";

export default function SignIn() {
// State for storing email input
const [email, setEmail] = useState("");
// State for storing password input
const [password, setPassword] = useState("");
// State for password validation
const [isPasswordValid, setIsPasswordValid] = useState(true);
// State for email validation
const [isEmailValid, setIsEmailValid] = useState(true);
// State for toggling password visibility
const [showPassword, setShowPassword] = useState(false);
// State for indicating if signing in is in progress
const [isSigningIn, setIsSigningIn] = useState(false);


  // Update email state on input change
  const handleEmail = (e) => {
    setEmail(e.target.value); 
  };

  // Update password state on input change
  const handlePassword = (e) => {
    setPassword(e.target.value); 
  };

  // Toggle the visibility of the password input
  const togglePasswordHide = () => {
    setShowPassword(!showPassword); 
  };

  // Password is invalid if it's empty
  const validatePassword = () => {
    if (password.length < 1) {
      setIsPasswordValid(false);
      return false;
    } else {
      setIsPasswordValid(true);
      return true;
    }
  };

  // Email is invalid if it doesn't end with "csun.edu"
  const validateEmail = () => {
    // TODO: Change to validate against any email pattern
    if (!email.endsWith("csun.edu")) {
      setIsEmailValid(false); 
      return false;
    } else {
      setIsEmailValid(true);
      return true;
    }
  };

  // Run password validation on password change
  useEffect(() => {
    if (!isPasswordValid) validatePassword();
  }, [password]);

  // Run email validation on email change
  useEffect(() => {
    if (!isEmailValid) validateEmail(); 
  }, [email]);

  const handleSubmit = (e) => {
    // Prevent default form submission action
    e.preventDefault(); 

    // If email and password are invalid, stop form submission
    if (!validateEmail() || !validatePassword()) return;
    
    setIsSigningIn(true);
    // TODO: Implement sign in to backend
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
              data-testid="toggle-password-button"
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

          <input
            className="clickable"
            type="submit"
            value={isSigningIn ? "Signing In" : "Sign In"}
          />
          <Link to="/resetpassword" className="signin__forgot-password">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
}
