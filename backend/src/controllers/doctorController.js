const { Doctor, Department, Schedule } = require("../models");

exports.list = async (req, res) => {
    try {
        const docs = await Doctor.findAll({ include: [{ model: Department, as: "department" }] });
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
        const doc = await Doctor.create({ name, title, bio, departmentId });
        res.json(doc);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const doc = await Doctor.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ message: "Not found" });
        await doc.update(req.body);
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
