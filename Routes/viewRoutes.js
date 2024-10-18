// routes/viewRoutes.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { checkLogin } = require("../middleware/authMiddleware");

// Function to render layout with header, content, and footer
const renderLayout = (content) => {
  const header = fs.readFileSync(
    path.join(__dirname, "../views/layout/header.html"),
    "utf-8"
  );
  const footer = fs.readFileSync(
    path.join(__dirname, "../views/layout/footer.html"),
    "utf-8"
  );
  const layout = fs.readFileSync(
    path.join(__dirname, "../views/layout.html"),
    "utf-8"
  );
  return layout
    .replace("{{header}}", header)
    .replace("{{content}}", content)
    .replace("{{footer}}", footer);
};

// Routes for rendering views
router.get("/", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/index.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/form-add-nhan-vien", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/form-add-nhan-vien.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/table-data-product", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/table-data-product.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/form-add-san-pham", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/form-add-san-pham.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/table-data-khach-hang", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/table-data-khach-hang.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/table-data-oder", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/table-data-oder.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/table-data-table", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/table-data-table.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/quan-ly-bao-cao", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/quan-ly-bao-cao.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

router.get("/form-add-don-hang", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/form-add-don-hang.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

module.exports = router;
