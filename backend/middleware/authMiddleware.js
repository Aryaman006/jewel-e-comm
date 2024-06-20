const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const requireSignIn = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            console.log("Token not provided in require sign in");
            return res.status(401).json({ message: "Token not provided" });
        }
        const jwtToken = token.replace("Bearer ", "").trim();
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user.role !== 1) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error from isAdmin" });
    }
};

module.exports = { requireSignIn, isAdmin };