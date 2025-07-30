let login = require("../Model/loginmodel");

exports.adminlogin = (req, res) => {
    let {name, pass, role } = req.body;

    let promise = login.adminData(name, pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

exports.userlogin = (req, res) => {
  const { email, pass, role } = req.body;
  login.userData(email, pass, role)
    .then((result) => {
      res.json({ status: "valid", msg: result });
    })
    .catch((err) => {
      res.json({ status: "invalid", msg: err });
    });
};

