const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true, unique: true },
  coordinates: {
    type: [[Number]], // array of [lat, lng]
    required: true
  }
});

module.exports = mongoose.model("Route", routeSchema);
