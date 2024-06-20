const express = require('express');
const router = express.Router();
const {
    registerController,
    loginController,
    adminController,
    updateProfileController,
    forgotPasswordController,
    getQuestion
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/get-question',getQuestion);
router.post('/forgot-password', forgotPasswordController,requireSignIn);
router.post('/update-user',updateProfileController,requireSignIn);
router.get('/users',adminController,requireSignIn,isAdmin);

module.exports = router;
