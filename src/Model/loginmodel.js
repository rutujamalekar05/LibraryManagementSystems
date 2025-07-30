let db=require("../../db.js");

exports.adminData = (name,pass,role) => {
   

    return new Promise((resolve, reject) => {
        db.query("select *from admin where name=? and pass=? and role=?", [name, pass,role], (err, results) => {
                
            if (err) {
                reject("Login failed");
            } else if (results.length>0 &&results[0].role==="admin") {
                resolve("Login successfully");
            } else{
                reject("wrong choice");
            }
        });
    });
};

exports.userData = (email, pass, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM student WHERE email = ? AND pass = ? AND role = ?",
      [email, pass, role],
      (err, results) => {
        if (err) {
          reject("Login failed");
        } else if (results.length > 0 && results[0].role === "user") {
          resolve("Login successfully");
        } else {
          reject("Wrong credentials or role");
        }
      }
    );
  });
};