const { Appointment, Doctor, Patient, DoctorSchedule } = require("../models/index");
const { Op } = require("sequelize");

// Create appointment with basic slot check (count existing appointments same doctor/date/time)
exports.create = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, time, symptoms, department_id, phone } = req.body;
        if (!patient_id || !doctor_id || !date || !time || !phone) return res.status(400).json({ message: "Missing fields" });

        // Kiểm tra patient tồn tại
        const patient = await Patient.findByPk(patient_id);
        if (!patient) return res.status(400).json({ message: "Patient not found" });

        // Simple check: count appointments for same doctor/date/time
        const existing = await Appointment.count({
            where: { doctor_id, date, time, status: { [Op.ne]: "cancelled" } }
        });

        // Check doctor schedule max_slots for that date
        const schedule = await DoctorSchedule.findOne({ where: { doctor_id, date } });
        if (schedule && existing >= schedule.max_slots) {
            return res.status(400).json({ message: "No available slot" });
        }

        // Trạng thái mặc định là pending
        const appointment = await Appointment.create({ patient_id, doctor_id, date, time, symptoms, department_id, phone, status: "pending" });
        res.status(201).json(appointment);
    } catch (err) {
        console.error("Appointment create error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getByPatient = async (req, res) => {
    const { patientId } = req.params;
    const appts = await Appointment.findAll({
        where: { patient_id: patientId },
        include: [
            { model: Doctor, as: "doctor" }
        ],
        order: [["date", "DESC"], ["time", "ASC"]]
    });
    res.json(appts);
};

exports.cancel = async (req, res) => {
    const { id } = req.params;
    const appt = await Appointment.findByPk(id);
    if (!appt) return res.status(404).json({ message: "Not found" });
    appt.status = "cancelled";
    await appt.save();
    res.json(appt);
};

exports.list = async (req, res) => {
    try {
        // Trả về tất cả lịch hẹn, kèm thông tin bác sĩ và bệnh nhân
        const where = {};
        if (req.query.status) where.status = req.query.status;
        if (req.query.department_id) where.department_id = req.query.department_id;
        const appts = await Appointment.findAll({
            where,
            include: [
                { model: Doctor, as: "doctor" },
                { model: Patient, as: "patient" }
            ],
            order: [["date", "DESC"], ["time", "ASC"]]
        });
        res.json(appts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.approve = async (req, res) => {
    try {
        const { id } = req.params;
        const appt = await Appointment.findByPk(id);
        if (!appt) return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        if (appt.status === "approved") return res.json({ message: "Lịch đã được duyệt trước đó", appointment: appt });
        if (appt.status === "rejected") return res.json({ message: "Lịch đã bị từ chối trước đó", appointment: appt });
        if (appt.status === "cancelled") return res.json({ message: "Lịch đã bị hủy", appointment: appt });
        appt.status = "approved";
        await appt.save();
        res.json({ message: "Lịch đã được duyệt, vui lòng đến đúng giờ", appointment: appt });
    } catch (err) {
        res.json({ message: "Lỗi duyệt lịch: " + err.message });
    }
};

exports.reject = async (req, res) => {
    try {
        const { id } = req.params;
        const appt = await Appointment.findByPk(id);
        if (!appt) return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        if (appt.status === "rejected") return res.json({ message: "Lịch đã bị từ chối trước đó", appointment: appt });
        if (appt.status === "approved") return res.json({ message: "Lịch đã được duyệt trước đó", appointment: appt });
        if (appt.status === "cancelled") return res.json({ message: "Lịch đã bị hủy", appointment: appt });
        appt.status = "rejected";
        await appt.save();
        res.json({ message: "Lịch đã bị từ chối", appointment: appt });
    } catch (err) {
        res.json({ message: "Lỗi từ chối lịch: " + err.message });
    }
};
