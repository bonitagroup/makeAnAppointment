const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define("appointment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    doctor_id: { type: DataTypes.INTEGER },
    department_id: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY },
    time: { type: DataTypes.TIME },
    status: { type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"), defaultValue: "pending" },
    symptoms: { type: DataTypes.TEXT }
});

module.exports = Appointment;
