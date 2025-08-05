let booklms = require("../Model/bookmodel");
exports.AddBook = ((req, res) => {
    let { title, author, subject, isbn, status, price, category_id } = req.body;

    let promise = booklms.AddBook(title, author, subject, isbn, status, price, category_id);

    promise.then((result) => {
        res.json({ status: "Add successfully", msg: result });
    }).catch((err) => {
        console.error("AddBook Error:", err); // 🔍 Logs full error in terminal
        res.json({
            status: "Not Added",
            msg: err.sqlMessage || err.message || "Unknown error"
        }); 
    });
});

exports.viewBook = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const promise = booklms.viewBookWithPagination(limit, offset);

    promise
        .then((data) => {
            const totalPages = Math.ceil(data.total / limit);
            res.json({
                status: `Books Page ${page}`,
                currentPage: page,
                totalBooks: data.total,
                totalPages: totalPages,
                pageSize: limit,
                bookList: data.books
            });
        })
        .catch((err) => {
            console.error("Pagination error:", err); // Show actual error in terminal
            res.status(500).json({ error: err.message || err }); // Send error in response
        });
};




exports.delBook = (req, res) => {
    let book_id = parseInt(req.query.book_id);
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;

    let offset = (page - 1) * pageSize;

    booklms.delBook(book_id)
        .then(() => {
            Promise.all([
                booklms.viewBookPaginated(offset, pageSize),
                
            ])
                .then(([bookList, totalBooks]) => {
                    let totalPages = Math.ceil(totalBooks / pageSize);
                    res.json({
                        status: "Book Deleted",
                        currentPage: page,
                        totalBooks: totalBooks,
                        totalPages: totalPages,
                        pageSize: pageSize,
                        bookList: bookList
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: "Failed to retrieve books after delete." });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to delete book." });
        });
};


exports.UpdateBook = (req, res) => {
    let { book_id, title, author, subject } = req.body;

    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    let offset = (page - 1) * pageSize;

    let promise = booklms.UpdateBook(book_id, title, author, subject);

    promise.then(() => {
        Promise.all([
            booklms.viewBookPaginated(offset, pageSize),
            booklms.getBookCount()
        ])
        .then(([bookList, totalBooks]) => {
            let totalPages = Math.ceil(totalBooks / pageSize);
            res.json({
                status: "Book Updated",
                currentPage: page,
                totalBooks: totalBooks,
                totalPages: totalPages,
                pageSize: pageSize,
                bookList: bookList
            });
        })
        .catch((err) => {
            console.error("❌ Error in Promise.all:", err);
            res.status(500).json({ error: "Failed to fetch updated book list." });
        });
    })
    .catch((err) => {
        console.error("❌ Error in UpdateBook:", err);
        res.status(500).json({ error: "Book not updated" });
    });
};

 exports.searchBook = (req, res) => {
    const title = req.query.title || null;
    const author = req.query.author || null;
    const subject = req.query.subject || null;
    const category = req.query.category || null;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const searchPromise = booklms.searchBook(title, author, subject, category, offset, pageSize);
    const countPromise = booklms.searchBookCount(title, author, subject, category);

    Promise.all([searchPromise, countPromise])
        .then(([bookList, totalBooks]) => {
            const totalPages = Math.ceil(totalBooks / pageSize);
            res.status(200).json({
                status: "Search Book Results",
                currentPage: page,
                pageSize: pageSize,
                totalBooks: totalBooks,
                totalPages: totalPages,
                bookList: bookList
            });
        })
        .catch((err) => {
            console.error("Search error:", err.sqlMessage || err.message || err);
            res.status(500).json({ error: "Something went wrong" });
        });
};
//this is book controller