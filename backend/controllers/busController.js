const Bus = require("../models/Bus");
const Route = require("../models/Route");

// Auto-move bus each step
async function advanceBus(bus) {
  const route = await Route.findOne({ routeId: bus.routeId });
  if (!route || route.coordinates.length === 0) return;

  const newIdx = (bus.idx + 1) % route.coordinates.length;
  const [lat, lng] = route.coordinates[newIdx];

  bus.idx = newIdx;
  bus.lat = lat;
  bus.lng = lng;
  bus.timestamp = Date.now();

  await bus.save();
}

// GET all buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch buses" });
  }
};

// ADD bus
exports.addBus = async (req, res) => {
  const { busId, routeId, idx, speedKmph } = req.body;

  try {
    const route = await Route.findOne({ routeId });
    if (!route) return res.status(400).json({ error: "Route not found" });

    const [lat, lng] = route.coordinates[idx];

    const bus = new Bus({
      busId,
      routeId,
      idx,
      speedKmph,
      lat,
      lng,
      timestamp: Date.now(),
    });

    await bus.save();
    res.json({ message: "Bus added", bus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE bus
exports.deleteBus = async (req, res) => {
  const { busId } = req.params;
  try {
    await Bus.deleteOne({ busId });
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE bus info
exports.updateBus = async (req, res) => {
  const { busId } = req.params;
  try {
    const bus = await Bus.findOneAndUpdate({ busId }, req.body, { new: true });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SSE Events
exports.streamBusEvents = async (req, res) => {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });

  res.flushHeaders();

  const buses = await Bus.find();
  res.write(`data: ${JSON.stringify({ type: "init", buses })}\n\n`);

  const intervalId = setInterval(async () => {
    const buses = await Bus.find();
    res.write(`data: ${JSON.stringify({ type: "update", buses })}\n\n`);
  }, 1500);

  req.on("close", () => clearInterval(intervalId));
};

// Auto-move buses every 3 seconds
setInterval(async () => {
  const buses = await Bus.find();
  for (const bus of buses) await advanceBus(bus);
}, 3000);
