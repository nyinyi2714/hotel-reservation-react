import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "../../StateContext";
import NewReservation from "./NewReservation";

test("displays required elements", () => {
  render(
    <BrowserRouter>
      <StateProvider>
        <NewReservation />
      </StateProvider>
    </BrowserRouter>
  );

  const cardNumberInput = screen.getByLabelText("Card Number");
  const monthSelect = screen.getByLabelText("Month");
  const yearInput = screen.getByLabelText("Year");
  const bookButton = screen.getByRole("button", { name: "Book Reservation" });

  expect(cardNumberInput).toBeInTheDocument();
  expect(monthSelect).toBeInTheDocument();
  expect(yearInput).toBeInTheDocument();
  expect(bookButton).toBeInTheDocument();
});

test("displays error messages for invalid card number", () => {
  render(
    <BrowserRouter>
      <StateProvider>
        <NewReservation />
      </StateProvider>
    </BrowserRouter>
  );

  const bookButton = screen.getByRole("button", { name: "Book Reservation" });
  fireEvent.click(bookButton);

  const cardNumberError = screen.getByText("Please enter a valid card number.");
  expect(cardNumberError).toBeVisible();
});

test("displays error messages for invalid card expiry year", () => {
  render(
    <BrowserRouter>
      <StateProvider>
        <NewReservation />
      </StateProvider>
    </BrowserRouter>
  );

  const cardNumberInput = screen.getByLabelText("Card Number");
  const yearInput = screen.getByLabelText("Year");
  const bookButton = screen.getByRole("button", { name: "Book Reservation" });

  fireEvent.change(cardNumberInput, { target: { value: "1234567890123456" } }); // Valid card number
  fireEvent.change(yearInput, { target: { value: "2021" } }); // Invalid year
  fireEvent.click(bookButton);

  const yearError = screen.getByText("Please enter a valid year.");
  expect(yearError).toBeVisible();
});
