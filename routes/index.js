const router = require("express").Router();
const { ensureAuthenticated } = require("../config/isAuth");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
