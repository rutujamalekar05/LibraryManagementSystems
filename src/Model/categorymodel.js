let db=require("../../db.js");
exports.Addcategory = (name) => {

    return new Promise((resolve, reject) => {
        console.log(name);

        db.query("insert into category values('0',?)", [name], (err, result) => {
            if (err) {
                reject("category not save");

            }
            else {
                resolve("category Save");
            }
        });
    });
}

// Get paginated category list
exports.viewcategoryWithPagination = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM category LIMIT ? OFFSET ?",
            [limit, offset],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

exports.getCategoryCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS count FROM category", (err, result) => {
            if (err) reject(err);
            else resolve(result[0].count);
        });
    });
};
exports.UpdateCategory = (category_id, name) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE category SET name=? WHERE category_id=?", [name, category_id], (err, result) => {
            if (err) reject(err);
            else resolve("success");
        });
    });
};

exports.searchcategory = (name, offset, limit) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM category WHERE name LIKE ? LIMIT ? OFFSET ?",
            [`%${name}%`, limit, offset],
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
exports.searchcategoryCount = (name) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT COUNT(*) AS count FROM category WHERE name LIKE ?",
            [`%${name}%`],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].count);
                }
            }
        );
    });
};
//this is category model