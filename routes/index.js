const router = require("express").Router();
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../config/isAuth");

router.get("/", forwardAuthenticated, (req, res) => {
  res.render("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
