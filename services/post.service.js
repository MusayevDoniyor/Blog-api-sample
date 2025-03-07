const Posts = require("../models/post.model");

const getPosts = async () => {
  return await Posts.find();
};

const createPost = async (postData) => {
  const newPost = new Posts(postData);
  return await newPost.save();
};

const getOnePost = async (postId) => {
  return await Posts.findById(postId);
};

const updatePost = async (postId, updatingPostBody) => {
  const post = await Posts.findById(postId);
  if (!post) return null;

  Object.keys(updatingPostBody).forEach((key) => {
    if (typeof updatingPostBody[key] === "string") {
      post[key] = updatingPostBody[key];
    }
  });

  return await post.save();
};

const deletePost = async (postId) => {
  return await Posts.findByIdAndDelete(postId);
};

module.exports = { getPosts, createPost, getOnePost, updatePost, deletePost };
