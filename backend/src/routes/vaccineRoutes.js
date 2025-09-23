const express = require("express");
const router = express.Router();
const vaccineCtrl = require("../controllers/vaccineController");
const auth = require("../middlewares/authMiddleware");

router.get("/", vaccineCtrl.list);
router.post("/", auth, vaccineCtrl.create);

module.exports = router;
