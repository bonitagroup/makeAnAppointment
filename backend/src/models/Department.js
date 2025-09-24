module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        title: { type: DataTypes.STRING(100), allowNull: true }, // bác sĩ chuyên khoa, ví dụ: BS. Nguyễn
        bio: { type: DataTypes.TEXT, allowNull: true },
        departmentId: { type: DataTypes.INTEGER, allowNull: true }
    }, {
        tableName: "doctors",
        timestamps: true,
    });

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.Department, { foreignKey: "departmentId", as: "department" });
        Doctor.hasMany(models.Schedule, { foreignKey: "doctorId", as: "schedules" });
    };

    return Doctor;
};
