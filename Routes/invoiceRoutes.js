const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/ThuocTinhController/InvoiceController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, InvoiceController.getAllInvoices);
router.get("/:id", checkLogin, InvoiceController.getInvoiceById);
router.delete("/:id", checkLogin, InvoiceController.deleteInvoice);
router.post("/add", checkLogin, InvoiceController.addInvoice);
router.put("/update/:id", checkLogin, InvoiceController.updateInvoice);

module.exports = router;
