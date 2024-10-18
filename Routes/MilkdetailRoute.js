const express = require("express");
const router = express.Router();
const MilkdetailController = require("../controllers/ThuocTinhController/MilkdetailController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", MilkdetailController.getAllMilkdetails);
router.get("/:id", checkLogin, MilkdetailController.getMilkdetailById);
router.delete("/:id", checkLogin, MilkdetailController.deleteMilkdetail);
router.post("/add", MilkdetailController.addMilkdetail);
router.put("/update/:id", checkLogin, MilkdetailController.updateMilkdetail);

module.exports = router;
