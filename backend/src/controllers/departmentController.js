const { Department } = require("../models/index");

exports.list = async (req, res) => {
    const deps = await Department.findAll();
    res.json(deps);
};

exports.create = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    const dep = await Department.create({ name });
    res.json(dep);
};
