const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const viewRoutes = require("./Routes/viewRoutes");
const authController = require("./controllers/authController");
const InvoicedetailRoutes = require("./Routes/InvoicedetailRoutes");
const MilkbrandRoutes = require("./Routes/MilkbrandRoutes");
const invoiceRoutes = require("./Routes/invoiceRoutes");
const MilkdetailRoute = require("./Routes/MilkdetailRoute");
const MilktasteRoutes = require("./Routes/MilktasteRoutes");
const MilktypeRoutes = require("./Routes/MilktypeRoutes");
const PackagingunitRoutes = require("./Routes/PackagingunitRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const TargetuserRoutes = require("./Routes/TargetuserRoutes");
const UsagecapacityRoutes = require("./Routes/UsagecapacityRoutes");
const UserinvoiceRoutes = require("./Routes/UserinvoiceRoutes");
const VoucherRoutes = require("./Routes/VoucherRoutes");
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

app.use("/api/Invoice", invoiceRoutes);
app.use("/api/Invoicedetail", InvoicedetailRoutes);
app.use("/api/Milkbrand", MilkbrandRoutes);
app.use("/api/Milkdetail", MilkdetailRoute);
app.use("/api/Milktaste", MilktasteRoutes);
app.use("/api/Milktype", MilktypeRoutes);
app.use("/api/Packagingunit", PackagingunitRoutes);
app.use("/api/Product", ProductRoutes);
app.use("/api/Targetuser", TargetuserRoutes);
app.use("/api/Usagecapacity", UsagecapacityRoutes);
app.use("/api/Userinvoice", UserinvoiceRoutes);
app.use("/api/Voucher", VoucherRoutes);
app.use("/", viewRoutes);

// Login routes
app.get("/login", authController.getLoginPage);
app.post("/login", authController.handleLogin);

// Logout
app.get("/logout", (req, res) => {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect("/login");
});

app.get("/gettoken", authController.getToken);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
