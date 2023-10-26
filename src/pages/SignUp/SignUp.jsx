import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { backendUrl } from "../../config";
import { useStateContext } from "../../StateContext";
import useAuth from "../../hooks/useAuth";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [password, setPassword] = useState("");
  const [passLengthTest, setPassLengthTest] = useState(false);
  const [passLowercaseTest, setPassLowercaseTest] = useState(false);
  const [passUppercaseTest, setPassUppercaseTest] = useState(false);
  const [passNumberTest, setPassNumberTest] = useState(false);

  // State for taking double entry for password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // State for indicating if signupg in is in progress
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { setUser } = useStateContext();
  const navigate = useNavigate();
  const { register } = useAuth();

  // Update name state on input change
  const handleName = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const validateName = (name) => {
    const result = name.length > 0;
    setIsNameValid(result);
    return result;
  };

  // Update email state on input change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

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

  const validatePassword = (password) => {
    const passwordRegex = {
      lengthRegex: /^.{8,32}$/,
      lowercaseRegex: /^(?=.*[a-z])/,
      uppercaseRegex: /^(?=.*[A-Z])/,
      numberRegex: /^(?=.*\d)/,
    };

    const results = {
      lengthRegex: false,
      lowercaseRegex: false,
      uppercaseRegex: false,
      numberRegex: false,
    };

    let allTestsPassed = true;
    Object.keys(passwordRegex).forEach((regex) => {
      const result = passwordRegex[regex].test(password);
      if (!result) allTestsPassed = false;
      results[regex] = result;
    });

    if (setPassLengthTest) setPassLengthTest(results.lengthRegex);
    if (setPassLowercaseTest) setPassLowercaseTest(results.lowercaseRegex);
    if (setPassUppercaseTest) setPassUppercaseTest(results.uppercaseRegex);
    if (setPassNumberTest) setPassNumberTest(results.numberRegex);
    return allTestsPassed;
  };

  // Run email validation on email change
  useEffect(() => {
    if (!isEmailValid) validateEmail();
  }, [email]);


  const handlePhoneNumber = (e) => {
    if (e.target.value.length > 10) return;
    const isIntegerOnly = /^\d*$/.test(e.target.value);
    if (isIntegerOnly) {
      setPhoneNumber(e.target.value);
    } else {
      return;
    }
  };

  const validatePhoneNumber = () => {
    const result = phoneNumber.length === 10;
    if (result) {
      setIsPhoneNumberValid(true);
      return true;
    } else {
      setIsPhoneNumberValid(false);
      return false;
    }
  };

  // Update password state on input change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  // Update confirmPassword state on input change
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswordMatch(e.target.value);
  };

  const validatePasswordMatch = (confirm_password) => {
    const result = confirm_password === password; // original password is being compared.
    setIsPasswordMatch(result);
    return result;
  };

  const runAllValidationTests = () => {
    return (
      validateName(name)
      && validateEmail()
      && validatePassword(password)
      && validatePasswordMatch(confirmPassword)
    )
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission action
    e.preventDefault();

    // If sign-in process has already started, stop from submitting again
    if (isSigningUp) return;

    // If any validation test is failed, stop form submission
    if (!runAllValidationTests()) return;

    setIsSigningUp(true);
    register(email, password, name, phoneNumber);

    setIsSigningUp(false);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup box-shadow-equal">
        <div className="signup__signin-invite">
          <h3>Already a Member?</h3>
          <p>
            Sign in to access your reservations and
            conveniently manage your stays.
          </p>
          <Link to="/signin" className="signup__signin-btn">
            Sign In
          </Link>
        </div>
        <form className="signup__form" onSubmit={handleSubmit}>
          <h2>CREATE AN ACCOUNT</h2>
          <div className="relative-position">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            <span
              className={
                isNameValid
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Please enter your Name
              <i className="bx bx-error-circle signup__err" />
            </span>
          </div>
          <div className="relative-position">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              onBlur={validateEmail}
            />
            <span
              className={
                isEmailValid
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Please enter a valid email address
              <i className="bx bx-error-circle signup__err" />
            </span>
          </div>
          <div className="relative-position">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              onBlur={validatePhoneNumber}
            />
            <span
              className={
                isPhoneNumberValid
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Please enter a valid US Phone Number
              <i className="bx bx-error-circle signup__err" />
            </span>
          </div>
          <div className="relative-position">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            <ul className="signup__password-requirements">
              <li data-testid="password-req-1" className={passLengthTest ? "check" : ""}>
                Must be between 8 and 32 characters
              </li>
              <li data-testid="password-req-2" className={passLowercaseTest ? "check" : ""}>
                Contain one lowercase letter
              </li>
              <li data-testid="password-req-3" className={passUppercaseTest ? "check" : ""}>
                Contain one uppercase letter
              </li>
              <li data-testid="password-req-4" className={passNumberTest ? "check" : ""}>
                One number (0-9)
              </li>
            </ul>
          </div>
          <div className="relative-position">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            <span
              className={
                isPasswordMatch
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Passwords do not match
              <i className="bx bx-error-circle signup__err" />
            </span>
          </div>
          <input
            className="clickable"
            type="submit"
            value={isSigningUp ? "Signing Up" : "Sign Up"}
          />
          <div className="dark-btn-container">
            <span>Already have an account?</span>
            <Link to="/signin" className="signin__signup-btn dark-btn">
              Sign In
            </Link>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default SignUp;
