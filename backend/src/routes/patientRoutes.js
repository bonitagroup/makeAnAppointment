const express = require("express");
const router = express.Router();
const { Patient } = require("../models/index");

router.get("/", async (req, res) => {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const list = await Patient.findAll({ where });
    res.json(list);
});

module.exports = router;
