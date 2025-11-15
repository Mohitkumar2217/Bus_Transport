import React, { useEffect, useState, useContext } from "react";
import { SSE_URL, API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BookingForm from "./BookingForm"; // Booking form component

// Haversine formula to calculate distance between two coordinates
function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => deg * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const stop = [12.9750, 77.5975]; // sample stop coordinates
  const { user, token } = useContext(AuthContext);

  // SSE for live bus updates
  useEffect(() => {
    const es = new EventSource(SSE_URL);

    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === "init" || payload.type === "update") {
          setBuses(payload.buses || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to parse SSE payload", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
      es.close();
    };

    return () => es.close();
  }, []);

  if (loading) return <p>Loading live buses...</p>;

  return (
    <div className="bus-list">
      <h3>Live Buses</h3>
      <div className="stop-info">
        <strong>Sample Stop:</strong> {stop[0].toFixed(4)}, {stop[1].toFixed(4)}
      </div>

      <ul>
        {buses.length === 0 && <li>No buses available</li>}

        {buses.map((b) => {
          const distKm = haversine([b.lat, b.lng], stop);
          const speedKmph = b.speedKmph || 20;
          const etaMin = speedKmph > 0 ? Math.round((distKm / speedKmph) * 60) : "—";

          return (
            <li key={b.id}>
              <div className="bus-row">
                <div>
                  <strong>{b.id}</strong> <span className="muted">({b.routeId})</span>
                </div>
                <div>
                  LatLng: {b.lat.toFixed(4)}, {b.lng.toFixed(4)}
                </div>
                <div>Distance to stop: {distKm.toFixed(2)} km</div>
                <div>ETA: {etaMin} min</div>

                {/* Show booking form only if user is logged in */}
                {user && <BookingForm bus={b} />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
