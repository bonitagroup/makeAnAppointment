const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InjectionAppointment = sequelize.define("injection_appointment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    vaccine_id: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY },
    time: { type: DataTypes.TIME },
    status: { type: DataTypes.ENUM("scheduled", "done", "missed", "cancelled"), defaultValue: "scheduled" },
    dose_number: { type: DataTypes.INTEGER }
});

module.exports = InjectionAppointment;
