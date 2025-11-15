import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + user
    navigate("/login"); // redirect after logout
  };

  return (
    <nav className="nav_header">
      {/* Left: Logo */}
      <div className="nav_header-left">
        <Link to="/" className="nav_brand">
          <div className="nav_logo">
            {/* SVG logo placeholder */}
            <svg width="126" height="28" viewBox="0 0 126 28" fill="none"></svg>
          </div>
        </Link>
      </div>

      {/* Right: Language selector & actions */}
      <div className="nav_header-right">
        {/* Language selector */}
        <div className="nav_control-language">
          <div className="nav_lang-dropdown">
            <div
              className="nav_lang-toggle"
              onClick={() => setLangOpen(!langOpen)}
            >
              {language}
            </div>
            {langOpen && (
              <nav className="nav_lang-dd">
                <button
                  onClick={() => {
                    setLanguage("English");
                    setLangOpen(false);
                  }}
                  className="nav_lang-text"
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage("日本語");
                    setLangOpen(false);
                  }}
                  className="nav_lang-text"
                >
                  日本語
                </button>
              </nav>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="nav_control-actions">
          <Link to="/contact" className="nav_text-cta">
            Contact us
          </Link>

          {user ? (
            <>
              <span>Welcome, {user.username || user.name}</span>
              <button onClick={handleLogout} className="nav_text-cta">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav_text-cta">
                Log in
              </Link>
              <Link to="/signup" className="button nav_text-cta">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="nav_control-menu-toggle">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav_menu-toggle"
          >
            <div className="nav_menu-toggle-bar is-top"></div>
            <div className="nav_menu-toggle-bar is-middle"></div>
            <div className="nav_menu-toggle-bar is-bottom"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu links */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/">Map</Link>
          <Link to="/">Buses</Link>
          <Link to="/about">About</Link>
        </div>
      )}
    </nav>
  );
}
