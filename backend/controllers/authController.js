const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require('./authHelper');

const registerController = async (req, res) => {
try {
const { name, email, password, phone, address, question, answer } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        question,
        answer
    });

    await user.save();
    res.status(201).json({ message: "Registration successful" });
} catch (error) {
    res.status(500).json({ error: "Error in registration" });
}
};

const loginController = async (req, res) => {
try {
const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
        return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });
    return res.status(200).json({ user, token });
} catch (error) {
    return res.status(500).send("Error in login");
}
};

const getQuestion = async (req, res) => {
try {
const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ message: "Email or phone number is required" });
    }

    let user;
    if (email) {
        user = await userModel.findOne({ email });
    } else if (phoneNumber) {
        user = await userModel.findOne({ phone: phoneNumber });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ question: user.question });
} catch (error) {
    return res.status(500).json({ message: "Internal server error" });
}
};

const forgotPasswordController = async (req, res) => {
try {
const { email, newPassword, answer } = req.body;
const user = await userModel.findOne({ email, answer });

    if (!user) {
        return res.status(404).send({ message: "Wrong email or answer" });
    }

    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({ message: "Password changed successfully" });
} catch (error) {
    res.status(500).send("Error in forgot password");
}
};

const adminController = async (req, res) => {
try {
const users = await userModel.find();
if (!users || users.length === 0) {
return res.status(404).send({ message: "Users not found" });
}
res.status(200).json(users);
} catch (error) {
res.status(500).send("Error in fetching users");
}
};

const updateProfileController = async (req, res) => {
try {
const { name, email, password, address, phone,_id } = req.body;
const user = await userModel.findOne({            $or: [
    { email: email },
    { phone: phone }
]
});
    if (!user) {
        return res.status(404).send("User not found");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
        return res.status(401).send("Wrong password");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        _id,
        {
            name: name || user.name,
            phone: phone || user.phone,
            address: address || user.address,
            email: email || user.email
        },
        { new: true }
    );
    res.status(200).send({ success: true, message: "Profile Updated Successfully", updatedUser });
} catch (error) {
    res.status(500).send({ success: false, message: "Error while updating profile", error });
}
};

module.exports = {
registerController,
loginController,
adminController,
updateProfileController,
forgotPasswordController,
getQuestion
};