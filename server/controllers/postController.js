const Post = require("../models/postModel");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");


// CREATE POST
// POST : api/posts/create
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Fill all fields for create post!", 422));
        }
        const { thumbnail } = req.files;
        //check img size
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Size of img is to big. Try upload img with size less than 2mb!", 422));
        }
        let filename = thumbnail.name;
        let splittedFilename = filename.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                //create new post
                const newPost = await Post.create({
                    title, category, description,
                    thumbnail: newFilename,
                    creator: req.user.id
                });
                if (!newPost) {
                    return next(new HttpError("Failed to create post!", 422));
                }

                //find user and increase post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

                res.status(201).json(newPost);
            }
        });

    } catch (error) {
        return next(new HttpError(error));
    }
}

// GET POSTS
// GET : api/posts
const getPosts = async (req, res, next) => {
    try {
        //try find all posts in db 
        const posts = await Post.find().sort({ updatedAt: -1 });
        if (!posts || posts.length < 1) {
            return next(new HttpError("Posts not found", 422));
        }

        res.status(200).json(posts);

    } catch (err) {
        return next(new HttpError(err));
    }
}

// GET SINGLE POST
// GET : api/posts/:id
const getPost = async (req, res, next) => {
    try {
        //get post id from url params
        const { id } = req.params;
        //try find post in db
        const post = await Post.findById(id);

        if (!post) {
            return next(new HttpError("Post not found!", 422));
        }

        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError("Post load failed!", 422));
    }
}



// GET POSTS BY CATEGORY
// GET : api/posts/categories/:category
const getCatPosts = async (req, res, next) => {
    try {
        //get category from url
        const { category } = req.params;
        //try find post by category
        const catPosts = await Post.find({ category }).sort({ updatedAt: -1 });

        if (!catPosts || catPosts.length < 1) {
            return next(new HttpError("Posts by this category not found!", 422));
        }

        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError("Posts by this category search failed!", 422));
    }
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
















