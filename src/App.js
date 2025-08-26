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
import Otp from "./ProjectFeatures/user/Otp";
import ChangePassword from "./ProjectFeatures/user/ChangePassword";


// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./constants/auth/Login"));
const ForgotPassword = lazy(() => import("./constants/auth/ForgotPassword"));
const Register = lazy(() => import("./constants/auth/Register"));
const Documentation = lazy(() => import("./constants/auth/Documentation"));
const VerifyEmail = lazy(() => import("./ProjectFeatures/user/VerifyEmail"));
// Initializing different libraries
initializeApp();

const token = checkAuth();

function App() {
  useEffect(() => {
   
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
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* Place new routes over this */}
          <Route path="/*" element={<Layout />} />
          <Route path="*" element={<Navigate to={token ? "/welcome" : "/login"} replace />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
