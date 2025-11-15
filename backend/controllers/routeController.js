// backend/controller/routesController.js

const { routes } = require("../data/routesData");

// Get all routes
exports.getRoutes = (req, res) => {
  try {
    if (!routes || Object.keys(routes).length === 0) {
      return res.status(404).json({ error: "No routes found" });
    }

    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch routes" });
  }
};
