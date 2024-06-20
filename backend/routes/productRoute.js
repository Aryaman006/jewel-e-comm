const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');

const {
    createProductController,
    getProductController,
    updateProductController,
    deleteProductController,
    getSingleProductController,
    productFiltersController,
    searchProductController,
    productCountController,
    productListController,
    relatedProductController,
    productCategoryController,
    productSubCategoryController,
    productPhotoController
} = require('../controllers/productController');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

router.post('/create', requireSignIn, isAdmin, formidableMiddleware(), createProductController);
router.put('/update/:pid', requireSignIn, isAdmin, formidableMiddleware(), updateProductController);

router.get('/products', getProductController);
router.get('/photo/:pid', productPhotoController);
router.get('/product/:id', getSingleProductController);
router.delete('/delete/:pid', requireSignIn, isAdmin, deleteProductController);
router.post('/filters', productFiltersController);
router.get('/products/search/:keyword', searchProductController);
router.get('/products/count', productCountController);
router.get('/products/page/:page', productListController);
router.get('/related-products/:pid/:cid/:sid', relatedProductController);
router.get('/products/category/:slug', productCategoryController);
router.get('/products/subcategory/:slug', productSubCategoryController);

module.exports = router;
