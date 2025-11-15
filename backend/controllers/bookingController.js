const Booking = require("../models/Booking");
const { buses } = require("../data/routesData");

// Create a new booking
exports.bookBus = async (req, res) => {
  try {
    const { busId, routeId, seatNumber } = req.body;
    const userId = req.user.id;

    // Optional: check if bus exists
    const bus = buses.find((b) => b.id === busId);
    if (!bus) return res.status(400).json({ message: "Bus not found" });

    // Optional: check if seat is already booked
    const existingBooking = await Booking.findOne({ busId, seatNumber });
    if (existingBooking) return res.status(400).json({ message: "Seat already booked" });

    const booking = new Booking({ user: userId, busId, routeId, seatNumber });
    await booking.save();

    res.status(201).json({ message: "Bus booked successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("user", "username email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
