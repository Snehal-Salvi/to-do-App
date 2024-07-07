import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Auth.module.css";

export default function ResetPassword() {
  // State variables
  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extract email from location state
  const location = useLocation();
  const email = location.state?.email || "";

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
      // Attempt to reset password
      const response = await fetch(`${BACKEND_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email }),
      });

      if (!response.ok) {
        // Handle reset password errors
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Reset failed");
      }

      // Display success message on successful password reset
      setMessage(
        "Password reset successful. You can now log in with your new password."
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Reset Password form */}
      <h2 className={styles.authTitle}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {/* OTP input */}
        <div className={styles.formGroup}>
          <label htmlFor="otp" className={styles.formLabel}>
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter the OTP"
            id="otp"
            className={styles.formInput}
            value={formData.otp}
            onChange={handleChange}
            required
          />
        </div>
        {/* New Password input */}
        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.formLabel}>
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            id="newPassword"
            className={styles.formInput}
            value={formData.newPassword}
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
          {isLoading ? "Resetting password..." : "Reset Password"}
        </button>
      </form>

      {/* Display reset message (error or success) */}
      {message && (
        <div
          className={`alert ${
            message.startsWith("Error") ? "alert-danger" : "alert-success"
          } mt-3`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
