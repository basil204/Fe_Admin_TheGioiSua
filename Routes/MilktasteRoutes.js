const express = require("express");
const router = express.Router();
const MilktasteController = require("../controllers/ThuocTinhController/MilktasteController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, MilktasteController.getAllMilktastes);
router.get("/:id", checkLogin, MilktasteController.getMilktasteById);
router.delete("/:id", checkLogin, MilktasteController.deleteMilktaste);
router.post("/add", checkLogin, MilktasteController.addMilktaste);
router.put("/update/:id", checkLogin, MilktasteController.updateMilktaste);

module.exports = router;
