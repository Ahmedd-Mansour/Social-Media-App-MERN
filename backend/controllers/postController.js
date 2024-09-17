const mongoose = require("mongoose");
const POST = require("../models/postModel");

const getPosts = async (req, res) => {
  try {
    const posts = await POST.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getUserPosts = async (req, res) => {
  const { _id } = req.user._id;
  try {
    const posts = await POST.find({ user_id: _id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createPost = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const user_id = req.user._id;
  const { description, photo, creatorName, creatorLastname } = req.body;
  try {
    const post = await POST.create({
      description,
      photo,
      user_id,
      creatorName,
      creatorLastname,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This is not a valid ID" });
  }
  try {
    const post = await POST.findByIdAndDelete({ _id: id });
    if (!post) {
      return res.status(400).json({ error: "Workout doesn't exist" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "This is not a valid ID" });
  }
  const { description, photo } = req.body;
  try {
    const post = await POST.findByIdAndUpdate(
      { _id: id },
      { description, photo },
      { new: true }
    );
    if (!post) {
      return res.status(400).json({ error: "Post doesn't exist" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await POST.findById(req.params.id);
    if (post.likes.includes(req.user._id)) {
      console.log(req.user._id);
      console.log(post.likes);
      post.likes = post.likes.filter((p) => !p.equals(req.user._id) );
      await post.save();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getUserPosts,
  likePost,
  unlikePost,
};
