module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define("Schedule", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        doctorId: { type: DataTypes.INTEGER, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        timeSlot: { type: DataTypes.STRING(64), allowNull: false }, // ví dụ "09:00-09:30"
        isBooked: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        tableName: "schedules",
        timestamps: true,
    });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.Doctor, { foreignKey: "doctorId", as: "doctor" });
    };

    return Schedule;
};

