const ProductDetails = require('../model/product');

const ProductController = {
    createProduct: async (req, res) => {
        try {
            const {name,status, packsize,mrp,image,categoryId } = req.body;
            const newProduct= await ProductDetails.createProduct({ name,status, packsize,mrp,image,categoryId});
            res.status(201).send({ "status": "1", "data": newProduct });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product_id= req.params.id;
            const productInfo = await ProductDetails.getProductById(product_id);
            if (productInfo) {
                return res.status(200).send({ "status": "1", "data": productInfo });
            }
            res.status(404).send({ "status": "0", "error": "product not found" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    getAllProduct: async (req,res)=>{
        try {
            const ProductList = await ProductDetails.getAllProduct();
            if(ProductList)
            {
                return res.status(200).send({ "status": "1", "data": ProductList });
            }
            res.status(404).send({"status":"0","message":" product not found"});
        } catch (error) {
            console.log(error);
            res.status(500).send({"status":"0","error":error});
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product_id = req.params.id;
            const data = req.body;
            const updateProduct = await ProductDetails.updateProduct(product_id, data);
            if (updateProduct) {
                return res.status(200).send({ "status": "1", "data": updateProduct });
            }
            res.status(404).send({ "status": "0", "error": "product not updated" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product_id = req.params.id;
            const deleteproduct = await ProductDetails.deleteProduct(product_id );
            if (deleteproduct) {
                return res.status(200).send({ "status": "1", "message": "product deleted successfully" });
            }
            res.status(404).send({ "status": "0", "error": "product not found" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    }
};

module.exports = ProductController;
