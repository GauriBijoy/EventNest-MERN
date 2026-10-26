const mongoose = require("mongoose");

// Structure of an event stored in MongoDB
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true
    },

    eventDescription: {
      type: String,
      required: true,
      trim: true
    },

    eventDate: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true,
      trim: true
    },

    totalRegistrations: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;