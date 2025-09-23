const express = require("express");
const router = express.Router();
const { list, create } = require("../controllers/departmentController");
const auth = require("../middlewares/authMiddleware");

router.get("/", list);
router.post("/", auth, create); // admin only ideally; simplified here

module.exports = router;
