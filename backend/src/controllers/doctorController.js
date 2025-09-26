const { Doctor } = require("../models");

exports.list = async (req, res) => {
    try {
        const docs = await Doctor.findAll();
        res.json(docs);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.get = async (req, res) => {
    try {
        const doc = await Doctor.findByPk(req.params.id, { include: [{ model: Department, as: "department" }, { model: Schedule, as: "schedules" }] });
        if (!doc) return res.status(404).json({ message: "Not found" });
        res.json(doc);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const { name, title, bio, departmentId } = req.body;
        if (!name) return res.status(400).json({ message: "Missing name" });
        if (!departmentId) return res.status(400).json({ message: "Missing department" });
        const doc = await Doctor.create({ name, title, bio, department_id: departmentId });
        res.json(doc);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await Doctor.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ message: "Not found" });
        // Đảm bảo cập nhật đúng trường department_id
        const updateData = { ...req.body };
        if (updateData.departmentId) {
            updateData.department_id = updateData.departmentId;
            delete updateData.departmentId;
        }
        await doc.update(updateData);
        res.json(doc);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        const doc = await Doctor.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ message: "Not found" });
        await doc.destroy();
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
