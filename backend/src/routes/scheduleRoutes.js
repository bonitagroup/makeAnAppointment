const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/scheduleController");

router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);
router.get("/doctor-schedule", ctrl.getSlots);
router.put("/:id/approve", ctrl.approve);

module.exports = router;
