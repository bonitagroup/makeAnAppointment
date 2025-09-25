const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Patient } = require("../models/index");
require("dotenv").config({ path: __dirname + "/../../.env" });

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) return res.status(400).json({ message: "Missing fields" });
        const exist = await User.findOne({ where: { email } });
        if (exist) return res.status(400).json({ message: "Email already used" });
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash });
        // Tạo bản ghi patient tương ứng
        await Patient.create({ user_id: user.id, name: user.name, relation: "self" });
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Login failed: user not found", email);
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            console.log("Login failed: wrong password for", email);
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        // Log role để debug
        console.log("Login success:", user.email, "role:", user.role);
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
