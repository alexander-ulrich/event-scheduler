import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider"; // In-Memory AuthProvider
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // Router nicht vergessen

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
