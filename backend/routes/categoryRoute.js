const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {
    createCategoryController,
    getCategoriesController,
    updateCategoryController,
    deleteCategoryController,
    getCategoryPhotoController
} = require('../controllers/categoryController');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

router.post('/create-categories', requireSignIn, isAdmin, formidableMiddleware(), createCategoryController);
router.put('/categories/:id', requireSignIn, isAdmin, formidableMiddleware(), updateCategoryController);
router.delete('/delete/:id', requireSignIn, isAdmin, deleteCategoryController);
router.get('/categories', getCategoriesController);
router.get('/photo/:id', getCategoryPhotoController);

module.exports = router;
