const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const authController = require("./controllers/authController");
const router = require("./Routes/routers");

const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(router);
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
