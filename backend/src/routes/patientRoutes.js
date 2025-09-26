const express = require("express");
const router = express.Router();
const { Patient } = require("../models/index");

router.get("/", async (req, res) => {
    try {
        const { user_id } = req.query;
        const where = user_id ? { user_id } : {};
        const list = await Patient.findAll({ where });
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { user_id, name, phone, dob, gender, relation } = req.body;
        if (!user_id || !name) return res.status(400).json({ message: "Missing fields" });
        const patient = await Patient.create({
            user_id,
            name,
            phone: phone || "",
            dob: dob || "2000-01-01",
            gender: gender || "O",
            relation: relation || "self"
        });
        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
