import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Auth.module.css";

export default function Signup() {
  // State variables
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
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
    setErrors([]);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to register user
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle registration errors
        const errorData = await response.json();
        const receivedErrors = errorData.errors || [];
        setErrors(receivedErrors.map((error) => error.msg));
        throw new Error("Registration failed");
      }

      // Clear errors and navigate on successful registration
      setErrors([]);
      setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Sign Up form */}
      <h2 className={styles.authTitle}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.formLabel}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            className={styles.formInput}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        {/* Confirm Password input */}
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            id="confirmPassword"
            className={styles.formInput}
            value={formData.confirmPassword}
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
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Sign In link */}
        <p className={styles.messageText}>
          Already have an account?{" "}
          <Link to="/signin" className={styles.authLink}>
            Sign In
          </Link>
        </p>
      </form>

      {/* Display errors if any */}
      {errors.length > 0 && (
        <div className="alert alert-danger mt-3" role="alert">
          {errors.map((error, index) => (
            <p key={index} className="mb-0">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
