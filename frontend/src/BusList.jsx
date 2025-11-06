import React, { useEffect, useState } from "react";

const SSE_URL = "http://localhost:4000/events";

// simple haversine distance
function haversine([lat1, lon1], [lat2, lon2]) {
  const R = 6371; // km
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function BusList(){
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const es = new EventSource(SSE_URL);
    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.type === "init" || payload.type === "update") {
          setBuses(payload.buses);
        }
      } catch(err) {
        console.error(err);
      }
    };
    es.onerror = (err) => {
      console.error("SSE error", err);
      es.close();
    };
    return () => es.close();
  }, []);

  // Example: compute a fake ETA to a fixed "stop" using distance/speed
  const stop = [12.9750, 77.5975]; // Example stop coordinate

  return (
    <div className="bus-list">
      <h3>Live Buses</h3>
      <div className="stop-info">
        <strong>Sample Stop:</strong> {stop[0].toFixed(4)}, {stop[1].toFixed(4)}
      </div>
      <ul>
        {buses.map(b => {
          const distKm = haversine([b.lat,b.lng], stop);
          const speedKmph = (b.speedKmph || 20);
          const etaMin = speedKmph > 0 ? Math.round((distKm / speedKmph) * 60) : null;
          return (
            <li key={b.id}>
              <div className="bus-row">
                <div><strong>{b.id}</strong> <span className="muted">({b.routeId})</span></div>
                <div>LatLng: {b.lat.toFixed(4)}, {b.lng.toFixed(4)}</div>
                <div>Distance to stop: {distKm.toFixed(2)} km</div>
                <div>ETA: {etaMin !== null ? `${etaMin} min` : '—'}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
