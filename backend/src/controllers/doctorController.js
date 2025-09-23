const { Doctor, Department, DoctorSchedule } = require("../models/index");

exports.list = async (req, res) => {
    const { departmentId } = req.query;
    const where = {};
    if (departmentId) where.department_id = departmentId;
    const doctors = await Doctor.findAll({ where });
    res.json(doctors);
};

exports.create = async (req, res) => {
    const { name, department_id, specialty, bio } = req.body;
    const doctor = await Doctor.create({ name, department_id, specialty, bio });
    res.json(doctor);
};

exports.getSchedules = async (req, res) => {
    const { id } = req.params;
    const schedules = await DoctorSchedule.findAll({ where: { doctor_id: id } });
    res.json(schedules);
};

exports.createSchedule = async (req, res) => {
    const { doctor_id, date, time_from, time_to, slot_duration, max_slots } = req.body;
    const s = await DoctorSchedule.create({ doctor_id, date, time_from, time_to, slot_duration, max_slots });
    res.json(s);
};
