const express = require("express");
const router = express.Router();
const injCtrl = require("../controllers/injectionController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, injCtrl.create);
router.put("/:id/complete", auth, injCtrl.complete);
router.get("/patient/:patientId", auth, injCtrl.listByPatient);

module.exports = router;
