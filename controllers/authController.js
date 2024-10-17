const fs = require("fs");
const path = require("path");
const axios = require("axios");

const getLoginPage = (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "../views/login.html"),
    "utf-8"
  );
  res.send(content);
};

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(base64, "base64").toString());
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:1234/api/user/authenticate",
      { username, password }
    );

    if (response.status === 200) {
      req.session.loggedin = true;
      req.session.token = response.data.token;
      const userInfo = parseJwt(response.data.token);
      req.session.userInfo = userInfo;

      return res.redirect("/");
    } else {
      return res.status(401).json({
        error:
          response.data.message || "Authentication failed: No token found.",
      });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      error: "An error occurred during login.",
    });
  }
};

const getToken = (req, res) => {
  if (req.session.loggedin) {
    const token = req.session.token;
    const userInfo = req.session.userInfo;
    return res.json({ token, userInfo });
  } else {
    return res.status(401).json({ error: "User not logged in." });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not log out." });
    }
    res.redirect("/login");
  });
};

module.exports = {
  getLoginPage,
  handleLogin,
  logout,
  getToken,
};
