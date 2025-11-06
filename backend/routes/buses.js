const express = require("express");
const router = express.Router();
const { getBuses, streamBusEvents } = require("../controllers/busController");

router.get("/", getBuses);
router.get("/events", streamBusEvents);

module.exports = router;
