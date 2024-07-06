import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Navabar from "./components/Navbar/Navabar";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Navabar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
