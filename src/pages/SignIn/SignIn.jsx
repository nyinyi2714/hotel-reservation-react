import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { backendUrl } from "../../config";
import { useStateContext } from "../../StateContext";
import "./SignIn.css";

/**
 * Using this form, can sign in to an account that has already been created.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 17 2023
 * @returns {JSX.Element} component that displays the user sign in form.
 */
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for indicating if signing in is in progress
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  // Retrieve functions stored in central react state
  const { setAccessToken } = useStateContext();

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

  /**
   * Validates the password.
   * Password is invalid if it's empty.
   * @returns {boolean} if the input is not empty return true, else false.
   */
  const validatePassword = () => {
    if (password.length < 1) {
      setIsPasswordValid(false);
      return false;
    } else {
      setIsPasswordValid(true);
      return true;
    }
  };

  /**
   * access email state and validate the input email.
   * @returns {boolean} if the email input is valid then true, else false.
   */
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
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

  /**
   * This handle submission, validation and sign in.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission action
    e.preventDefault(); 

    // If sign-in process has already started, stop from submitting again
    if(isSigningIn) return;

    // If email and password are invalid, stop form submission
    if (!validateEmail() || !validatePassword()) return;
    
    setIsSigningIn(true);
    // Sending sign in credentials to backend API
    try {
      const response = await fetch(`${backendUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log("Sign-in successful:", responseData.user);
        // Store the access token 
        setAccessToken(responseData.user.access);
        // Navigate back to the previous route after successful registration
        navigate(-1);
      } else {
        console.error("Sign-in failed:", responseData.error);
        // Handle sign-in failure, display an error message, etc.
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle fetch or other errors.
    }

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
              className="password"
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
        </form>
      </div>
    </div>
  );
}

export default SignIn;
