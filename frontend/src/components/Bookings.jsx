import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Bookings({ bookings }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please login to see your bookings.</p>;
  }

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="bookings-list">
      <h3>Your Bookings</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.from} → {b.to} | {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
