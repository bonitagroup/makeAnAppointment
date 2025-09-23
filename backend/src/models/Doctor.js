const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define("doctor", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    department_id: { type: DataTypes.INTEGER },
    specialty: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT }
});

module.exports = Doctor;
