let db=require("../../db.js");

exports.adminlogin = (username, pass, role) => {
  return new Promise((resolve, reject) => {
    let table = "";
    let column = "";

    if (role === "admin") {
      table = "admin";
      column = "name";
    } else if (role === "user") {
      table = "student";
      column = "email";
    } else {
      return reject("Invalid role. Must be 'admin' or 'user'");
    }

    const query = `SELECT * FROM ${table} WHERE ${column} = ? AND pass = ? AND role = ?`;

    db.query(query, [username, pass, role], (err, results) => {
      if (err) {
        reject("Login failed due to DB error");
      } else if (results.length > 0 && results[0].role === role) {
        resolve("Login successfully");
      } else {
        reject("Wrong credentials or role");
      }
    });
  });
};