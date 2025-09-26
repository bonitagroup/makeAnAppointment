const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, appointmentCtrl.create);
router.get("/patient/:patientId", appointmentCtrl.getByPatient);
router.put("/:id/cancel", auth, appointmentCtrl.cancel);
router.get("/", appointmentCtrl.list); // Trả về tất cả lịch hẹn cho admin
router.put("/:id/approve", auth, appointmentCtrl.approve); // Duyệt lịch hẹn
router.put("/:id/reject", auth, appointmentCtrl.reject); // Không duyệt lịch hẹn

module.exports = router;
