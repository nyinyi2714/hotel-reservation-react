import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import { StateProvider } from "./StateContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <StateProvider>
      <App />
    </StateProvider>
  </BrowserRouter>
);
