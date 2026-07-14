import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <AuthProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    
  </React.StrictMode>
);