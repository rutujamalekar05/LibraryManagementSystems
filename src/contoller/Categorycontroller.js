let catelsm = require("../Model/categorymodel");

exports.Addcategory=((req,res)=>
{
     let {name}=req.body;
     let promise=catelsm.Addcategory(name);
     promise.then((result)=>
    {
        res.json({ status: "Add sucessfully", msg: result });
    }).catch((err)=>
    {
       res.json({ status: " Not Added", msg: result });
    });
});
exports.viewcategory = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const dataPromise = catelsm.viewcategoryWithPagination(limit, offset);
    const countPromise = catelsm.getCategoryCount();

    Promise.all([dataPromise, countPromise])
        .then(([categoryList, totalCategories]) => {
            const totalPages = Math.ceil(totalCategories / limit);
            res.json({
                status: `Category Page ${page}`,
                currentPage: page,
                totalCategories,
                totalPages,
                pageSize: limit,
                catList: categoryList
            });
        })
        .catch((err) => {
            console.error("Pagination error:", err);
            res.status(500).json({ error: "Something went wrong" });
        });
};
exports.delcategory = (req, res) => {
    const category_id = parseInt(req.query.category_id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    let offset = (page - 1) * limit;

    catelsm.delcategory(category_id)
        .then(() => {
            return catelsm.getCategoryCount();
        })
        .then((totalCategories) => {
            const totalPages = Math.ceil(totalCategories / limit);
            const safePage = page > totalPages && totalPages > 0 ? totalPages : page;
            offset = (safePage - 1) * limit;

            return Promise.all([
                catelsm.viewcategoryWithPagination(limit, offset),
                Promise.resolve(safePage),
                Promise.resolve(totalCategories),
                Promise.resolve(totalPages)
            ]);
        })
        .then(([categoryList, currentPage, totalCategories, totalPages]) => {
            res.json({
                status: "Category Deleted",
                currentPage,
                totalCategories,
                totalPages,
                pageSize: limit,
                catList: categoryList
            });
        })
        .catch((err) => {
            console.error("Delete Error:", err);
            res.status(500).json({ error: "Failed to delete category" });
        });
};



// exports.updatedept=(req,res)=>
// {
//   res.render("updatedept.ejs",{dname:req.query.dname,
//                                  did:req.query.did});
// }
exports.UpdateCategory = (req, res) => {
    const { category_id, name } = req.body;

    if (!category_id || !name) {
        return res.status(400).json({ error: "Missing category_id or name in request body" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    let offset = (page - 1) * limit;

    catelsm.UpdateCategory(category_id, name)
        .then(() => catelsm.getCategoryCount())
        .then((totalCategories) => {
            const totalPages = Math.ceil(totalCategories / limit);

            // ensure requested page is valid
            const validPage = page > totalPages && totalPages > 0 ? totalPages : page;
            offset = (validPage - 1) * limit;

            return Promise.all([
                catelsm.viewcategoryWithPagination(limit, offset),
                Promise.resolve(validPage),
                Promise.resolve(totalCategories),
                Promise.resolve(totalPages)
            ]);
        })
        .then(([categoryList, currentPage, totalCategories, totalPages]) => {
            res.json({
                status: "Category Updated",
                currentPage,
                totalCategories,
                totalPages,
                pageSize: limit,
                catList: categoryList
            });
        })
        .catch((err) => {
            console.error("Update Error:", err);
            res.status(500).json({ error: "Failed to update category" });
        });
};


exports.searchcategory = (req, res) => {
    const name = req.query.name || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const dataPromise = catelsm.searchcategory(name, offset, limit);
    const countPromise = catelsm.searchcategoryCount(name);

    Promise.all([dataPromise, countPromise])
        .then(([categoryList, totalCategories]) => {
            const totalPages = Math.ceil(totalCategories / limit);
            res.status(200).json({
                status: `Search Category Page ${page}`,
                currentPage: page,
                totalCategories,
                totalPages,
                pageSize: limit,
                catList: categoryList
            });
        })
        .catch((err) => {
            console.error("Search error:", err);
            res.status(500).json({ error: "Something went wrong" });
        });
    }//this is category