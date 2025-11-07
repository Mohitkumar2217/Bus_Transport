require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const routeRoutes = require("./routes/routes");
const busRoutes = require("./routes/buses");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/routes", routeRoutes);
app.use("/buses", busRoutes);

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process if DB fails
  }
}

connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bus tracker server running on http://localhost:${PORT}`);
});
