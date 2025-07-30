let express=require("express");
let adminpanal=require("../contoller/logincontroller");
let category=require("../contoller/Categorycontroller");
let book=require("../contoller/bookcontroller");
let router=express.Router();
//login url
router.post("/loginadmin",adminpanal.adminlogin);
router.post("/loginuser",adminpanal.userlogin);
//category url
router.post("/addcat",category.Addcategory);
router.get("/viewcat",category.viewcategory);
router.get("/delcat",category.delcategory);
router.post("/upcat",category.UpdateCategory);
router.get("/searchcat",category.searchcategory),
//book url
router.post("/addbook",book.AddBook);
router.get("/viewbook",book.viewBook);
router.get("/delbook",book.delBook);
router.post("/upbook",book.UpdateBook);
module.exports=router;