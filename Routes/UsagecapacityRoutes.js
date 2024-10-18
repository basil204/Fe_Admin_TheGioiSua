const express = require("express");
const router = express.Router();
const UsagecapacityController = require("../controllers/ThuocTinhController/UsagecapacityController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, UsagecapacityController.getAllUsagecapacitys);
router.get("/:id", checkLogin, UsagecapacityController.getUsagecapacityById);
router.delete("/:id", checkLogin, UsagecapacityController.deleteUsagecapacity);
router.post("/add", checkLogin, UsagecapacityController.addUsagecapacity);
router.put(
  "/update/:id",
  checkLogin,
  UsagecapacityController.updateUsagecapacity
);

module.exports = router;
