const mongoose = require("mongoose");
const Event = require("../models/Event");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load events"
    });
  }
};

// Get one event
const getSingleEvent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Unable to find event"
    });
  }
};

// Add a new event
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      venue
    } = req.body;

    if (
      !eventName?.trim() ||
      !eventDescription?.trim() ||
      !eventDate ||
      !venue?.trim()
    ) {
      return res.status(400).json({
        message: "Please complete all event fields"
      });
    }

    const newEvent = await Event.create({
      eventName,
      eventDescription,
      eventDate,
      venue
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create event"
    });
  }
};

// Update an existing event
const editEvent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    const {
      eventName,
      eventDescription,
      eventDate,
      venue
    } = req.body;

    if (
      !eventName?.trim() ||
      !eventDescription?.trim() ||
      !eventDate ||
      !venue?.trim()
    ) {
      return res.status(400).json({
        message: "Please complete all event fields"
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventName,
        eventDescription,
        eventDate,
        venue
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update event"
    });
  }
};

// Delete an event
const removeEvent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete event"
    });
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  editEvent,
  removeEvent
};