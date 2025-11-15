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

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected home page */}
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
