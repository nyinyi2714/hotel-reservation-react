import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { backendUrl } from "../../config";
import { useStateContext } from "../../StateContext";
import "./SignUp.css";

/**
  * Password is valid if it"s b/w 8 and 32 characters, and
  * has 1 lowercase letter, 1 uppercase letter, and 1 number
  * @param {string} password The password to get validated.
  * @returns {boolean} if all the tests passed return true, else false. 
  */
export const validatePassword = (password, callbacks = {}) => {
  const {
    setPassLengthTest,
    setPassLowercaseTest,
    setPassUppercaseTest,
    setPassNumberTest
  } = callbacks;
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
    if(!result) allTestsPassed = false;
    results[regex] = result;
  });

  if (setPassLengthTest) setPassLengthTest(results.lengthRegex);
  if (setPassLowercaseTest) setPassLowercaseTest(results.lowercaseRegex);
  if (setPassUppercaseTest) setPassUppercaseTest(results.uppercaseRegex);
  if (setPassNumberTest) setPassNumberTest(results.numberRegex);
  return allTestsPassed;
}; 

/**
 * SignUp page for new user to register.
 * @component
 * @author Nyi Nyi Moe Htet
 * @since July 17th 2023
 * @returns {JSX.Element} React component that will show the user registration form.
 */
function SignUp() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [isFirstNameValid, setIsFirstNameValid] = useState(true);
const [isLastNameValid, setIsLastNameValid] = useState(true);

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

const navigate = useNavigate();

const { setUser, setAccessToken } = useStateContext();

// Update first name state on input change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    validateFirstName(e.target.value);
  };

  /**
   * This checks if the written first name is > 0 and sets a validation state.
   * @param {string} name First name to be validated.
   * @returns {boolean} if first name is valid then true, if not then false
   */
  const validateFirstName = (name) => {
    const result = name.length > 0;
    setIsFirstNameValid(result);
    return result;
  };

  // Update last name state on input change
  const handleLastName = (e) => {
    setLastName(e.target.value);
    validateLastName(e.target.value);
  };

  /**
   * This checks if the written Last name is > 0 and sets a validation state.
   * @param {string} name Last name to be validated.
   * @returns {boolean} if the last name is valid then true, if not then false.
   */
  const validateLastName = (name) => {
    const result = name.length > 0;
    setIsLastNameValid(result);
    return result;
  };

  // Update email state on input change
  const handleEmail = (e) => {
    setEmail(e.target.value); 
  };

 /**
  * Validating an email using Reg expression.
  * Access email react state.
  * @returns {boolean} true if email is valid, else it"s false.
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

  // Run email validation on email change
  useEffect(() => {
    if (!isEmailValid) validateEmail(); 
  }, [email]);

  /**
   * Handle Phone Number input and validate that it"s all integers.
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void} Not any specific value.
   */
  const handlePhoneNumber = (e) => {
    if(e.target.value.length > 10) return;
    const isIntegerOnly = /^\d*$/.test(e.target.value);
    if(isIntegerOnly) {
      setPhoneNumber(e.target.value);
    } else {
      return;
    }
  };

  /**
   * This function vaidates the Phone number.
   * Total numbers length should be equal to 10 digits. 
   * @returns {boolean} true if result digits is equal to the length of 10 integers, otherwise false.
   */
  const validatePhoneNumber = () => {
    const result = phoneNumber.length === 10;
    if(result) {
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
    validatePassword(e.target.value, 
      {
        setPassLengthTest,
        setPassLowercaseTest,
        setPassUppercaseTest,
        setPassNumberTest
      });
  };

  // Update confirmPassword state on input change
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswordMatch(e.target.value);
  };

  /**
   * validate if the confirm password matches the original password
   * @param {string} confirm_password
   * @returns {boolean} if the confirmation password matches the original one then true, else false. 
   */
  const validatePasswordMatch = (confirm_password) => {
    const result = confirm_password === password; // original password is being compared.
    setIsPasswordMatch(result);
    return result;
  };
  
  /**
   * Will be running all the validation tests for user inputs in the signup form. 
   * @returns {boolean} if all the validation is passed then true, else false.
   */
  const runAllValidationTests = () => {
    return (
      validateFirstName(firstName)
      && validateLastName(lastName)
      && validateEmail() 
      && validatePassword(password, {
        setPassLengthTest,
        setPassLowercaseTest,
        setPassUppercaseTest,
        setPassNumberTest
      })
      && validatePasswordMatch(confirmPassword) 
    )
  };
  
  /**
   * Handle the sign up form submission
   * @param {React.SyntheticEvent} e - The click event object.
   * @returns {void} no specific return value.
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission action
    e.preventDefault(); 

    // If sign-in process has already started, stop from submitting again
    if(isSigningUp) return;

    // If any validation test is failed, stop form submission
    if (!runAllValidationTests()) return;
    
    setIsSigningUp(true);
    try {
      const response = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      const responseData = await response.json();
      console.log(response)
      if (response.ok) {
        console.log("User registered successfully:", responseData.message);
        // Navigate back to homepage after successful registration
        console.log(responseData)
        setUser({first_name: responseData.first_name});
        setAccessToken(responseData.access_token);
        navigate("/");
      } else {
        console.error("Registration failed:", responseData.error);
        alert(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error);
    }

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
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstName}
            />
            <span
              className={
                isFirstNameValid
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Please enter your First Name
              <i className="bx bx-error-circle signup__err" />
            </span>
          </div>
          <div className="relative-position">
            <input 
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastName}
            />
            <span
              className={
                isLastNameValid
                  ? "signup__invalid-field"
                  : "signup__invalid-field show"
              }
            >
              Please enter your Last Name
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
        </form>
      </div>
    </div>
  );
}

export default SignUp;
