const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, appointmentCtrl.create);
router.get("/patient/:patientId", appointmentCtrl.getByPatient);
router.put("/:id/cancel", auth, appointmentCtrl.cancel);
router.get("/", appointmentCtrl.list);
router.put("/:id/approve", auth, appointmentCtrl.approve);
router.put("/:id/reject", auth, appointmentCtrl.reject);

module.exports = router;
