import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { SSE_URL } from "../config";

export default function MapView() {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [center] = useState([12.9716, 77.5946]);

  useEffect(() => {
    // Initialize map
    mapRef.current = L.map("map", { zoomControl: true }).setView(center, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© Mohit kumar",
    }).addTo(mapRef.current);

    return () => mapRef.current && mapRef.current.remove();
  }, [center]);

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
              const marker = L.marker(latlng, { title: id }).addTo(mapRef.current);
              marker.bindPopup(`<b>${id}</b><br/>Route: ${b.routeId}<br/>Speed: ${b.speedKmph} km/h`);
              markersRef.current[id] = marker;
            } else {
              markersRef.current[id].setLatLng(latlng);
              markersRef.current[id]
                .getPopup()
                .setContent(`<b>${id}</b><br/>Route: ${b.routeId}<br/>Speed: ${b.speedKmph} km/h`);
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

  return <div id="map" style={{ width: "80%", height: "40vh" }} />;
}
