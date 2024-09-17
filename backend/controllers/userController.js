require("dotenv").config();
const USER = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "5d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.login(email, password);
    const { name, lastname, _id } = user;
    const token = createToken(_id);
    res.status(200).json({ name, lastname, email, token, _id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { name, lastname, email, password,profile_picture } = req.body;
  try {
    const user = await USER.signup(name, lastname, email, password,profile_picture);
    const { _id } = user;
    const token = createToken(_id);
    res.status(200).json({ name, lastname, email, token, _id,profile_picture });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



module.exports = { loginUser, signupUser };
