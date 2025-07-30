let db=require("../../db.js");
 // or wherever your DB config is

exports.AddBook = (title, author, subject, isbn, status, price, category_id) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO book (title, author, subject, isbn, status, price, category_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [title, author, subject, isbn, status, price, category_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("Book inserted successfully");
            }
        });
    });
};

exports.viewBook = () => {
    return new Promise((resolve, reject) => {
        db.query("select *from book", (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

exports.delBook = (book_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from book where book_id=?", [book_id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Sucess");
            }
        });
    });
}

exports.UpdateBook = (book_id, title, author,subject) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE book SET title = COALESCE(?, title), author = COALESCE(?, author),subject = COALESCE(?, subject) WHERE book_id = ?",
            [title, author,subject,book_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("success");
                }
            }
        );
    });
};

