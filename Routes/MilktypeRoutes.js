const express = require("express");
const router = express.Router();
const MilktypeController = require("../controllers/ThuocTinhController/MilktypeController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, MilktypeController.getAllMilktypes);
router.get("/:id", checkLogin, MilktypeController.getMilktypeById);
router.delete("/:id", checkLogin, MilktypeController.deleteMilktype);
router.post("/add", checkLogin, MilktypeController.addMilktype);
router.put("/update/:id", checkLogin, MilktypeController.updateMilktype);

module.exports = router;
