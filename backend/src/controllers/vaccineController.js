const { Vaccine } = require("../models/index");

exports.list = async (req, res) => {
    const list = await Vaccine.findAll();
    res.json(list);
};

exports.create = async (req, res) => {
    const { name, doses_required, interval_days } = req.body;
    const v = await Vaccine.create({ name, doses_required, interval_days });
    res.json(v);
};
