import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import SignIn from "./SignIn";

test('inputs for email, password, and submit button exist', () => {
	render(
	  <BrowserRouter>
		<SignIn />
	  </BrowserRouter>
	);
  
	const emailInput = screen.getByPlaceholderText('Email');
	const passwordInput = screen.getByPlaceholderText('Password');
	const submitButton = screen.getByText('Sign In');
  
	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});

test("handles email input correctly", () => {
	render(
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);
	const emailInput = screen.getByPlaceholderText("Email");
	
	fireEvent.change(emailInput, { target: { value: "test@example.com" } });
	expect(emailInput.value).toBe("test@example.com");
});

test("handles password input correctly", () => {
	render(
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);
	const passwordInput = screen.getByPlaceholderText("Password");
	
	fireEvent.change(passwordInput, { target: { value: "testPassword$1" } });
	expect(passwordInput.value).toBe("testPassword$1");
});

test("toggles password visibility", () => {
	render(
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);
	const passwordInput = screen.getByPlaceholderText("Password");
	const toggleButton = screen.getByTestId("toggle-password-button");
	
	fireEvent.click(toggleButton);
	expect(passwordInput.type).toBe("text");
	
	fireEvent.click(toggleButton);
	expect(passwordInput.type).toBe("password");
});

test("displays error messages for invalid email and password", () => {
	render(
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const submitButton = screen.getByText("Sign In");
	
	fireEvent.change(emailInput, { target: { value: " invalidEmail@" } });
	fireEvent.change(passwordInput, { target: { value: "" } });
	fireEvent.click(submitButton);
	
	expect(screen.getByText("Please enter a valid email address")).toBeVisible();
	expect(screen.getByText("Please enter a password")).toBeVisible();
});

// TODO: Complete the test after implementing fetch function when form is submitted
// test("displays Signing In when form is submitted correctly", () => {
// 	render(
// 		<BrowserRouter>
// 			<SignIn />
// 		</BrowserRouter>
// 	);
// 	const emailInput = screen.getByPlaceholderText("Email");
// 	const passwordInput = screen.getByPlaceholderText("Password");
// 	const submitButton = screen.getByText("Sign In");
	
// 	fireEvent.change(emailInput, { target: { value: "validEmail@gmail.com" } });
// 	fireEvent.change(passwordInput, { target: { value: "testPassword$1" } });
// 	fireEvent.click(submitButton);
	
//   	expect(submitButton.value).toBe("Signing In");
// });

