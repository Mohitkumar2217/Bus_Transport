import React from "react";
import MapView from "./components/MapView";
import BusList from "./components/BusList";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <main className="app-main">
        <section className="map-section">
          <MapView />
        </section>
        <aside className="sidebar">
          <BusList />
        </aside>
      </main>
      <footer className="footer">
        <small>Prototype • Simulated GPS • SSE updates</small>
      </footer>
    </div>
  );
}
