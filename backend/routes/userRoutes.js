const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;