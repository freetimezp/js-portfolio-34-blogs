const registerUser = (req, res, next) => {
    res.json("Register User");
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


