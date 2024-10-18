const express = require("express");
const router = express.Router();
const UserinvoiceController = require("../controllers/ThuocTinhController/UserinvoiceController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, UserinvoiceController.getAllUserinvoices);
router.get("/:id", checkLogin, UserinvoiceController.getUserinvoiceById);
router.delete("/:id", checkLogin, UserinvoiceController.deleteUserinvoice);
router.post("/add", checkLogin, UserinvoiceController.addUserinvoice);
router.put("/update/:id", checkLogin, UserinvoiceController.updateUserinvoice);

module.exports = router;
