const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DoctorSchedule = sequelize.define("doctor_schedule", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    doctor_id: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time_from: { type: DataTypes.TIME },
    time_to: { type: DataTypes.TIME },
    slot_duration: { type: DataTypes.INTEGER, defaultValue: 30 }, // minutes
    max_slots: { type: DataTypes.INTEGER, defaultValue: 10 }
});

module.exports = DoctorSchedule;
