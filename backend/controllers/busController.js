// backend/controller/busController.js

const { buses, routes } = require("../data/routesData");

// ---------------------- MOVE A BUS ONE STEP ----------------------
function advanceBus(bus) {
  const route = routes[bus.routeId];
  if (!route || route.length === 0) return;

  bus.idx = (bus.idx + 1) % route.length;

  const [lat, lng] = route[bus.idx];
  bus.lat = lat;
  bus.lng = lng;
  bus.timestamp = Date.now();
}

// Auto-advance buses every 3 seconds
setInterval(() => {
  buses.forEach(advanceBus);
}, 3000);

// ---------------------- GET ALL BUSES ----------------------
exports.getBuses = (req, res) => {
  try {
    return res.json(buses);
  } catch (err) {
    return res.status(500).json({ error: "Failed to get buses" });
  }
};

// ---------------------- STREAM BUS UPDATES (SSE) ----------------------
exports.streamBusEvents = (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive"
  });

  // Required for SSE
  res.flushHeaders();

  // Send initial state
  res.write(`data: ${JSON.stringify({ type: "init", buses })}\n\n`);

  // Send updates every 1.5 seconds
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: "update", buses })}\n\n`);
  }, 1500);

  // Clean up when client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
  });
};
