const UserDetails = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'yourSecretKey';

const userController = {
    createUser: async (req, res) => {
        try {
            const { name, mobile, email, password } = req.body;
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
                return res.status(200).send({ "status": "1", "data": userInfo });
            }
            res.status(404).send({ "status": "0", message: "user not found" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", message: "Internal Server Error" });
        }
    },
    getAllUser: async (req, res) => {
        try {
            const userList = await UserDetails.getAllUser();
            if (userList) {
                return res.status(200).send({ "status": "1", "data": userList });
            }
            res.status(404).send({ "status": "0", message: "Users not found" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserDetails.readUserByEmail(email);
            if (!user) {
                return res.status(404).send({ "status": "0", message: "User not found" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({ "status": "0", message: "Incorrect password" });
            }
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                JWT_SECRET_KEY,
                { expiresIn: '30d' }
            );
            res.status(200).send({ "status": "1", "data": user, "token": token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

   
};

module.exports = userController;




