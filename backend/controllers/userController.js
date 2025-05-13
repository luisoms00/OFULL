const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Email ya registrado');
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }
  const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
  if (!updated) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
  res.json(updated);
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
  res.json({ message: 'Usuario eliminado' });
});

module.exports = { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
