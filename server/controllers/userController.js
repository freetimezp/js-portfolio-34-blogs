const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

// REGISTER USER
// POST : api/users/register
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;

        //check if fields are empty
        if (!name || !email || !password) {
            return next(new HttpError("Fill all fields!", 422));
        }

        const newEmail = email.toLowerCase();

        //check if user email exist
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError("Email is already exist!", 422));
        }
        //check password length
        if ((password.trim()).length < 6) {
            return next(new HttpError("Password is to short! Need more then 6 symbols!", 422));
        }
        //check if password not equal to password2
        if (password != password2) {
            return next(new HttpError("Password must be equal to password2", 422));
        }

        //generate salt for password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //create new user
        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPass,
        });
        res.status(201).json(`New user ${newUser.email} registered. Success.`);
    } catch (error) {
        return next(new HttpError("User registration failed!", 422));
    }
};








const loginUser = (req, res, next) => {
    res.json("Login User");
};

const getUser = (req, res, next) => {
    res.json("Profile User");
};

const editUser = (req, res, next) => {
    res.json("Edit User");
};

const changeAvatar = (req, res, next) => {
    res.json("Change Avatar User");
};

const getAuthors = (req, res, next) => {
    res.json("All users or Authors");
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    editUser,
    changeAvatar,
    getAuthors
};


