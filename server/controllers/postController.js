
// CREATE POST
// POST : api/posts/create
const createPost = async (req, res, next) => {
    res.json("Create post");
}

// GET POSTS
// GET : api/posts
const getPosts = async (req, res, next) => {
    res.json("Get all posts");
}

// GET SINGLE POST
// GET : api/posts/:id
const getPost = async (req, res, next) => {
    res.json("Get single post");
}



// GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
const getCatPosts = async (req, res, next) => {
    res.json("Get posts by category");
}



// GET AUTHOR POST
// GET : api/posts/users/:id
const getUserPosts = async (req, res, next) => {
    res.json("Get all posts by user");
}



// EDIT POST
// PATCH : api/posts/:id
const editPost = async (req, res, next) => {
    res.json("Edit post");
}




// DELETE POST
// DELETE : api/posts/:id
const deletePost = async (req, res, next) => {
    res.json("Delete post");
}


module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
};
















