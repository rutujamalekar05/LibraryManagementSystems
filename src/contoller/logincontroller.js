let login = require("../Model/loginmodel");

exports.adminlogin = (req, res) => {
  const { username, pass, role } = req.body;

  if (!username || !pass || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  login.adminlogin(username, pass, role)
    .then((msg) => {
      res.status(200).json({ status: "success", message: msg });
    })
    .catch((err) => {
      res.status(401).json({ status: "fail", error: err });
    });
};