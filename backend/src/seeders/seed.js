const { sequelize, User, Department, Doctor, DoctorSchedule, Vaccine } = require("../models/index");
const bcrypt = require("bcrypt");

async function seed() {
    try {
        await sequelize.sync({ alter: true });
        console.log("DB synced.");

        const pass = await bcrypt.hash("password123", 10);
        const u = await User.create({ name: "Demo User", email: "demo@local", password: pass, phone: "0123456789" });

        const dep1 = await Department.findOrCreate({ where: { name: "Nội tổng hợp" } });
        const dep2 = await Department.findOrCreate({ where: { name: "Ngoại" } });
        const d1 = await Doctor.create({ name: "Dr. A", department_id: dep1[0].id, specialty: "Nội" });
        const d2 = await Doctor.create({ name: "Dr. B", department_id: dep2[0].id, specialty: "Ngoại" });

        await DoctorSchedule.create({ doctor_id: d1.id, date: new Date().toISOString().slice(0, 10), time_from: "08:00", time_to: "12:00", slot_duration: 30, max_slots: 8 });
        await DoctorSchedule.create({ doctor_id: d2.id, date: new Date().toISOString().slice(0, 10), time_from: "13:00", time_to: "17:00", slot_duration: 30, max_slots: 8 });

        await Vaccine.findOrCreate({ where: { name: "Vaccine A" }, defaults: { doses_required: 2, interval_days: 30 } });
        await Vaccine.findOrCreate({ where: { name: "Vaccine B" }, defaults: { doses_required: 1, interval_days: 0 } });

        console.log("Seed done.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
