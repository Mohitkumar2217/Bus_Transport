import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login"; 
import Signup from "./Signup";
import "./Navbar.css";

export default function Navbar({ scrollToBooking }) {
  const { user, logout } = useContext(AuthContext);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(null); // "login" | "signup"

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="btn-book-ticket" onClick={scrollToBooking}>
          Book Ticket
        </button>
      </div>

      <div className="navbar-right">
        {/* Bookings */}
        <button
          className="btn-bookings"
          onClick={() => scrollToBooking("bookings")}
        >
          Bookings
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Bus..."
          className="navbar-search"
        />

        {/* Account */}
        <div className="account-container">
          <button
            className="btn-account"
            onClick={() => setShowAccountMenu(!showAccountMenu)}
          >
            {user ? user.username : "Account"}
          </button>

          {showAccountMenu && (
            <div className="account-menu">
              {user ? (
                <>
                  <button>Profile</button>
                  <button>Privacy</button>
                  <button onClick={handleLogout}>Logout</button>
                  <button>Information</button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowAuthModal("login")}>
                    Login
                  </button>
                  <button onClick={() => setShowAuthModal("signup")}>
                    Signup
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Login/Signup */}
      {showAuthModal === "login" && (
        <div className="auth-modal">
          <Login />
          <button onClick={() => setShowAuthModal(null)}>Close</button>
        </div>
      )}
      {showAuthModal === "signup" && (
        <div className="auth-modal">
          <Signup />
          <button onClick={() => setShowAuthModal(null)}>Close</button>
        </div>
      )}
    </nav>
  );
}
