const { Department } = require("../models");

exports.list = async (req, res) => {
    try {
        const list = await Department.findAll();
        res.json(list);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.get = async (req, res) => {
    try {
        const dep = await Department.findByPk(req.params.id);
        if (!dep) return res.status(404).json({ message: "Not found" });
        res.json(dep);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ message: "Missing name" });
        const dep = await Department.create({ name, description });
        res.json(dep);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const dep = await Department.findByPk(req.params.id);
        if (!dep) return res.status(404).json({ message: "Not found" });
        await dep.update(req.body);
        res.json(dep);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        const dep = await Department.findByPk(req.params.id);
        if (!dep) return res.status(404).json({ message: "Not found" });
        await dep.destroy();
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
