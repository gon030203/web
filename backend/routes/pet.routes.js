// routes/pet.routes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Các route quản lý thú cưng (yêu cầu phải đăng nhập)
router.get('/', authMiddleware, petController.getAllPets);
router.get('/:id', authMiddleware, petController.getPetById);
router.post('/', authMiddleware, petController.createPet);
router.put('/:id', authMiddleware, petController.updatePet);
router.delete('/:id', authMiddleware, petController.deletePet);

module.exports = router;
