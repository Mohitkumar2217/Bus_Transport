import React from "react";
import MapView from "./MapView";
import BusList from "./BusList";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <main className="main">
        <div className="map-container">
          <MapView />
        </div>
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
