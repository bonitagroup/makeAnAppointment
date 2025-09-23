const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define("payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    appointment_id: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.DECIMAL(10, 2) },
    provider: { type: DataTypes.STRING }, // e.g., zalopay
    provider_txn_id: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("pending", "paid", "refunded"), defaultValue: "pending" }
});

module.exports = Payment;
