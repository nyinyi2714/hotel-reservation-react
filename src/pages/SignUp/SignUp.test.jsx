import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./Signup";

test(
  "inputs for first name, last name, email, password,confirmPassword, and submit button exist", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const firstNameInput = screen.getByPlaceholderText("First Name");
  const lastNameInput = screen.getByPlaceholderText("Last Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByRole("button", { name: "Sign Up" });

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("displays a link for the sign-in page", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const signInLink = screen.getByRole("link", { name: "Sign In" });
  expect(signInLink).toBeInTheDocument();
});


describe("Handle input fields correctly", () => {
  test("handles input change for first name correctly", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");
  });
  
  test("handles input change for last name correctly", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput.value).toBe("Doe");
  });
  
  test("handles input change for email correctly", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");
  });
  
  test("handles input change for password correctly", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "StrongPassword123" } });
    expect(passwordInput.value).toBe("StrongPassword123");
  });
  
  test("handles input change for confirm password correctly", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(confirmPasswordInput, { target: { value: "StrongPassword123" } });
    expect(confirmPasswordInput.value).toBe("StrongPassword123");
  });
});

/**
  * field validation tests are sequential, and 
  * the validation test for each field will only trigger if
  * previous validation tests are passed which means
  * previous fields are filled out with valid inputs
  */ 
describe("displays error message for invalid fields", () => {
  test("displays error message for invalid first name", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(submitButton);
  
    const firstNameErrorMessage = screen.getByText("Please enter your First Name");
    expect(firstNameErrorMessage).toBeVisible();
  });
  
  test("displays error message for invalid last name", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
      
    const firstNameInput = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
  
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(submitButton);
  
    const lastNameErrorMessage = screen.getByText("Please enter your Last Name");
    expect(lastNameErrorMessage).toBeVisible();
  });
  
  test("displays error message for invalid email", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
  
    const emailErrorMessage = screen.getByText("Please enter a valid email address");
    expect(emailErrorMessage).toBeVisible();
  });
  
  test("displays error message for mismatch passwords", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password321" } });
  
    const passwordMatchErrorMessage = screen.getByText("Passwords do not match");
    expect(passwordMatchErrorMessage).toBeVisible();
  });
});

test("don't display any error messages initially", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const firstNameErrorMessage = screen.getByText("Please enter your First Name");
  const lastNameErrorMessage = screen.getByText("Please enter your Last Name");
  const emailErrorMessage = screen.getByText("Please enter a valid email address");
  const passwordMatchErrorMessage = screen.getByText("Passwords do not match");
  expect(lastNameErrorMessage).not.toHaveClass("show");
  expect(firstNameErrorMessage).not.toHaveClass("show");
  expect(emailErrorMessage).not.toHaveClass("show");
  expect(passwordMatchErrorMessage).not.toHaveClass("show");
});

describe("displays password requirements in correct colors", () => {
  test("displays password requirements in red color initially", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordRequirements = screen.getAllByTestId(/password-req/i);
  
    expect(passwordRequirements).toHaveLength(4);
    expect(passwordRequirements[0]).not.toHaveClass("check");
    expect(passwordRequirements[1]).not.toHaveClass("check");
    expect(passwordRequirements[2]).not.toHaveClass("check");
    expect(passwordRequirements[3]).not.toHaveClass("check");
  });
  
  test("displays password requirement in green color when password meets the length requirement", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "abcd1234" } });
  
    const passwordLengthRequirement = screen.getByText("Must be between 8 and 32 characters");
    expect(passwordLengthRequirement).toHaveClass("check");
  });
  
  test("displays password requirement in green color when password contains a lowercase letter", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "password" } });
  
    const passwordLowercaseRequirement = screen.getByText("Contain one lowercase letter");
    expect(passwordLowercaseRequirement).toHaveClass("check");
  });
  
  test("displays password requirement in green color when password contains an uppercase letter", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "PASSWORD" } });
  
    const passwordUppercaseRequirement = screen.getByText("Contain one uppercase letter");
    expect(passwordUppercaseRequirement).toHaveClass("check");
  });
  
  test("displays password requirement in green color when password contains a number", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
  
    const passwordNumberRequirement = screen.getByText("One number (0-9)");
    expect(passwordNumberRequirement).toHaveClass("check");
  });
  
});

// TODO: Complete the test after implementing Signing In process
test("handles form submission correctly", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const firstNameInput = screen.getByPlaceholderText("First Name");
  const lastNameInput = screen.getByPlaceholderText("Last Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  const submitButton = screen.getByRole("button", { name: "Sign Up" });

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  // Add your assertions for successful form submission here
});

