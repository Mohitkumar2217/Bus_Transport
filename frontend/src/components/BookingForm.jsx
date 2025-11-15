import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './Bookingform.css'

export default function BookingForm({ onSearch }) {
  const { user } = useContext(AuthContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSearch = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    onSearch({ from, to, date });
  };

  return (
    <div className="booking-form">
      <h2>Book Your Bus</h2>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search Bus</button>

      {showAuthModal && (
        <div className="auth-modal">
          <p>Please login or signup to continue</p>
          {/* You can insert Login / Signup component here */}
        </div>
      )}
    </div>
  );
}
