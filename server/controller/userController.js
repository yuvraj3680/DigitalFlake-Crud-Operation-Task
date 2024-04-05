const UserDetails = require("../model/user");
const bcrypt = require("bcryptjs");



const userController = {
    createUser: async (req, res) => {
        try {
            const { name, mobile, email, password } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await UserDetails.createUser({ name, mobile, email, password: hashedPassword });
            res.status(201).send({ "status": "1", "data": newUser });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    readUserByEmail: async (req, res) => {
        try {
            const user_email = req.params.email;
            const userInfo = await UserDetails.readUserByEmail(user_email);
            if (userInfo) {
                return res.status(200).send({"status": "1", "data": userInfo});
            }
            res.status(404).send({"status": "0", "error": "user not found"});
        } catch (error) {
            console.error(error);
            res.status(500).send({"status": "0", "error": "Internal Server Error"});
        }
    },



    getAllUser: async (req,res)=>{
        try {
            const locationList = await UserDetails.getAllUser();
            if(locationList)
            {
                return res.status(200).send({ "status": "1", "data": locationList });
            }
            res.status(404).send({"status":"0","message":" location not found"});
        } catch (error) {
            console.log(error);
            res.status(500).send({"status":"0","error":error});
        }
    },



    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserDetails.readUserByEmail(email);
            if (!user) {
                return res.status(404).send({ "status": "0", "error": "User not found" });
            }
            
            // Compare hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({ "status": "0", "error": "Incorrect password" });
            }
            
            res.status(200).send({ "status": "1", "data": user });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    }

};


module.exports=userController;