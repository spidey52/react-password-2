import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeContextProvider from "./context/ThemeContext";
import UserContextProvider from "./context/UserContext";

ReactDOM.render(
  <ThemeContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </ThemeContextProvider>,
  document.getElementById("root")
);
