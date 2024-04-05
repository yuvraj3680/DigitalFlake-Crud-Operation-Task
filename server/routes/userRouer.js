const express = require("express");
const userController = require("../controller/userController");
const router=express.Router();

router.post("/",userController.createUser);
router.post("/login", userController.loginUser);



router.get("/",userController.getAllUser);


router.get('/:email', userController.readUserByEmail);

module.exports=router;