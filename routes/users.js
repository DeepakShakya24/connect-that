const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validator = require("validator");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
      errors.push({ msg: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      errors.push({ msg: "Please give valid email" });
    }
    if (password !== password2) {
      errors.push({ msg: "Password should be same" });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password should be atleast 5 character" });
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      let user = await User.findOne({ email });
      if (user) {
        errors.push({ msg: "User already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user = new User({
          name,
          email,
          password: passwordHash,
        });
        await user.save();
        req.flash("success_msg", "You are now registered and can log in");
        res.redirect("/users/login");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
module.exports = router;
