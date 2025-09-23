const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vaccine = sequelize.define("vaccine", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    doses_required: { type: DataTypes.INTEGER, defaultValue: 1 },
    interval_days: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Vaccine;
