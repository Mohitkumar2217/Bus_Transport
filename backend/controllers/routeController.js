const { routes } = require("../data/routesData");

exports.getRoutes = (req, res) => {
  res.json(routes);
};
