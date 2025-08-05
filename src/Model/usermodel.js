const db = require("../../db");
exports.addStudent = (name, email, pass, year) => {
    const query = "INSERT INTO student (name, email, pass, year, role, created_at)VALUES (?, ?, ?, ?, 'user', CURDATE())";

    return new Promise((resolve, reject) => {
        db.query(query, [name, email, pass, year], (err, result) => {
            if (err) reject(err);
            else resolve({ message: "Student added successfully", insertId: result.insertId });
        });
    });
};

// Find user by email
exports.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM student WHERE email = ?`;
        db.query(query, [email], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// Get user profile
exports.getUserProfile = (sid) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                name, 
                email, 
                year, 
                role, 
                DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at 
            FROM student 
            WHERE sid = ?
        `;
        db.query(query, [sid], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};


// Get all books
exports.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM book", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Get user's history
exports.getUserHistory = (sid) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT b.title, DATE_FORMAT(h.issue_date, '%Y-%m-%d') AS issue_date, DATE_FORMAT(h.return_date, '%Y-%m-%d') AS return_date FROM history h JOIN book b ON h.book_id = b.book_id WHERE h.sid = ?",
            [sid],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};
