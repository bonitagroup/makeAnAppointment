const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

// Lấy danh sách tài khoản
router.get("/", auth, ctrl.list);
// Lấy chi tiết tài khoản
router.get("/:id", auth, ctrl.get);
// Cập nhật thông tin tài khoản
router.put("/:id", auth, ctrl.update);
// Xóa tài khoản
router.delete("/:id", auth, ctrl.remove);
// Đổi mật khẩu
router.put("/:id/password", auth, ctrl.changePassword);

module.exports = router;
