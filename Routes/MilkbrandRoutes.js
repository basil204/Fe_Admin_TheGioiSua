const express = require("express");
const router = express.Router();
const MilkbrandController = require("../controllers/ThuocTinhController/MilkbrandController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, MilkbrandController.getAllMilkbrands);
router.get("/:id", checkLogin, MilkbrandController.getMilkbrandById);
router.delete("/:id", checkLogin, MilkbrandController.deleteMilkbrand);
router.post("/add", MilkbrandController.addMilkbrand);
router.put("/update/:id", checkLogin, MilkbrandController.updateMilkbrand);

module.exports = router;
