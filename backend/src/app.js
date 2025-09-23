const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Models
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

// Sync DB
sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Database synced"))
    .catch((err) => console.error("❌ DB error:", err));

module.exports = app;
