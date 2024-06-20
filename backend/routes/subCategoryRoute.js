const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');

const {
    createSubCategoryController,
    updateSubCategoryController,
    deleteSubCategoryController,
    getAllSubCategoriesController,
    getSubCategoryByIdController,
    getSubCategoryPhotoController
} = require('../controllers/subCategoryController');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');

router.post('/create-subcategories', requireSignIn, isAdmin, formidableMiddleware(), createSubCategoryController);
router.get('/get', getAllSubCategoriesController);
router.get('/get/:id', getSubCategoryByIdController);
router.put('/update/:id', requireSignIn, isAdmin, formidableMiddleware(), updateSubCategoryController);
router.delete('/delete/:id', requireSignIn, isAdmin, deleteSubCategoryController);
router.get('/photo/:id', getSubCategoryPhotoController);

module.exports = router;
