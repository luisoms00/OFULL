const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwtConfig');

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error('Email ya registrado');
  }
  const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Credenciales inválidas');
  }
  const token = jwt.sign({ id: user._id }, secret, { expiresIn });
  res.json({ token });
});