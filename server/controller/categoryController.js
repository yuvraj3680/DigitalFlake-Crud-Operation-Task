const categoryDetails = require('../model/category');

const categoryController = {
    createCategory: async (req, res) => {
        try {
            const { name, description, status } = req.body;
            const newCategory = await categoryDetails.createCategory({ name, description, status });
            res.status(201).send({ "status": "1", "data": newCategory });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const category_id= req.params.id;
            const categoryInfo = await categoryDetails.getCategoryById(category_id);
            if (categoryInfo) {
                return res.status(200).send({ "status": "1", "data": categoryInfo });
            }
            res.status(404).send({ "status": "0", "error": "category not found" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    getAllCategory: async (req,res)=>{
        try {
            const CategoryList = await categoryDetails.getAllCategory();
            if(CategoryList)
            {
                return res.status(200).send({ "status": "1", "data": CategoryList });
            }
            res.status(404).send({"status":"0","message":" category not found"});
        } catch (error) {
            console.log(error);
            res.status(500).send({"status":"0","error":error});
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category_id = req.params.id;
            const data = req.body;
            const updateCategory = await categoryDetails.updateCategory(category_id, data);
            if (updateCategory) {
                return res.status(200).send({ "status": "1", "data": updateCategory });
            }
            res.status(404).send({ "status": "0", "error": "category not updated" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category_id = req.params.id;
            const deletedcategory = await categoryDetails.deleteCategory(category_id);
            if (deletedcategory) {
                return res.status(200).send({ "status": "1", "message": "category deleted successfully" });
            }
            res.status(404).send({ "status": "0", "error": "category not found" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ "status": "0", "error": error });
        }
    }
};

module.exports = categoryController;
