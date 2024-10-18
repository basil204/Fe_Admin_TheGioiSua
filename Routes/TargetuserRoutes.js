const express = require("express");
const router = express.Router();
const TargetuserController = require("../controllers/ThuocTinhController/TargetuserController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, TargetuserController.getAllTargetusers);
router.get("/:id", checkLogin, TargetuserController.getTargetuserById);
router.delete("/:id", checkLogin, TargetuserController.deleteTargetuser);
router.post("/add", checkLogin, TargetuserController.addTargetuser);
router.put("/update/:id", checkLogin, TargetuserController.updateTargetuser);

module.exports = router;
