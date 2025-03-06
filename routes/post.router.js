const router = require("express").Router();
const validateObjectId = require("../middlewares/validateObjectId");
const Posts = require("../models/post.model");

// * Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();

    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// * Create a post
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.body?.image;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newPost = new Posts({
      title,
      content,
      author,
      image,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// * Get post by id
router.get("/:id", validateObjectId(), async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// * Update post
router.put("/:id", validateObjectId(), async (req, res) => {
  try {
    const postId = req.params.id;
    const updatingPostBody = req.body;
    const post = await Posts.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (!Object.keys(updatingPostBody).length)
      return res.status(400).json({ message: "Send updating post data" });

    if (typeof updatingPostBody.title === "string")
      post.title = updatingPostBody.title;
    if (typeof updatingPostBody.content === "string")
      post.content = updatingPostBody.content;
    if (typeof updatingPostBody.author === "string")
      post.author = updatingPostBody.author;
    if (typeof updatingPostBody.image === "string")
      post.image = updatingPostBody.image;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// * Delete post
router.delete("/:id", validateObjectId(), async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
