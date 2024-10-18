const express = require("express");
const router = express.Router();
const PackagingunitController = require("../controllers/ThuocTinhController/PackagingunitController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, PackagingunitController.getAllPackagingunits);
router.get("/:id", checkLogin, PackagingunitController.getPackagingunitById);
router.delete("/:id", checkLogin, PackagingunitController.deletePackagingunit);
router.post("/add", checkLogin, PackagingunitController.addPackagingunit);
router.put(
  "/update/:id",
  checkLogin,
  PackagingunitController.updatePackagingunit
);

module.exports = router;
