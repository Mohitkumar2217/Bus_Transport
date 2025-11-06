import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <nav className="nav_header">
      <div className="nav_header-left">
        <a href="/" className="nav_brand">
          <div className="nav_logo">
            {/* Put your SVG logo here */}
            <svg width="126" height="28" viewBox="0 0 126 28" fill="none"></svg>
          </div>
        </a>
      </div>

      <div className="nav_header-right">
        {/* Language Selector */}
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
                <a
                  href="#"
                  onClick={() => { setLanguage("English"); setLangOpen(false); }}
                  className="nav_lang-text"
                >
                  English
                </a>
                <a
                  href="#"
                  onClick={() => { setLanguage("日本語"); setLangOpen(false); }}
                  className="nav_lang-text"
                >
                  日本語 (Japanese)
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="nav_control-actions">
          <a href="http://localhost:4000/contact/" className="nav_text-cta">
            Contact us
          </a>
          <a href="http://localhost:4000/auth/signin" className="nav_text-cta">
            Log in
          </a>
          <a href="http://localhost:4000/auth/signup" className="button is-nav">
            Sign up
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="nav_control-menu-toggle">
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav_menu-toggle">
            <div className="nav_menu-toggle-bar is-top"></div>
            <div className="nav_menu-toggle-bar is-middle"></div>
            <div className="nav_menu-toggle-bar is-bottom"></div>
          </button>
        </div>
      </div>

      {/* Optional mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#map">Map</a>
          <a href="#buslist">Buses</a>
          <a href="#about">About</a>
        </div>
      )}
    </nav>
  );
}
