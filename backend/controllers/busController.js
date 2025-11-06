const { buses, routes } = require("../data/routesData");

// Move bus forward by one step
function advanceBus(bus) {
  const r = routes[bus.routeId];
  bus.idx = (bus.idx + 1) % r.length;
  bus.lat = r[bus.idx][0];
  bus.lng = r[bus.idx][1];
  bus.timestamp = Date.now();
}

// advance all buses every 3s
setInterval(() => {
  buses.forEach(advanceBus);
}, 3000);

exports.getBuses = (req, res) => {
  res.json(buses);
};

// SSE streaming
exports.streamBusEvents = (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  // send initial payload
  res.write(`data: ${JSON.stringify({ type: "init", buses })}\n\n`);

  const handle = setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: "update", buses })}\n\n`);
  }, 1500);

  req.on("close", () => clearInterval(handle));
};
