const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, appointmentCtrl.create);
router.get("/patient/:patientId", auth, appointmentCtrl.getByPatient);
router.put("/:id/cancel", auth, appointmentCtrl.cancel);
router.get("/", appointmentCtrl.list); // Trả về tất cả lịch hẹn cho admin
router.put("/:id/approve", appointmentCtrl.approve); // Duyệt lịch hẹn

module.exports = router;
