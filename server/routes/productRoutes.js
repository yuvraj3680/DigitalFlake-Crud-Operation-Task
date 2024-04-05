const express = require('express');
const ProductController = require('../controller/productController');
const router = express.Router();


router.post('/', ProductController.createProduct);


router.get('/:id', ProductController.getProductById);

router.get('/', ProductController.getAllProduct);


router.put('/:id', ProductController.updateProduct);


router.delete('/:id', ProductController.deleteProduct);



module.exports = router;
