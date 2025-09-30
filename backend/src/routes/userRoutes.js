const express = require("express");
const router = express.Router();
const { User } = require("../models/index");
const auth = require("../middlewares/authMiddleware");

router.get("/me", auth, async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "role", "gender", "phone"] });
    res.json(user);
});

router.put("/me", auth, async (req, res) => {
    const { name, email, role, gender, phone } = req.body;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (role !== undefined) updateFields.role = role;
    if (gender !== undefined) updateFields.gender = gender;
    if (phone !== undefined) updateFields.phone = phone;

    await User.update(
        updateFields,
        { where: { id: req.user.id } }
    );
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "role", "gender", "phone"] });
    res.json(user);
});

module.exports = router;
