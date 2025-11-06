const express = require("express");
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

// Routes
const routeRoutes = require("./routes/routes");
const busRoutes = require("./routes/buses");

app.use("/routes", routeRoutes);
app.use("/buses", busRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/smartbus", { 
  useNewUrlParser: true, useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Bus tracker server running on http://localhost:${PORT}`);
});


 