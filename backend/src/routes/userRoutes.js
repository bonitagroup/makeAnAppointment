const express = require("express");
const router = express.Router();
const { User } = require("../models/index");
const auth = require("../middlewares/authMiddleware");

router.get("/me", auth, async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "role"] });
    res.json(user);
});

module.exports = router;
