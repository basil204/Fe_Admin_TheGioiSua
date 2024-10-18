const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/ThuocTinhController/VoucherController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, VoucherController.getAllVouchers);
router.get("/:id", checkLogin, VoucherController.getVoucherById);
router.delete("/:id", checkLogin, VoucherController.deleteVoucher);
router.post("/add", checkLogin, VoucherController.addVoucher);
router.put("/update/:id", checkLogin, VoucherController.updateVoucher);

module.exports = router;
