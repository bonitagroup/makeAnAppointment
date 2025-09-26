const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.list = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
        if (!user) return res.status(404).json({ message: "Not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Not found" });
        await user.update(req.body);
        res.json({ message: "Cập nhật thành công", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Not found" });
        await user.destroy();
        res.json({ message: "Đã xóa tài khoản" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Not found" });
        const { password } = req.body;
        if (!password) return res.status(400).json({ message: "Missing password" });
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        await user.save();
        res.json({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
