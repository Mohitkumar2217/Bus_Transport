import React from "react";
import "./Navbar.css";   // add this

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Smart Bus Tracker</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Live Map</li>
        <li>Buses</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
