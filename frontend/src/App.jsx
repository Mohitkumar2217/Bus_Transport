import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import BusList from "./components/BusList";
import BookingForm from "./components/BookingForm";
import Bookings from "./components/Bookings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import "./App.css";
import BannerImage from "./assets/banner.png"; // your banner image

export default function App() {
  const bookingRef = useRef(null);
  const [bookings, setBookings] = useState([]);

  // Called when user submits the booking form
  const handleSearchBus = (bookingData) => {
    // Here you can make API call to search bus or just add to bookings
    setBookings((prev) => [...prev, bookingData]);
    alert("Bus search submitted!");
  };

  const scrollToBooking = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar scrollToBooking={scrollToBooking} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  {/* Banner only on dashboard */}
                  <div className="banner-container">
                    <img
                      src={BannerImage}
                      alt="Bus Transport Banner"
                      className="banner-image"
                    />
                  </div>

                  <main className="main">
                    {/* Booking Form */}
                    <section ref={bookingRef} className="booking-section">
                      <BookingForm onSearch={handleSearchBus} />
                    </section>

                    {/* Bookings List */}
                    <aside className="sidebar">
                      <Bookings bookings={bookings} />
                    </aside>

                    {/* Map & Live Bus List */}
                    <section id="map" className="map-section">
                      <MapView />
                    </section>
                    <aside id="buslist" className="sidebar">
                      <BusList />
                    </aside>
                  </main>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
