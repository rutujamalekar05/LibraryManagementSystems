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
exports.viewcategory=(req,res)=>
{
   let promise=catelsm.viewcategory();
   promise.then((result)=>
   {
        // res.json(result);
       res.json({status: "All category",catList:result});
   });
   promise.catch((err)=>
   {
     res.send(err);
   });
}

exports.delcategory=(req,res)=>
{
     let category_id=parseInt(req.query.category_id);
     let promise=catelsm.delcategory(category_id);
     promise.then((result)=>{
    let p=catelsm.viewcategory();
   p.then((result)=>
   {
        // res.json(result);
       res.json({status: "Delete category",catList:result});
   });
   p.catch((err)=>
   {
     res.send(err);
   });
     });
     promise.catch((err)=>{

     });
}
// exports.updatedept=(req,res)=>
// {
//   res.render("updatedept.ejs",{dname:req.query.dname,
//                                  did:req.query.did});
// }
exports.UpdateCategory=(req,res)=>{
    let {category_id,name}=req.body;
    
    
    let promise=catelsm.UpdateCategory(category_id,name);
     promise.then((result)=>{
        let p=catelsm.viewcategory();
        p.then((result)=>{
            res.json({status: "Update category",catList:result});
        })

        });
        promise.catch((err)=>{
            res.send("Category not update");

        }); 
    }

     exports.searchcategory=((req,res)=>{
        let name=req.query.name;
        let promise=catelsm.searchcategory(name);
        promise.then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            res.send("something went wrong");
        })

    });