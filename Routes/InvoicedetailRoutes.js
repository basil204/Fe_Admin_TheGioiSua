const express = require("express");
const router = express.Router();
const InvoicedetailController = require("../controllers/ThuocTinhController/InvoicedetailController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, InvoicedetailController.getAllInvoicedetails);
router.get("/:id", checkLogin, InvoicedetailController.getInvoicedetailById);
router.delete("/:id", checkLogin, InvoicedetailController.deleteInvoicedetail);
router.post("/add", checkLogin, InvoicedetailController.addInvoicedetail);
router.put(
  "/update/:id",
  checkLogin,
  InvoicedetailController.updateInvoicedetail
);

module.exports = router;
