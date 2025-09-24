const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const vaccineRoutes = require("./routes/vaccineRoutes");
const injectionRoutes = require("./routes/injectionRoutes");



const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/injections", injectionRoutes);
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));


sequelize.sync({ alter: true })
    .then(() => console.log("Database synced"))
    .catch((err) => console.error("DB sync error", err));

module.exports = app;
