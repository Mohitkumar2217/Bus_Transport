const express = require("express");
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const routeRoutes = require("./routes/routes");
const busRoutes = require("./routes/buses");

app.use("/routes", routeRoutes);
app.use("/buses", busRoutes);

app.listen(PORT, () => {
  console.log(`Bus tracker server running on http://localhost:${PORT}`);
});
