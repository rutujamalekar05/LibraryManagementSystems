let express=require("express");
let adminpanal=require("../contoller/logincontroller");
let category=require("../contoller/Categorycontroller");
let book=require("../contoller/bookcontroller");
let issue=require("../contoller/issuecontroller");
let router=express.Router();
//login url
router.post("/login",adminpanal.adminlogin);
//category url
router.post("/addcat",category.Addcategory);
router.get("/viewcat",category.viewcategory);
router.get("/delcat",category.delcategory);
router.post("/upcat",category.UpdateCategory);
router.get("/searchcat",category.searchcategory)
//book url
router.post("/addbook",book.AddBook);
router.get("/viewbook",book.viewBook);
router.get("/delbook",book.delBook);
router.post("/upbook",book.UpdateBook);
router.get("/searchbook",book.searchBook),
//issue api
router.post("/api/issued", issue.issueBook);
router.get('/api/user/issues/:userId', issue.getIssuedBooksByUserId);
router.get('/api/user/issued/:userEmail', issue.getIssuedBooksByUserEmail);

module.exports=router;