const issuemodel = require('../Model/issuemodel');

exports.issueBook = (req, res) => {
    const { book_id, sid } = req.body;

    if (!book_id || !sid) {
        return res.status(400).json({ error: "book_id and sid are required" });
    }

    const data = {
        book_id,
        sid
    };

    issuemodel.issueBook(data)
        .then(result => {
            res.status(201).json({
                message: "Book issued successfully",
                issue_id: result.insertId
            });
        })
        .catch(err => {
            console.error("Error issuing book:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


exports.getIssuedBooksByUserId = (req, res) => {
    const userId = req.params.userId;

    issuemodel.getIssuedBooksByUserId(userId)
        .then(issuedBooks => {
            res.status(200).json(issuedBooks);
        })
        .catch(error => {
            console.error("Error fetching issued books:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

exports.getIssuedBooksByUserEmail = (req, res) => {
    const userEmail = req.params.userEmail;

    if (!userEmail || typeof userEmail !== 'string' || !userEmail.trim()) {
        return res.status(400).json({ error: "Invalid or empty email address" });
    }

    const decodedEmail = decodeURIComponent(userEmail.trim());

    issuemodel.getIssuedBooksByUserEmail(decodedEmail)
        .then(result => {
            if (result.length === 0) {
                return res.status(404).json({ error: "No books issued for this email" });
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.error("Error fetching issued books:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};