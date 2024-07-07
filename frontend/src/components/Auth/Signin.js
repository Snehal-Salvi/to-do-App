import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Auth.module.css";

export default function Signin() {
  // State variables
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value.trim(),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Attempt to log in user
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle login errors
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Login failed");
      }

      // Store token and user data on successful login
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/tasks"); // Redirect to tasks page
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Sign In form */}
      <h2 className={styles.authTitle}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            placeholder="abc@email.com"
            id="email"
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password input */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className={styles.formInput}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Display message (error or success) */}
      {message && (
        <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"} mt-3`} role="alert">
          {message}
        </div>
      )}

      {/* Forgot password link */}
      <p className={styles.messageText}>
        Forgot your password?{" "}
        <Link to="/forgot-password" className={styles.authLink}>
          Click here
        </Link>
      </p>
      <hr />
      {/* Sign Up link */}
      <p className={styles.messageText}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.authLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
