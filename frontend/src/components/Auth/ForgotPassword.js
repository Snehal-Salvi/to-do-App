import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Auth.module.css"; 

export default function ForgotPassword() {
  // State variables
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value.trim());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Attempt to send OTP to reset password
      const response = await fetch(`${BACKEND_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Handle error if OTP sending fails
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      // Display success message and redirect to reset password page
      setMessage("OTP sent to your email address. Please check your inbox.");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Forgot Password form */}
      <h2 className={styles.authTitle}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            placeholder="abc@email.com"
            id="email"
            className={styles.formInput}
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit button */}
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {/* Display message (error or success) */}
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
