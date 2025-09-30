const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define("appointment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    doctor_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    symptoms: { type: DataTypes.STRING },
    department_id: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("pending", "approved", "not_approved", "cancelled"), defaultValue: "pending" }
}, {
    tableName: "appointments",
    timestamps: true
});

module.exports = Appointment;
