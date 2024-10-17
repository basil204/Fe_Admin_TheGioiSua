// app.js

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const authController = require("./controllers/authController"); // Import controller
const milkbrandController = require("./controllers/ThuocTinhController/brandController");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

const renderLayout = (content) => {
  const header = fs.readFileSync(
    path.join(__dirname, "views/layout/header.html"),
    "utf-8"
  );
  const footer = fs.readFileSync(
    path.join(__dirname, "views/layout/footer.html"),
    "utf-8"
  );
  const layout = fs.readFileSync(
    path.join(__dirname, "views/layout.html"),
    "utf-8"
  );

  // Replace placeholders in layout
  return layout
    .replace("{{header}}", header)
    .replace("{{content}}", content)
    .replace("{{footer}}", footer);
};

// Middleware to check login
const checkLogin = (req, res, next) => {
  if (!req.session.loggedin) {
    return res.redirect("/login");
  }
  next();
};

// Routes
app.get("/", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/index.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});
app.get("/api/brand/lst", checkLogin, milkbrandController.getAllBrands);
app.get("/api/brand/:id", checkLogin, milkbrandController.getBrandById);
app.delete("/api/brand/:id", checkLogin, milkbrandController.deleteBrand);
app.post("/api/brand/add", checkLogin, milkbrandController.addBrand);
app.put("/api/brand/update/:id", checkLogin, milkbrandController.updateBrand);
app.get("/form-add-nhan-vien", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/form-add-nhan-vien.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/table-data-product", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/table-data-product.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/form-add-san-pham", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/form-add-san-pham.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/table-data-khach-hang", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/table-data-khach-hang.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/table-data-oder", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/table-data-oder.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/table-data-table", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/table-data-table.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

app.get("/quan-ly-bao-cao", checkLogin, (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "views/quan-ly-bao-cao.html"),
    "utf-8"
  );
  res.send(renderLayout(content));
});

// Login routes
app.get("/login", authController.getLoginPage);
app.post("/login", authController.handleLogin);

// Logout
app.get("/logout", (req, res) => {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect("/login");
});

// Endpoint to retrieve token and user info
app.get("/gettoken", authController.getToken);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
