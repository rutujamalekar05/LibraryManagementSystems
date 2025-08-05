const userModel = require("../Model/usermodel");

// adjust if your model file is student.js

exports.addStudentByAdmin = (req, res) => {
    const { name, email, pass, year } = req.body;

    if (!name || !email || !pass || !year) {
        return res.status(400).json({ error: "All fields are required" });
    }

    userModel.addStudent(name, email, pass, year)
        .then((result) => {
            res.status(201).json({
                status: "Student added",
                student_id: result.insertId
            });
        })
        .catch((err) => {
            console.error("Error adding student:", err.message);
            res.status(500).json({ error: "Database error while adding student" });
        });
};

// GET /user/profile/:id
exports.getProfile = (req, res) => {
    const userId = req.params.id;

    userModel.getUserProfile(userId)
        .then(profile => {
            if (!profile) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(profile);
        })
        .catch(err => {
            console.error("Profile Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// GET /user/books
exports.getAllBooks = (req, res) => {
    userModel.getAllBooks()
        .then(books => {
            res.status(200).json({ books });
        })
        .catch(err => {
            console.error("Books Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// GET /user/history/:id
exports.getUserHistory = (req, res) => {
    const userId = req.params.id;

    userModel.getUserHistory(userId)
        .then(history => {
            res.status(200).json({ history });
        })
        .catch(err => {
            console.error("History Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};
