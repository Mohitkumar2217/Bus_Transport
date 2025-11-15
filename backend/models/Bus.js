const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  routeId: { type: String, required: true },
  idx: { type: Number, default: 0 },
  lat: Number,
  lng: Number,
  speedKmph: Number,
  timestamp: Number
});

module.exports = mongoose.model("Bus", busSchema);
