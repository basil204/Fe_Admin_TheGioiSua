const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ThuocTinhController/ProductController");
const { checkLogin } = require("../middleware/authMiddleware");

router.get("/lst", checkLogin, ProductController.getAllProducts);
router.get("/:id", checkLogin, ProductController.getProductById);
router.delete("/:id", checkLogin, ProductController.deleteProduct);
router.post("/add", checkLogin, ProductController.addProduct);
router.put("/update/:id", checkLogin, ProductController.updateProduct);

module.exports = router;
