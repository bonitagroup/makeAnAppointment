const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../../.env" });

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Missing authorization" });
    const token = auth.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
