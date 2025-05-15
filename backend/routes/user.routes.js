// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Các route quản lý người dùng (yêu cầu phải đăng nhập)
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.post('/', authMiddleware, userController.createUser);

module.exports = router;
