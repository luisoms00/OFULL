const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { secret } = require('../config/jwtConfig');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, secret);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Token no válido');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Sin token, autorización denegada');
  }
});

module.exports = { protect };
