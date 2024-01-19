const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

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
// GET : api/users/:id
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



// UPDATE USER
// PATCH : api/users/edit-user
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill all fields for update user!", 422));
        }

        //get user from db
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found!", 403));
        }

        //make sure email not exist in db
        const emailExist = await User.findOne({ email });
        if (emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email is already exist!", 422));
        }

        //compare password to password in db
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid Password!", 422));
        }

        //compare new passwords
        if (newPassword != confirmNewPassword) {
            return next(new HttpError("New Passwords not match!", 422));
        }

        //hash new pass
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        //update user info 
        const newInfo = await User.findByIdAndUpdate(req.user.id,
            { name, email, password: hashPassword }, { new: true });

        res.status(200).json(newInfo);
    } catch (error) {
        return next(new HttpError("Error when update user!"));
    }
};




// CHANGE USER AVATAR
// POST : api/users/change-avatar
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files.avatar) {
            return next(new HttpError("Choose image!", 422));
        }

        //find user in db
        const user = await User.findById(req.user.id);
        //delete old avatar if exists
        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err, 422));
                }
            });
        }

        const { avatar } = req.files;
        //check fil size
        if (avatar.size > 500000) {
            return next(new HttpError("Image is to large.. need less then 500kb..", 422));
        }

        let filename;
        filename = avatar.name;
        let splittedFilename = filename.split('.');
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err, 422));
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {
                avatar: newFilename
            }, {
                new: true
            });
            if (!updatedAvatar) {
                return next(new HttpError("Could not change avatar!", 422));
            }

            res.status(200).json(updatedAvatar);
        });

    } catch (error) {
        return next(new HttpError("Fail to change avatar!", 422));
    }
};




// GET ALL USERS \ AUTHORS
// GET : api/users/authors
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


