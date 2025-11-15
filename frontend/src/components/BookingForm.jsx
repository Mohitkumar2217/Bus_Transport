import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";

export default function BookingForm({ bus }) {
  const { token } = useContext(AuthContext);
  const [seatNumber, setSeatNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/api/booking/book`,
        { busId: bus.id, routeId: bus.routeId, seatNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleBooking}>
      <input
        type="number"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
        required
      />
      <button type="submit">Book Seat</button>
      {message && <p>{message}</p>}
    </form>
  );
}
