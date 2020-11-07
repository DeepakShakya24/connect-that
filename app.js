const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const Auth = require("./config/passport");

dotenv.config({ path: "./config/config.env" });

const app = express();

Auth(passport);

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParsers
app.use(express.urlencoded({ extended: true }));

//Database connection
connectDB();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
