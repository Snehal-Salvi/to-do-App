import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiHome2Line,
  RiLoginCircleLine,
  RiAddCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/signin"); // Navigate to sign-in page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top ${styles.header}`}>
        <div className="container-fluid">
          {/* Logo */}
          <img src={logo} alt="Homemaid-logo" className={styles.logo} />
          {/* App Name */}
          <Link className={`navbar-brand ${styles.appName}`} to="/">
            Taskly
          </Link>

          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${styles.navLink}`}
                  aria-current="page"
                  to="/"
                >
                  <RiHome2Line className="me-1" /> Home
                </Link>
              </li>

              {/* Conditional Rendering for Authenticated User */}
              {user ? (
                <>
                  {/* Tasks Link */}
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${styles.navLink}`}
                      aria-current="page"
                      to="/tasks"
                    >
                      <FaTasks className="me-1" /> Tasks
                    </Link>
                  </li>

                  {/* Welcome Message */}
                  <li className="nav-item">
                    <span className={styles.welcomeMessage}>
                      <FaUserCircle className={styles.userIcon} /> Welcome{" "}
                      {user.username.toUpperCase()}
                    </span>
                  </li>

                  {/* Logout Button */}
                  <li className="nav-item">
                    <button
                      className={`btn btn-outline-danger ${styles.loginButton}`}
                      onClick={handleLogout}
                    >
                      <RiLogoutCircleLine className="me-1" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                // Conditional Rendering for Guest User
                <>
                  {/* Login Button */}
                  <li className="nav-item">
                    <Link to="/signin">
                      <button
                        className={`btn btn-outline-success ${styles.loginButton}`}
                      >
                        <RiLoginCircleLine className="me-1" /> Login
                      </button>
                    </Link>
                  </li>

                  {/* Register Button */}
                  <li className="nav-item">
                    <Link to="/signup">
                      <button
                        className={`btn btn-outline-success ${styles.loginButton}`}
                      >
                        <RiAddCircleLine className="me-1" /> Register
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
