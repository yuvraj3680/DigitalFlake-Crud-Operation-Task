const express = require("express");
const userController = require("../controller/userController");
const router=express.Router();
const verifyToken = require("../controller/verifyToken"); 

router.post("/",userController.createUser);
router.post("/login", userController.loginUser);



router.get("/",verifyToken,userController.getAllUser);


router.get('/:email',verifyToken, userController.readUserByEmail);

module.exports=router;