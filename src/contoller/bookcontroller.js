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

exports.viewBook=(req,res)=>
{
   let promise=booklms.viewBook();
   promise.then((result)=>
   {
        // res.json(result);
       res.json({status: "All Books",bookList:result});
   });
   promise.catch((err)=>
   {
     res.send(err);
   });
}


exports.delBook=(req,res)=>
{
     let book_id=parseInt(req.query.book_id);
     let promise=booklms.delBook(book_id);
     promise.then((result)=>{
    let p=booklms.viewBook();
   p.then((result)=>
   {
        // res.json(result);
       res.json({status: "Delete category",bookList:result});
   });
   p.catch((err)=>
   {
     res.send(err);
   });
     });
     promise.catch((err)=>{

     });
}

exports.UpdateBook=(req,res)=>{
    let {book_id,title,author,subject}=req.body;
    
    
    let promise=booklms.UpdateBook(book_id,title,author,subject);
     promise.then((result)=>{
        let p=booklms.viewBook();
        p.then((result)=>{
            res.json({status: "Update Book",bookList:result});
        })

        });
        promise.catch((err)=>{
            res.send("Book not update");

        }); 
    }

   