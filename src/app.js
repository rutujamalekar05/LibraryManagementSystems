let express = require("express");
let bodyParser = require("body-parser");
require("dotenv").config();
let router = require("./router/router.js");
let db = require("../db.js");

let app = express();

app.use(express.static("public"));
app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use((req, res, next) => {
  req.url = req.url.replace(/\n/g, "").replace(/%0A/g, "").trim();
  next();
});

app.use("/", router);

module.exports = app;
