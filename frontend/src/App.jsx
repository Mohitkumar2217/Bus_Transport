import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import BusList from "./components/BusList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import "./App.css";
import BannerImage from "./assets/banner.png"; // <- your image path

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        {/* Banner Image */}
        <div className="banner-container">
          <img
            src={BannerImage}
            alt="Bus Transport Banner"
            className="banner-image"
          />
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <main className="main">
                  <section id="map" className="map-section">
                    <MapView />
                  </section>
                  <aside id="buslist" className="sidebar">
                    <BusList />
                  </aside>
                </main>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
