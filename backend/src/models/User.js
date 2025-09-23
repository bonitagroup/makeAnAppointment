const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("patient", "doctor", "admin"), defaultValue: "patient" }
});

module.exports = User;
