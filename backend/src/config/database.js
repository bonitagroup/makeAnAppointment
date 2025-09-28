const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "clinicdb",
    process.env.DB_USER || "clinic_user",
    process.env.DB_PASSWORD || "clinic_pass",
    {
        host: process.env.DB_HOST || "db",
        dialect: "mysql",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Sequelize: DB connection OK");
        return sequelize.sync();
    })
    .then(() => {
        console.log("Sequelize: Models synchronized");
    })
    .catch((err) => console.error("Sequelize: DB connection ERROR", err));

module.exports = sequelize;
