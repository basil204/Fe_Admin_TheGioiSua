const checkLogin = (req, res, next) => {
  if (!req.session.loggedin) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { checkLogin };
