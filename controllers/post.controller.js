const postService = require("../services/post.service");

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields required" });
    }

    const post = await postService.createPost({
      title,
      content,
      author,
      image,
    });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const post = await postService.getOnePost(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await postService.deletePost(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getPosts, createPost, getOnePost, updatePost, deletePost };
