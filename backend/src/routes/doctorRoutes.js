const express = require("express");
const router = express.Router();
const doctorCtrl = require("../controllers/doctorController");
const auth = require("../middlewares/authMiddleware");

router.get("/", doctorCtrl.list);
router.post("/", auth, doctorCtrl.create);
router.get("/:id/schedules", doctorCtrl.getSchedules);
router.post("/:id/schedules", auth, doctorCtrl.createSchedule);

module.exports = router;
