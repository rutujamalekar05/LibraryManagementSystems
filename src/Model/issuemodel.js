let db = require("../../db.js");

const issueBook = (data) => {
    const { book_id, sid } = data;

    const sql = `
        INSERT INTO issued_books (book_id, sid, issue_date, due_date, status)
        VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'issued')
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, [book_id, sid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
const getIssuedBooksByUserId = (sid) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                i.issue_id,
                b.title,
                s.name AS student_name,
                DATE_FORMAT(i.issue_date, '%Y-%m-%d %H:%i:%s') AS issue_date,
                DATE_FORMAT(i.due_date, '%Y-%m-%d %H:%i:%s') AS due_date,
                DATE_FORMAT(i.return_date, '%Y-%m-%d %H:%i:%s') AS return_date,
                i.status
            FROM issued_books i
            JOIN book b ON i.book_id = b.book_id
            JOIN student s ON i.sid = s.sid
            WHERE i.sid = ?
        `;
        db.query(sql, [sid], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
const getIssuedBooksByUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                i.issue_id,
                i.book_id,
                b.title,
                b.author,
                DATE_FORMAT(i.issue_date, '%Y-%m-%d') AS issue_date,
                DATE_FORMAT(i.return_date, '%Y-%m-%d') AS return_date,
                i.status
            FROM issued_books i
            JOIN student s ON i.sid = s.sid
            JOIN book b ON i.book_id = b.book_id
            WHERE s.email = ?
        `;

        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


module.exports = {
    issueBook,
    getIssuedBooksByUserId,
    getIssuedBooksByUserEmail,
};
