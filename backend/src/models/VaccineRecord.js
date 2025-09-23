const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VaccineRecord = sequelize.define("vaccine_record", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    vaccine_id: { type: DataTypes.INTEGER },
    dose_number: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATEONLY },
    note: { type: DataTypes.TEXT }
});

module.exports = VaccineRecord;
