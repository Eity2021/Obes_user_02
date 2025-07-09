import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./constants/auth/Login"));
const ForgotPassword = lazy(() => import("./constants/auth/ForgotPassword"));
const Register = lazy(() => import("./constants/auth/Register"));
const Documentation = lazy(() => import("./constants/auth/Documentation"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = checkAuth();

function App() {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Place new routes over this */}
          <Route path="/*" element={<Layout />} />

          <Route
            path="*"
            element={<Navigate to={token ? "/welcome" : "/login"} replace />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
