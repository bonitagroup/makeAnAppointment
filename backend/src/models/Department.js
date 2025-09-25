const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("department", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true }
}, {
    tableName: "departments",
    timestamps: true,
});

module.exports = Department;
