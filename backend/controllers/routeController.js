const Route = require("../models/Route");

// GET all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

// ADD route
exports.addRoute = async (req, res) => {
  const { routeId, coordinates } = req.body;

  try {
    const exists = await Route.findOne({ routeId });
    if (exists) return res.status(400).json({ error: "Route already exists" });

    const route = new Route({ routeId, coordinates });
    await route.save();

    res.json({ message: "Route added", route });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE route
exports.deleteRoute = async (req, res) => {
  const { routeId } = req.params;

  try {
    await Route.deleteOne({ routeId });
    res.json({ message: "Route deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE route coordinates
exports.updateRoute = async (req, res) => {
  const { routeId } = req.params;
  const { coordinates } = req.body;

  try {
    const route = await Route.findOneAndUpdate(
      { routeId },
      { coordinates },
      { new: true }
    );
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
