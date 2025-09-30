const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define("patient", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, defaultValue: "2000-01-01" },
    gender: { type: DataTypes.ENUM("M", "F", "O"), defaultValue: "O" },
    relation: { type: DataTypes.STRING, defaultValue: "self" },
    phone: { type: DataTypes.STRING }
}, {
    tableName: "patients",
    timestamps: true
});

Patient.associate = (models) => {
    Patient.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
};

module.exports = Patient;
