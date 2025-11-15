import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { SSE_URL } from "../config";

export default function MapView() {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [center] = useState([12.9716, 77.5946]); // Map center

  // Initialize map
  useEffect(() => {
    mapRef.current = L.map("map", { zoomControl: true }).setView(center, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© Mohit Kumar",
    }).addTo(mapRef.current);

    return () => mapRef.current && mapRef.current.remove();
  }, [center]);

  // SSE for live bus updates
  useEffect(() => {
    const evtSource = new EventSource(SSE_URL);

    evtSource.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);

        if (payload.type === "init" || payload.type === "update") {
          payload.buses.forEach((b) => {
            const id = b.id;
            const latlng = [b.lat, b.lng];

            if (!markersRef.current[id]) {
              // Create new marker
              const marker = L.marker(latlng, { title: id }).addTo(mapRef.current);
              marker.bindPopup(
                `<b>${id}</b><br/>Route: ${b.routeId}<br/>Speed: ${b.speedKmph || 20} km/h`
              );
              markersRef.current[id] = marker;
            } else {
              // Update existing marker
              markersRef.current[id].setLatLng(latlng);
              markersRef.current[id]
                .getPopup()
                .setContent(
                  `<b>${id}</b><br/>Route: ${b.routeId}<br/>Speed: ${b.speedKmph || 20} km/h`
                );
            }
          });
        }
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };

    evtSource.onerror = (err) => {
      console.error("SSE error", err);
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  return <div id="map" style={{ width: "100%", height: "60vh" }} />;
}
