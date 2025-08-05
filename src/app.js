let express = require("express");
let bodyParser = require("body-parser");
let path = require("path"); // required for views path
require("dotenv").config();

let router = require("./router/router.js");
let db = require("../db.js");

let app = express();

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.static("src"));

// Middleware for parsing form and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the templating engine and fix the views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Fix for EJS view folder

// Optional: Use express-session for login session tracking
const session = require("express-session");
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));

// Sanitize URL to avoid newline issues
app.use((req, res, next) => {
  req.url = req.url.replace(/\n/g, "").replace(/%0A/g, "").trim();
  next();
});

// Register router
app.use("/", router);

module.exports = app;
