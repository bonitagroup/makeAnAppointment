const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../controllers/appointmentController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, appointmentCtrl.create);
router.get("/patient/:patientId", auth, appointmentCtrl.getByPatient);
router.put("/:id/cancel", auth, appointmentCtrl.cancel);

module.exports = router;
