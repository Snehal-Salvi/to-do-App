import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Auth.module.css"; // Import the CSS module

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      setMessage("OTP sent to your email address. Please check your inbox.");
      
      // Redirect to reset password page with email
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.authTitle}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
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
