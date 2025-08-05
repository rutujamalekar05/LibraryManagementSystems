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

exports.viewBookWithPagination = (limit, offset) => {
    return new Promise((resolve, reject) => {
        console.log("Starting count query...");
        db.query("SELECT COUNT(*) AS total FROM book", (err, countResult) => {
            if (err) {
                console.error("Count error:", err);
                return reject(err);
            }

            console.log("Starting book fetch query...");
            const sql = `
                SELECT b.book_id, b.title, b.author, b.subject, b.isbn, b.status, b.price, c.name AS category_name
                FROM book b
                JOIN category c ON b.category_id = c.category_id
                LIMIT ? OFFSET ?
            `;

            db.query(sql, [parseInt(limit), parseInt(offset)], (err2, bookResult) => {
                if (err2) {
                    console.error("Fetch error:", err2);
                    return reject(err2);
                }

                resolve({
                    total: countResult[0].total,
                    books: bookResult
                });
            });
        });
    });
};



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
exports.viewBookPaginated = (offset, limit) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM book LIMIT ? OFFSET ?",
            [limit, offset],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.getBookCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as count FROM book", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        });
    });
};


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

exports.viewBookPaginated = (offset, limit) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                b.book_id, 
                b.title, 
                b.author, 
                b.subject, 
                b.isbn, 
                b.status, 
                b.price, 
                b.category_id,
                c.name AS category_name
            FROM book b
            JOIN category c ON b.category_id = c.category_id
            LIMIT ? OFFSET ?
        `;
        db.query(sql, [parseInt(limit), parseInt(offset)], (err, result) => {
            if (err) {
                console.error("🔴 Error in viewBookPaginated:", err.sqlMessage); // Debug log
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.searchBook = (title, author, subject, offset, limit) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM book 
            WHERE title LIKE ? OR author LIKE ? OR subject LIKE ? 
            LIMIT ? OFFSET ?
        `;
        db.query(query, [`%${title}%`, `%${author}%`, `%${subject}%`, limit, offset], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.searchBook = (title, author, subject, category, offset, limit) => {
    let query = `
        SELECT 
            b.book_id, 
            b.title, 
            b.author, 
            b.subject, 
            b.isbn, 
            b.status, 
            b.price, 
            b.category_id,
            c.name AS category_name
        FROM book b
        JOIN category c ON b.category_id = c.category_id
    `;

    let conditions = [];
    let params = [];

    if (title) {
        conditions.push("b.title LIKE ?");
        params.push(`%${title}%`);
    }
    if (author) {
        conditions.push("b.author LIKE ?");
        params.push(`%${author}%`);
    }
    if (subject) {
        conditions.push("b.subject LIKE ?");
        params.push(`%${subject}%`);
    }
    if (category) {
        conditions.push("c.name LIKE ?");
        params.push(`%${category}%`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
exports.searchBookCount = (title, author, subject, category) => {
    let query = `
        SELECT COUNT(*) AS count
        FROM book b
        JOIN category c ON b.category_id = c.category_id
    `;

    let conditions = [];
    let params = [];

    if (title) {
        conditions.push("b.title LIKE ?");
        params.push(`%${title}%`);
    }
    if (author) {
        conditions.push("b.author LIKE ?");
        params.push(`%${author}%`);
    }
    if (subject) {
        conditions.push("b.subject LIKE ?");
        params.push(`%${subject}%`);
    }
    if (category) {
        conditions.push("c.name LIKE ?");
        params.push(`%${category}%`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) reject(err);
            else resolve(result[0].count); // Only return the total count number
        });
    });
};

