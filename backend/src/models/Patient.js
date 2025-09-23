const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define("patient", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.ENUM("M", "F", "O") },
    relation: { type: DataTypes.STRING }
});

module.exports = Patient;
