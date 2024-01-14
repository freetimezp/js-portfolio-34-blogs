const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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



// LOGIN USER
// POST : api/users/login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check if fields are empty
        if (!email || !password) {
            return next(new HttpError("Please fill all fields!", 422));
        }

        const newEmail = email.toLowerCase();
        //check if user email found in db
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("User not found in db! Please use another email or register new user.", 422));
        }

        //compare password
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Wrong password!", 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HttpError("User login failed!", 422));
    }
};



// PROFILE or GET USER DETAILS
// POST : api/users/:id
const getUser = async (req, res, next) => {
    try {
        //get id from url params
        const { id } = req.params;
        //try find user in db (with out password field)
        const user = await User.findById(id).select('-password');

        if (!user) {
            return next(new HttpError("User not found!", 422));
        }

        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError("User Profile load failed!", 422));
    }
};




const editUser = (req, res, next) => {
    res.json("Edit User");
};

const changeAvatar = (req, res, next) => {
    res.json("Change Avatar User");
};


// GET ALL USERS \ AUTHORS
// POST : api/users/authors
const getAuthors = async (req, res, next) => {
    try {
        //try find all user in db (with out password field)
        const authors = await User.find().select('-password');

        res.status(200).json(authors);
    } catch (error) {
        return next(new HttpError("No authors were found!", 422));
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUser,
    editUser,
    changeAvatar,
    getAuthors
};


