const express = require("express");

const router = express.Router();

const {
  getAllEvents,
  getSingleEvent,
  createEvent,
  editEvent,
  removeEvent
} = require("../controllers/eventController");

// View and create events
router.get("/", getAllEvents);
router.post("/", createEvent);

// View, update and delete one event
router.get("/:id", getSingleEvent);
router.put("/:id", editEvent);
router.delete("/:id", removeEvent);

module.exports = router;