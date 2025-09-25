const { Schedule, Doctor } = require("../models");
const dayjs = require("dayjs");

exports.list = async (req, res) => {
    try {
        const q = {};
        if (req.query.doctorId) q.doctorId = req.query.doctorId;
        const rows = await Schedule.findAll({ where: q, include: [{ model: Doctor, as: "doctor" }], order: [["date", "ASC"], ["timeSlot", "ASC"]] });
        res.json(rows);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.get = async (req, res) => {
    try {
        const sch = await Schedule.findByPk(req.params.id, { include: [{ model: Doctor, as: "doctor" }] });
        if (!sch) return res.status(404).json({ message: "Not found" });
        res.json(sch);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const { doctorId, date, timeSlot } = req.body;
        if (!doctorId || !date || !timeSlot) return res.status(400).json({ message: "Missing fields" });
        // Optional: prevent duplicate time slot
        const exists = await Schedule.findOne({ where: { doctorId, date, timeSlot } });
        if (exists) return res.status(400).json({ message: "Time slot already exists" });
        const s = await Schedule.create({ doctorId, date, timeSlot });
        res.json(s);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const sch = await Schedule.findByPk(req.params.id);
        if (!sch) return res.status(404).json({ message: "Not found" });
        await sch.update(req.body);
        res.json(sch);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        const sch = await Schedule.findByPk(req.params.id);
        if (!sch) return res.status(404).json({ message: "Not found" });
        await sch.destroy();
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getSlots = async (req, res) => {
    const { doctorId, date } = req.query;
    // Lấy lịch làm việc của bác sĩ
    const schedule = await DoctorSchedule.findOne({ where: { doctor_id: doctorId, date } });
    if (!schedule) return res.json({ slots: [] });
    // Tạo danh sách slot theo slot_duration và time_from/time_to
    const slots = [];
    let start = schedule.time_from;
    let end = schedule.time_to;
    let duration = schedule.slot_duration;
    let current = dayjs(`${date} ${start}`);
    let last = dayjs(`${date} ${end}`);
    while (current.isBefore(last)) {
        const slot = `${current.format("HH:mm")}-${current.add(duration, "minute").format("HH:mm")}`;
        slots.push(slot);
        current = current.add(duration, "minute");
    }
    res.json({ slots });
};

exports.approve = async (req, res) => {
    const { id } = req.params;
    const sch = await Schedule.findByPk(id);
    if (!sch) return res.status(404).json({ message: "Not found" });
    sch.status = "approved";
    await sch.save();
    // TODO: gửi thông báo cho bệnh nhân
    res.json(sch);
};
