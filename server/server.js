const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const UserRouter = require("./routes/userRouer");
const CategoryRouter = require("./routes/categoryRoutes");
const ProductRouter = require ("./routes/productRoutes");



const app=express();

const PORT= process.env.PORT||8000;
app.use(bodyParser.json());

app.use(cors());

app.use('/user',UserRouter);
app.use('/category',CategoryRouter);

app.use('/product',ProductRouter);





app.listen(PORT,()=>{
    console.log(`server is running on${PORT}`)
})
console.log("hello");