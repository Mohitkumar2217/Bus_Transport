// Use different URLs for dev vs production
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://bus-transport.onrender.com"
    : "http://localhost:4000";

export const SSE_URL = `${API_URL}/buses/events`;
