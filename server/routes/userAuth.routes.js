const express=require("express");
const { userRegister, userLogin } = require("../controllers/userAuth.controller");
const router=express.Router();
router.route("/userRegister").post(userRegister);
router.route("/userLogin").post(userLogin);
module.exports=router;