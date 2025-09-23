const { Appointment, DoctorSchedule, Appointment: ApptModel, sequelize } = require("../models/index");
const { Op } = require("sequelize");

// Create appointment with basic slot check (count existing appointments same doctor/date/time)
exports.create = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, time, symptoms, department_id } = req.body;
        if (!patient_id || !doctor_id || !date || !time) return res.status(400).json({ message: "Missing fields" });

        // Simple check: count appointments for same doctor/date/time
        const existing = await ApptModel.count({
            where: { doctor_id, date, time, status: { [Op.ne]: "cancelled" } }
        });

        // Check doctor schedule max_slots for that date
        const schedule = await DoctorSchedule.findOne({ where: { doctor_id, date } });
        if (schedule && existing >= schedule.max_slots) {
            return res.status(400).json({ message: "No available slot" });
        }

        const appointment = await ApptModel.create({ patient_id, doctor_id, date, time, symptoms, department_id });
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getByPatient = async (req, res) => {
    const { patientId } = req.params;
    const appts = await ApptModel.findAll({ where: { patient_id: patientId } });
    res.json(appts);
};

exports.cancel = async (req, res) => {
    const { id } = req.params;
    const appt = await ApptModel.findByPk(id);
    if (!appt) return res.status(404).json({ message: "Not found" });
    appt.status = "cancelled";
    await appt.save();
    res.json(appt);
};
