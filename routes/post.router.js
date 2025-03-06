const router = require("express").Router();
const validateObjectId = require("../middlewares/validateObjectId");
const Posts = require("../models/post.model");
const postController = require("../controllers/post.controller");

// * Get all posts
router.get("/", postController.getPosts);

// * Create a post
router.post("/", postController.createPost);

// * Get post by id
router.get("/:id", validateObjectId(), postController.getOnePost);

// * Update post
router.put("/:id", validateObjectId(), postController.updatePost);

// * Delete post
router.delete("/:id", validateObjectId(), postController.deletePost);

module.exports = router;
