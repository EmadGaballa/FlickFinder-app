import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./css/index.css";

import App from "./App.jsx";

import { UserMoviesProvider } from "./contexts/UserMoviesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserMoviesProvider>
        <App />
      </UserMoviesProvider>
    </BrowserRouter>
  </StrictMode>
);