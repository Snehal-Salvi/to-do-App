import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";  
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import TaskList from "./components/Tasks/TaskList";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar component */}
      <Navbar />

      {/* Routing configuration */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Error />} />

        {/* Private route (requires authentication) */}
        <Route element={<PrivateRoute />}>
          <Route path="/tasks" element={<TaskList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
