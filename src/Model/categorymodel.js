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

exports.viewcategory = () => {
    return new Promise((resolve, reject) => {
        db.query("select *from category", (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

exports.delcategory = (category_id) => {
    return new Promise((resolve, reject) => {
        db.query("delete from category where category_id=?", [category_id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("Sucess");
            }
        });
    });
}
exports.UpdateCategory = (category_id, name) => {
    return new Promise((resolve, reject) => {
        db.query("update category set name=? where category_id=?", [name, category_id], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve("success");
            }
        })
    })

}
exports.searchcategory = (name) => {
    return new Promise((resolve, reject) => {
        db.query("select *from category where name like '%" + name + "%'", (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })

}
