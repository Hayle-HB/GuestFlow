import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";

// Initialize theme
const initializeTheme = () => {
  const { theme } = store.getState();
  const currentTheme = theme.mode === "system" ? theme.systemTheme : theme.mode;
  document.documentElement.classList.toggle("dark", currentTheme === "dark");
};

// Subscribe to store changes
store.subscribe(initializeTheme);

// Initial theme setup
initializeTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
