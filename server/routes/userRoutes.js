const { Router } = require('express');

const {
    registerUser,
    loginUser,
    getUser,
    editUser,
    changeAvatar,
    getAuthors
} = require('../controllers/userController');

const router = Router();

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAuthors);
router.post('/change-avatar', changeAvatar);
router.patch('/edit-user', editUser);


module.exports = router;



