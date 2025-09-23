const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("department", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Department;
