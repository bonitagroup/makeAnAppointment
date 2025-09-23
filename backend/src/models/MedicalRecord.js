const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MedicalRecord = sequelize.define("medical_record", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    doctor_id: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT }
});

module.exports = MedicalRecord;
