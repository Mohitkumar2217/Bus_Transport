import React from "react";
import MapView from "./components/MapView";
import BusList from "./components/BusList";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <Navbar></Navbar>

      {/* Hero Section */}
      {/* <header className="hero">
        <div className="hero-content">
          <h1>Smart Bus Tracker</h1>
          <p>Powered by Mapbox GL JS · Real‑time GPS · SSE updates</p>
          <a className="cta" href="#map">View map</a>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="main">
        <section id="map" className="map-section">
          <MapView />
        </section>

        <aside id="buslist" className="sidebar">
          <BusList />
        </aside>
      </main>

      {/* Footer */}
      <footer className="footer">
        <small>© 2025 Your Company • Prototype • Data simulated</small>
      </footer>

    </div>
  );
}

