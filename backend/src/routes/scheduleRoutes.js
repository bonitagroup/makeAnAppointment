const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/scheduleController");

router.get("/", ctrl.list); // optionally filter by ?doctorId=1
router.get("/:id", ctrl.get);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);
// Thêm API lấy slot rảnh
router.get("/doctor-schedule", ctrl.getSlots);
// Thêm API duyệt lịch
router.put("/:id/approve", ctrl.approve);

module.exports = router;
