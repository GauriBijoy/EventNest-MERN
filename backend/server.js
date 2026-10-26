require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to EventNest API"
  });
});

// Event management routes
app.use("/api/events", eventRoutes);

// Start backend
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`EventNest server running on port ${PORT}`);
  });
};

startServer();