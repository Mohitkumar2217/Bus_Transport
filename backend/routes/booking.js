const express = require("express");
const router = express.Router();
const { bookBus, getUserBookings } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware"); // JWT auth middleware

router.post("/book", protect, bookBus);
router.get("/my-bookings", protect, getUserBookings);

module.exports = router;
